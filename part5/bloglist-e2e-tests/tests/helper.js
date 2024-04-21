const loginWith = async (page, username, password, name) => {
  await page.locator('input[name="Username"]').fill(username);
  await page.locator('input[name="Password"]').fill(password);
  await page.getByRole('button', { name: 'Login ' }).click();
  await page.getByText(`Logged in as ${name}`).waitFor();
};

export { loginWith };
