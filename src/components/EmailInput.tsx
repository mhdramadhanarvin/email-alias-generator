import { X } from "lucide-react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string;
  onClear: () => void;
}

export default function EmailInput({
  value,
  onChange,
  error,
  onClear,
}: EmailInputProps) {
  return (
    <div>
      <div className="relative">
        <input
          type="email"
          placeholder="you@gmail.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input ${error ? "input-error" : ""}`}
          autoFocus
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
            aria-label="Clear email"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-error animate-fade-in">{error}</p>
      )}
    </div>
  );
}
