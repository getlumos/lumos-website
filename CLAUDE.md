# CLAUDE.md - LUMOS Website

> **Ecosystem Context:** See [getlumos/lumos/CLAUDE.md](https://github.com/getlumos/lumos/blob/main/CLAUDE.md) for LUMOS ecosystem overview, cross-repo standards, and shared guidelines.

**Repository**: https://github.com/getlumos/lumos-website
**Purpose**: Official marketing website for LUMOS

---

## What is lumos-website?

Marketing and landing page website for LUMOS - the type-safe schema language for Solana development.

**Status**: v1.0.0 development
**Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
**Deployment**: Vercel — `lumos-lang.org` (apex) + `www.lumos-lang.org` (308 → apex)

---

## Key Files

| Path | Purpose |
|------|---------|
| `src/` | React components and pages |
| `public/` | Static assets (including `wasm/` for the Playground) |
| `index.html` | Entry point |
| `vite.config.ts` | Build configuration |
| `vercel.json` | Vercel framework + SPA rewrite + www→apex redirect |

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

**Platform**: Vercel
**Project**: `rectors-projects/lumos-website`
**Primary domain**: `lumos-lang.org` (apex, canonical)
**Redirect**: `www.lumos-lang.org` → 308 → `lumos-lang.org` (handled by `vercel.json`)
**SSL**: Let's Encrypt R13 for both apex and www, auto-renewed by Vercel
**Auto-deploy**: push to `main` → Vercel builds and promotes to production
**Config**: `vercel.json` (framework=vite, SPA fallback rewrite, host-matched www→apex redirect)

DNS lives on Cloudflare (zone `lumos-lang.org`):
- apex `A 76.76.21.21` (DNS-only, grey cloud)
- www `CNAME cname.vercel-dns.com` (DNS-only, grey cloud)

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
- Documentation: https://docs.lumos-lang.org
- GitHub: https://github.com/getlumos
- CLI: `cargo install lumos-cli`
- Examples: https://github.com/getlumos/awesome-lumos

---

**Last Updated**: 2026-05-26
**Version**: 1.0.0
**Status**: Live at https://lumos-lang.org (Vercel)
