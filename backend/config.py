# Configuración para producción
import os

class Config:
    """Configuración base"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DATABASE_PATH = os.environ.get('DATABASE_PATH') or 'diabetes_data.db'
    
class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    CORS_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']

class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '').split(',')
    # En producción, asegúrate de definir SECRET_KEY como variable de entorno

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
