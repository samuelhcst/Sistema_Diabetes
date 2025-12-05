import { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const IconUser = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const IconLock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

const IconEye = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const IconEyeOff = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
);

const IconAlertCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const blobRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current || !blobRef.current) return
    
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    blobRef.current.style.left = `${x}%`
    blobRef.current.style.top = `${y}%`
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!blobRef.current) return
    blobRef.current.style.left = '50%'
    blobRef.current.style.top = '50%'
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación simple del lado del cliente
    if (!credentials.username || !credentials.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Llamar al backend para autenticar
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Login exitoso
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', data.usuario);
        localStorage.setItem('userId', data.usuario_id);
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        // Login fallido
        setError(data.mensaje || 'Usuario o contraseña incorrectos');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al conectar con el servidor. Verifica que el backend esté ejecutándose.');
      setLoading(false);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="bg-background text-foreground font-sans selection:bg-red-100 selection:text-red-900 min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div
        ref={blobRef}
        className="absolute w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] -z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: '50%', top: '50%', transition: 'left 0.15s ease-out, top 0.15s ease-out' }}
      ></div>

      <div className="w-full max-w-md relative z-10">
            
            {/* Card de Login */}
            <div className="bg-black/30 border border-border rounded-2xl shadow-xl p-8">
              
              {/* Header del formulario */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white mb-4 shadow-lg shadow-red-500/20">
                  <IconUser className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Iniciar Sesión</h1>
                <p className="text-muted-foreground text-sm">Accede al panel de administración</p>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex items-start gap-3">
                  <IconAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Campo Usuario */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                    Usuario
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconUser className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-border rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="Ingresa tu usuario"
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconLock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-border rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="Ingresa tu contraseña"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Recordar sesión */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-0"
                    />
                    <span className="text-sm text-muted-foreground">Recordarme</span>
                  </label>
                  <a href="#" className="text-sm text-red-600 hover:text-red-700 font-medium">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                {/* Botón de submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              {/* Link para volver */}
              <div className="mt-6 text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-red-600 transition-colors">
                  ← Volver al inicio
                </Link>
              </div>
            </div>

          </div>
    </div>
  );
}

export default Login;
