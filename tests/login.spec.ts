import { test, expect } from '@playwright/test';
import 'dotenv/config';

const { BASE_URL, USER_NAME, PASSWORD } = process.env as Record<string, string>;

test('Caso exitoso de login', async ({ page }) => {
  await page.goto(BASE_URL);
  // credenciales 

  await page.fill('#user-name', USER_NAME);
  await page.fill('#password', PASSWORD);

  // accion
  await page.click('#login-button');
  await expect(page).toHaveURL(BASE_URL+'/inventory.html');

  // evidencias
  await page.screenshot({ path: 'evidencias/login-exitoso.png' });
});

test('Caso fallido de login', async ({ page }) => {
  await page.goto(BASE_URL);
  // credenciales 
  await page.fill('#user-name', USER_NAME);
  await page.fill('#password', 'cualquier cosa');

  // accion
  await page.click('#login-button');
  await expect(page.locator('.error-message-container')) .toContainText('Username and password do not match any user in this service');
  
  // evidencias
  await page.screenshot({ path: 'evidencias/login-fallido.png' });
});