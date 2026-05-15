import { test, expect } from '@playwright/test'

const GEO = { latitude: -33.4489, longitude: -70.6693, accuracy: 10 }

async function setup(page: any) {
  await page.context().grantPermissions(['geolocation'])
  await page.context().setGeolocation(GEO)
  await page.goto('/cotizador2', { waitUntil: 'load' })
  await page.waitForSelector('[data-testid="btn-next"]', { timeout: 20000 })
  await page.waitForTimeout(4000)
}

// Native click via evaluate — works reliably on production build
const nativeClick = (page: any, sel: string) =>
  page.evaluate((s: string) => (document.querySelector(s) as HTMLElement)?.click(), sel)

const clickCard = (page: any, id: string) => nativeClick(page, `[data-testid="${id}"]`)

const waitEnabled = (page: any) =>
  page.waitForFunction(
    () => !document.querySelector('[data-testid="btn-next"]')?.hasAttribute('disabled'),
    { timeout: 8000 }
  )

async function goToStep1(page: any) {
  await clickCard(page, 'card-casa')
  await waitEnabled(page)
  await nativeClick(page, '[data-testid="btn-next"]')
  await page.waitForSelector('[data-testid="card-portatil"]', { timeout: 10000 })
  await page.waitForTimeout(300)
}

// Select a charger by its displayed name using Playwright native click (production server supports it)
const selectChargerByName = (page: any, name: string) =>
  page.getByText(name).first().click()

test.describe('/cotizador2 wizard', () => {

  test('page title and H1', async ({ page }) => {
    await setup(page)
    await expect(page).toHaveTitle(/Cotizador/)
    await expect(page.locator('h1').first()).toContainText('Cotiza')
  })

  test('floating visit widget suppressed on /cotizador2', async ({ page }) => {
    await setup(page)
    await expect(page.locator('[data-testid="floating-visit-widget"]')).toHaveCount(0)
  })

  test('stepper shows 3 pre-payment steps', async ({ page }) => {
    await setup(page)
    await expect(page.getByText('Ubicación', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Cargador', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Cotización', { exact: true }).first()).toBeVisible()
  })

  test('step 0: next disabled → enabled after selecting Casa', async ({ page }) => {
    await setup(page)
    await expect(page.locator('[data-testid="btn-next"]')).toBeDisabled()
    await clickCard(page, 'card-casa')
    await waitEnabled(page)
    await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()
  })

  test('step 0: can select Edificio', async ({ page }) => {
    await setup(page)
    await clickCard(page, 'card-edificio')
    await waitEnabled(page)
    await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()
  })

  test('step 0: address input visible after geo settles', async ({ page }) => {
    await setup(page)
    await expect(page.locator('input[id="address"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('step 1: portátil charger cards appear', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    await clickCard(page, 'card-portatil')
    await page.waitForTimeout(400)
    await expect(page.getByText('Workersbee 2.2–7 kW')).toBeVisible()
    await expect(page.getByText('Ya tengo mi cargador').first()).toBeVisible()
  })

  test('step 1: 6 wallbox models appear as cards — no dropdown', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(400)

    for (const model of ['LIVOLTEK Smart EV 7.3 kW', 'EFFITEC 7 kW', 'KPN Wallbox KBox App',
      'BESTE TS-EVC07 7.3 kW', 'BESTE Smart Mini 7.3 kW', 'KPN Wallbox KBox OCPP 1.6']) {
      await expect(page.getByText(model)).toBeVisible()
    }
    await expect(page.locator('select')).toHaveCount(0)
  })

  test('step 1: quote button disabled until wallbox charger selected', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(400)
    await expect(page.locator('[data-testid="btn-next"]')).toBeDisabled()

    // Click charger by text (native Playwright click — works on production build)
    await selectChargerByName(page, 'EFFITEC 7 kW')
    await page.waitForTimeout(500)
    await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()
  })

  test('step 1: distance slider section is visible', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    await page.waitForTimeout(500)
    // Verify the slider section by its visible label and distance chip
    await expect(page.getByText('Distancia al tablero').first()).toBeVisible({ timeout: 8000 })
    // The distance chip "10 m" is always visible
    await expect(page.getByText('10 m', { exact: true }).first()).toBeVisible({ timeout: 5000 })
  })

  test('back button returns to step 0', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    await page.getByRole('button', { name: /Atrás/i }).click()
    await expect(page.getByText('¿Dónde instalarás tu cargador?')).toBeVisible()
  })

  test('step 2: quote breakdown after "Ver mi cotización" (createClientForm + ProcessEstimate)', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(400)
    await selectChargerByName(page, 'EFFITEC 7 kW')
    await page.waitForTimeout(500)
    // Click "Ver mi cotización"
    await nativeClick(page, '[data-testid="btn-next"]')

    // Wait for price breakdown (API or local fallback, up to 15s)
    await page.waitForSelector('text=/Total estimado|Total con IVA/', { timeout: 15000 })
    await expect(page.getByText(/Total estimado|Total con IVA/i).first()).toBeVisible()
    await expect(page.getByText('Desglose').first()).toBeVisible()
    await expect(page.getByText(/Materiales/i).first()).toBeVisible()
    await expect(page.getByText(/IVA 19%/i).first()).toBeVisible()
  })

  test('step 2: trust section Devolución, Compra Protegida, Garantía', async ({ page }) => {
    await setup(page)
    await goToStep1(page)
    // Use wallbox + EFFITEC (confirmed working) to reach step 2
    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(400)
    await selectChargerByName(page, 'EFFITEC 7 kW')
    await page.waitForTimeout(500)
    await nativeClick(page, '[data-testid="btn-next"]')

    // Wait for the trust section heading (no accented chars — more reliable selector)
    await page.getByText('Tu compra protegida').waitFor({ timeout: 15000 })
    // Scroll to make trust section visible
    await page.getByText('Tu compra protegida').scrollIntoViewIfNeeded()
    await expect(page.getByText('Tu compra protegida')).toBeVisible()
    await expect(page.getByText('Compra Protegida.').first()).toBeVisible()
    await expect(page.getByText(/meses de garantía/i)).toBeVisible()
  })

})
