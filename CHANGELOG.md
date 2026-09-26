# Changelog

All notable changes to this site are logged here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entry on
top. Every merge to `main` (production) gets an entry.

## [Unreleased]

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
