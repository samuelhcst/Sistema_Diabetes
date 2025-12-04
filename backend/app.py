from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Rutas de archivos
base_dir = os.path.dirname(__file__)
ruta_modelo = os.path.join(base_dir, 'models', 'diabetes_model.pkl')
ruta_scaler = os.path.join(base_dir, 'models', 'diabetes_scaler.pkl') # <--- NUEVO ARCHIVO

# Cargar Modelo y Escalador
model = None
scaler = None

try:
    model = joblib.load(ruta_modelo)
    print(f"✅ Modelo cargado: {ruta_modelo}")
    
    # Intentamos cargar el escalador
    if os.path.exists(ruta_scaler):
        scaler = joblib.load(ruta_scaler)
        print(f"✅ Escalador cargado: {ruta_scaler}")
    else:
        print(f"⚠️ ADVERTENCIA: No se encontró 'diabetes_scaler.pkl' en {ruta_scaler}. El modelo podría fallar si requiere datos escalados.")

except Exception as e:
    print(f"❌ Error cargando archivos: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Modelo no disponible'}), 500

    data = request.get_json()
    
    # 1. Crear el array con datos crudos
    features = np.array([[
        float(data['embarazos']),
        float(data['glucosa']),
        float(data['presion']),
        float(data['piel']),
        float(data['insulina']),
        float(data['bmi']),
        float(data['dpf']),
        float(data['edad'])
    ]])

    # 2. ESCALAR LOS DATOS 
    if scaler:
        features = scaler.transform(features)

    # 3. Predecir
    prediction = model.predict(features)
    probability = model.predict_proba(features)[0][1]

    return jsonify({
        'resultado': int(prediction[0]),
        'probabilidad': float(probability),
        'mensaje': "Positivo" if prediction[0] == 1 else "Negativo"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)