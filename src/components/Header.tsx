import { Mail } from 'lucide-react'

export default function Header() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="rounded-button bg-accent/10 p-3">
          <Mail className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Email Alias Generator
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Transform your Gmail into unlimited aliases instantly
          </p>
        </div>
      </div>
    </div>
  )
}
