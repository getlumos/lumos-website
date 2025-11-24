# LUMOS Website

Official marketing website for LUMOS - Type-safe schemas for Solana development.

## Project Info

- **Repository**: https://github.com/getlumos/lumos-website
- **Live Site**: https://lumos-lang.org (coming soon)
- **Stack**: Vite + React + TypeScript + Shadcn/ui + Tailwind CSS

## Development

```sh
# Clone the repository
git clone https://github.com/getlumos/lumos-website.git

# Navigate to the project directory
cd lumos-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Shadcn/ui** - Accessible component library
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **React Router DOM** - Navigation

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Features.tsx  # Features section
│   │   └── ...
│   ├── pages/            # Page components
│   │   └── Index.tsx     # Home page
│   ├── App.tsx           # Root component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
└── package.json          # Dependencies
```

## Deployment

The site can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Cloudflare Pages**
- Any static hosting provider

## Contributing

See the main [LUMOS repository](https://github.com/getlumos/lumos) for contribution guidelines.

## License

Dual-licensed under MIT and Apache 2.0 - see the main repository.
