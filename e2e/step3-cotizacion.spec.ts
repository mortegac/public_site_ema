import { test } from '@playwright/test'

test('navigate to cotizacion step and inspect email button area', async ({ page }) => {
  await page.goto('/cotizador')
  // Wait for step 0 to be visible
  await page.locator('[data-testid="card-casa"]').waitFor({ state: 'visible', timeout: 15000 })

  // Step 0: Select Casa
  await page.locator('[data-testid="card-casa"]').click()
  await page.waitForTimeout(300)
  await page.locator('[data-testid="btn-next"]').click()
  await page.waitForTimeout(1000)

  // Step 1 (Cargador): select Wallbox — this sets tipoC='wallbox', chargerId='own', enabling the button
  await page.locator('[data-testid="card-wallbox"]').waitFor({ state: 'visible', timeout: 5000 })
  await page.locator('[data-testid="card-wallbox"]').click()
  await page.waitForTimeout(500)

  // Click "Ver mi cotización"
  await page.locator('[data-testid="btn-next"]').click()

  // Wait for the loading overlay to disappear and the price to appear
  // The price step shows "Total estimado (con IVA)" when ready
  await page.locator('text=Total estimado (con IVA)').waitFor({ state: 'visible', timeout: 15000 })
  await page.waitForTimeout(500) // small settle time

  // Now on cotizacion step with price visible
  const bodyText = await page.locator('body').innerText()
  console.log('COTIZACION TEXT:', bodyText.substring(0, 6000))

  await page.screenshot({ path: 'test-results/cotiz-price-top-viewport.png', fullPage: false })
  await page.screenshot({ path: 'test-results/cotiz-price-full.png', fullPage: true })

  // Count trust badge appearances
  const trustBadgeCount = await page.locator('text=Tu reserva protegida').count()
  console.log('TRUST BADGE COUNT:', trustBadgeCount)

  // Check shield/badge near price (line ~817 in code — should be just below price)
  const shieldNearPrice = page.locator('text=Tu reserva protegida').first()
  const shieldBox = await shieldNearPrice.boundingBox().catch(() => null)
  console.log('SHIELD NEAR PRICE BOX:', JSON.stringify(shieldBox))

  // Find email button
  const emailBtn = page.locator('button:has-text("Enviar mi cotización por email")')
  const emailVisible = await emailBtn.isVisible({ timeout: 3000 }).catch(() => false)
  console.log('EMAIL BUTTON VISIBLE:', emailVisible)

  if (emailVisible) {
    // Scroll to email button
    await emailBtn.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'test-results/cotiz-email-area.png', fullPage: false })

    const emailBox = await emailBtn.boundingBox()
    console.log('EMAIL BTN BOUNDING BOX:', JSON.stringify(emailBox))

    // Check all trust badge occurrences and their positions
    const trustBadges = page.locator('text=Tu reserva protegida')
    const count = await trustBadges.count()
    console.log('ALL TRUST BADGES COUNT:', count)
    for (let i = 0; i < count; i++) {
      const box = await trustBadges.nth(i).boundingBox()
      console.log(`TRUST BADGE [${i}] BOUNDING BOX:`, JSON.stringify(box))
    }

    // Check if any trust badge appears below the email button (higher Y value)
    if (emailBox && count > 0) {
      const emailBottomY = emailBox.y + emailBox.height
      for (let i = 0; i < count; i++) {
        const tBox = await trustBadges.nth(i).boundingBox()
        if (tBox) {
          const isBelowEmail = tBox.y > emailBottomY && tBox.y < emailBottomY + 200
          console.log(`TRUST BADGE [${i}] IS DIRECTLY BELOW EMAIL BTN:`, isBelowEmail, `(badge Y=${tBox.y}, emailBottom=${emailBottomY})`)
        }
      }
    }
  } else {
    console.log('EMAIL BUTTON NOT FOUND')
  }
})
