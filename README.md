# Email Alias Generator

Generate unlimited email aliases instantly. Use multiple aliases for any service while receiving all emails in a single inbox.

**Live:** [https://email-alias.mdhn.my.id](https://email-alias.mdhn.my.id)

## Why This Project Exists

**The Real Problem:** You're testing a platform's registration feature. You try it with your email—success. You try again to test the flow a second time, but the system rejects it: "Email already exists." You only have 2 real emails and no more to spare. Meanwhile, you need to receive OTP codes and verification links to actually complete the registration test.

This is the exact frustration that sparked this project. As a developer and DevOps engineer, testing user registration flows requires multiple email addresses. But managing dozens of emails, checking multiple inboxes for OTP codes, and organizing verification links is exhausting and error-prone.

**The Solution:** Generate unlimited unique email aliases from a single real email. Use a different alias for every registration test, but receive all OTP codes and verification emails in your one real inbox.

## What It Solves

- **Test Registration Flows** - Generate multiple unique aliases to test platform signup flows repeatedly without hitting "email already exists" errors
- **Consolidate Verification Emails** - Receive all OTP codes and verification links in a single inbox, not scattered across dozens of email accounts
- **No Email Management Overhead** - Stop juggling multiple email accounts. One real email, unlimited aliases
- **Developer & QA Testing** - Perfect for testing user registration, email verification workflows, and multi-account scenarios
- **Privacy Without Friction** - Bonus: use aliases to identify data leaks. Use different aliases for different services; if you get spam on one alias, you know who leaked your data
- **Works With Any Email Provider** - Not limited to Gmail. Works with any email service that supports email forwarding or dot-notation (Gmail, Yahoo, Proton Mail, custom domains, etc.)

## How It Works

Many email providers have features that make multiple addresses work as one:

**Gmail:** Ignores dots in the local part. `john.doe@gmail.com` and `johndoe@gmail.com` deliver to the same inbox.

**Other Providers:** Forward additional aliases to your primary inbox, or support similar dot-notation variations.

This tool generates all valid combinations of characters/dots for your email address. For example, from `johndoe@gmail.com`:

```
johndoe@gmail.com
john.doe@gmail.com
j.ohndoe@gmail.com
jo.hndoe@gmail.com
john.d.oe@gmail.com
...
```

All aliases deliver to your real inbox—no configuration needed. Use a different one every time you test.

## Features

- **Instant Generation** - Generate up to 20 email aliases in one click
- **Copy to Clipboard** - Copy individual aliases with one click
- **Copy All** - Copy all aliases at once for bulk operations
- **Export** - Download aliases as a `.txt` file for offline reference
- **Shuffle** - Randomize alias order for variety
- **Privacy First** - No data stored, completely client-side. Your email never leaves your device
- **Works Everywhere** - Supports Gmail, Yahoo, Proton Mail, and any email provider with alias/dot-notation support
- **Dark Mode** - Modern, minimalist aesthetic optimized for reduced eye strain
- **SEO Optimized** - Rich metadata, structured data, and Core Web Vitals optimizations for discoverability

## Get Started

### Run Locally

```bash
# Clone and install dependencies
git clone <repository-url>
cd generator-email-alias
pnpm install

# Start development server
pnpm dev
# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Build optimized bundle
pnpm build

# Preview production build locally
pnpm preview
```

## Deployment

This application is deployed on **Cloudflare Pages** for fast, global access with zero backend costs.

**Live URL:** [https://email-alias.mdhn.my.id](https://email-alias.mdhn.my.id)

### Deploy Your Own

```bash
# Deploy to Cloudflare Pages (requires wrangler setup)
pnpm run deploy
```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments on every push.

## Tech Stack

- **Framework** - React 18 + Vite for fast development and production builds
- **Language** - TypeScript with strict mode for type safety
- **Styling** - Tailwind CSS for utility-first design
- **UI Components** - Lucide React for consistent icons
- **Tables** - TanStack Table for structured data display
- **Package Manager** - pnpm for fast, deterministic installs
- **Hosting** - Cloudflare Pages with automatic SPA routing

## Key Architecture

- **Client-Side Only** - No backend server. All generation happens in your browser
- **Algorithm** - Bit-manipulation strategy to generate valid combinations up to a configurable max (default: 2 dots per alias)
- **Performance** - Generates 20 aliases in milliseconds. No Web Workers needed for current scope
- **State Management** - Simple React hooks. No Redux or complex state libraries
- **Universal Support** - Works with any email provider that supports email aliases or dot-notation

## Development Commands

```bash
pnpm dev       # Start dev server with hot reload
pnpm build     # TypeScript check + minified bundle
pnpm preview   # Test production build locally
pnpm deploy    # Deploy to Cloudflare Pages
```

## License

MIT

---

**Testing registration flows?** This tool is for you. **Questions or issues?** Open an issue on GitHub or check the documentation.
