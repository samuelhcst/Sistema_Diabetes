import Header from './components/Header';
import Footer from './components/Footer';

// Iconos SVG
const IconShield = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
)
const IconHeart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
)
const IconCalendar = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
)
const IconInfo = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
)
const IconRefresh = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
)
const IconAlertTriangle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
)

function Resultados({ resultado, onNuevaPrediccion }) {
  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <Header />

      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Resultados de Predicción de Diabetes
            </h1>
          </div>

          {/* Result Card Principal */}
          <div className={`max-w-4xl mx-auto mb-12 rounded-2xl border-2 p-10 shadow-xl ${
            resultado.resultado === 1 
              ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800' 
              : 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800'
          }`}>
            <div className="flex items-start gap-6">
              <div className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl ${
                resultado.resultado === 1 
                  ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-100' 
                  : 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-100'
              }`}>
                <IconShield className="w-10 h-10" />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {resultado.resultado === 1 ? "Riesgo Alto" : "Riesgo Bajo"}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {resultado.resultado === 1 
                    ? "Basado en los datos proporcionados, tu riesgo de desarrollar diabetes es alto."
                    : "Basado en los datos proporcionados, tu riesgo de desarrollar diabetes es bajo."}
                </p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Significado */}
            <div>
              <h3 className="text-2xl font-bold mb-6">¿Qué significa este resultado?</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {resultado.resultado === 1 
                  ? "Nuestro algoritmo ha analizado tus entradas y ha determinado un nivel de riesgo elevado. Es importante que tomes medidas preventivas y consultes con un profesional de la salud para realizar un diagnóstico completo y recibir orientación personalizada."
                  : "Nuestro algoritmo ha analizado tus entradas y ha determinado un nivel de riesgo bajo, pero es importante continuar con hábitos de vida saludables para mantener este estado. Sigue monitoreando tu salud y consulta a tu médico regularmente."}
              </p>

              {resultado.probabilidad && (
                <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Probabilidad estimada</p>
                    <p className="text-5xl font-extrabold text-foreground mb-2">
                      {(resultado.probabilidad * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Basado en modelo de Machine Learning</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Recomendaciones */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Próximos Pasos Recomendados</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    resultado.resultado === 1 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    <IconHeart className={`w-5 h-5 ${
                      resultado.resultado === 1 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Mantén un Estilo de Vida Saludable:</h4>
                    <p className="text-sm text-muted-foreground">Continúa con una dieta balanceada y actividad física regular.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    resultado.resultado === 1 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    <IconCalendar className={`w-5 h-5 ${
                      resultado.resultado === 1 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Chequeos Regulares:</h4>
                    <p className="text-sm text-muted-foreground">No olvides tus visitas anuales al médico para un control general de tu salud.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    resultado.resultado === 1 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    <IconInfo className={`w-5 h-5 ${
                      resultado.resultado === 1 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Infórmate:</h4>
                    <p className="text-sm text-muted-foreground">Conoce los síntomas tempranos de la diabetes como medida de prevención.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 p-6 flex gap-4 items-start">
              <div className="flex-shrink-0 p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-500">
                <IconAlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg mb-2">
                  Aviso Importante
                </h3>
                <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed text-sm">
                  Esta herramienta proporciona una estimación de riesgo basada en un modelo de machine learning y no constituye un diagnóstico médico. Los resultados son solo para fines informativos. Consulta siempre a un profesional de la salud para obtener un diagnóstico y tratamiento adecuados.
                </p>
              </div>
            </div>

            {/* Botón Nueva Predicción */}
            <div className="flex justify-center mt-8">
              <button 
                onClick={onNuevaPrediccion}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-200"
              >
                <IconRefresh className="w-5 h-5" />
                Nueva Predicción
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Resultados;
