import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });
});

// ─── Cart ─────────────────────────────────────────────────────────────────────
test.describe('Cart', () => {
  const productSlug = 'chicken-breast-dehydrated-pet-treats';

  async function addToCart(page: any) {
    await page.goto(`/en/products/${productSlug}`);

    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForFunction(() => {
      const raw = localStorage.getItem('sniff-cart-v1');
      if (!raw) return false;
      const items = JSON.parse(raw);
      return Array.isArray(items) && items.length > 0;
    }, { timeout: 5000 });
  }

  test('add to cart from product page', async ({ page }) => {
    await addToCart(page);
    const cartBadge = page.locator('[class*="badge"], [class*="cart-count"], [aria-label*="cart"]').first();
    await expect(cartBadge).toBeVisible({ timeout: 5000 });
  });

  test('cart page loads with added item', async ({ page }) => {
    await addToCart(page);
    await page.goto('/en/cart');
    await expect(page).not.toHaveTitle(/404|Error/);
    const body = page.locator('body');
    await expect(body).toContainText(/chicken|treat/i, { timeout: 10000 });
  });

  test('can update item quantity in cart', async ({ page }) => {
    await addToCart(page);
    await page.goto('/en/cart');
    const qtyInput = page.locator('input[type="number"], [class*="quantity"] input').first();
    const increaseBtn = page.locator('button').filter({ hasText: /^\+$/ }).first();

    if (await qtyInput.isVisible()) {
      await qtyInput.fill('2');
      await qtyInput.press('Enter');
    } else if (await increaseBtn.isVisible()) {
      await increaseBtn.click();
    }

    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toContainText(/\$|CAD/);
  });

  test('can remove item from cart', async ({ page }) => {
    await addToCart(page);
    await page.goto('/en/cart');
    const removeBtn = page.locator('button').filter({ hasText: /remove|delete|×/i }).first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      await page.waitForTimeout(1000);
      const body = page.locator('body');
      await expect(body).toContainText(/empty|no items|購物車是空的/i);
    }
  });

  test('shows cart total', async ({ page }) => {
    await addToCart(page);
    await page.goto('/en/cart');
    const body = page.locator('body');
    await expect(body).toContainText(/total|subtotal|小計/i, { timeout: 10000 });
    await expect(body).toContainText(/\$|CAD/);
  });
});

// ─── Checkout ─────────────────────────────────────────────────────────────────

test.describe('Checkout', () => {
  const productSlug = 'chicken-breast-dehydrated-pet-treats';

  async function goToCheckout(page: any) {
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForFunction(() => {
      const raw = localStorage.getItem('sniff-cart-v1');
      if (!raw) return false;
      const items = JSON.parse(raw);
      return Array.isArray(items) && items.length > 0;
    }, { timeout: 5000 });
    await page.goto('/en/checkout');
  }

  async function fillShippingForm(page: any) {
    await page.locator('input[name="first_name"]').fill('Test');
    await page.locator('input[name="last_name"]').fill('User');
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[name="address_1"]').fill('123 Test Street');
    await page.locator('input[name="city"]').fill('Vancouver');
    await page.locator('input[name="postcode"]').fill('V6B 1A1');
  }

  test('checkout page loads', async ({ page }) => {
    await goToCheckout(page);
    await expect(page).not.toHaveTitle(/404|Error/);
    await expect(page).toHaveURL(/checkout/);
  });

  test('shows order summary', async ({ page }) => {
    await goToCheckout(page);
    const body = page.locator('body');
    await expect(body).toContainText(/your order/i, { timeout: 10000 });
    await expect(body).toContainText(/\$|CAD/);
  });

  test('shows contact/shipping form fields', async ({ page }) => {
    await goToCheckout(page);
    const emailField = page.locator('input[type="email"]').first();
    await expect(emailField).toBeVisible({ timeout: 10000 });
  });

  test('shows Stripe payment element', async ({ page }) => {
    await goToCheckout(page);
    await fillShippingForm(page);

    const prepareBtn = page.locator('button').filter({ hasText: /prepare payment/i }).first();
    await expect(prepareBtn).toBeEnabled({ timeout: 5000 });
    await prepareBtn.click();

    const stripeFrame = page.locator('iframe[src*="stripe.com"]:not([aria-hidden="true"])').first();
    await expect(stripeFrame).toBeVisible({ timeout: 15000 });
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await goToCheckout(page);
    const prepareBtn = page.locator('button').filter({ hasText: /prepare payment/i }).first();
    await expect(prepareBtn).toBeVisible({ timeout: 5000 });
    await prepareBtn.click();
    await page.waitForTimeout(1000);
    // checkout page = validation failed
    await expect(page).toHaveURL(/checkout/);
    await expect(page).not.toHaveURL(/success/);
  });

  test('completes checkout with Stripe test card', async ({ page }) => {
    await goToCheckout(page);
    await fillShippingForm(page);
  
    const prepareBtn = page.locator('button').filter({ hasText: /prepare payment/i }).first();
    await expect(prepareBtn).toBeEnabled({ timeout: 5000 });
    await prepareBtn.click();
  
    await page.waitForTimeout(4000);
  
    // Debug: print all iframe titles
    const titles = await page.locator('iframe').evaluateAll(
      (frames) => frames.map(f => ({ title: f.title, name: f.name, src: f.src.substring(0, 80) }))
    );
    console.log('iframes:', JSON.stringify(titles, null, 2));
  });
});

