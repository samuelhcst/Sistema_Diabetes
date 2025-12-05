import { Link } from 'react-router-dom'
import { useRef, useCallback } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import PredictionButton from "./components/PredictionButton"

// Iconos SVG como componentes simples para mantener el código limpio
const IconClipboard = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
)
const IconBrain = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>
)
const IconChart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
)
const IconZap = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
)
const IconShield = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
)
const IconActivity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
)

function Landing() {
  const sectionRef = useRef(null)
  const blobRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current || !blobRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    blobRef.current.style.left = `${x}%`
    blobRef.current.style.top = `${y}%`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!blobRef.current) return
    blobRef.current.style.left = '50%'
    blobRef.current.style.top = '50%'
  }, [])

  return (
    <div className="bg-background text-foreground font-sans selection:bg-red-100 selection:text-red-900">
      <div className="relative flex min-h-screen w-full flex-col">

        <Header />

        <main className="flex-grow">

          {/* --- HeroSection --- */}
          <section
            ref={sectionRef}
            className="relative py-24 sm:py-32 lg:py-40 overflow-hidden hover:cursor-crosshair"
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

            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-foreground">
                  Predice tu riesgo de <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                    Diabetes Tipo 2
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                  Una herramienta académica avanzada que utiliza algoritmos de <strong>Machine Learning</strong> para analizar tus patrones clínicos y ofrecerte una evaluación preliminar en segundos.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <PredictionButton fullWidth={true} />
                  <Link to="/about" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-4 border border-border bg-background hover:bg-muted/50 text-foreground font-semibold rounded-xl transition-colors duration-200">
                      Saber más
                    </button>
                  </Link>
                </div>

                {/* Mini stats */}
                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground grayscale opacity-70">
                  <div className="flex items-center gap-2">
                    <IconBrain className="w-4 h-4" /> Random Forest
                  </div>
                  <div className="flex items-center gap-2">
                    <IconShield className="w-4 h-4" /> 100% Anónimo
                  </div>
                  <div className="flex items-center gap-2">
                    <IconZap className="w-4 h-4" /> Resultado Inmediato
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- "How It Works" Section --- */}
          <section className="py-24 bg-muted/30 border-y border-border/50 hover:cursor-default">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Proceso Simplificado</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hemos diseñado una experiencia fluida para que obtengas respuestas sin complicaciones técnicas.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    icon: <IconClipboard className="h-8 w-8" />,
                    title: "1. Ingresa tus datos",
                    desc: "Completa un formulario seguro con 8 indicadores clínicos básicos como glucosa y BMI.",
                    color: "text-blue-600",
                    bg: "bg-blue-50 dark:bg-blue-950/30"
                  },
                  {
                    icon: <IconBrain className="h-8 w-8" />,
                    title: "2. Análisis IA",
                    desc: "Nuestro modelo matemático procesa la información comparándola con miles de patrones.",
                    color: "text-purple-600",
                    bg: "bg-purple-50 dark:bg-purple-950/30"
                  },
                  {
                    icon: <IconChart className="h-8 w-8" />,
                    title: "3. Resultado",
                    desc: "Recibe una estimación de riesgo clara con recomendaciones visuales inmediatas.",
                    color: "text-green-600",
                    bg: "bg-green-50 dark:bg-green-950/30"
                  }
                ].map((step, index) => (
                  <div key={index} className="group relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${step.bg} ${step.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {step.icon}
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- "¿Por qué usar nuestra herramienta?" Section --- */}
          <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                  ¿Por qué usar nuestra herramienta?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Descubre las ventajas que hacen de esta plataforma tu mejor aliada en la prevención
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto hover:cursor-default">
                {/* Card 1: Machine Learning */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <div className="relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <IconBrain className="w-10 h-10" />
                    </div>

                    <div className="flex flex-col gap-3 flex-grow">
                      <h3 className="text-xl font-bold text-foreground transition-colors duration-300">
                        Basada en Machine Learning
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Utilizamos algoritmos avanzados de Random Forest entrenados con miles de casos reales para ofrecerte predicciones precisas y confiables.
                      </p>
                    </div>
                    <div className="mt-6 w-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                </div>

                {/* Card 2: Instant Results */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <div className="relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <IconZap className="w-10 h-10" />
                    </div>

                    <div className="flex flex-col gap-3 flex-grow">
                      <h3 className="text-xl font-bold text-foreground transition-colors duration-300">
                        Resultados Instantáneos
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Obtén tu evaluación de riesgo en menos de un segundo. Sin esperas, sin complicaciones, solo respuestas rápidas cuando más las necesitas.
                      </p>
                    </div>
                    <div className="mt-6 w-0 h-1 bg-gradient-to-r from-orange-500 to-rose-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                </div>

                {/* Card 3: Privacy & Security */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <div className="relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <IconShield className="w-10 h-10" />
                    </div>

                    <div className="flex flex-col gap-3 flex-grow">
                      <h3 className="text-xl font-bold text-foreground transition-colors duration-300">
                        100% Privado y Seguro
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Tus datos nunca se almacenan ni comparten. Todo el procesamiento es local y anónimo, garantizando tu privacidad absoluta en cada consulta.
                      </p>
                    </div>
                    <div className="mt-6 w-0 h-1 bg-gradient-to-r from-rose-500 to-red-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <PredictionButton text="Prueba la herramienta ahora" className="mx-auto" />
              </div>
            </div>
          </section>

          {/* --- Lo esencial sobre Diabetes Tipo 2 --- */}
          <section className="py-24 bg-muted/30 border-y border-border/50 hover:cursor-default">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Lo esencial sobre <span className="text-red-600">Diabetes Tipo 2</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Información clave que debes conocer para entender esta condición de salud
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Card 1: ¿Qué es? */}
                <div className="group relative">
                  <div className="relative flex flex-col gap-6 p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-foreground">¿Qué es?</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        La Diabetes Tipo 2 es una condición crónica en la que el cuerpo desarrolla <strong>resistencia a la insulina</strong>, 
                        la hormona que regula el azúcar en la sangre. Con el tiempo, el páncreas no puede producir suficiente insulina 
                        para mantener niveles normales de glucosa.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Síntomas frecuentes */}
                <div className="group relative">
                  <div className="relative flex flex-col gap-6 p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-foreground">Síntomas frecuentes</h3>
                      <ul className="text-muted-foreground leading-relaxed space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-1">•</span>
                          <span><strong>Fatiga constante</strong> y debilidad muscular</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-1">•</span>
                          <span><strong>Sed excesiva</strong> (polidipsia)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-1">•</span>
                          <span><strong>Visión borrosa</strong> o cambios visuales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-1">•</span>
                          <span><strong>Micción frecuente</strong> (poliuria)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-1">•</span>
                          <span>Heridas que <strong>tardan en sanar</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card 3: Factores de riesgo */}
                <div className="group relative">
                  <div className="relative flex flex-col gap-6 p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-foreground">Factores de riesgo</h3>
                      <ul className="text-muted-foreground leading-relaxed space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Sobrepeso u obesidad</strong> (IMC ≥ 25)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Antecedentes familiares</strong> de diabetes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Sedentarismo</strong> y falta de actividad física</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Hipertensión arterial</strong> (≥140/90 mmHg)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span>Edad mayor a <strong>45 años</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* --- Disclaimer Section --- */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0 p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg mb-2">
                    Aviso Académico Importante
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
                    Esta herramienta es un prototipo desarrollado para fines académicos. Los
                    resultados son estimaciones estadísticas basadas en un modelo entrenado y{" "}
                    <strong className="font-semibold underline">NO constituyen un diagnóstico médico real</strong>. Siempre consulte a un profesional de la salud ante cualquier duda.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Landing