# Aoife's Website

Single-page, scroll-driven profile site for Aoife: who she is, the services
she offers, and how to contact her. The design system is set (below); all
copy is still placeholder.

## Stack

Plain HTML/CSS/JS. No build step, no framework, no backend, no package.json.
Keep it that way unless there's a concrete reason to add tooling (e.g. the
page genuinely outgrows a single CSS/JS file). Don't introduce a framework,
bundler, or dependency to solve a problem that doesn't exist yet.

- `index.html` — all page sections in one file.
- `css/styles.css` — all styles.
- `js/main.js` — scroll-reveal (`IntersectionObserver`) + small utilities.
- `assets/` — images, etc. `assets/fonts/` holds the self-hosted woff2 fonts
  and their OFL licenses.

## Scroll animations

"Things move into place as you scroll" is implemented via `[data-reveal]`
elements: CSS starts them faded/translated, and `main.js` toggles
`.is-visible` on them via `IntersectionObserver` as they enter the
viewport. The `no-js` class on `<html>` is a progressive-enhancement
fallback (content stays visible if JS fails) — removed by `main.js` on
load. Extend this pattern rather than introducing an animation library
unless a design genuinely needs more than CSS transitions can do.

Stagger with `data-reveal-delay="<ms>"` (main.js turns it into a
`--reveal-delay` custom property — html-validate forbids inline `style`).
Under `prefers-reduced-motion` everything is shown immediately.

## Content policy

Aoife is a paediatric dietitian, but **nothing real about her goes on the
public site yet** — no specialism, credentials, real contact details,
photos, or copy that hints at them. Keep all text as obvious placeholders
until the user supplies real content. Placeholder contact uses
`hello@example.com` (reserved domain) and a dummy phone number.

## Design system

Chosen with the user on 2026-09-26 from two references (nourishmentninja.co.uk,
akindietitian.com). Tokens live in `:root` in `css/styles.css` — use them,
don't add raw hex values.

- **Palette** (sage with burnt-orange accent): `--cream` page bg,
  `--cream-deep`/`--paper` cards, `--sage-light` bands and blobs, `--sage`
  image placeholders, `--green-deep` headings, `--text-body` body text,
  `--orange` decoration, `--orange-deep` buttons/links.
