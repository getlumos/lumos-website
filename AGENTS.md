<!-- Satellite context file — extends the global hub (~/.claude/CLAUDE.md | ~/.pi/agent/AGENTS.md). Host-neutral; project-specific only. Do not duplicate hub standards here. -->

# LUMOS Website

> Official marketing website for LUMOS — the type-safe schema language for Solana development.

**Ecosystem context:** See [getlumos/lumos/AGENTS.md](https://github.com/getlumos/lumos/blob/main/AGENTS.md) for the LUMOS ecosystem overview, cross-repo standards, and shared guidelines.

**Status:** v1.0.0 development
**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
**Deployment:** Vercel — `lumos-lang.org` (apex) + `www.lumos-lang.org` (308 → apex)

## Key Files

| Path | Purpose |
|------|---------|
| `src/` | React components and pages |
| `public/` | Static assets (including `wasm/` for the Playground) |
| `index.html` | Entry point |
| `vite.config.ts` | Build configuration |
| `vercel.json` | Vercel framework + SPA rewrite + www→apex redirect |

## Common Commands

```bash
npm install
npm run dev       # Dev server (localhost:5173)
npm run build      # Build for production
npm run preview   # Preview build
npm run lint      # ESLint
```

## Deployment

**Platform:** Vercel — project `rectors-projects/lumos-website`
**Primary domain:** `lumos-lang.org` (apex, canonical)
**Redirect:** `www.lumos-lang.org` → 308 → `lumos-lang.org` (handled by `vercel.json`)
**SSL:** Let's Encrypt R13 for both apex and www, auto-renewed by Vercel
**Auto-deploy:** push to `main` → Vercel builds and promotes to production
**Config:** `vercel.json` (framework=vite, SPA fallback rewrite, host-matched www→apex redirect)

DNS lives on Cloudflare (zone `lumos-lang.org`):
- apex `A 76.76.21.21` (DNS-only, grey cloud)
- www `CNAME cname.vercel-dns.com` (DNS-only, grey cloud)

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Forms:** React Hook Form + Zod

## Related Pages

The website links to:
- Documentation: https://docs.lumos-lang.org
- GitHub: https://github.com/getlumos
- CLI: `cargo install lumos-cli`
- Examples: https://github.com/getlumos/awesome-lumos