import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
  test('should load about page successfully', async ({ page }) => {
    await page.goto('/about');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/À propos.*Shay Acoca.*Digital Marketer.*Full-Stack Developer/);
    
    // Check for about title and main sections
    await expect(page.locator('[data-testid="about-title"]')).toBeVisible();
    const aboutContent = page.locator('.glass-card').first();
    await expect(aboutContent).toBeVisible();
    
    // Wait for animations to load
    await page.waitForTimeout(2000);
  });

  test('should display skills and timeline', async ({ page }) => {
    await page.goto('/about');
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Check if skills section is displayed
    await expect(page.locator('[data-testid="skills-section"]')).toBeVisible();
    
    // Check if timeline section is displayed
    const timeline = page.locator('text=Timeline').first();
    await expect(timeline).toBeVisible();
    
    // Check for skill categories
    const skillCategories = page.locator('.glass-card').filter({ hasText: /Frontend|Backend|Design|Marketing/ });
    await expect(skillCategories.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/about');
    
    // Wait for mobile layout to adapt
    await page.waitForTimeout(1000);
    
    // Check if content is visible and properly sized
    const aboutTitle = page.locator('[data-testid="about-title"]');
    await expect(aboutTitle).toBeVisible();
    const mobileMenuButton = page.locator('button').filter({ hasText: /menu/i }).or(page.locator('[aria-label*="menu"]'));
    await expect(mobileMenuButton.first()).toBeVisible();
    
    // Check if skills section is responsive
    await expect(page.locator('[data-testid="skills-section"]')).toBeVisible();
  });
});
