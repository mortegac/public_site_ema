import { test } from '@playwright/test'

test('navigate to step 2 and screenshot', async ({ page }) => {
  await page.goto('/cotizador')
  // Wait for the Casa button to be visible (page loaded enough)
  await page.locator('text=Casa').first().waitFor({ state: 'visible', timeout: 15000 })

  await page.screenshot({ path: 'test-results/nav-step1.png', fullPage: true })

  // Select "Casa"
  await page.locator('text=Casa').first().click()
  await page.waitForTimeout(300)

  // Click "Siguiente →"
  await page.locator('button:has-text("Siguiente")').click()
  await page.waitForTimeout(1500)

  // Capture step 2 state - dump buttons and text
  const buttons2 = await page.locator('button').allTextContents()
  console.log('STEP2 BUTTONS:', JSON.stringify(buttons2))
  const bodyText2 = await page.locator('body').innerText()
  console.log('STEP2 TEXT:', bodyText2.substring(0, 3000))

  await page.screenshot({ path: 'test-results/nav-step2.png', fullPage: true })

  // If there's another "Siguiente" (charger step), click it
  const nextBtn = page.locator('button:has-text("Siguiente")')
  if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await nextBtn.click()
    await page.waitForTimeout(1500)

    const buttons3 = await page.locator('button').allTextContents()
    console.log('STEP3 BUTTONS:', JSON.stringify(buttons3))
    const bodyText3 = await page.locator('body').innerText()
    console.log('STEP3 TEXT:', bodyText3.substring(0, 4000))

    await page.screenshot({ path: 'test-results/nav-step3.png', fullPage: true })
  }
})
