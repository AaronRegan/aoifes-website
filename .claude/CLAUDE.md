# Aoife's Website

Single-page, scroll-driven profile site for Aoife: who she is, the services
she offers, and how to contact her. Currently placeholder content — real
copy and visual design come later once Aoife shares example sites she likes.

## Stack

Plain HTML/CSS/JS. No build step, no framework, no backend, no package.json.
Keep it that way unless there's a concrete reason to add tooling (e.g. the
page genuinely outgrows a single CSS/JS file). Don't introduce a framework,
bundler, or dependency to solve a problem that doesn't exist yet.

- `index.html` — all page sections in one file.
- `css/styles.css` — all styles.
- `js/main.js` — scroll-reveal (`IntersectionObserver`) + small utilities.
- `assets/` — images, etc.

## Scroll animations

"Things move into place as you scroll" is implemented via `[data-reveal]`
elements: CSS starts them faded/translated, and `main.js` toggles
`.is-visible` on them via `IntersectionObserver` as they enter the
viewport. The `no-js` class on `<html>` is a progressive-enhancement
fallback (content stays visible if JS fails) — removed by `main.js` on
load. Extend this pattern rather than introducing an animation library
unless a design genuinely needs more than CSS transitions can do.

## Design direction

Don't invent visual style unprompted — Aoife will share example sites/
references to work from. Ask before making significant layout or visual
decisions that aren't grounded in something she's provided.

## Branch strategy

- `main` — production. Deploys to the live site (Vercel + Cloudflare
  Pages, production branch = `main`).
- `dev` — staging/testing. Gets preview deployments only, never the
  production domain.
- Feature branches branch off `dev`; merge/pull requests go back into
  `dev`. `dev` merges into `main` for releases.
- Branch protection is enabled on `main` (PR required, no direct pushes).

## Deployment

Static site — deploys identically to Vercel and Cloudflare Pages with zero
config (no build command, output directory is the repo root). No custom
domain yet; using each host's default subdomain until one is bought.
