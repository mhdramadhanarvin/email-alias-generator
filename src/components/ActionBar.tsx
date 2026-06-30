import { Copy, Download, Shuffle } from 'lucide-react'

interface ActionBarProps {
  total: number
  onCopyAll: () => void
  onExport: () => void
  onShuffle: () => void
}

export default function ActionBar({
  total,
  onCopyAll,
  onExport,
  onShuffle,
}: ActionBarProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-text-muted">
        <span className="font-medium text-white">{total}</span> aliases generated
      </p>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onCopyAll}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <Copy className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Copy All</span>
        </button>
        
        <button
          onClick={onExport}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <Download className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Export</span>
        </button>
        
        <button
          onClick={onShuffle}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <Shuffle className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Shuffle</span>
        </button>
      </div>
    </div>
  )
}
