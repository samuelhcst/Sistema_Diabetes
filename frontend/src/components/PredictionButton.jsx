import { Link } from 'react-router-dom'

const IconActivity = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)

function PredictionButton({ text = "Comenzar Predicción", fullWidth = false, className = "" }) {
  return (
    <Link to="/predict" className={fullWidth ? "w-full sm:w-auto" : ""}>
      <button className={`${fullWidth ? "w-full sm:w-auto" : ""} px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 ${className}`}>
        <IconActivity className="w-5 h-5" />
        {text}
      </button>
    </Link>
  )
}

export default PredictionButton
