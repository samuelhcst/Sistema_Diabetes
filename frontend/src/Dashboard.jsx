import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

// Custom tooltip para el gráfico (fuera del componente para evitar recreación)
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const prob = payload[0].value;
    const nivel = prob >= 70 ? 'Alto' : prob >= 30 ? 'Medio' : 'Bajo';
    const colorClass = prob >= 70 ? 'text-red-600' : prob >= 30 ? 'text-amber-600' : 'text-green-600';
    
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold text-sm">{payload[0].payload.id}</p>
        <p className={`text-lg font-bold ${colorClass}`}>{prob}%</p>
        <p className="text-gray-400 text-xs">Riesgo {nivel}</p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    altos: 0,
    riesgo_promedio: 0,
    precision_modelo: 0,
    historial: [],
    chartData: []
  });
  
  const [retraining, setRetraining] = useState(false);
  const [retrainMessage, setRetrainMessage] = useState(null);
  
  const navigate = useNavigate();

  // Cargar datos reales del backend al iniciar
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/dashboard-stats`);
        const data = await res.json();
        
        // Preparar datos para el gráfico temporal (últimos 20 resultados)
        const chartData = data.historial
          .slice(0, 20)
          .reverse()
          .map((item, index) => ({
            id: `#${item.id}`,
            probabilidad: item.probabilidad,
            color: item.probabilidad >= 70 ? '#ef4444' : item.probabilidad >= 30 ? '#f59e0b' : '#10b981'
          }));
        
        setStats({ ...data, chartData });
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        // Datos de ejemplo si falla
        setStats(prev => ({
          ...prev,
          chartData: [
            { id: '#1', probabilidad: 25, color: '#10b981' },
            { id: '#2', probabilidad: 45, color: '#f59e0b' },
            { id: '#3', probabilidad: 78, color: '#ef4444' },
            { id: '#4', probabilidad: 30, color: '#f59e0b' },
            { id: '#5', probabilidad: 15, color: '#10b981' }
          ]
        }));
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleRetrain = async () => {
    if (!confirm('¿Deseas re-entrenar el modelo con los datos actuales? Esto puede tardar unos segundos.')) {
      return;
    }
    
    setRetraining(true);
    setRetrainMessage(null);
    
    try {
      const res = await fetch(`${API_URL}/retrain-model`, {
        method: 'POST'
      });
      const data = await res.json();
      
      if (data.success) {
        setRetrainMessage({
          type: 'success',
          text: `✅ ${data.message} - Nueva precisión: ${data.accuracy}%`
        });
        // Actualizar stats
        setStats(prev => ({ ...prev, precision_modelo: data.accuracy }));
      } else {
        setRetrainMessage({
          type: 'error',
          text: `❌ ${data.message}`
        });
      }
    } catch (error) {
      setRetrainMessage({
        type: 'error',
        text: '❌ Error al conectar con el servidor'
      });
    } finally {
      setRetraining(false);
    }
  };

  return (
    <div className="bg-background text-foreground font-sans selection:bg-red-100 selection:text-red-900 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
            
            {/* Header del Dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-border">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Panel de Control</h1>
                <p className="text-muted-foreground text-sm mt-1">Visión general del rendimiento del modelo ML</p>
              </div>
              <div className="flex gap-3">                
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm">
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* TARJETAS DE MÉTRICAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              
              {/* Card 1: Total */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-muted-foreground text-sm font-medium mb-2">Total de Predicciones</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">{stats.total}</span>        
                </div>
              </div>

              {/* Card 2: Riesgo Promedio */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-muted-foreground text-sm font-medium mb-2">Riesgo Promedio</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">{stats.riesgo_promedio}%</span>
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">Tendencia</span>
                </div>
              </div>

              {/* Card 3: Casos Altos */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-muted-foreground text-sm font-medium mb-2">Casos Alto Riesgo</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">{stats.altos}</span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">Alertas</span>
                </div>
              </div>

              {/* Card 4: Precisión */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-muted-foreground text-sm font-medium mb-2">Precisión del Modelo</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">{stats.precision_modelo}%</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Estable</span>
                </div>
              </div>
            </div>

            {/* SECCIÓN INFERIOR: GRÁFICOS Y GESTIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              
              {/* Gráfico de Evolución Temporal */}
              <div className="bg-card border border-border p-6 rounded-2xl lg:col-span-2 shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-foreground">Evolución de Probabilidades</h3>
                <p className="text-xs text-muted-foreground mb-6">Últimas 20 predicciones realizadas</p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={stats.chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="id" 
                      tick={{ fill: '#d1d5db', fontSize: 11 }}
                      axisLine={{ stroke: '#4b5563' }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: '#d1d5db', fontSize: 12 }}
                      axisLine={{ stroke: '#4b5563' }}
                      label={{ value: 'Probabilidad (%)', angle: -90, position: 'insideLeft', fill: '#d1d5db', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={30} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.5} />
                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
                    <Line 
                      type="monotone" 
                      dataKey="probabilidad" 
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Bajo (&lt;30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-muted-foreground">Medio (30-70%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-muted-foreground">Alto (&gt;70%)</span>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Gestión del Modelo */}
              <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Gestión del Modelo</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Precisión actual: <span className="text-foreground font-bold">{stats.precision_modelo}%</span><br/>
                    Último entrenamiento: <span className="text-foreground">20/11/2025</span>
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    Para mejorar la precisión, inicie un nuevo ciclo de entrenamiento con los datos más recientes recolectados del formulario público.
                  </p>
                  
                  {retrainMessage && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${
                      retrainMessage.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900'
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900'
                    }`}>
                      {retrainMessage.text}
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleRetrain}
                  disabled={retraining}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {retraining ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Entrenando...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Re-entrenar Modelo
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* TABLA DE HISTORIAL */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Historial Reciente</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">ID</th>
                      <th className="px-6 py-4 font-medium">Fecha</th>
                      <th className="px-6 py-4 font-medium">Edad</th>
                      <th className="px-6 py-4 font-medium">Glucosa</th>
                      <th className="px-6 py-4 font-medium">Resultado</th>
                      <th className="px-6 py-4 font-medium text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground/80 text-sm">
                    {stats.historial.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">#{item.id}</td>
                        <td className="px-6 py-4">{item.fecha}</td>
                        <td className="px-6 py-4">{item.edad}</td>
                        <td className="px-6 py-4">{item.glucosa} mg/dL</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            item.resultado === 1 
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900' 
                              : 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900'
                          }`}>
                            {item.resultado === 1 ? 'Alto Riesgo' : 'Bajo Riesgo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground hover:text-red-600 transition-colors text-sm font-medium">Ver Detalle</button>
                        </td>
                      </tr>
                    ))}
                    {stats.historial.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                          No hay registros aún. Realiza una predicción en el formulario.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

      </div>
    </div>
  );
}

export default Dashboard;