const { test, expect, beforeEach, describe } = require('@playwright/test');

describe.only('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to Application')).toBeVisible();

    await expect(page.getByText('Username')).toBeVisible();
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
  });
});
