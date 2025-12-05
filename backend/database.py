import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

DB_NAME = "diabetes_data.db"

def get_db_connection():
    """Crea y devuelve una conexión a la base de datos."""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Inicializa las tablas e inserta/actualiza los usuarios fijos."""
    conn = get_db_connection()
    c = conn.cursor()
    
    # 1. Crear Tabla USUARIOS
    c.execute('''CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    nombre_completo TEXT
                )''')

    # 2. Crear Tabla HISTORIAL
    c.execute('''CREATE TABLE IF NOT EXISTS historial (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_id INTEGER,  -- <--- Puede ser NULL para usuarios públicos
                fecha TEXT, 
                edad INTEGER, 
                glucosa REAL, 
                bmi REAL, 
                resultado INTEGER, 
                probabilidad REAL,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
            )''')
    
    # Lista de usuarios fijos
    usuarios_fijos = [
        ('admin', 'admin', 'Administrador'),
        ('samuel.hcst@gmail.com', 'samuel123', 'Samuel Huaccha')
    ]

    print("--- Verificando usuarios del sistema ---")
    for user_data in usuarios_fijos:
        username = user_data[0]
        password_raw = user_data[1]
        nombre = user_data[2]

        # 1. Generamos el hash SIEMPRE (para crear o para actualizar)
        hashed_pw = generate_password_hash(password_raw)

        # 2. Verificamos si existe
        existe = c.execute("SELECT 1 FROM usuarios WHERE username = ?", (username,)).fetchone()
        
        if not existe:
            print(f" -> Creando usuario nuevo: {username}")
            c.execute("INSERT INTO usuarios (username, password_hash, nombre_completo) VALUES (?, ?, ?)",
                      (username, hashed_pw, nombre))
        else:
            # --- AQUÍ ESTÁ LA CORRECCIÓN ---
            # Si existe, forzamos la actualización de la contraseña
            print(f" -> Usuario '{username}' existente. Actualizando contraseña...")
            c.execute("UPDATE usuarios SET password_hash = ?, nombre_completo = ? WHERE username = ?",
                      (hashed_pw, nombre, username))
    
    conn.commit()
    conn.close()
    print("--- Base de datos lista y sincronizada ---")

def verificar_usuario(username, password):
    """Busca el usuario y verifica si la contraseña coincide con el hash."""
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM usuarios WHERE username = ?", (username,)).fetchone()
    conn.close()
    
    if user and check_password_hash(user['password_hash'], password):
        return user
    return None