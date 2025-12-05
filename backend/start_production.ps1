# Script para iniciar el servidor en producción con Gunicorn (Windows)

# Cargar variables de entorno
$env:FLASK_ENV="production"

# Leer archivo .env.production y configurar variables
Get-Content .env.production | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        Set-Item -Path "env:$($matches[1])" -Value $matches[2]
    }
}

# Iniciar Gunicorn con 4 workers
gunicorn --workers 4 `
         --bind "0.0.0.0:$env:PORT" `
         --timeout 120 `
         --access-logfile - `
         --error-logfile - `
         app:app
