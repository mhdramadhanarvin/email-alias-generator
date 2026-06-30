import { ChevronDown } from 'lucide-react'

interface MaxDotsSelectProps {
  value: number
  onChange: (value: number) => void
}

export default function MaxDotsSelect({ value, onChange }: MaxDotsSelectProps) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="appearance-none bg-background border border-border rounded-button px-4 py-2 pr-10
                   text-white cursor-pointer focus:outline-none focus:border-accent focus:ring-1 
                   focus:ring-accent/50 transition-all duration-150"
      >
        {[1, 2, 3, 4].map((num) => (
          <option key={num} value={num} className="bg-surface">
            {num}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
    </div>
  )
}