- **Contrast rules** (WCAG AA — checked, don't regress):
  - Filled buttons: cream on `--orange-deep`. Cream on `--orange` fails.
  - Text on sage bands: `--green-deep`. `--text-body` on sage fails.
  - `--orange` text only at ≥24px and only on cream. On sage, use
    `--orange-deep`.
- **Type**: Fraunces (headings), DM Sans (body), Caveat (handwritten
  accent — max one or two uses on the whole page; currently hero + contact).
- **Fonts are self-hosted** from `assets/fonts/` — never link Google Fonts.
  Their CDN sends visitor IPs to Google, which EU courts ruled a GDPR issue;
  a test enforces this.
- **Decoration**: soft organic blobs (SVG behind image slots, or
  `--radius-blob` shapes), curved wave dividers into/out of sage bands
  (`.wave` / `.wave--flip`), simple line illustrations (inline SVG,
  `.illo`, orange `.illo-accent` stroke). Keep it restrained.
- **Images**: `.img-slot` placeholder blocks until real photos exist.
- **Grids**: 3- and 4-item grids use explicit breakpoints (not `auto-fit`)
  so a card is never orphaned on its own row.
- For new visual directions beyond this system, ask first.

## Branch strategy and release cycle

- `main` — production. Deploys to the live site (Vercel, production
  branch = `main`). Every merge to `main` is a release.
- `dev` — QA. Features accumulate here and are reviewed on the stable
  preview URL `aoifes-website-git-dev-aaronregan.vercel.app` (behind
  Vercel login). Never the production domain.
- Branch protection is enabled on `main` (PR required, no direct pushes,
  including for repo admins — no bypass).

**Feature flow**: branch off `dev` (`feature/*`, `chore/*`) → PR into `dev`
→ Claude merges once CI is green. Each feature adds a line under
`## [Unreleased]` in CHANGELOG.md. **Don't open a `dev` → `main` PR after
each feature** — features batch up on `dev` until the user asks for a
release.

**Release flow** (only when the user asks to cut/ship a release):
1. On a `release/vX.Y.Z` branch off `dev`, turn `## [Unreleased]` into
   `## [X.Y.Z] — YYYY-MM-DD` (leave a fresh empty `## [Unreleased]` above
   it) → PR into `dev` → merge.
2. Open a PR `dev` → `main` titled `Release vX.Y.Z`, with the changelog
   section as the body.
3. The user reviews and merges it. **Claude never merges into `main`.**
4. `.github/workflows/release.yml` runs on the push to `main`: it reads the
   newest `## [X.Y.Z]` heading, creates tag `vX.Y.Z` and a GitHub Release
   with that section as notes. It skips (with a warning) if that version
   is already released — so a merge to `main` without a version bump is a
   mistake.

**Versioning** (SemVer, `0.x` until real launch): minor = new sections or
features, patch = fixes and copy tweaks. `v1.0.0` = public launch with real
content and a custom domain.

**Hotfix**: `hotfix/*` off `main` → bump the patch version in CHANGELOG.md
in the same branch → PR into `main` (user merges; tagged automatically) →
then merge `main` back into `dev` so they don't drift.

**Rollback**: Vercel's instant rollback to the previous production
deployment; tags identify which commit each release was.

## Deployment

Static site — deploys to Vercel with zero config (no build command, output
directory is the repo root). No custom domain yet; using Vercel's default
subdomain until one is bought.

Cloudflare Pages was dropped (2026-09-26) — Vercel is the sole host now.
Don't reintroduce it or its config without being asked.

Vercel only handles *deployment* (auto-build/publish on push to `main`) —
it doesn't run lint or tests as a gate. That's what the GitHub Actions
workflow below is for.

## Analytics & performance monitoring

`index.html` has inline snippets for Vercel Web Analytics
(`/_vercel/insights/script.js`) and Vercel Speed Insights
(`/_vercel/speed-insights/script.js`). No npm packages — these are the
plain-HTML/no-framework integration (a fixed same-origin route Vercel
serves once the feature is enabled in the project dashboard), keeping the
zero-build-step setup intact. Both routes only resolve on Vercel's own
infra, so `tests/site.spec.js` stubs them to avoid 404 noise elsewhere.

## Languages (French planned)

A French version is planned alongside English. **Don't build it yet** — it
gets built once the English copy is close to final, and both languages go
live together at the `v1.0.0` launch. Building it earlier means every
design/content change is made twice.

**Decided approach** (agreed 2026-09-27):
- A separate static page, `fr/index.html`, sharing `css/`, `js/`, and
  `assets/` with the English `index.html` at `/`. `lang="fr"` on its
  `<html>`.
- A plain-link "EN / FR" switcher in the header (no JS).
- `hreflang` alternate links on both pages (`en`, `fr`, `x-default` → `/`).
- No automatic redirect by browser language.
- Rejected: a JS translation toggle (the French text wouldn't be in the HTML,
  and most crawlers — nearly all AI crawlers — don't run JS); a static site
  generator (breaks the no-build-step setup; revisit only if the site grows
  to several pages); auto-translate widgets (quality risk for health
  content, and they send visitor data to third parties).

**Until then, keep the English page French-ready:**
- All user-facing text lives in the HTML — never inside images, SVGs, or
  JS strings.
- Leave room in the header for the switcher.
- No fixed-width buttons or tight text containers — French typically runs
  15–20% longer.

**When it's built:** a parity test so both pages keep the same section IDs,
links, and structure; run the 375px overflow test on both pages; the
`pre-launch:` noindex applies to `/fr/` too until launch; real French copy
translated or reviewed by a fluent speaker (health content for parents —
no raw machine translation). Still to decide with the user: which French
audience (France vs French-speaking families elsewhere), which sets the
`hreflang` code and some word choices.

## Search and AI discoverability

**Current state: pre-launch block.** While content is placeholder, the site
is kept out of search engines and AI models on purpose, so the first thing
they learn about "Aoife" isn't a Coming Soon page:
- `<meta name="robots" content="noindex, nofollow">` in `index.html` —
  Google/Bing (and the AI search products that use their indexes) won't
  list the page.
- `robots.txt` blocks AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, etc.), which don't reliably honour `noindex`.
  `User-agent: *` stays allowed — search engines must be able to fetch the
  page to see the `noindex`. Never `Disallow: /` for everyone.
- A `pre-launch:` test enforces both. Lift the block only as part of the
  `v1.0.0` launch, never earlier.

**Launch checklist** (do together with real content, the French page, and
the custom domain):
1. Remove the `noindex` meta (both languages); in `robots.txt` remove the AI block and add a
   `Sitemap:` line; delete or invert the `pre-launch:` test.
2. Add `sitemap.xml`, a canonical URL, a real meta description, and Open
   Graph tags for link previews.
3. JSON-LD structured data: a `Person` plus a professional service (job
   title, specialism, service area, credentials/registration, `sameAs`
   links to her profiles).
4. Copy that states plainly who she is, what she does, where (in person /
   online), and her qualifications and registration. Add a plain-language
   FAQ section with real parent questions — LLMs pick up Q&A well.
5. Optional `llms.txt` (short Markdown summary). Little evidence the major
   models use it yet, but it's cheap.
6. Submit to Google Search Console and Bing Webmaster Tools (Bing feeds
   ChatGPT search and Copilot).
7. If DNS goes through Cloudflare, check its "block AI bots" setting is off.
8. Off-site (user's job, but remind them): Google Business Profile,
   professional register/"find a dietitian" directory, LinkedIn — with the
   same name and contact details everywhere. LLMs lean heavily on these
   when recommending professionals.

Longer term: a single page is one entry point. Separate pages or short
articles on specific topics would help her appear for topic questions,
not just searches for her name — a change to the one-page design, so ask
first.

## Changelog policy

**Every change merged into `dev` gets a line under `## [Unreleased]` in
[CHANGELOG.md](../CHANGELOG.md)**, in the same PR — even small ones. This
is how design/content iterations get tracked. A release converts
`[Unreleased]` into a version heading (see release flow above); the
release workflow depends on that heading to tag the release, so every
merge to `main` must ship a new version.

## Testing & CI

- `npm run lint` — HTML validation (`html-validate`, config in
  `.htmlvalidate.json`).
- `npm test` — Playwright smoke tests (`tests/site.spec.js`): no console
  errors, every section present, in-page links resolve, scroll-reveal
  fires, reduced motion shows content, no horizontal overflow at 375px,
  fonts self-hosted. Config in `playwright.config.js`
  spins up a plain `python3 -m http.server` to serve the static files —
  don't swap this for a bundler-based dev server.
- `.github/workflows/ci.yml` runs both on every push/PR to `main`/`dev`.
- `package.json` exists **only** for this dev/CI tooling (Playwright,
  html-validate). It must never grow a build step for the site itself —
  the deployed site stays plain static files with zero build command on
  Vercel.
- When adding new sections/markup, extend `tests/site.spec.js` with
  assertions for the new content rather than leaving it uncovered.
