# Changelog

All notable changes to this site are logged here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entry on
top. Features merged into `dev` are listed under `[Unreleased]`; a release
turns that into a version heading, and merging the release to `main` tags
it automatically (see `.github/workflows/release.yml`).

## [Unreleased]

### Fixed

- "How I can help" Children / Adults switch: the page no longer jumps
  when the tiles change (the section now glides between the taller
  children's list and the shorter adults' list), and each tile flips
  with its own perspective so the flip looks even across the row. The
  adult tiles are also drawn in the background when the page loads, so
  the first switch doesn't stutter.

### Added

- Security hardening: internal project files are no longer published with
  the site; security headers (including a strict content security policy)
  on every page; the vercel.app copy redirects to www.aoifeoneill.ch; a
  branded "page not found" page.
- Launch readiness: the page can now be listed by search engines and AI
  assistants (noindex and the AI-crawler block removed), with a sitemap,
  canonical address on www.aoifeoneill.ch, a real description, link-preview
  tags and structured data describing Aoife and her consultations.
- Swiss Red Cross recognition: the hero intro now opens "I’m a
  dietitian recognised by the Swiss Red Cross and registered with the
  HCPC in the UK…", and "Recognised by the Swiss Red Cross (SRC)" is
  first in the About credentials.
- "How I can help": a Children / Adults switch above the tiles. Choosing
  one flips the tiles over, one after another, to that list; the adult
  tiles are a soft peach instead of mustard. Four placeholder adult
  areas (pregnancy and breastfeeding, gut health, food allergies and
  intolerances, healthy eating for the family) for Aoife to confirm or
  replace.
- Services: "How it works" now lists Aoife's three steps with their
  durations and prices (free 15-minute discovery call, £120 initial
  consultation, £60 follow-up if required), from her design copy. The
  three placeholder service cards are gone, and so is the separate
  "How it works" button in the menu (it's now the Services section).
- "Book your free call" now opens Aoife's Cal.com booking page for the
  free 15-minute consultation call, instead of starting an email.
- Aoife's email address (aoife.oneill.practice@gmail.com) on the
  contact email link, replacing the placeholder address.
- Registration and membership logos above the footer: the official
  "HCPC registered", BDA Full Member 2026 (links to the BDA website, as
  the BDA requires) and Trust a Dietitian.
- Aoife's photo in the About section (head-and-shoulders crop, square
  corners, wide light-mustard border), replacing the placeholder.
- LinkedIn icon link in the footer, to Aoife's LinkedIn profile (letters
  centred in the square so it doesn't look tight on the right).
- Browser tab icon: the pear from the header on a mustard square (SVG,
  plus 32px PNG and an iPhone home-screen icon).
- Aoife's photo in the hero circle, with a light-mustard ring around it.

### Removed

- "How I can help": the intro line "1:1 video consultations from the
  comfort of your home" under the heading.
- Phone number from the Contact section: contact and booking are by
  email only.
- The testimonials ("Kind words") section and its mustard band, at
  Aoife's request.
- The "You're in the right place if…" placeholder section (Aoife's
  request); the page now goes straight from the hero to "How I can help".

### Changed

- Free-call card: wording now fits adults as well as children (“…whether
  it’s for you or your little one…”).
- Page language set to British English (en-GB); curly apostrophe in
  "Hi, I’m Aoife".
- Adults pea pod icon: tidier stalk (one curved stem with two small leaves).
- Project notes: launch targets UK clients (English only, prices in £);
  the French page is on hold until her Geneva registration; domain setup
  (aoifeoneill.ch) recorded.
- Adults “Vegan and vegetarian diets” icon: a side-view pea pod with three peas instead of a leaf.
- Adults “Women’s health” icon: a tulip instead of the ♀ symbol.
- Adults “Gastrointestinal disorders” icon: a simple winding intestine
  instead of the large-intestine frame.
- Adults: the last tile is now “Other nutritional concerns — Get in
  touch to see if I can help you!” (was “Allergies and intolerances”), with a broccoli icon instead of the
  egg.
- Hero intro: first sentence reworded to "I’m an HCPC-registered
  dietitian, recognised by the Swiss Red Cross, with over six years’ NHS
  experience."
- Credentials: "Recognised by the Swiss Red Cross (SRC)" moved to third,
  after HCPC and BDA.
