import { test } from '@playwright/test'

test('step2 screenshot - price area and email button', async ({ page }) => {
  // Use port 3002 as instructed
  await page.goto('/cotizador')

  // Wait for the wizard to load
  await page.waitForLoadState('networkidle')

  // Take initial screenshot to see what's on screen
  await page.screenshot({ path: 'test-results/step2-initial.png', fullPage: false })

  // Look for property type selection — try "Casa" first
  const casaButton = page.locator('text=Casa').first()
  if (await casaButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await casaButton.click()
    await page.waitForTimeout(500)
  }

  await page.screenshot({ path: 'test-results/step2-after-casa.png', fullPage: true })

  // Try clicking a "Siguiente" or "Continuar" button to advance steps
  const nextBtn = page.locator('button:has-text("Siguiente"), button:has-text("Continuar"), button:has-text("Ver mi cotización")').first()
  if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await nextBtn.click()
    await page.waitForTimeout(1000)
  }

  await page.screenshot({ path: 'test-results/step2-after-next1.png', fullPage: true })

  // Try another next click if needed to get to price/quotation step
  const nextBtn2 = page.locator('button:has-text("Siguiente"), button:has-text("Continuar"), button:has-text("Ver mi cotización"), button:has-text("Calcular")').first()
  if (await nextBtn2.isVisible({ timeout: 3000 }).catch(() => false)) {
    await nextBtn2.click()
    await page.waitForTimeout(1500)
  }

  await page.screenshot({ path: 'test-results/step2-after-next2.png', fullPage: true })

  // Check if email button is visible now
  const emailBtn = page.locator('text=Enviar mi cotización por email, text=cotización por email, text=email').first()
  if (await emailBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    // Scroll to the email button area and take screenshot
    await emailBtn.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'test-results/step2-email-button-area.png', fullPage: true })
  }

  // Full page screenshot of current state
  await page.screenshot({ path: 'test-results/step2-final.png', fullPage: true })
})
