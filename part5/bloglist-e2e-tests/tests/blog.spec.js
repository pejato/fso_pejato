const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require('./helper');

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
      await page.getByRole('button', { name: 'Login' }).click();

      const errorDiv = page.getByText('invalid username or password');
      await expect(errorDiv).toBeVisible();
      await expect(errorDiv).toHaveCSS('border-style', 'solid');
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
      await expect(errorDiv).toHaveCSS('background', 'rgb(211, 211, 211)');
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'pejato', 'oatmeal', 'Peter Tolsma');
    });

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click();
      await page.locator('input[name="Author"]').fill('Young Thug');
      await page.locator('input[name="Title"]').fill('Wyclef Jean');
      await page
        .locator('input[name="URL"]')
        .fill('https://en.wikipedia.org/wiki/Young_Thug');
      await page.getByRole('button', { name: 'Create' }).click();
      await expect(page.getByText('Wyclef Jean by Young Thug')).toBeVisible();
    });

    test('a blog can be liked after creation', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click();
      await page.locator('input[name="Author"]').fill('Young Thug');
      await page.locator('input[name="Title"]').fill('Wyclef Jean');
      await page
        .locator('input[name="URL"]')
        .fill('https://en.wikipedia.org/wiki/Young_Thug');
      await page.getByRole('button', { name: 'Create' }).click();
      await page.getByText('Wyclef Jean by Young Thug').waitFor();

      await page.getByRole('button', { name: 'View' }).click();
      await expect(page.getByText('Likes 0')).toBeVisible();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('Likes 1')).toBeVisible();
    });
  });
});
