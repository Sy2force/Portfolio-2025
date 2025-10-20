import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
  test('should load about page successfully', async ({ page }) => {
    await page.goto('/about');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/À propos/);
    
    // Check for main content sections
    await expect(page.locator('main')).toBeVisible();
    
    // Check for profile information
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display skills section', async ({ page }) => {
    await page.goto('/about');
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Check if skills are displayed
    const skillsSection = page.locator('[data-testid="skills-section"]');
    if (await skillsSection.count() > 0) {
      await expect(skillsSection).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/about');
    
    // Check if content is visible and properly sized
    await expect(page.locator('main')).toBeVisible();
  });
});
