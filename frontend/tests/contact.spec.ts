import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load contact page and display form', async ({ page }) => {
    await page.goto('/contact');
    
    // Check page title
    await expect(page).toHaveTitle(/Contact/);
    
    // Check contact form elements
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages (if implemented)
    // This will depend on your form validation implementation
  });

  test('should fill and submit contact form', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message or redirect
    // This will depend on your form submission implementation
  });
});
