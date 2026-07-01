# PROJECT KNOWLEDGE BASE

**Generated:** 2026-07-01  
**Commit:** ed7b1b9 (feat: setup wrangler)  
**Branch:** main

## OVERVIEW

Email Alias Generator — a sleek, client-side React SPA for generating unlimited Gmail dot-variation aliases. No backend, pure frontend generation with TanStack Table, Tailwind CSS, and Cloudflare Pages deployment.

**Stack:** React 18 + Vite + TypeScript + Tailwind + TanStack Table + Lucide React

---

## STRUCTURE

```
src/
├── components/          # 9 UI components (input, buttons, table, toast, etc)
├── lib/
│   └── generator.ts     # Core alias generation algorithm (bit manipulation)
├── hooks/
│   └── useClipboard.ts  # Clipboard API wrapper
├── App.tsx              # Root component (state management)
└── index.css            # Tailwind + custom animations

public/
├── favicon.svg

Config:
├── vite.config.ts       # React + Cloudflare plugin
├── tailwind.config.js   # Custom colors (dark theme), animations
├── tsconfig.json        # Strict mode, ES2020 target
├── wrangler.jsonc       # Cloudflare Pages config (SPA routing)
```

---

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| **Email validation logic** | `src/lib/generator.ts` | `isValidGmail()`, `extractLocalPart()` |
| **Alias generation algorithm** | `src/lib/generator.ts` | Bit-manipulation 2^(n-1) combos, max dots limit |
| **UI component list** | `src/components/` | Each handles single concern (input, button, table, etc) |
| **App state management** | `src/App.tsx` | useState for email, maxDots, aliases, loading, error, toast |
| **Copy-to-clipboard logic** | `src/components/CopyButton.tsx` + `src/hooks/useClipboard.ts` | navigator.clipboard API |
| **Export to .txt** | `src/App.tsx` (handleExport) | Blob → URL → download trigger |
| **Tailwind config** | `tailwind.config.js` | Custom dark palette, border-radius, animations |
| **Deployment config** | `wrangler.jsonc` | SPA routing, assets handling, observability enabled |

---

## CODE MAP

| Symbol | Type | File | Role |
|--------|------|------|------|
| `generateVariants()` | Function | lib/generator.ts | Core: generates all valid dot combos up to maxDots, limits to maxVariants |
| `extractLocalPart()` | Function | lib/generator.ts | Strips domain, removes dots from local part |
| `isValidGmail()` | Function | lib/generator.ts | Regex validation for @gmail.com |
| `shuffle()` | Function | lib/generator.ts | Fisher-Yates shuffle for alias reordering |
| `App` | Component | App.tsx | Root: state mgmt, callbacks (generate, shuffle, copy, export) |
| `AliasTable` | Component | components/AliasTable.tsx | Renders list of aliases with per-row copy buttons |
| `EmailInput` | Component | components/EmailInput.tsx | Controlled input with validation error display, clear button |
| `CopyButton` | Component | components/CopyButton.tsx | Icon toggle (Copy → Check on click), auto-revert 1.5s |
| `ActionBar` | Component | components/ActionBar.tsx | Buttons: Copy All, Export, Shuffle |
| `Toast` | Component | components/Toast.tsx | Notification: success (green) / error (red), 3s auto-dismiss |

---

## CONVENTIONS

**Component Structure:**
- One component per file, named after feature (EmailInput, CopyButton)
- Props interfaces defined at top, `interface ComponentProps { ... }`
- Exported as `export default` or `export function`
- memo() for list items and frequently re-rendering components

**State Management:**
- useState for local UI state (input, loading, toast)
- useCallback for event handlers (memoize across renders)
- No redux/zustand — simple enough for single component tree

**Styling:**
- Tailwind classes exclusively, no CSS files except index.css
- Custom Tailwind config for colors (dark theme), animations, spacing
- No inline styles (use Tailwind utilities)
- Consistent spacing: gap-2, gap-4, p-6 for cards

**Naming:**
- PascalCase for components, camelCase for functions/variables
- Descriptive: `handleGenerate`, `onCopyAll`, not `go()` or `do()`
- Files match exported default (Header.tsx exports Header component)

**TypeScript:**
- Strict mode enabled (tsconfig.json)
- Props typed with interfaces (not type aliases)
- No `any` types, use generics for reusable components
- Return types omitted where obvious (React components)

---

## ANTI-PATTERNS (THIS PROJECT)

1. **Do NOT use localStorage.** — No persistence in MVP. Refresh loses state intentionally.
2. **Do NOT add light mode.** — Dark-only aesthetic (PLAN.md excludes light mode from MVP).
3. **Do NOT build custom table component.** — TanStack Table available but not used (overkill for simple list). Keep current row-based rendering.
4. **Do NOT add user accounts / backends.** — Client-side only (stated in PLAN.md).
5. **Do NOT suppress TypeScript errors with `as any`.** — Strict mode is intentional.
6. **Do NOT duplicate alias generation logic.** — All logic in `src/lib/generator.ts`; tests and UI both call same function.

---

## UNIQUE STYLES

**Animation delays (stagger effect):**
- Defined in tailwind.config.js: `.stagger-1` through `.stagger-5` (50ms increments)
- Not currently used in components, but available for future staggered list reveal

**Custom Tailwind colors (dark theme):**
- Background: `#0a0a0a` (near-black, not pure black for OLED savings)
- Surface: `#141414` (card bg)
- Accent: `#10b981` (emerald green, represents "copy/success")
- Border: `#262626` (subtle, readable on dark)
- Text muted: `#737373` (60% brightness)

**Button variants:**
- `.btn` — primary action (emerald, white text)
- `.btn-secondary` — secondary action (transparent + border, lighter on hover)
- `.btn-icon` — icon-only buttons (CopyButton, close/clear buttons)

**Animations:**
- `fadeIn` (300ms) — Header entrance, error messages
- `slideUp` (400ms) — Results card entrance
- Both use `ease-out` curve for natural feel

---

## DEVELOPMENT COMMANDS

```bash
# Dev server (Vite HMR at http://localhost:5173)
pnpm dev

# Build for production (dist/ output)
pnpm build

# Preview production build locally
pnpm preview

# Deploy to Cloudflare Pages
pnpm deploy
```

**Build pipeline:** `pnpm build` → `tsc` (type check) → `vite build` (bundle & minify)

---

## PERFORMANCE NOTES

**Alias generation limits:**
- maxVariants capped at 20 per generation call (App.tsx line 43)
- For base name >11 chars: 2^10+ = 1000+ combos possible, capped to 20 for UX
- No Web Worker (unnecessary for current scope)

**List rendering:**
- AliasTable maps over aliases array directly (not virtualized)
- 20 items renders fast; if future versions exceed 100, add virtualization

**Memoization:**
- CopyButton memoized (frequently re-renders in list)
- AliasTable memoized (prevents re-render on parent state changes)
- App component not memoized (root, should re-render)

---

## GOTCHAS

1. **Email input strips dots automatically.** — `extractLocalPart()` removes all dots. User can paste `john.doe@gmail.com`; we extract `johndoe`, generate from that.
2. **Shuffle only reorders, doesn't regenerate.** — Same aliases, different order. No new combos created.
3. **Bit manipulation in generator.ts.** — Treat (i >> j) & 1 logic as read-only; it's correct and matches Python reference.
4. **Toast auto-dismisses after 3s.** — User can't dismiss manually; another toast will replace it (only one visible at a time).
5. **Max dots default is 2.** — Hardcoded in PLAN.md, reflected in App.tsx line 14. If changing, update both.

---

*Generated by /init-deep. Verify and refine as project evolves.*
