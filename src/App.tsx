import { useState, useCallback } from 'react'
import { generateVariants, extractLocalPart, extractDomain, isValidEmail, shuffle } from './lib/generator'
import Header from './components/Header'
import EmailInput from './components/EmailInput'
import MaxDotsSelect from './components/MaxDotsSelect'
import GenerateButton from './components/GenerateButton'
import AliasTable from './components/AliasTable'
import ActionBar from './components/ActionBar'
import Toast from './components/Toast'
import Footer from './components/Footer'

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

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      try {
        const localPart = extractLocalPart(email)
        const domain = extractDomain(email)
        const generated = generateVariants(localPart, domain, maxDots, 20)
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
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 lg:px-8" role="main" aria-label="Email alias generator">
        <Header />

        <section className="mt-12 space-y-6" aria-labelledby="generator-heading">
          <h2 id="generator-heading" className="sr-only">Generator Form</h2>
          
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
                <label htmlFor="max-dots-select" className="flex items-center gap-2 text-sm text-text-muted">
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
            <div className="card animate-slide-up space-y-4" role="region" aria-labelledby="results-heading">
              <h2 id="results-heading" className="sr-only">Generated Aliases</h2>
              <ActionBar
                total={aliases.length}
                onCopyAll={handleCopyAll}
                onExport={handleExport}
                onShuffle={handleShuffle}
              />
              <AliasTable aliases={aliases} />
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
