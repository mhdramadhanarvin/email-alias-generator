export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8 mt-auto" role="contentinfo">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-text-muted">
            Built by{" "}
            <a
              href="https://github.com/mhdramadhanarvin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded px-1"
              aria-label="Visit author's GitHub profile (opens in new window)"
            >
              Mhd Ramadhan Arvin
            </a>
          </p>
          <p className="text-xs text-text-muted/70">
            Generate email dot-variation aliases instantly
          </p>
          <p className="text-xs text-text-muted/50">
            © {currentYear} Email Alias Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
