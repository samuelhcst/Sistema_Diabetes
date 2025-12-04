import { Link } from 'react-router-dom'
import { useRef, useCallback } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"

// Iconos SVG como componentes simples para mantener el código limpio
const IconClipboard = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
)
const IconBrain = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
)
const IconChart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
)
const IconZap = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
)
const IconShield = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
)
const IconActivity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
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
            className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
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
                  <Link to="/predict" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
                      <IconActivity className="w-5 h-5" />
                      Comenzar Predicción
                    </button>
                  </Link>
                  <button className="w-full sm:w-auto px-8 py-4 border border-border bg-background hover:bg-muted/50 text-foreground font-semibold rounded-xl transition-colors duration-200">
                    Saber más
                  </button>
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
          <section className="py-24 bg-muted/30 border-y border-border/50">
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

          {/* --- Features Section --- */}
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                    Tecnología al servicio de <br />
                    <span className="text-red-600">tu salud preventiva</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Aprovecha la capacidad de cómputo moderna para detectar patrones invisibles al ojo humano. Nuestra herramienta no guarda tus datos personales, garantizando total privacidad.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { icon: <IconBrain />, title: "Algoritmo Random Forest", text: "Alta precisión en datos tabulares médicos." },
                      { icon: <IconZap />, title: "Cero Latencia", text: "Sin tiempos de espera, procesamiento en tiempo real." },
                      { icon: <IconShield />, title: "Privacidad Primero", text: "No requerimos registro ni guardamos historial." }
                    ].map((feat, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {feat.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{feat.title}</h4>
                          <p className="text-sm text-muted-foreground">{feat.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Visual Stats Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-8 rounded-2xl bg-card border border-border shadow-lg flex flex-col justify-center items-center text-center">
                    <span className="text-5xl font-extrabold text-foreground mb-2">800M+</span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Adultos Afectados</span>
                  </div>
                  <div className="p-8 rounded-2xl bg-red-600 text-white shadow-lg flex flex-col justify-center items-center text-center transform sm:translate-y-8">
                    <span className="text-5xl font-extrabold mb-2">50%</span>
                    <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Sin Diagnosticar</span>
                  </div>
                  <div className="p-8 rounded-2xl bg-card border border-border shadow-lg flex flex-col justify-center items-center text-center">
                     <span className="text-5xl font-extrabold text-foreground mb-2">3.4M</span>
                     <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Muertes Anuales</span>
                  </div>
                  {/* Decorative box */}
                   <div className="p-8 rounded-2xl bg-muted/50 border border-border border-dashed flex items-center justify-center transform sm:translate-y-8">
                      <IconActivity className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Disclaimer Section --- */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0 p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
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