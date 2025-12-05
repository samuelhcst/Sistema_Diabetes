#!/bin/bash
# Script para iniciar el servidor en producción con Gunicorn

# Cargar variables de entorno
export FLASK_ENV=production
source .env.production

# Iniciar Gunicorn con 4 workers
gunicorn --workers 4 \
         --bind 0.0.0.0:$PORT \
         --timeout 120 \
         --access-logfile - \
         --error-logfile - \
         app:app
