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

- `main` — production. Deploys to the live site (Vercel, production
  branch = `main`).
- `dev` — staging/testing. Gets preview deployments only, never the
  production domain.
- Feature branches branch off `dev`; merge/pull requests go back into
  `dev`. `dev` merges into `main` for releases.
- Branch protection is enabled on `main` (PR required, no direct pushes,
  including for repo admins — no bypass).
- **Merge policy**: for PRs into `dev`, Claude may merge directly once CI is
  green. For PRs into `main`, Claude opens the PR but never merges it —
  the user reviews and clicks merge themselves.

## Deployment

Static site — deploys to Vercel with zero config (no build command, output
directory is the repo root). No custom domain yet; using Vercel's default
subdomain until one is bought.

Cloudflare Pages was dropped (2026-09-26) — Vercel is the sole host now.
Don't reintroduce it or its config without being asked.

Vercel only handles *deployment* (auto-build/publish on push to `main`) —
it doesn't run lint or tests as a gate. That's what the GitHub Actions
workflow below is for.

## Changelog policy

**Every production deployment (every merge to `main`) must get an entry in
[CHANGELOG.md](../CHANGELOG.md).** Add it as part of the PR that merges into
`main`, not as an afterthought — date-headed, newest on top, following the
existing format. This is how design/content iterations get tracked over
time, so don't skip it even for small changes.

## Testing & CI

- `npm run lint` — HTML validation (`html-validate`, config in
  `.htmlvalidate.json`).
- `npm test` — Playwright smoke tests (`tests/site.spec.js`): page loads
  with no console errors, expected content/title present, and the
  scroll-reveal behavior actually fires. Config in `playwright.config.js`
  spins up a plain `python3 -m http.server` to serve the static files —
  don't swap this for a bundler-based dev server.
- `.github/workflows/ci.yml` runs both on every push/PR to `main`/`dev`.
- `package.json` exists **only** for this dev/CI tooling (Playwright,
  html-validate). It must never grow a build step for the site itself —
  the deployed site stays plain static files with zero build command on
  Vercel.
- When adding new sections/markup, extend `tests/site.spec.js` with
  assertions for the new content rather than leaving it uncovered.
