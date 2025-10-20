import { test, expect } from '@playwright/test';

test.describe('Projects Page Tests', () => {
  test('should load projects page successfully', async ({ page }) => {
    await page.goto('/projects');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Projets.*Shay Acoca.*Portfolio.*Digital Marketing.*Développement/);
    
    // Check for projects title and grid
    await expect(page.locator('[data-testid="projects-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="projects-grid"]')).toBeVisible();
    
    // Wait for projects to load
    await page.waitForTimeout(2000);
    
    // Check if project cards are present
    const projectCards = page.locator('.glass-card').filter({ has: page.locator('h3') });
    await expect(projectCards.first()).toBeVisible();
  });

  test('should have working project links', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for projects to load
    await page.waitForTimeout(2000);
    
    // Check if project links are present
    const projectLinks = page.locator('a').filter({ hasText: 'Voir le projet' });
    await expect(projectLinks.first()).toBeVisible();
    
    // Check if GitHub links are present (using aria-label)
    const githubLinks = page.locator('a[aria-label*="code source"]');
    await expect(githubLinks.first()).toBeVisible();
  });

  test('should filter projects correctly', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for projects to load
    await page.waitForTimeout(2000);
    
    // Check if filter tabs exist
    const filterTabs = page.locator('button').filter({ hasText: /Tous les projets|Web Apps|Mobile Apps|Sites Web|E-commerce/ });
    await expect(filterTabs.first()).toBeVisible();
    
    // Test "All" filter is active by default
    const allFilter = page.locator('button').filter({ hasText: 'Tous les projets' });
    await expect(allFilter).toHaveClass(/bg-gradient-to-r/);
    
    // Check if all projects are visible initially
    const projectCards = page.locator('.glass-card').filter({ has: page.locator('h3') });
    const initialCount = await projectCards.count();
    expect(initialCount).toBeGreaterThan(0);
  });

  test('should have responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects');
    
    // Wait for mobile layout to adapt
    await page.waitForTimeout(1000);
    
    // Check if projects are displayed in mobile layout
    const projectCard = page.locator('.glass-card').filter({ has: page.locator('h3') });
    await expect(projectCard.first()).toBeVisible();
    
    // Check if mobile menu button is visible
    const mobileMenuButton = page.locator('button').filter({ hasText: /menu/i }).or(page.locator('[aria-label*="menu"]'));
    await expect(mobileMenuButton.first()).toBeVisible();
    
    // Check if filter tabs are responsive
    const filterTab = page.locator('button').filter({ hasText: /Tous les projets|Web Apps/ });
    await expect(filterTab.first()).toBeVisible();
  });
});
