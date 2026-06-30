import { CheckCircle, XCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 animate-slide-up z-50">
      <div className="card flex items-center gap-3 shadow-lg">
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 text-accent" />
        ) : (
          <XCircle className="h-5 w-5 text-error" />
        )}
        <p className="text-sm font-medium text-white">{message}</p>
      </div>
    </div>
  )
}
