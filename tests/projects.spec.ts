import { test, expect } from '@playwright/test';

test.describe('Projects Page Tests', () => {
  test('should load projects page successfully', async ({ page }) => {
    await page.goto('/projects');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Projects.*Portfolio|Portfolio.*Projects/);
    
    // Check for projects title and grid
    await expect(page.locator('[data-testid="projects-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="projects-grid"]')).toBeVisible();
    
    // Wait for projects to load
    await page.waitForTimeout(2000);
    
    // Check if project cards are present
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards.first()).toBeVisible();
  });

  test('should have working project links', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for projects to load
    await page.waitForTimeout(2000);
    
    // Check if "Voir le projet" links are present
    const viewProjectLinks = page.locator('text=Voir le projet');
    await expect(viewProjectLinks.first()).toBeVisible();
    
    // Check if "Code source" links are present
    const codeSourceLinks = page.locator('text=Code source');
    await expect(codeSourceLinks.first()).toBeVisible();
  });

  test('should filter projects correctly', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for projects to load
    await page.waitForTimeout(2000);
    
    // Check if filter tabs exist
    const filterTabs = page.locator('[data-testid="filter-tab"]');
    await expect(filterTabs.first()).toBeVisible();
    
    // Test "All" filter is active by default
    await expect(page.locator('[data-testid="filter-tab"]:has-text("All")')).toHaveClass(/active|bg-\[#00FFAA\]/);
    
    // Check if all projects are visible initially
    const projectCards = page.locator('[data-testid="project-card"]');
    const initialCount = await projectCards.count();
    expect(initialCount).toBeGreaterThan(0);
  });

  test('should have responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects');
    
    // Wait for mobile layout to adapt
    await page.waitForTimeout(1000);
    
    // Check if projects are displayed in mobile layout
    await expect(page.locator('[data-testid="project-card"]')).toBeVisible();
    
    // Check if mobile menu button is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Check if filter tabs are responsive
    await expect(page.locator('[data-testid="filter-tab"]')).toBeVisible();
  });
});
