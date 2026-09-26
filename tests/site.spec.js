import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // /_vercel/insights/script.js and /_vercel/speed-insights/script.js only
  // resolve when served by Vercel itself. Stub them here so tests don't
  // depend on (or fail on the 404 from) real Vercel infra.
  await page.route('**/_vercel/insights/script.js', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );
  await page.route('**/_vercel/speed-insights/script.js', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );
});

test('loads without console errors and shows placeholder content', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Aoife/);
  await expect(page.locator('#hero h1')).toHaveText('Aoife');
  await expect(page.locator('#year')).toHaveText(String(new Date().getFullYear()));
  expect(errors).toEqual([]);
});

test('scroll-reveal sections animate in as they enter the viewport', async ({ page }) => {
  await page.goto('/');

  const about = page.locator('#about');
  await expect(about).not.toHaveClass(/is-visible/);

  await about.scrollIntoViewIfNeeded();
  await expect(about).toHaveClass(/is-visible/);
});
