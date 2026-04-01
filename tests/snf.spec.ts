import { test, expect } from '@playwright/test';

// ─── Homepage ─────────────────────────────────────────────────────────────────

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/en/);
    await expect(page).not.toHaveTitle(/404|Error/);
  });

  test('shows main banner', async ({ page }) => {
    const banner = page.locator('section').first();
    await expect(banner).toBeVisible();
  });

  test('shows product slider sections', async ({ page }) => {
    // At least one product card should be visible
    const productCards = page.locator('a[href*="/en/products/"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('has working navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });
});

// ─── Category Page ────────────────────────────────────────────────────────────

test.describe('Category page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/category/pet-treats');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/en\/category\/pet-treats/);
    await expect(page).not.toHaveTitle(/404|Error/);
  });

  test('shows products', async ({ page }) => {
    const productCards = page.locator('a[href*="/en/products/"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('redirects unknown category to 404', async ({ page }) => {
    await page.goto('/en/category/this-category-does-not-exist');
    await expect(page).toHaveURL(/this-category-does-not-exist/);
    // Next.js 404 page
    const body = page.locator('body');
    await expect(body).toContainText(/404|not found/i);
  });
});

// ─── Subcategory Page ─────────────────────────────────────────────────────────

test.describe('Subcategory page', () => {
  test('loads subcategory and shows products', async ({ page }) => {
    await page.goto('/en/category/slow-feeders');
    await expect(page).not.toHaveTitle(/404|Error/);
    const productCards = page.locator('a[href*="/en/products/"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
  });
});

// ─── Product Detail Page ──────────────────────────────────────────────────────

test.describe('Product detail page', () => {
  const slug = 'chicken-breast-dehydrated-pet-treats';

  test.beforeEach(async ({ page }) => {
    await page.goto(`/en/products/${slug}`);
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(slug));
    await expect(page).not.toHaveTitle(/404|Error/);
  });

  test('shows product name', async ({ page }) => {
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
    const text = await heading.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('shows product image', async ({ page }) => {
    const img = page.locator('img').first();
    await expect(img).toBeVisible({ timeout: 10000 });
    const src = await img.getAttribute('src');
    expect(src).toBeTruthy();
  });

  test('shows price', async ({ page }) => {
    // Price should contain a dollar sign or number
    const body = page.locator('body');
    await expect(body).toContainText(/\$|CAD/);
  });

  test('shows breadcrumb with category', async ({ page }) => {
    const breadcrumb = page.locator('nav[aria-label="breadcrumb"], .breadcrumb, [class*="breadcrumb"]').first();
    await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  });

  test('shows related products section', async ({ page }) => {
    const relatedCards = page.locator('a[href*="/en/products/"]');
    await expect(relatedCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('redirects unknown product to 404', async ({ page }) => {
    await page.goto('/en/products/this-product-does-not-exist');
    const body = page.locator('body');
    await expect(body).toContainText(/404|not found/i);
  });

  test('has valid Open Graph meta tags', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
    await expect(ogImage).toHaveAttribute('content', /^https?:\/\/.+/);
  });
});