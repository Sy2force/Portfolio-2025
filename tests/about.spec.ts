import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
  test('should load about page successfully', async ({ page }) => {
    await page.goto('/about');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/About.*Portfolio|Portfolio.*About/);
    
    // Check for about title and main sections
    await expect(page.locator('[data-testid="about-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="about-content"]')).toBeVisible();
    
    // Wait for animations to load
    await page.waitForTimeout(2000);
  });

  test('should display skills and timeline', async ({ page }) => {
    await page.goto('/about');
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Check if skills section is displayed
    await expect(page.locator('[data-testid="skills-section"]')).toBeVisible();
    
    // Check if timeline/experience section is displayed
    await expect(page.locator('[data-testid="experience-section"]')).toBeVisible();
    
    // Check for skill items
    const skillItems = page.locator('[data-testid="skill-item"]');
    await expect(skillItems.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/about');
    
    // Wait for mobile layout to adapt
    await page.waitForTimeout(1000);
    
    // Check if content is visible and properly sized
    await expect(page.locator('[data-testid="about-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Check if skills section is responsive
    await expect(page.locator('[data-testid="skills-section"]')).toBeVisible();
  });
});
