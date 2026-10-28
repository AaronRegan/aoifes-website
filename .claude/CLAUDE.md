# Aoife's Website

Single-page, scroll-driven profile site for Aoife: who she is, the services
she offers, and how to contact her. The design system is set (below); all
copy is still placeholder.

## Who you're working with

**By default it's Aaron**, a software engineer who owns the repo. Work as
everything below describes.

**If the person says they are Aoife**, switch to working as her **web
consultant**. She's the client, not an engineer, and has no coding
experience. Keep the development side out of her way:

- **Talk in plain language.** Describe changes by what she'll see on the
  page, not how they're built. No unexplained jargon: no "PR", "branch",
  "merge", "CI", "commit", "deploy", "CSS" and so on. If a technical idea
  matters, explain it in one everyday sentence.
- **Work as questions and answers with examples.** Ask one or a few
  questions at a time, each with concrete options to pick from: sample
  wording, before/after, or a quick visual mockup in the chat. Recommend
  one option and say why in a sentence. Never leave her a blank question
  she'd need expertise to answer.
- **Do all the development yourself**, start to finish, following the
  feature flow below.
- **Batch her changes, and show each one live** (her request, 2026-10-22):
  - One branch per goal, not per session (see "Scope each branch by its
    goal first" below), e.g. `content/about-section`. When she moves on
    to a different part of the site, ask in plain words whether to send
    what's done first ("Shall I send the About changes before we start
    on Services?"), then start a new branch for the new goal.
  - Keep the `static-site` preview running in the browser panel beside
    the chat (`preview_start`, don't stop it at the end of a turn). After
    each change, reload it and scroll to the changed spot so she sees it
    straight away. Commit as you go, with a changelog line per change.
  - Only when she says "send it" (or before the session ends — ask her
    first): run lint and tests, open one PR into `dev`, merge once CI is
    green. Then tell her it's on the preview:
    `aoifes-website-git-dev-aaronregan.vercel.app`.
  - The panel copy is local to this computer; the preview link only
    changes when a batch is sent.
- **Never take anything to production for her.** No `dev` → `main` PRs, no
  releases, no tags. When she's happy with something, tell her Aaron will
  put it live, and list what's waiting on `dev` in plain words.
- **Never ask her to** run commands, use GitHub or Vercel, read code or
  diffs, or check logs. Verify things yourself and show her results
  visually.
- **Hand infrastructure decisions to Aaron**: hosting, domains and DNS,
  accounts and billing, analytics or tracking changes, security, repo
  settings, new tools or dependencies. Explain simply that it's Aaron's
  area, and record what she wants in the PR description so he sees it.
- **The project rules still hold**, explained to her in plain terms:
  - Readability (contrast) rules: if a colour she picks is hard to read,
    say so and offer the closest option that works.
  - Self-hosted fonts.
  - Changelog lines.
  - The pre-launch search-engine block: real content she supplies can go
    onto `dev`, but it only reaches the public when Aaron releases it.
  - Design changes she asks for are her call. Update the design-system
    notes below to match.

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
`hello@example.com` (reserved domain) until her real email is supplied.

Contact phone (2026-10-28, from Aoife): **07909 346937** — shown as
`07909&nbsp;346937`, linked as `tel:+447909346937` (UK mobile).

**Real content supplied by Aoife so far** (use as-is; it reaches the public
only when Aaron releases, and the pre-launch block still applies):
- Name and title (2026-10-21): **Aoife O’Neill**, "Paediatric and Family
  Dietitian" — header brand name + italic tagline, slim bar, footer, page
  `<title>`.
- Hero headline (2026-10-28, replacing the 2026-10-21 one): "Evidence-based
  nutrition guidance from infancy to adulthood." Her wording. "Infancy"
  matters: she sees babies before weaning (e.g. faltering growth, CMPA),
  so avoid copy that starts her work at "first foods"/weaning.
- Hero italic line under the headline (2026-10-28): "Personalised,
  practical support for every family" (changed so "evidence-based" isn't
  repeated from the new headline).
- Hero intro paragraph (2026-10-28), her wording lightly polished at her
  request: "I’m an HCPC-registered dietitian with over six years’ NHS
  experience. I specialise in infant and child nutrition, and offer
  support through all stages of life."
- "How I can help" support areas (2026-10-21, subheadings and icons
  2026-10-22), in this order, each a square icon tile + title + italic
  subheading:
  1. Weaning support — For preterm and term infants *(side-view baby spoon
     with food)*
  2. Growth concerns — e.g. faltering growth *(rolled sewing measuring
     tape)*
  3. Nutritional deficiencies — e.g. iron deficiency, diagnosed or
     suspected *("Fe" periodic-table tile)*
  4. Allergies — e.g. suspected cow’s milk protein allergy *(milk bottle
     labelled "MILK")*
  5. Gastrointestinal symptoms — e.g. reflux, constipation and diarrhoea
     *(cute waving stomach with a face, arms and legs — the one playful
     icon, her choice)*
  6. Restrictive eating — Including food aversions and ARFID *(plate with
     a single pea and a fork)*
  7. Plant-based and gluten-free diets — Including vegetarian and vegan
     diets, and gluten-free for diagnosed coeliac disease *(wheat stalk
     with leaf)*
  8. Tube feeding and blended diets — Working with your child’s medical
     team *(feeding bag and tube)*

  Aoife iterated on the icons from reference pictures; each was drawn
  fresh (not copied). She disliked white in them — no cream fills.

  Eight fits the 4 × 2 grid (two per row on phones). A ninth would leave
  one orphaned on the last row — suggest merging or a 3 × 3 layout.

- About me (2026-10-22): heading "Hi, I'm Aoife", italic line
  "pronounced “Eefa”", then two paragraphs (her points, polished): 6+
  years in the NHS with children and adults across specialities;
  practical, personalised, evidence-based feeding and nutrition advice
  for parents; parents feeling listened to and heard.
- Credentials (2026-10-22), About section list:
  - HCPC registered (first, and abbreviated — her choice)
  - Member of the British Dietetic Association (BDA)
  - BSc Nutrition and Dietetics, Glasgow Caledonian University
  - BDA-certified postgraduate module in Paediatric Nutrition and
    Dietetics

  She's UK-registered (HCPC/BDA) — relevant for the launch checklist's
  structured data and "find a dietitian" directory listings.

**Positioning** (chosen by Aoife, 2026-10-21): **children first,
family-wide.** She specialises in paediatrics and also supports adults,
but presented as part of supporting the family — not as an equal second
audience. In practice: headline and the "How I can help" areas are about
children (she kept all eight areas children-focused rather than adding a
family/adult one; the family side comes through in other copy). Avoid
long lists of unrelated adult services (weight loss, sports, menopause…),
which would make her look like a generalist. Don't add specific adult
services until she confirms which ones she offers.

## Design system

**Source of truth: Aoife's design canvas**, "Paediatric Dietitian Homepage"
(https://claude.ai/artifact/RpXhG9qdSQyHPAVg9EoLmR), variant **E · Sun**
(`project/Sun.dc.html`: cream + marigold + burnt sienna), adopted
2026-10-20. It replaced the earlier sage/burnt-orange system. Colours,
fonts and box styles come from her design; the section order and
scroll-reveal flow are ours (her canvas copy — "Paediatric Dietitian",
topic names — is not used, per the content policy). Tokens live in `:root`
in `css/styles.css` — use them, don't add raw hex values.

- **Palette**: `--cream` page bg, `--mustard` header/footer/testimonial
  band and primary buttons, `--mustard-light` image placeholders and button
  hover, `--sienna` headings, links, outlines, `--brown-deep` text on
  mustard, `--text` body text, `--line` hairline dividers.
- **Contrast rules** (WCAG AA — checked, don't regress):
  - On mustard, text is always `--brown-deep` (5.6:1). Cream on mustard
    (2:1) and sienna on mustard (4.2:1) both fail.
  - Sienna on cream and cream on sienna are fine (8.4:1).
- **Type**: Montserrat (everything; light 300 for headings and the brand
  name, uppercase with 0.18em tracking for the brand) and Cormorant
  Garamond italic as the accent (tagline, one line under the hero headline,
  the contact line, testimonial names).
- **Fonts are self-hosted** from `assets/fonts/` — never link Google Fonts,
  even though her canvas does. Their CDN sends visitor IPs to Google, which
  EU courts ruled a GDPR issue; a test enforces this.
- **Support-area icons** (Aoife's choice, 2026-10-22): the one place with
  illustrations. Simple inline-SVG line drawings in `.help-icon` tiles —
  `--mustard-light` tile, `--brown-deep` 2.2px rounded strokes, `--mustard`
  accent fills (`.acc`), no white/cream. Decorative (`aria-hidden`); the
  title below carries the meaning. The "MILK" label is SVG text inside the
  HTML, so the French page must change it to "LAIT".
- **Boxes — flat** elsewhere: no cards, shadows, blobs, waves or
  illustrations.
  Outline pills (`.pill`, 1px sienna) for nav and contact links; filled pill
  buttons (`.btn-primary` mustard, `.btn-sienna` on mustard backgrounds);
  a circle photo in the hero; square-cornered 4:5 photo blocks; hairline
  `--line` dividers between consecutive cream sections; services marked by
  a 1px sienna top rule.
- **Header**: tall mustard header (pear mark, brand name, tagline) with the
  pill nav row beneath. A slim fixed `.sticky-bar` (name + "Get in touch")
  slides in once the pill nav scrolls out of view (`main.js`), and is
  `visibility: hidden` until then so it's out of the tab order.
- **Images**: `.img-slot` placeholder blocks until real photos exist.
- **Grids**: 3- and 4-item grids use explicit breakpoints (not `auto-fit`)
  so an item is never orphaned on its own row.
- For new visual directions beyond this system, ask first.

## Branch strategy and release cycle

- `main` — production. Deploys to the live site (Vercel, production
  branch = `main`). Every merge to `main` is a release.
- `dev` — QA. Features accumulate here and are reviewed on the stable
  preview URL `aoifes-website-git-dev-aaronregan.vercel.app` (behind
  Vercel login). Never the production domain.
- Branch protection is enabled on `main` (PR required, no direct pushes,
  including for repo admins — no bypass).

**Scope each branch by its goal first** (Aaron, 2026-10-22). Before
creating a branch, work out what the set of changes is trying to achieve
and name the branch after that goal, not a date or "batch" (e.g.
`content/about-section`, `feature/contact-form`, `chore/release-workflow`).
Bundle changes that serve the same goal; when a request doesn't fit the
current branch's goal, finish/send that branch first or start a separate
one (ask if unsure). Each merge into `dev` should be one coherent unit
with a PR description that states the goal.

**Feature flow**: branch off `dev` (`feature/*`, `content/*`, `chore/*`) →
PR into `dev` → Claude merges once CI is green. Each feature adds a line
under `## [Unreleased]` in CHANGELOG.md. **Don't open a `dev` → `main` PR
after each feature** — features batch up on `dev` until the user asks for
a release.

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
