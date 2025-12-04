import { Link } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

// --- ICONOS SVG (Consistentes con tu Landing) ---
const IconActivity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)
const IconBrain = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
)
const IconShield = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
)
const IconTarget = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
)
const IconTree = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v20M12 12l5-5M12 12l-5-5M12 17l4-4M12 17l-4-4"/></svg>
)
const IconCheck = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
)

function AboutModel() {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-red-100 selection:text-red-900">
      <div className="relative flex min-h-screen w-full flex-col">
        
        <Header />

        <main className="flex-grow">
          
          {/* Hero Section */}
          <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-screen-2xl mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 backdrop-blur-sm text-sm text-muted-foreground mb-6">
                  <IconTree className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Algoritmo Random Forest</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-foreground">
                  Acerca de Nuestro <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                    Modelo Predictivo
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                  Descubra cómo nuestra tecnología de Machine Learning analiza patrones clínicos complejos para ofrecer una predicción confiable del riesgo de diabetes.
                </p>
              </div>
            </div>
          </section>

          {/* Beneficios Clave */}
          <section className="py-24 bg-muted/30 border-y border-border/50">
            <div className="max-w-screen-2xl mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">Beneficios Clave del Modelo</h2>
                <p className="text-lg text-muted-foreground">
                  Utilizamos Random Forest por su robustez científica, asegurando que reciba una evaluación basada en evidencia matemática.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="group relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconTarget className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-foreground">Alta Precisión</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nuestro modelo alcanza una alta tasa de acierto al combinar múltiples árboles de decisión para minimizar errores estadísticos.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconBrain className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-foreground">Interpretabilidad</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Analiza 8 factores de riesgo críticos simultáneamente, ayudando a identificar patrones que no son evidentes a simple vista.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconShield className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-foreground">Robustez Clínica</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Diseñado para reducir el sobreajuste (overfitting), lo que significa que el modelo es fiable incluso con datos nuevos y diversos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cómo Funciona */}
          <section className="py-24">
            <div className="max-w-screen-2xl mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12 text-foreground">¿Cómo Funciona?</h2>
              
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visualización */}
                <div className="order-2 md:order-1">
                  <div className="aspect-video bg-card border border-border rounded-2xl shadow-xl p-8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="relative z-10 text-center">
                      <div className="flex justify-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-red-100 dark:bg-red-950/30 rounded-xl flex items-center justify-center animate-bounce">
                          <IconActivity className="w-6 h-6 text-red-600 dark:text-red-400"/>
                        </div>
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/30 rounded-xl flex items-center justify-center animate-bounce" style={{animationDelay: '0.1s'}}>
                          <IconBrain className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                        </div>
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-950/30 rounded-xl flex items-center justify-center animate-bounce" style={{animationDelay: '0.2s'}}>
                          <IconTree className="w-6 h-6 text-green-600 dark:text-green-400"/>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border rounded my-6"></div>
                      <div className="inline-block bg-foreground text-background px-6 py-3 rounded-xl font-bold shadow-lg">
                        Resultado Consensuado
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pasos */}
                <div className="order-1 md:order-2 space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Recopilación de Datos</h3>
                      <p className="text-muted-foreground leading-relaxed">El modelo se entrena con un conjunto de datos médicos validado que incluye historiales reales y factores de riesgo conocidos.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">El "Bosque" de Decisiones</h3>
                      <p className="text-muted-foreground leading-relaxed">Se generan cientos de árboles de decisión individuales. Cada uno aprende de una porción diferente de los datos para evitar sesgos.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Votación y Predicción</h3>
                      <p className="text-muted-foreground leading-relaxed">Cuando ingresa sus datos, cada árbol emite un "voto". La predicción final es el resultado mayoritario, asegurando la máxima precisión.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Aviso de Transparencia */}
          <section className="py-20">
            <div className="max-w-screen-2xl mx-auto px-4">
              <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0 p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">Limitaciones y Transparencia</h2>
                  <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
                    Este predictor es una herramienta de orientación académica y estadística. 
                    <strong className="font-semibold"> No sustituye el juicio clínico de un profesional médico.</strong> 
                    Su propósito es fomentar la conciencia y la prevención temprana. Consulte siempre a su médico para obtener un diagnóstico definitivo y un plan de tratamiento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-20 bg-muted/30 border-y border-border/50">
            <div className="max-w-screen-2xl mx-auto px-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">¿Listo para Evaluar su Riesgo?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Utilice nuestro predictor para obtener una evaluación instantánea basada en nuestro confiable modelo de Machine Learning.
              </p>
              <Link to="/predict">
                <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 mx-auto">
                  <IconActivity className="w-5 h-5" />
                  Probar el Predictor Ahora
                </button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AboutModel