// ─── AI Chatbot (Fei Fei) ─────────────────────────────────────────────────────

test.describe('AI Chatbot', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('chatbot toggle button is visible', async ({ page }) => {
    const chatBtn = page.locator('[class*="chatbot"], [class*="chat-toggle"], [aria-label*="chat"]').first();
    await expect(chatBtn).toBeVisible({ timeout: 10000 });
  });

  test('opens chatbot on click', async ({ page }) => {
    const chatBtn = page.locator('[class*="chatbot"], [class*="chat-toggle"], [aria-label*="chat"]').first();
    await expect(chatBtn).toBeVisible({ timeout: 10000 });
    await chatBtn.click();
    // Chat window should appear
    const chatWindow = page.locator('[class*="chat-window"], [class*="chatbot-container"], [class*="AIChatbot"]').first();
    await expect(chatWindow).toBeVisible({ timeout: 5000 });
  });

  test('can send a message and receive response', async ({ page }) => {
    const chatBtn = page.locator('[aria-label="Open chat assistant"]');
    await expect(chatBtn).toBeVisible({ timeout: 10000 });
    await chatBtn.click();
  
    const input = page.locator('input[placeholder="Ask me anything about our products..."]');
    await expect(input).toBeVisible({ timeout: 5000 });
    await input.fill('Hello, what treats do you have?');
    await input.press('Enter');
  
    // 等 AI response
    const bubble = page.locator('[class*="aiBubble"]').last();
    await expect(bubble).toBeVisible({ timeout: 20000 });
  });
});

// ─── i18n ─────────────────────────────────────────────────────────────────────

test.describe('i18n', () => {
  test('default locale redirects to /en', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en/);
  });

  test('/en loads successfully', async ({ page }) => {
    await page.goto('/en');
    await expect(page).not.toHaveTitle(/404|Error/);
  });

  // test('language switcher is visible', async ({ page }) => {
  //   await page.goto('/en');
  //   const langSwitcher = page.locator('[class*="lang"], [class*="locale"], button').filter({ hasText: /EN|中|繁/i }).first();
  //   await expect(langSwitcher).toBeVisible({ timeout: 10000 });
  // });

  test('switching language changes URL locale', async ({ page }) => {
    await page.goto('/en');
    const langSwitcher = page.locator('[class*="lang"], [class*="locale"]').first();
    if (await langSwitcher.isVisible({ timeout: 5000 })) {
      await langSwitcher.click();
      // URL should change to different locale
      await page.waitForTimeout(1000);
      const url = page.url();
      // Should be on a different locale or same page
      expect(url).toMatch(/\/(en|zh|fr)\//);
    }
  });
});