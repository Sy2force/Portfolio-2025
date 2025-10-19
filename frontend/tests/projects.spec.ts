import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should load projects page and display project cards', async ({ page }) => {
    await page.goto('/projects');
    
    // Check page loads
    await expect(page).toHaveTitle(/Projets/);
    
    // Check project showcase is visible
    await expect(page.locator('[data-testid="projects-showcase"]')).toBeVisible();
    
    // Check filter buttons
    await expect(page.locator('text=Tous')).toBeVisible();
    await expect(page.locator('text=SaaS')).toBeVisible();
    await expect(page.locator('text=E-Commerce')).toBeVisible();
  });

  test('should filter projects by category', async ({ page }) => {
    await page.goto('/projects');
    
    // Click on SaaS filter
    await page.click('text=SaaS');
    
    // Wait for animation to complete
    await page.waitForTimeout(500);
    
    // Click on E-Commerce filter
    await page.click('text=E-Commerce');
    
    // Wait for animation to complete
    await page.waitForTimeout(500);
    
    // Click on All filter
    await page.click('text=Tous');
  });

  test('should navigate to project detail page', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 5000 });
    
    // Click on first project card
    const firstProject = page.locator('[data-testid="project-card"]').first();
    await firstProject.click();
    
    // Should navigate to project detail page
    await expect(page).toHaveURL(/\/projects\/\d+/);
  });
});
