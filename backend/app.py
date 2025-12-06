from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
from datetime import datetime
# Importamos nuestras funciones de base de datos
from database import init_db, get_db_connection, verificar_usuario
from config import config

app = Flask(__name__)

# Configuración basada en variable de entorno
env = os.environ.get('FLASK_ENV', 'development')
app.config.from_object(config[env])

# CORS configurado según el entorno
CORS(app, origins=app.config['CORS_ORIGINS'])

# --- CONFIGURACIÓN ---
base_dir = os.path.dirname(__file__)
ruta_modelo = os.path.join(base_dir, 'models', 'diabetes_model.pkl')
ruta_scaler = os.path.join(base_dir, 'models', 'diabetes_scaler.pkl')

# Cargar Modelo y Scaler
model = joblib.load(ruta_modelo)
scaler = joblib.load(ruta_scaler) if os.path.exists(ruta_scaler) else None

# Inicializar BD al arrancar la app
init_db()

# --- 1. LOGIN REAL (Con Hashing) ---
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Usamos la función de database.py
    user = verificar_usuario(username, password)
    
    if user:
        return jsonify({
            "success": True, 
            "usuario": user['nombre_completo'],
            "usuario_id": user['id'] # Enviamos el ID para usarlo en futuras predicciones
        })
    return jsonify({"success": False, "mensaje": "Credenciales incorrectas"}), 401

# --- 2. PREDICT---
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # 1. Preprocesamiento 
    features = np.array([[
        float(data['embarazos']), float(data['glucosa']), float(data['presion']),
        float(data['piel']), float(data['insulina']), float(data['bmi']),
        float(data['dpf']), float(data['edad'])
    ]])

    if scaler: 
        features = scaler.transform(features)
    
    # 2. Predicción
    pred = model.predict(features)[0]
    prob = model.predict_proba(features)[0][1]

    # 3. GUARDADO
    conn = get_db_connection()
    
    conn.execute("""
        INSERT INTO historial (fecha, edad, glucosa, bmi, resultado, probabilidad) 
        VALUES (?, ?, ?, ?, ?, ?)
    """, (datetime.now().strftime("%Y-%m-%d %H:%M"), 
          data['edad'], data['glucosa'], data['bmi'], int(pred), float(prob)))
    
    conn.commit()
    conn.close()

    return jsonify({'resultado': int(pred), 'probabilidad': float(prob)})

# --- 3. ESTADÍSTICAS ---
@app.route('/dashboard-stats', methods=['GET'])
def dashboard_stats():
    conn = get_db_connection()
    
    # Estadísticas Generales
    total = conn.execute("SELECT COUNT(*) FROM historial").fetchone()[0]
    altos = conn.execute("SELECT COUNT(*) FROM historial WHERE resultado = 1").fetchone()[0]
    avg_prob = conn.execute("SELECT AVG(probabilidad) FROM historial").fetchone()[0] or 0
    
    # Tabla historial (ahora incluye probabilidad)
    query = """
        SELECT id, fecha, edad, glucosa, resultado, probabilidad 
        FROM historial 
        ORDER BY id DESC LIMIT 50
    """
    filas = conn.execute(query).fetchall()
    
    historial = [{
        "id": r['id'], 
        "fecha": r['fecha'], 
        "edad": r['edad'], 
        "glucosa": r['glucosa'], 
        "resultado": r['resultado'],
        "probabilidad": round(r['probabilidad'] * 100, 1)
    } for r in filas]
    
    conn.close()

    return jsonify({
        "total": total,
        "altos": altos,
        "riesgo_promedio": round(avg_prob * 100, 1),
        "precision_modelo": 74.03,
        "historial": historial
    })

@app.route('/retrain-model', methods=['POST'])
def retrain_model():
    try:
        conn = get_db_connection()
        
        # Obtener todos los datos del historial
        query = """
            SELECT edad, glucosa, bmi, resultado 
            FROM historial
        """
        rows = conn.execute(query).fetchall()
        conn.close()
        
        # Verificar que hay suficientes datos
        if len(rows) < 50:
            return jsonify({
                "success": False,
                "message": f"Se necesitan al menos 50 registros. Solo hay {len(rows)} disponibles."
            }), 400
        
        # Preparar datos para entrenamiento
        import pandas as pd
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.model_selection import train_test_split
        from sklearn.metrics import accuracy_score
        
        # Crear DataFrame con las columnas disponibles
        df = pd.DataFrame(rows, columns=['Age', 'Glucose', 'BMI', 'Outcome'])
        
        X = df.drop('Outcome', axis=1)
        y = df['Outcome']
        
        # Split datos
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Entrenar nuevo modelo
        new_model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        new_model.fit(X_train, y_train)
        
        # Calcular precisión
        y_pred = new_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred) * 100
        
        # Guardar nuevo modelo
        joblib.dump(new_model, ruta_modelo)
        
        # Registrar el re-entrenamiento
        fecha_entrenamiento = datetime.now().strftime("%d/%m/%Y")
        
        return jsonify({
            "success": True,
            "message": "Modelo re-entrenado exitosamente",
            "accuracy": round(accuracy, 2),
            "training_samples": len(X_train),
            "test_samples": len(X_test),
            "fecha": fecha_entrenamiento
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error al re-entrenar: {str(e)}"
        }), 500

if __name__ == '__main__':
    # En desarrollo usa el servidor de Flask
    # En producción usa Gunicorn
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])
