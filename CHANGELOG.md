# Changelog

All notable changes to this site are logged here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entry on
top. Features merged into `dev` are listed under `[Unreleased]`; a release
turns that into a version heading, and merging the release to `main` tags
it automatically (see `.github/workflows/release.yml`).

## [Unreleased]

## [1.0.0] — 2026-11-13

Public launch on https://www.aoifeoneill.ch, in English, for UK clients
(online video consultations, prices in £). The detailed day-by-day changes
since 0.1.1 are in the git history and the merged pull requests.

### Added

- Aoife’s real content throughout: name and title (Paediatric and Adult
  Dietitian), hero headline and introduction (HCPC registered, recognised
  by the Swiss Red Cross, over six years’ NHS experience), About section
  with credentials, and two photos.
- “How I can help”: a Children / Adults switch that flips between eight
  children’s support areas and five adult ones, each with its own simple
  drawn icon.
- “How it works”: free 15-minute discovery call, £100 initial video
  consultation and £60 follow-up.
- Contact: “Book your free call” goes to Aoife’s Cal.com booking page;
  email link; LinkedIn in the footer.
- Registration and membership logos (HCPC, BDA member, Trust a Dietitian).
- Search and sharing: the site can be found by search engines and AI
  assistants, with a sitemap, canonical address, description, link-preview
  tags and structured data describing Aoife and her consultations.
- Security: internal project files are no longer published, security
  headers (including a strict content security policy) on every page, the
  vercel.app address redirects to www.aoifeoneill.ch, and a branded
  “page not found” page.
- Browser tab icon (the pear from the header).

### Changed

- CI: the test workflow’s GitHub token is now read-only (least privilege).
- New design from Aoife’s “Sun” direction: cream, marigold and burnt
  sienna, Montserrat with Cormorant Garamond italic accents, a tall
  marigold header with pill navigation and a slim bar that appears on
  scroll.
- Page language is British English (en-GB).

### Removed

- The placeholder “Coming soon” content, the testimonials section and the
  “You’re in the right place if…” checklist.
- The pre-launch block on search engines and AI crawlers.
- Phone number: contact and booking are by email and Cal.com only.

## [0.1.1] — 2026-09-27

### Added

- Pre-launch block on search engines and AI crawlers (`noindex` meta tag
  and a `robots.txt` blocking AI bots) so placeholder content isn't
  indexed or learned before launch.

## [0.1.0] — 2026-09-26

### Added

- Release workflow: versioned changelog headings, automatic git tags and
  GitHub Releases on merge to `main`.
- Design foundation: sage and burnt-orange palette, Fraunces + DM Sans
  typography with a Caveat handwritten accent, and a decorative system of
  soft blobs, wave dividers, and line illustrations.
- Placeholder page sections: hero, "You're in the right place if…"
  checklist, how I can help, about + credentials, services, how it works,
  testimonials, and contact.
- Self-hosted fonts (no Google Fonts CDN, for GDPR).
- Sticky header with skip link, visible focus rings, and reduced-motion
  support.
- Tests for section structure, in-page links, mobile overflow, reduced
  motion, and self-hosted fonts.

<!-- Entries below were production deploys made before version tags existed. -->

## 2026-09-26 — Speed Insights

### Added

- Vercel Speed Insights tracking script.

## 2026-09-26 — Analytics & Cloudflare removal

### Added

- Vercel Web Analytics tracking script.

### Removed

- Cloudflare Pages as a deployment target — Vercel is now the sole host.

## 2026-09-26 — Initial skeleton

### Added

- Placeholder single-page site (Hero, About, Services, Contact) with
  scroll-reveal animation.
- `main`/`dev` branch workflow with branch protection on `main`.
- Vercel and Cloudflare Pages CI/CD, both deploying from `main`.
- GitHub Actions CI (HTML lint + Playwright smoke tests).
