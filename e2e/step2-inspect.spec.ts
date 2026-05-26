import { test } from '@playwright/test'

test('inspect cotizador DOM structure', async ({ page }) => {
  await page.goto('/cotizador')
  await page.waitForLoadState('networkidle')

  // Dump all button text content
  const buttons = await page.locator('button').allTextContents()
  console.log('BUTTONS:', JSON.stringify(buttons))

  // Dump all visible text in first 3000 chars
  const bodyText = await page.locator('body').innerText()
  console.log('BODY TEXT (first 2000):', bodyText.substring(0, 2000))

  await page.screenshot({ path: 'test-results/inspect-initial.png', fullPage: true })
})
