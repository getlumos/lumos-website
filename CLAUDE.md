# CLAUDE.md - LUMOS Website

**Repository**: https://github.com/getlumos/lumos-website
**Purpose**: Official marketing website for LUMOS

---

## Quick Reference

For complete ecosystem context, see: **[lumos/CLAUDE.md](https://github.com/getlumos/lumos/blob/main/CLAUDE.md)**

---

## What is lumos-website?

Marketing and landing page website for LUMOS - the type-safe schema language for Solana development.

**Status**: v1.0.0 development
**Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
**Deployment**: Docker (Cloudflare Pages planned)

---

## Key Files

| Path | Purpose |
|------|---------|
| `src/` | React components and pages |
| `public/` | Static assets |
| `index.html` | Entry point |
| `vite.config.ts` | Build configuration |
| `docker-compose.yml` | Container deployment |
| `Dockerfile` | Docker image build |

---

## Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## Deployment

### Docker

```bash
# Build and run
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### Cloudflare Pages (Planned)

**Domain**: lumos-lang.org (or subdomain)
**Build command**: `npm run build`
**Output directory**: `dist/`

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod

---

## AI Assistant Guidelines

### DO

- Keep branding consistent with LUMOS ecosystem
- Use shadcn/ui components for UI consistency
- Test on multiple screen sizes (responsive)
- Optimize images for web performance

### DON'T

- Add features without testing locally
- Change brand colors without approval
- Include AI attribution in commits or code
- Skip lint checks before committing

---

## Related Pages

The website should link to:
- Documentation: https://lumos-lang.org
- GitHub: https://github.com/getlumos
- CLI: `cargo install lumos-cli`
- Examples: https://github.com/getlumos/awesome-lumos

---

**Last Updated**: 2025-12-07
**Version**: 1.0.0
**Status**: Development
