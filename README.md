# Aoife's Website

Aoife's profile site — a single-page, scroll-driven site covering who she is,
the services she offers, and how to get in touch.

Currently a placeholder while design direction is worked out.

## Stack

Plain HTML/CSS/JS — no build step, no framework. Scroll-triggered reveal
animations are done with the native `IntersectionObserver` API
(`js/main.js`) plus CSS transitions (`css/styles.css`).

## Running locally

Just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Testing

Requires Node.js. Install dependencies once, then:

```bash
npm install
npm run lint   # HTML validation
npm test       # Playwright smoke tests
```

CI (`.github/workflows/ci.yml`) runs both on every push/PR to `main` and
`dev`. Vercel only handles deployment — it doesn't run these checks.

## Changelog

Every production deploy (merge to `main`) gets an entry in
[CHANGELOG.md](CHANGELOG.md).

## Branches

- `main` — production. Deploys to the live site on Vercel.
- `dev` — staging/testing. Gets preview deployments only, never the
  production domain.
- Feature branches — branch off `dev`, open a merge/pull request back into
  `dev`. `dev` gets merged into `main` for releases.

## Deployments

- **Vercel**: https://vercel.com (production branch: `main`)

No custom domain yet — Vercel's default subdomain is used until one is
bought.
