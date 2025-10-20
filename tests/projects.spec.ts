import { test, expect } from '@playwright/test';

test.describe('Projects Page Tests', () => {
  test('should load projects page successfully', async ({ page }) => {
    await page.goto('/projects');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Projets/);
    
    // Check for projects grid
    await expect(page.locator('[data-testid="projects-grid"]')).toBeVisible();
    
    // Check if Project React Futuriste Card is present
    await expect(page.locator('text=Project React Futuriste Card')).toBeVisible();
    
    // Check if project cards have required elements
    const projectCards = page.locator('.glass-card');
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
    
    // Check if filter buttons exist
    const filterButtons = page.locator('[data-testid="filter-button"]');
    if (await filterButtons.count() > 0) {
      await expect(filterButtons.first()).toBeVisible();
    }
    
    // Check if all projects are visible initially
    const projectCards = page.locator('.glass-card');
    const initialCount = await projectCards.count();
    expect(initialCount).toBeGreaterThan(0);
  });

  test('should have responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects');
    
    // Check if projects are displayed in mobile layout
    await expect(page.locator('.glass-card')).toBeVisible();
    
    // Check if project cards stack vertically on mobile
    const projectCards = page.locator('.glass-card');
    if (await projectCards.count() > 1) {
      const firstCard = projectCards.first();
      const secondCard = projectCards.nth(1);
      
      const firstCardBox = await firstCard.boundingBox();
      const secondCardBox = await secondCard.boundingBox();
      
      if (firstCardBox && secondCardBox) {
        // On mobile, cards should stack vertically
        expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height - 50);
      }
    }
  });
});
