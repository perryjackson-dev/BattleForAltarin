import { expect, test } from '@playwright/test'
test('loads the Battle for Altarin application shell', async ({ page }) => { await page.goto('/'); await expect(page.getByRole('heading', { name: 'Battle for Altarin' })).toBeVisible(); await expect(page.getByRole('navigation', { name: 'Game views' })).toBeVisible() })
