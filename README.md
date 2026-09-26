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

## Branches

- `main` — production. Deploys to the live site on Vercel and Cloudflare
  Pages.
- `dev` — staging/testing. Gets preview deployments only, never the
  production domain.
- Feature branches — branch off `dev`, open a merge/pull request back into
  `dev`. `dev` gets merged into `main` for releases.

## Deployments

- **Vercel**: https://vercel.com (production branch: `main`)
- **Cloudflare Pages**: https://pages.cloudflare.com (production branch: `main`)

No custom domain yet — both hosts' default subdomains are used until one is
bought.
