import { memo } from 'react'
import CopyButton from './CopyButton'

interface AliasTableProps {
  aliases: string[]
}

function AliasTableComponent({ aliases }: AliasTableProps) {
  return (
    <div className="space-y-1">
      {aliases.map((email, index) => (
        <div
          key={`${email}-${index}`}
          className="flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors rounded"
        >
          <code className="font-mono text-sm text-accent truncate flex-1 mr-4">
            {email}
          </code>
          <CopyButton text={email} />
        </div>
      ))}
    </div>
  )
}

export default memo(AliasTableComponent)
