const { test, expect, beforeEach, describe } = require('@playwright/test');

describe.only('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Peter Tolsma',
        username: 'pejato',
        password: 'oatmeal',
      },
    });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to Application')).toBeVisible();

    await expect(page.getByText('Username')).toBeVisible();
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
    await page.getByRole('button', { name: 'Login ' }).click();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('pejato');
      await page.locator('input[name="Password"]').fill('oatmeal');
      await page.getByRole('button', { name: 'Login ' }).click();
      await expect(page.getByText('Blogs', { exact: true })).toBeVisible();
      await expect(page.getByText('Logged in as Peter Tolsma')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('pejato');
      await page.locator('input[name="Password"]').fill('porridge');
      await page.getByRole('button', { name: 'Login ' }).click();

      const errorDiv = page.getByText('invalid username or password');
      await expect(errorDiv).toBeVisible();
      await expect(errorDiv).toHaveCSS('border-style', 'solid');
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
      await expect(errorDiv).toHaveCSS('background', 'rgb(211, 211, 211)');
    });
  });
});
