# COMPONENT LAYER

**Purpose:** UI components for email alias generator SPA.

---

## INVENTORY

| Component | Lines | Role | State |
|-----------|-------|------|-------|
| **Header.tsx** | 16 | Branding + tagline with Mail icon | None (pure display) |
| **EmailInput.tsx** | 39 | Controlled email input + error display + clear button | Controlled (value, error from parent) |
| **MaxDotsSelect.tsx** | 24 | Dropdown select (1-4 dots) with ChevronDown icon | Controlled select |
| **GenerateButton.tsx** | 22 | Action button with loading state + spinner | Button: loading, disabled props |
| **AliasTable.tsx** | 26 | Maps aliases array, renders per-row with CopyButton | Memoized, receives aliases array |
| **CopyButton.tsx** | 35 | Toggle icon (Copy → Check), auto-revert 1.5s | useState: copied flag |
| **ActionBar.tsx** | 39 | Three secondary buttons: Copy All, Export, Shuffle | Receives callbacks (onCopyAll, onExport, onShuffle) |
| **Toast.tsx** | 20 | Success/error notification, 3s auto-dismiss | Fixed position, bottom-center |
| **Footer.tsx** | 24 | Attribution link + tagline | None (pure display) |

---

## PATTERNS

**Controlled Components:**
- EmailInput, MaxDotsSelect: receive `value` + `onChange` from App
- No internal state except CopyButton (temporary "copied" flag)

**Callback Props:**
- GenerateButton: `onClick` callback
- ActionBar: `onCopyAll`, `onExport`, `onShuffle` callbacks
- All callbacks defined in App.tsx, passed down

**Icon Library:**
- Lucide React only (Mail, Copy, Check, Download, Shuffle, Loader2, ChevronDown, X)
- No custom SVG icons

**Styling:**
- All Tailwind classes, no scoped CSS
- Custom button variants: `.btn`, `.btn-secondary`, `.btn-icon`
- Responsive: hidden text on mobile (`hidden sm:inline`), full buttons on tablet+

---

## KEY BEHAVIORS

**EmailInput:**
- Validates on App level (error passed as prop), displays red border if error set
- Clear button (X) visible when value non-empty
- Auto-focus on page load (autoFocus attribute)

**CopyButton:**
- Copies text to clipboard via navigator.clipboard.writeText()
- Icon changes Copy → Check, reverts after 1.5s
- Optional `onCopy` callback (unused in current code, available for tracking)

**Toast:**
- Only one toast visible at a time (controlled by App state)
- Fixed positioning, bottom-center, auto-dismisses after 3s in App
- Two variants: `success` (green CheckCircle) / `error` (red XCircle)

**ActionBar:**
- Shows total count in left section, three buttons in right
- Responsive: button text hidden on mobile (`hidden sm:inline`), icons visible
- No internal state; all callbacks handled by App

---

## MEMOIZATION

- **AliasTable:** memoized (list component, prevents re-render on parent state changes)
- **CopyButton:** memoized (frequently re-renders per alias, expensive)
- Others: not memoized (lightweight, re-render acceptable)

---

## PROPS INTERFACES

All components typed strictly. No optional props unless noted.

```typescript
// EmailInput
interface EmailInputProps {
  value: string;                    // Controlled input value
  onChange: (value: string) => void; // Update parent state
  error: string;                    // Error message (empty = no error)
  onClear: () => void;              // Clear button handler
}

// CopyButton
interface CopyButtonProps {
  text: string;                     // Text to copy
  onCopy?: () => void;              // Optional callback after copy
}

// All others follow similar patterns (value + onChange, or single callback)
```

---

## ANTI-PATTERNS

1. **Do NOT add sorting/filtering to AliasTable.** — Simple list only. If needed, use TanStack Table later.
2. **Do NOT add keyboard shortcuts** (e.g., Cmd+C auto-copy). — Stick to click-based interaction.
3. **Do NOT add tooltip Popovers.** — Keep UI minimal; Lucide icons are self-explanatory.
4. **Do NOT store component state in localStorage.** — No persistence (PLAN.md MVP scope).

---

## GOTCHAS

1. **CopyButton stopPropagation().** — Prevents accidental row selection if list is ever clickable.
2. **AliasTable key prop uses template.** — `key={`${email}-${index}`}` handles potential email duplicates.
3. **MaxDotsSelect option styling.** — `className="bg-surface"` for dark dropdown background (browser default is light).
4. **Toast position fixed.** — Uses `z-50` to appear above all content.

---

*Parent component (App.tsx) orchestrates state and callbacks. Components are stateless presenters.*
