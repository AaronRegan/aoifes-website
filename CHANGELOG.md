# Changelog

All notable changes to this site are logged here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entry on
top. Every merge to `main` (production) gets an entry.

## [Unreleased]

## 2026-09-26 — Design foundation

### Added

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
