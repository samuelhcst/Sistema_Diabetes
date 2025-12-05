# Backend Flask - Sistema de Predicción de Diabetes

## Instalación

### 1. Crear entorno virtual (recomendado)
```bash
python -m venv venv
```

### 2. Activar entorno virtual

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

## Configuración

### Desarrollo
El archivo `.env.development` ya está configurado para desarrollo local.

### Producción
1. Copia `.env.production` y edita los valores:
```env
FLASK_ENV=production
SECRET_KEY=tu-clave-secreta-super-segura
DATABASE_PATH=/ruta/produccion/diabetes_data.db
CORS_ORIGINS=https://tu-dominio.com
PORT=5000
```

## Ejecución

### Modo Desarrollo
```bash
python app.py
```
El servidor iniciará en `http://127.0.0.1:5000`

### Modo Producción

**Linux/Mac:**
```bash
chmod +x start_production.sh
./start_production.sh
```

**Windows:**
```powershell
.\start_production.ps1
```

**O directamente con Gunicorn:**
```bash
gunicorn --workers 4 --bind 0.0.0.0:5000 app:app
```

## Endpoints API

### 1. Login
- **URL:** `/login`
- **Método:** `POST`
- **Body:** `{ "username": "admin", "password": "admin" }`

### 2. Predicción
- **URL:** `/predict`
- **Método:** `POST`
- **Body:** `{ "embarazos": 1, "glucosa": 120, "presion": 70, "piel": 20, "insulina": 80, "bmi": 25.5, "dpf": 0.5, "edad": 30 }`

### 3. Dashboard Stats
- **URL:** `/dashboard-stats`
- **Método:** `GET`

### 4. Re-entrenar Modelo
- **URL:** `/retrain-model`
- **Método:** `POST`

## Estructura de Archivos
```
backend/
├── app.py                    # Aplicación principal
├── config.py                 # Configuración por entorno
├── database.py              # Manejo de base de datos
├── requirements.txt         # Dependencias
├── .env.development         # Variables de desarrollo
├── .env.production          # Variables de producción
├── start_production.sh      # Script inicio Linux/Mac
├── start_production.ps1     # Script inicio Windows
├── diabetes_data.db         # Base de datos SQLite
└── models/
    ├── diabetes_model.pkl   # Modelo entrenado
    └── diabetes_scaler.pkl  # Scaler normalización
```

## Notas de Producción

1. **Gunicorn** es solo para Linux/Mac. En Windows usa **waitress**:
   ```bash
   pip install waitress
   waitress-serve --port=5000 app:app
   ```

2. **Configurar CORS:** Actualiza `CORS_ORIGINS` en `.env.production` con tus dominios permitidos.

3. **Secret Key:** Genera una clave segura:
   ```python
   import secrets
   print(secrets.token_hex(32))
   ```

4. **Base de datos:** Asegúrate que la ruta en `DATABASE_PATH` sea accesible y tenga permisos de escritura.

5. **Reverse Proxy:** En producción, usa Nginx o Apache como reverse proxy delante de Gunicorn.
