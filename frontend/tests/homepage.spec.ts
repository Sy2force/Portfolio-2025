import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads
    await expect(page).toHaveTitle(/Shay Acoca/);
    
    // Check hero section
    await expect(page.locator('h1')).toContainText('Shay Acoca');
    await expect(page.locator('text=Expert Création de Contenu')).toBeVisible();
    
    // Check navigation
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('text=Accueil')).toBeVisible();
    await expect(page.locator('text=À Propos')).toBeVisible();
    await expect(page.locator('text=Projets')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
    
    // Check language switcher
    await expect(page.locator('[data-testid="language-switcher"]')).toBeVisible();
  });

  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to About page
    await page.click('text=À Propos');
    await expect(page).toHaveURL('/about');
    
    // Test navigation to Projects page
    await page.click('text=Projets');
    await expect(page).toHaveURL('/projects');
    
    // Test navigation to Services page
    await page.click('text=Services');
    await expect(page).toHaveURL('/services');
    
    // Test navigation to Contact page
    await page.click('text=Contact');
    await expect(page).toHaveURL('/contact');
  });

  test('should change language', async ({ page }) => {
    await page.goto('/');
    
    // Click on language switcher
    await page.hover('[data-testid="language-switcher"]');
    
    // Switch to English
    await page.click('text=English');
    await expect(page.locator('text=Content Creation Expert')).toBeVisible();
    
    // Switch to Hebrew
    await page.hover('[data-testid="language-switcher"]');
    await page.click('text=עברית');
    await expect(page.locator('text=מומחה יצירת תוכן')).toBeVisible();
  });
});
