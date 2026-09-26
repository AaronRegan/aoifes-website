import { test, expect } from '@playwright/test';

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
