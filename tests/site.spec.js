import { test, expect } from '@playwright/test';

const SECTION_IDS = [
  'hero',
  'help',
  'about',
  'services',
  'how-it-works',
  'contact',
];

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

test('loads without console errors and shows the hero', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Aoife/);
  await expect(page.locator('#hero h1')).toBeVisible();
  await expect(page.locator('#hero h1')).not.toBeEmpty();
  await expect(page.locator('#year')).toHaveText(String(new Date().getFullYear()));
  expect(errors).toEqual([]);
});

test('every planned section is present', async ({ page }) => {
  await page.goto('/');

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`), `#${id} should exist`).toHaveCount(1);
  }
});

test('support areas: eight tiles, each with a decorative icon, heading and subheading', async ({ page }) => {
  await page.goto('/');

  const items = page.locator('#help .help-item');
  await expect(items).toHaveCount(8);
  for (const item of await items.all()) {
    await expect(item.locator('.help-icon svg[aria-hidden="true"]')).toHaveCount(1);
    await expect(item.locator('h3')).not.toBeEmpty();
    await expect(item.locator('.help-sub')).not.toBeEmpty();
  }
  await expect(page.locator('#help')).toContainText('Restrictive eating');
});

test('hero photo loads and has alt text', async ({ page }) => {
  await page.goto('/');

  const photo = page.locator('#hero .img-slot--photo img');
  await expect(photo).toHaveAttribute('alt', /\S/);
  await expect
    .poll(() => photo.evaluate((img) => img.complete && img.naturalWidth))
    .toBeGreaterThan(0);
});

test('about portrait photo loads and has alt text', async ({ page }) => {
  await page.goto('/');

  const photo = page.locator('#about .img-slot--photo img');
  await expect(photo).toHaveAttribute('alt', /\S/);
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(() => photo.evaluate((img) => img.complete && img.naturalWidth))
    .toBeGreaterThan(0);
});

test('contact: free consultation card books through Cal.com', async ({ page }) => {
  await page.goto('/');

  const card = page.locator('#contact .consult-card');
  await expect(card.locator('h3')).toHaveText(/free 15-minute consultation/i);
  await expect(card.getByRole('link', { name: 'Book your free call' }))
    .toHaveAttribute('href', 'https://cal.com/aoifeoneill/free-15-minute-consultation-call');
});

test('contact: the email link goes to Aoife’s email', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#contact .contact-list a'))
    .toHaveAttribute('href', 'mailto:aoife.oneill.practice@gmail.com');
  await expect(page.locator('a[href*="example.com"]')).toHaveCount(0);
});

test('services: three steps, each with a title, duration and price', async ({ page }) => {
  await page.goto('/');

  const steps = page.locator('#services .steps > li');
  await expect(steps).toHaveCount(3);
  await expect(steps.locator('h3')).toHaveText(['Discovery call', 'Initial consultation', 'Follow-up consultation']);
  await expect(steps.locator('.service-meta')).toHaveText([/Free/, /£120/, /£60/]);
});

test('tab icon (pear) files are linked and served', async ({ page, request }) => {
  await page.goto('/');

  const hrefs = await page.$$eval(
    'link[rel="icon"], link[rel="apple-touch-icon"]',
    (links) => links.map((l) => l.getAttribute('href'))
  );
  expect(hrefs).toEqual(
    expect.arrayContaining(['assets/favicon.svg', 'assets/favicon-32.png', 'assets/apple-touch-icon.png'])
  );
  for (const href of hrefs) {
    expect((await request.get(`/${href}`)).status(), href).toBe(200);
  }
});

test('footer links to Aoife on LinkedIn', async ({ page }) => {
  await page.goto('/');

  const link = page.locator('.site-footer').getByRole('link', { name: /LinkedIn/ });
  await expect(link).toHaveAttribute('href', /^https:\/\/www\.linkedin\.com\/in\//);
  await expect(link).toBeVisible();
});

test('no phone number on the page: contact is email only', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/(\+44|\b0)\s?7\d{3}\s?\d{6}/);
});

