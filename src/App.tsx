import { useState, useCallback } from 'react'
import { generateVariants, extractLocalPart, isValidGmail, shuffle } from './lib/generator'
import Header from './components/Header'
import EmailInput from './components/EmailInput'
import MaxDotsSelect from './components/MaxDotsSelect'
import GenerateButton from './components/GenerateButton'
import AliasTable from './components/AliasTable'
import ActionBar from './components/ActionBar'
import Toast from './components/Toast'

export default function App() {
  const [email, setEmail] = useState('')
  const [maxDots, setMaxDots] = useState(2)
  const [aliases, setAliases] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleGenerate = useCallback(() => {
    setError('')
    
    if (!email.trim()) {
      setError('Please enter an email address')
      return
    }

    if (!isValidGmail(email)) {
      setError('Please enter a valid Gmail address')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      try {
        const localPart = extractLocalPart(email)
        const generated = generateVariants(localPart, maxDots, 20)
        const shuffled = shuffle(generated)
        setAliases(shuffled)
        showToast(`Generated ${generated.length} aliases`)
      } catch (err) {
        setError('Failed to generate aliases')
        showToast('Failed to generate aliases', 'error')
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [email, maxDots])

  const handleShuffle = useCallback(() => {
    const shuffled = shuffle(aliases)
    setAliases(shuffled)
    showToast('Aliases shuffled')
  }, [aliases])

  const handleCopyAll = useCallback(() => {
    if (aliases.length === 0) return
    
    navigator.clipboard.writeText(aliases.join('\n')).then(() => {
      showToast(`Copied ${aliases.length} aliases`)
    }).catch(() => {
      showToast('Failed to copy', 'error')
    })
  }, [aliases])

  const handleExport = useCallback(() => {
    if (aliases.length === 0) return

    const text = aliases.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-aliases-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Exported aliases')
  }, [aliases])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Header />

        <div className="mt-12 space-y-6">
          {/* Input Card */}
          <div className="card animate-fade-in">
            <div className="space-y-4">
              <EmailInput
                value={email}
                onChange={setEmail}
                error={error}
                onClear={() => setEmail('')}
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-text-muted">
                  <span>Max dots:</span>
                </label>
                <MaxDotsSelect value={maxDots} onChange={setMaxDots} />
              </div>

              <GenerateButton
                onClick={handleGenerate}
                loading={loading}
                disabled={!email.trim()}
              />
            </div>
          </div>

          {/* Results Card */}
          {aliases.length > 0 && (
            <div className="card animate-slide-up space-y-4">
              <ActionBar
                total={aliases.length}
                onCopyAll={handleCopyAll}
                onExport={handleExport}
                onShuffle={handleShuffle}
              />
              <AliasTable aliases={aliases} />
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
