import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Shay Acoca/);
    
    // Check for main navigation elements
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for hero section
    await expect(page.locator('h1')).toBeVisible();
    
    // Wait for Matrix background to load
    await page.waitForTimeout(2000);
    
    // Check if Matrix background canvas is present
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to projects page
    await page.click('text=Projets');
    await expect(page).toHaveURL(/.*projects/);
    
    // Go back to home
    await page.goto('/');
    
    // Test navigation to about page
    await page.click('text=À propos');
    await expect(page).toHaveURL(/.*about/);
    
    // Test navigation to contact page
    await page.goto('/');
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Check if main content is visible
    await expect(page.locator('main')).toBeVisible();
  });
});
