const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

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
      await expect(errorDiv).toHaveCSS('color', /rgb\(255, 0, 0\)/);
      await expect(errorDiv).toHaveCSS('background', /rgb\(211, 211, 211\)/);
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
      await createBlog(
        page,
        'Young Thug',
        'Wyclef Jean',
        'https://en.wikipedia.org/wiki/Young_Thug',
      );

      await page.getByRole('button', { name: 'View' }).click();
      await expect(page.getByText('Likes 0')).toBeVisible();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('Likes 1')).toBeVisible();
    });

    test('a blog can be deleted by the user who created it', async ({
      page,
    }) => {
      await createBlog(
        page,
        'Young Thug',
        'Wyclef Jean',
        'https://en.wikipedia.org/wiki/Young_Thug',
      );

      await page.getByRole('button', { name: 'View' }).click();
      await page.getByText('Likes 0').waitFor();

      page.on('dialog', (dialog) => dialog.accept());
      await page.getByRole('button', { name: 'Remove' }).click();

      const notificationDiv = page.getByText("Removed 'Wyclef Jean'");
      await expect(notificationDiv).toBeVisible();

      await expect(notificationDiv).toHaveCSS('border-style', 'solid');
      await expect(notificationDiv).toHaveCSS('color', /rgb\(0, 128, 0\)/);
      await expect(notificationDiv).toHaveCSS(
        'background',
        /rgb\(211, 211, 211\)/,
      );
    });

    test('a blog cannot be deleted by users who did not create it', async ({
      page,
      request,
    }) => {
      const user = {
        name: 'Kendrick Lamar',
        username: 'kenny',
        password: 'dna',
      };
      await request.post('/api/users', {
        data: user,
      });
      await createBlog(
        page,
        'Young Thug',
        'Wyclef Jean',
        'https://en.wikipedia.org/wiki/Young_Thug',
      );

      await page.getByRole('button', { name: 'Log out' }).click();

      await loginWith(page, user.username, user.password, user.name);

      await page.getByRole('button', { name: 'View' }).click();
      await page.getByText('Likes 0').waitFor();
      await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(0);
    });

    test('blogs are sorted with most likes first', async ({ page }) => {
      const blogs = [
        { author: 'First author', title: 'First title', url: 'First url' },
        { author: 'Second author', title: 'Second title', url: 'Second url' },
        { author: 'Third author', title: 'Third title', url: 'Third url' },
      ];
      const likesForBlog = [1, 3, 2];
      for (const blog of blogs) {
        await createBlog(page, blog.author, blog.title, blog.url);
      }

      for (let i = 0; i < 3; i += 1) {
        const blog = blogs[i];

        const blogDiv = page.getByText(`${blog.title} by ${blog.author}`);
        await blogDiv.getByRole('button', { name: 'View' }).click();
        await blogDiv.getByText(blog.url).waitFor();
        const likeButton = blogDiv.getByRole('button', { name: 'like' });

        for (let j = 0; j < likesForBlog[i]; j += 1) {
          await likeButton.click();
          await blogDiv.getByText(`Likes ${j + 1}`).waitFor();
        }
      }

      await expect(
        page.getByText('title by').nth(0).getByText('Likes 3'),
      ).toBeVisible();
      await expect(
        page.getByText('title by').nth(1).getByText('Likes 2'),
      ).toBeVisible();
      await expect(
        page.getByText('title by').nth(2).getByText('Likes 1'),
      ).toBeVisible();
    });
  });
});
