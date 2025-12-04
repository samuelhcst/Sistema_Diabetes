import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Resultados from './Resultados';

// Iconos SVG
const IconActivity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)
const IconArrowLeft = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
)
const IconUser = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const IconDroplet = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
)
const IconScale = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
)

function Formulario() {
  const [datos, setDatos] = useState({
    embarazos: 0,
    glucosa: 100,
    presion: 70,
    piel: 20,
    insulina: 0,
    bmi: 25.0,
    dpf: 0.5,
    edad: 30
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const procesar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMostrarResultado(false);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      const data = await response.json();
      setResultado(data);
      setMostrarResultado(true);
    } catch (error) {
      alert("Error: No se pudo conectar con el servidor (Flask).");
    }
    setLoading(false);
  };

  const nuevaPrediccion = () => {
    setMostrarResultado(false);
    setResultado(null);
  };

  // Si hay resultado, mostrar página de resultados
  if (mostrarResultado && resultado) {
    return <Resultados resultado={resultado} onNuevaPrediccion={nuevaPrediccion} />;
  }

  // Formulario normal
  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground mb-4 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2"></span>
              Formulario de Evaluación Clínica
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-foreground">
              Predicción de <span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">Riesgo de Diabetes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete los 8 parámetros clínicos requeridos para obtener una evaluación personalizada mediante nuestro modelo de IA.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={procesar} className="max-w-4xl mx-auto space-y-6">
            
            {/* GRUPO 1: DATOS PERSONALES */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600">
                    <IconUser className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Datos del Paciente</h3>
                    <p className="text-sm text-muted-foreground">Información básica y antecedentes</p>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">Edad (años)</span>
                  <input 
                    type="number" 
                    name="edad" 
                    value={datos.edad} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    required 
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">Embarazos</span>
                  <input 
                    type="number" 
                    name="embarazos" 
                    value={datos.embarazos} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    min="0" 
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">DPF (Antecedentes Genéticos)</span>
                  <input 
                    type="number" 
                    step="0.001" 
                    name="dpf" 
                    value={datos.dpf} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="Ej: 0.523" 
                  />
                  <span className="text-xs text-muted-foreground">Valor entre 0.0 y 2.5</span>
                </label>
              </div>
            </div>

            {/* GRUPO 2: MÉTRICAS SANGUÍNEAS */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600">
                    <IconDroplet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Análisis Sanguíneo</h3>
                    <p className="text-sm text-muted-foreground">Indicadores críticos metabólicos</p>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                    Glucosa (mg/dL)
                    <span className="text-red-500">*</span>
                  </span>
                  <input 
                    type="number" 
                    name="glucosa" 
                    value={datos.glucosa} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-red-200 dark:border-red-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                    required 
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">Insulina (mu U/ml)</span>
                  <input 
                    type="number" 
                    name="insulina" 
                    value={datos.insulina} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">Presión Arterial (mm Hg)</span>
                  <input 
                    type="number" 
                    name="presion" 
                    value={datos.presion} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  />
                </label>
              </div>
            </div>

            {/* GRUPO 3: COMPOSICIÓN CORPORAL */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600">
                    <IconScale className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Composición Corporal</h3>
                    <p className="text-sm text-muted-foreground">Medidas antropométricas</p>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                    BMI (Índice de Masa Corporal)
                    <span className="text-red-500">*</span>
                  </span>
                  <input 
                    type="number" 
                    step="0.1" 
                    name="bmi" 
                    value={datos.bmi} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    required 
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">Espesor de Piel (mm)</span>
                  <input 
                    type="number" 
                    name="piel" 
                    value={datos.piel} 
                    onChange={handleChange}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  />
                </label>
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="px-10 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-1 disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  <>
                    <IconActivity className="w-5 h-5" />
                    CALCULAR RIESGO
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Formulario;