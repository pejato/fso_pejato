const loginWith = async (page, username, password, name) => {
  await page.locator('input[name="Username"]').fill(username);
  await page.locator('input[name="Password"]').fill(password);
  await page.getByRole('button', { name: 'Login ' }).click();
  await page.getByText(`Logged in as ${name}`).waitFor();
};

const createBlog = async (page, author, title, url) => {
  await page.getByRole('button', { name: 'Create new blog' }).click();
  await page.locator('input[name="Author"]').fill(author);
  await page.locator('input[name="Title"]').fill(title);
  await page.locator('input[name="URL"]').fill(url);
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText(`${title} by ${author}`).waitFor();
};

export { loginWith, createBlog };
