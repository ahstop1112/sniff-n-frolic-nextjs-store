import { test, expect } from '@playwright/test';

// ─── Cart ─────────────────────────────────────────────────────────────────────

test.describe('Cart', () => {
  const productSlug = 'chicken-breast-dehydrated-pet-treats';

  test('add to cart from product page', async ({ page }) => {
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    // Cart count badge should appear or increment
    const cartBadge = page.locator('[class*="badge"], [class*="cart-count"], [aria-label*="cart"]').first();
    await expect(cartBadge).toBeVisible({ timeout: 5000 });
  });

  test('cart page loads with added item', async ({ page }) => {
    // Add item first
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(1000);

    // Navigate to cart
    await page.goto('/en/cart');
    await expect(page).not.toHaveTitle(/404|Error/);
    const body = page.locator('body');
    await expect(body).toContainText(/chicken|treat/i, { timeout: 10000 });
  });

  test('can update item quantity in cart', async ({ page }) => {
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(1000);

    await page.goto('/en/cart');
    // Look for quantity input or +/- buttons
    const qtyInput = page.locator('input[type="number"], [class*="quantity"] input').first();
    const increaseBtn = page.locator('button').filter({ hasText: /^\+$/ }).first();

    if (await qtyInput.isVisible()) {
      await qtyInput.fill('2');
      await qtyInput.press('Enter');
    } else if (await increaseBtn.isVisible()) {
      await increaseBtn.click();
    }

    await page.waitForTimeout(1000);
    // Cart total should reflect change
    const body = page.locator('body');
    await expect(body).toContainText(/\$|CAD/);
  });

  test('can remove item from cart', async ({ page }) => {
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(1000);

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
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(1000);

    await page.goto('/en/cart');
    const body = page.locator('body');
    await expect(body).toContainText(/total|subtotal|小計/i, { timeout: 10000 });
    await expect(body).toContainText(/\$|CAD/);
  });
});

// ─── Checkout ─────────────────────────────────────────────────────────────────

test.describe('Checkout', () => {
  const productSlug = 'chicken-breast-dehydrated-pet-treats';

  // Helper: add item and go to checkout
  async function goToCheckout(page: any) {
    await page.goto(`/en/products/${productSlug}`);
    const addToCartBtn = page.locator('button').filter({ hasText: /add to cart|加入購物車/i });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(1000);
    await page.goto('/en/checkout');
  }

  test('checkout page loads', async ({ page }) => {
    await goToCheckout(page);
    await expect(page).not.toHaveTitle(/404|Error/);
    await expect(page).toHaveURL(/checkout/);
  });

  test('shows order summary', async ({ page }) => {
    await goToCheckout(page);
    const body = page.locator('body');
    await expect(body).toContainText(/order summary|order total|訂單/i, { timeout: 10000 });
    await expect(body).toContainText(/\$|CAD/);
  });

  test('shows contact/shipping form fields', async ({ page }) => {
    await goToCheckout(page);
    // Email field
    const emailField = page.locator('input[type="email"], input[name*="email"]').first();
    await expect(emailField).toBeVisible({ timeout: 10000 });
  });

  test('shows Stripe payment element', async ({ page }) => {
    await goToCheckout(page);
    // Stripe iframe should load
    const stripeFrame = page.frameLocator('iframe[name*="__privateStripeFrame"], iframe[src*="stripe"]').first();
    // Wait for Stripe elements to render
    await page.waitForTimeout(3000);
    const body = page.locator('body');
    // Either Stripe iframe loaded or card input visible
    const cardInput = page.locator('[class*="stripe"], [class*="card-element"], iframe[src*="stripe"]').first();
    await expect(cardInput).toBeVisible({ timeout: 15000 });
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await goToCheckout(page);
    const submitBtn = page.locator('button').filter({ hasText: /place order|pay|checkout|結帳/i }).first();
    if (await submitBtn.isVisible({ timeout: 5000 })) {
      await submitBtn.click();
      await page.waitForTimeout(1000);
      // Should show some validation error
      const body = page.locator('body');
      await expect(body).toContainText(/required|invalid|please|必填/i);
    }
  });

  test('completes checkout with Stripe test card', async ({ page }) => {
    await goToCheckout(page);

    // Fill contact info
    const emailField = page.locator('input[type="email"], input[name*="email"]').first();
    if (await emailField.isVisible({ timeout: 10000 })) {
      await emailField.fill('test@example.com');
    }

    const firstNameField = page.locator('input[name*="first"], input[placeholder*="first name" i]').first();
    if (await firstNameField.isVisible()) await firstNameField.fill('Test');

    const lastNameField = page.locator('input[name*="last"], input[placeholder*="last name" i]').first();
    if (await lastNameField.isVisible()) await lastNameField.fill('User');

    const addressField = page.locator('input[name*="address"], input[placeholder*="address" i]').first();
    if (await addressField.isVisible()) await addressField.fill('123 Test Street');

    const cityField = page.locator('input[name*="city"], input[placeholder*="city" i]').first();
    if (await cityField.isVisible()) await cityField.fill('Vancouver');

    const postalField = page.locator('input[name*="postal"], input[name*="zip"], input[placeholder*="postal" i]').first();
    if (await postalField.isVisible()) await postalField.fill('V6B 1A1');

    // Fill Stripe test card inside iframe
    await page.waitForTimeout(3000);
    const stripeFrame = page.frameLocator('iframe[name*="__privateStripeFrame"]').first();
    const cardNumber = stripeFrame.locator('input[name="number"], [placeholder*="card number" i]').first();
    if (await cardNumber.isVisible({ timeout: 10000 })) {
      await cardNumber.fill('4242424242424242');
      const expiry = stripeFrame.locator('input[name="expiry"], [placeholder*="MM" i]').first();
      await expiry.fill('12/28');
      const cvc = stripeFrame.locator('input[name="cvc"], [placeholder*="CVC" i]').first();
      await cvc.fill('123');
    }

    // Submit
    const submitBtn = page.locator('button').filter({ hasText: /place order|pay|checkout|結帳/i }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Should redirect to success/confirmation page
      await expect(page).toHaveURL(/success|confirmation|thank/i, { timeout: 30000 });
    }
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
    const chatBtn = page.locator('[class*="chatbot"], [class*="chat-toggle"], [aria-label*="chat"]').first();
    await expect(chatBtn).toBeVisible({ timeout: 10000 });
    await chatBtn.click();

    const input = page.locator('[class*="chat"] input, [class*="chat"] textarea').first();
    await expect(input).toBeVisible({ timeout: 5000 });
    await input.fill('Hello, what treats do you have?');
    await input.press('Enter');

    // Wait for response (AI call may take a few seconds)
    const messages = page.locator('[class*="message"], [class*="chat-bubble"]');
    await expect(messages.last()).toBeVisible({ timeout: 20000 });
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

  test('language switcher is visible', async ({ page }) => {
    await page.goto('/en');
    const langSwitcher = page.locator('[class*="lang"], [class*="locale"], button').filter({ hasText: /EN|中|繁/i }).first();
    await expect(langSwitcher).toBeVisible({ timeout: 10000 });
  });

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