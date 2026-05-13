import { chromium, firefox, webkit } from '@playwright/test';
import path from 'path';
import fs from 'fs';

async function globalSetup() {
  const dir = 'playwright/.auth';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const [name, browserType] of [
    ['chromium', chromium],
    ['firefox', firefox],
    ['webkit', webkit],
  ] as const) {
    const browser = await browserType.launch();
    const page = await browser.newPage();
    await page.goto(process.env.BASE_URL || 'http://localhost:3001/en');

    const cookieBtn = page.locator('button').filter({ hasText: /accept all/i }).first();
    if (await cookieBtn.isVisible({ timeout: 5000 })) {
      await cookieBtn.click();
      await page.waitForTimeout(500);
    }

    await page.context().storageState({ path: `${dir}/${name}.json` });
    await browser.close();
  }
}

export default globalSetup;