- How it works: the initial consultation is now £100 (was £120).
- Adults “Vegan and vegetarian diets” subheading now reads “Making sure
  your diet is nutritionally complete”.
- About ("Hi, I'm Aoife"): new copy for both children and adults, in
  three short paragraphs (six years in the NHS with a focus on
  paediatrics; feeling listened to; making sense of nutrition advice).
- Hero headline: "from infancy to adulthood" is now "from infancy
  through adulthood" (Aoife's wording).
- Hero italic line shortened to "Personalised, practical support"
  (was "…for every family"), at Aoife's request.
- Title "Paediatric and Family Dietitian" is now "Paediatric and Adult
  Dietitian" (under her name at the top and in the browser tab), at
  Aoife's request.
- "How I can help" intro line: "1:1 video consultations from the comfort
  of your home" (Aoife's wording), replacing the placeholder.
- "How I can help" Adults: Aoife's five areas replace the four
  placeholders: gastrointestinal disorders, women's health, vegan and
  vegetarian diets, weight management, and allergies and intolerances,
  each with a new drawing. Five sit in one row on computers; on phones
  the fifth sits centred under the others.
- The "Services" menu button is now "How it works", the hero's "See
  services" button is now "See how it works", and the small "Services"
  label above the "How it works" heading is gone.
- CI: the test job now times out after 15 minutes instead of GitHub's
  6-hour default, so a stalled browser download fails fast.
- Documented showing each change in the preview panel before merging
  into `dev` (no change to the site itself).
- "Book your free call" now opens an email with the subject "Free
  15-minute consultation call" (to the placeholder address for now).
- Documented that Aoife's yoga site is a separate project and repo (no
  change to the site itself).
- Plant-based and gluten-free subheading: "gluten-free for coeliac
  disease" ("diagnosed" removed).
- Contact section: a card offering a free 15-minute consultation call
  (button opens an email), then "Or contact me directly" above the
  email link; the placeholder line is gone.
- Hero headline from Aoife: "Evidence-based nutrition guidance from
  infancy to adulthood."
- Hero italic line now "Personalised, practical support for every
  family", so "evidence-based" isn't repeated from the headline.
- Hero intro paragraph from Aoife (HCPC registration, NHS experience,
  infant specialism with support through all stages of life), replacing
  the placeholder.
- About me copy from Aoife, with "pronounced “Eefa”" under the heading,
  replacing the two placeholder paragraphs.
- Real credentials from Aoife in the About section: BSc (Glasgow
  Caledonian University), BDA-certified paediatric postgraduate module,
  HCPC registration, BDA membership.
- Documented the batch-and-preview way of working with Aoife, and scoping
  each branch by its goal so merges bundle logically (no change to the
  site itself).
- Support areas get simple line icons in brown and mustard (spoon,
  measuring tape, iron "Fe", milk bottle, waving stomach, plate, wheat,
  feeding tube) and a subheading each; "Selective eating and ARFID" is now
  "Restrictive eating".
- "How I can help" now lists Aoife's eight support areas as smaller square
  image tiles (4 across, 2 per row on phones), each with a title and an
  optional italic subheading. Images to follow.
- Hero italic line from Aoife: "Personalised and evidence-based support".
- Hero headline from Aoife: "Helping families feel informed and confident
  about nutrition, from first foods to family meals."
- Real name and title from Aoife: "Aoife O’Neill", "Paediatric and Family
  Dietitian" replace the `[Practice Name]` / `[Tagline]` placeholders in
  the header, slim bar, footer and page title.
- Redesign to Aoife's "Sun" direction: cream, marigold and burnt-sienna
  palette; Montserrat with Cormorant Garamond italic (both self-hosted);
  flat boxes — outline pills, a circle hero photo, square photo blocks,
  hairline dividers, and a marigold testimonial band. Same sections and
  scroll-reveal flow.
- New header: tall marigold header with the pill nav beneath, and a slim
  sticky bar with "Get in touch" that slides in after scrolling.
- Documented the plan for a French version (no change to the site itself).
- Documented how to work with Aoife directly: plain-language, Q&A style,
  changes go to the QA preview only (no change to the site itself).

### Removed

- Sage palette, Fraunces / DM Sans / Caveat fonts, and the blob, wave and
  line-illustration decorations.

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
