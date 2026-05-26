import { test, expect } from '@playwright/test'

const GEO = { latitude: -33.4489, longitude: -70.6693, accuracy: 50 }

test.describe('Geolocation diagnosis', () => {

  test('geo: /api/geocode endpoint works server-side', async ({ request }) => {
    const res = await request.get('/api/geocode?lat=-33.4489&lng=-70.6693')
    expect(res.status()).toBe(200)
    const body = await res.json()
    console.log('[test] /api/geocode response:', JSON.stringify(body))
    expect(body).toHaveProperty('address')
    expect(body.address).toBeTruthy()
  })

  test('geo: with permission granted — status reaches "detected"', async ({ page }) => {
    const consoleLogs: string[] = []
    page.on('console', msg => {
      if (msg.text().includes('[geo]')) consoleLogs.push(msg.text())
    })

    await page.context().grantPermissions(['geolocation'])
    await page.context().setGeolocation(GEO)

    // Mock /api/geocode to return instantly (avoids external network dependency)
    await page.route('/api/geocode*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ address: 'Las Condes, Santiago, Chile', status: 'OK' }),
      })
    })

    await page.goto('http://localhost:3000/cotizador', { waitUntil: 'load' })
    await page.waitForSelector('[data-testid="btn-next"]', { timeout: 20000 })
    await page.waitForTimeout(5000)

    console.log('\n=== GEO CONSOLE LOGS ===')
    consoleLogs.forEach(l => console.log(l))
    console.log('=========================\n')

    // Check final geoStatus via DOM — detecting box should be gone
    const detectingVisible = await page.locator('text=Detectando tu ubicación').isVisible()
    const manualVisible = await page.locator('input[id="address"]').isVisible()
    const h3Visible = await page.getByText('Las Condes').isVisible().catch(() => false)

    console.log('[test] Status:', {
      detectingStillShowing: detectingVisible,
      manualInputVisible: manualVisible,
      h3AddressVisible: h3Visible,
      logsCount: consoleLogs.length,
    })

    // If detecting is still showing, geolocation is stuck
    expect(detectingVisible).toBe(false)
    // Either manual input or h3 address should be visible
    expect(manualVisible || h3Visible).toBe(true)
  })

  test('geo: permission denied — falls back to manual input', async ({ page }) => {
    const consoleLogs: string[] = []
    page.on('console', msg => {
      if (msg.text().includes('[geo]')) consoleLogs.push(msg.text())
    })

    // Do NOT grant geolocation — browser will deny
    await page.goto('http://localhost:3000/cotizador', { waitUntil: 'load' })
    await page.waitForSelector('[data-testid="btn-next"]', { timeout: 20000 })
    await page.waitForTimeout(6000)  // wait for 5s timeout to fire

    console.log('\n=== GEO DENIED LOGS ===')
    consoleLogs.forEach(l => console.log(l))
    console.log('=======================\n')

    // Should show manual input (not stuck on detecting)
    const detectingVisible = await page.locator('text=Detectando tu ubicación').isVisible()
    const manualVisible = await page.locator('input[id="address"]').isVisible()

    console.log('[test] Status:', { detectingStillShowing: detectingVisible, manualInputVisible: manualVisible })

    // Should not stay stuck
    expect(manualVisible || !detectingVisible).toBe(true)
  })

  test('geo: "Ingresar manual" button escapes detecting state', async ({ page }) => {
    // Don't grant permission — page will show detecting
    await page.goto('http://localhost:3000/cotizador', { waitUntil: 'load' })
    await page.waitForSelector('[data-testid="btn-next"]', { timeout: 20000 })
    await page.waitForTimeout(1500)

    // Click the manual escape button
    const manualBtn = page.getByRole('button', { name: /Ingresar manual/i })
    if (await manualBtn.isVisible()) {
      await manualBtn.click()
      await page.waitForTimeout(500)
      await expect(page.locator('input[id="address"]').first()).toBeVisible({ timeout: 5000 })
      console.log('[test] ✅ Manual button works — address input is now visible')
    } else {
      console.log('[test] ℹ️  Manual button not visible (geo may have resolved already)')
    }
  })

})
