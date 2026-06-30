# Email Alias Generator

Generate Gmail dot-variation aliases instantly. Protect your inbox with unique aliases for every signup.

## Features

- **Instant Generation** - Generate up to 20 Gmail dot variants in one click
- **Copy to Clipboard** - Copy individual aliases with one click
- **Copy All** - Copy all aliases at once
- **Export** - Download aliases as `.txt` file
- **Shuffle** - Randomize alias order
- **Privacy First** - No data stored, completely client-side
- **Dark Mode** - Modern, minimalist aesthetic

## How It Works

Gmail ignores dots in email addresses. `john.doe@gmail.com` and `johndoe@gmail.com` deliver to the same inbox. This tool generates valid dot variations:

```
johndoe@gmail.com
john.doe@gmail.com
j.ohndoe@gmail.com
jo.hndoe@gmail.com
...
```

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:5173)
pnpm dev

# Build for production
pnpm build
```

## Deploy to Cloudflare Pages

```bash
# Deploy to Cloudflare
pnpm wrangler pages deploy dist --project-name=email-alias-generator
```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

## License

MIT
