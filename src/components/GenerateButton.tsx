import { Loader2 } from 'lucide-react'

interface GenerateButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
}

export default function GenerateButton({
  onClick,
  loading,
  disabled,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="btn w-full"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Aliases'
      )}
    </button>
  )
}
