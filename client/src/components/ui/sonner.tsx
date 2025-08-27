import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react"

export interface SonnerProps {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "warning" | "info" | "loading"
  duration?: number
  onClose: (id: string) => void
  action?: {
    label: string
    onClick: () => void
  }
}

const Sonner = ({ 
  id, 
  title, 
  description, 
  type = "info", 
  duration = 4000, 
  onClose, 
  action 
}: SonnerProps) => {
  const [progress, setProgress] = React.useState(100)

  React.useEffect(() => {
    if (type === "loading") return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 100))
        if (newProgress <= 0) {
          onClose(id)
          return 0
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [id, duration, onClose, type])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
    loading: (
      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
    )
  }

  const backgrounds = {
    success: "bg-white border-green-200 shadow-green-100",
    error: "bg-white border-red-200 shadow-red-100",
    warning: "bg-white border-yellow-200 shadow-yellow-100",
    info: "bg-white border-blue-200 shadow-blue-100",
    loading: "bg-white border-gray-200 shadow-gray-100"
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-lg min-w-[350px] max-w-md ${backgrounds[type]}`}
    >
      {/* Progress Bar */}
      {type !== "loading" && (
        <div className="absolute bottom-0 left-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden w-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}

      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>

      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-gray-900 text-sm mb-1">{title}</div>
        )}
        {description && (
          <div className="text-gray-600 text-sm leading-relaxed">{description}</div>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>

      {type !== "loading" && (
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}

export default Sonner