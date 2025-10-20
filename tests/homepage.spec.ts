import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Portfolio.*Shay.*Acoca|Shay.*Acoca.*Portfolio/);
    
    // Check for main navigation elements
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible();
    
    // Check for hero section with Matrix theme
    await expect(page.locator('[data-testid="hero-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="hero-subtitle"]')).toBeVisible();
    
    // Wait for animations to load
    await page.waitForTimeout(3000);
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to projects page
    await page.click('[data-testid="nav-projects"]');
    await expect(page).toHaveURL(/.*projects/);
    await expect(page.locator('[data-testid="projects-title"]')).toBeVisible();
    
    // Test navigation to about page
    await page.click('[data-testid="nav-about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('[data-testid="about-title"]')).toBeVisible();
    
    // Test navigation to contact page
    await page.click('[data-testid="nav-contact"]');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('[data-testid="contact-title"]')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Check if main content is visible and responsive
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('[data-testid="hero-title"]')).toBeVisible();
    
    // Test mobile menu functionality
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });
});
