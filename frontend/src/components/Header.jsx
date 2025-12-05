import { Link } from 'react-router-dom'

const IconActivity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

const IconUser = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-500/20">
              <IconActivity className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Predicción de Diabetes Mellitus Tipo 2
            </h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-red-600 transition-colors cursor-pointer hover:underline underline-offset-4">
              Inicio
            </Link>
            <Link to="/predict" className="text-sm font-medium text-foreground/80 hover:text-red-600 transition-colors cursor-pointer hover:underline underline-offset-4">
              Predicción
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-red-600 transition-colors cursor-pointer hover:underline underline-offset-4">
              Acerca de
            </Link>
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200">
              <IconUser className="w-4 h-4" />
              Iniciar Sesión
            </Link>
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <Link to="/login" className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors">
              <IconUser className="w-5 h-5" />
            </Link>
            <button className="p-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
