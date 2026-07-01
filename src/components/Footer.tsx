export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 mt-auto">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-text-muted">
            Built by{' '}
            <a
              href="https://github.com/mhdramadhanarvin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors duration-200"
            >
              Mhd Ramadhan Arvin
            </a>
          </p>
          <p className="text-xs text-text-muted/70">
            Generate Gmail dot-variation aliases instantly
          </p>
        </div>
      </div>
    </footer>
  )
}