test('registration and membership logos: HCPC, BDA (linked to the BDA), Trust a Dietitian', async ({ page }) => {
  await page.goto('/');

  const logos = page.locator('.credentials-band .credential-logos > li');
  await expect(logos).toHaveCount(3);
  await expect(logos.nth(1).getByRole('link', { name: /BDA/ })).toHaveAttribute('href', /^https:\/\/www\.bda\.uk\.com/);
});

test('registration and membership logos: HCPC first, Trust a Dietitian last, loaded with alt text', async ({ page }) => {
  await page.goto('/');

  const logos = page.locator('.credentials-band .credential-logos > li');
  await expect(logos.first().locator('img')).toHaveAttribute('alt', 'HCPC registered');
  await expect(logos.last().locator('img')).toHaveAttribute('alt', 'Trust a Dietitian');
  const imgs = page.locator('.credentials-band img');
  await imgs.first().scrollIntoViewIfNeeded();
  for (const img of await imgs.all()) {
    await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
  }
});

test('every in-page link points at an element that exists', async ({ page }) => {
  await page.goto('/');

  const targets = await page.$$eval('a[href^="#"]', (links) =>
    links.map((link) => link.getAttribute('href').slice(1))
  );
  expect(targets.length).toBeGreaterThan(0);

  for (const id of targets) {
    await expect(page.locator(`#${id}`), `link target #${id} should exist`).toHaveCount(1);
  }
});

test('scroll-reveal content animates in as it enters the viewport', async ({ page }) => {
  await page.goto('/');

  const aboutCopy = page.locator('#about .about-copy');
  await expect(aboutCopy).not.toHaveClass(/is-visible/);

  await aboutCopy.scrollIntoViewIfNeeded();
  await expect(aboutCopy).toHaveClass(/is-visible/);
});

test('reduced motion shows all content without scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('#contact .contact')).toHaveCSS('opacity', '1');
});

test('no horizontal overflow on a small phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

// Pre-launch only: delete or invert this test as part of the v1.0.0 launch.
test('pre-launch: page is noindex and AI crawlers are blocked', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);

  const robots = await (await request.get('/robots.txt')).text();
  const groups = robots.split(/\n\s*\n/);
  const aiGroup = groups.find((g) => /User-agent: GPTBot/.test(g));
  const catchAll = groups.find((g) => /User-agent: \*/.test(g));

  expect(aiGroup).toMatch(/User-agent: ClaudeBot/);
  expect(aiGroup).toMatch(/^Disallow: \/$/m);
  // Search engines must still be able to fetch the page to see the noindex.
  expect(catchAll).not.toMatch(/^Disallow: \/$/m);
});

test('fonts are self-hosted, never fetched from Google', async ({ page }) => {
  const fontRequests = [];
  page.on('request', (req) => {
    if (req.resourceType() === 'font' || /fonts\.(googleapis|gstatic)\.com/.test(req.url())) {
      fontRequests.push(req.url());
    }
  });

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  expect(fontRequests.some((url) => /fonts\.(googleapis|gstatic)\.com/.test(url))).toBe(false);
  expect(fontRequests.some((url) => url.includes('/assets/fonts/'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('300 1em Montserrat'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('italic 400 1em "Cormorant Garamond"'))).toBe(true);
});

test('slim sticky bar appears only after scrolling past the nav', async ({ page }) => {
  await page.goto('/');

  const bar = page.locator('[data-sticky-bar]');
  await expect(bar).not.toHaveClass(/is-shown/);
  await expect(bar).toBeHidden();

  await page.locator('#about').scrollIntoViewIfNeeded();
  await expect(bar).toHaveClass(/is-shown/);
  await expect(bar.getByRole('link', { name: 'Get in touch' })).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).not.toHaveClass(/is-shown/);
});
