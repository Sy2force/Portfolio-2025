import { test, expect } from '@playwright/test';

test.describe('Contact Page Tests', () => {
  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Contact.*Portfolio|Portfolio.*Contact/);
    
    // Check for contact title and form
    await expect(page.locator('[data-testid="contact-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible();
    
    // Check for required form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.click('[data-testid="submit-button"]');
    
    // Check for HTML5 validation (required fields)
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required');
    
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required');
    
    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toHaveAttribute('required');
  });

  test('should fill and submit contact form', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message');
    
    // Submit the form
    await page.click('[data-testid="submit-button"]');
    
    // Wait for loading state
    await expect(page.locator('[data-testid="submit-button"]')).toContainText('Envoi en cours...');
    
    // Wait for response (success or error message)
    await page.waitForTimeout(3000);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');
    
    // Check if form is visible and properly sized
    await expect(page.locator('form')).toBeVisible();
    
    // Check if form fields are properly sized for mobile
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
    
    const inputBox = await nameInput.boundingBox();
    if (inputBox) {
      expect(inputBox.width).toBeLessThan(350); // Should fit mobile screen
    }
  });
});
