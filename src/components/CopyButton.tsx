import { useState, useCallback, memo } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  onCopy?: () => void
}

function CopyButton({ text, onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [text, onCopy])

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="btn-icon text-text-muted hover:text-accent transition-colors cursor-pointer"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-accent" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  )
}

export default memo(CopyButton)
