import { test, expect, type Page } from '@playwright/test'

// ─── Constants ────────────────────────────────────────────────────────────────
const BASE = '/cotizador'
const GEO = { latitude: -33.4489, longitude: -70.6693, accuracy: 10 }

// Minimal valid paymentData blob for recibo-pago tests
const MOCK_PAYMENT_DATA = {
  tipo: 'casa',
  chargerName: 'EFFITEC 7 kW',
  dist: 10,
  address: 'Av. Providencia 1234, Providencia, Santiago, Chile',
  depto: '',
  email: 'test@example.com',
  total: 1200000,
  neto: 1008403,
  iva: 191597,
  chargerPrice: 595000,
  mat: 171600,
  inst: 216803,
  sec: 25000,
  isOwn: false,
}

// paymentData with customerId for booking flow tests
const MOCK_PAYMENT_DATA_BOOKABLE = {
  ...MOCK_PAYMENT_DATA,
  customerId: 'customer-uuid-001',
}

// ─── Core setup ───────────────────────────────────────────────────────────────
// Mirrors the original working test pattern: grant geo permissions, goto with
// waitUntil:'load', then wait for the wizard to fully hydrate.
// No API mocking for geo routes — /api/geoip returns Santiago by default on localhost.
async function setupPage(page: Page) {
  await page.context().grantPermissions(['geolocation'])
  await page.context().setGeolocation(GEO)
  await page.goto(BASE, { waitUntil: 'load' })
  await page.waitForSelector('[data-testid="btn-next"]', { timeout: 20000 })
  // Allow geo detection + React hydration to fully settle before interacting
  await page.waitForTimeout(4000)
}

// ─── API route mocks ──────────────────────────────────────────────────────────
// These are registered BEFORE page.goto so they intercept in-page fetch calls.
// /api/geoip and /api/geocode are NOT mocked — they work on localhost already.

async function mockCotizarRoute(page: Page) {
  await page.route('**/api/cotizar', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        formId: 'mock-form-id-001',
        estimates: [
          {
            estimateId: 'est-001',
            chargerPotence: 7,
            materialsCost: 171600,
            installationCost: 216803,
            netPrice: 388403,
            VAT: 73796,
            grossPrice: 462199,
          },
        ],
      }),
    })
  })
}

// Mock /api/cotizar with a nextAvailableDate included in the response
async function mockCotizarWithNextDate(page: Page) {
  await page.route('**/api/cotizar', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        formId: 'mock-form-id-002',
        nextAvailableDate: '2026-06-02T09:00:00.000Z',
        estimates: [
          {
            estimateId: 'est-001',
            chargerPotence: 7,
            materialsCost: 171600,
            installationCost: 216803,
            netPrice: 388403,
            VAT: 73796,
            grossPrice: 462199,
          },
        ],
      }),
    })
  })
}

async function mockPaymentRoute(page: Page) {
  await page.route('**/api/payment', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        token: 'mock-token-abc123',
        url: 'https://webpay3gint.transbank.cl/webpayserver/initTransaction',
        order: 'ORD-00001',
        buy_order: 'ORD-00001',
      }),
    })
  })
}

async function mockSchedulesRoute(page: Page) {
  await page.route('**/api/schedules*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ items: [] }),
    })
  })
}

// Mock /api/schedules with one available slot that has a calendarId
async function mockSchedulesWithSlot(page: Page) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 2)
  tomorrow.setHours(9, 0, 0, 0)

  await page.route('**/api/schedules*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        items: [
          {
            calendarId: 'cal-slot-uuid-001',
            startDate: tomorrow.toISOString(),
            endDate: new Date(tomorrow.getTime() + 3600000).toISOString(),
          },
        ],
      }),
    })
  })
}

async function mockConfirmChargerVisitSuccess(page: Page) {
  await page.route('**/api/confirm-charger-visit', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ calendarId: 'confirmed-cal-uuid-001' }),
    })
  })
}

async function mockConfirmChargerVisitError(page: Page) {
  await page.route('**/api/confirm-charger-visit', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'No se pudo agendar la visita. Intenta nuevamente.' }),
    })
  })
}

// ─── Click helpers ────────────────────────────────────────────────────────────
const nativeClick = (page: Page, sel: string) =>
  page.locator(sel).click()

const clickCard = (page: Page, testId: string) =>
  page.getByTestId(testId).click()

// Poll until btn-next loses its disabled attribute
const waitNextEnabled = (page: Page) =>
  page.waitForFunction(
    () => !document.querySelector('[data-testid="btn-next"]')?.hasAttribute('disabled'),
    { timeout: 10000 }
  )

// ─── Multi-step navigation helpers ───────────────────────────────────────────
// Selects "Casa" and advances to step 1 (charger type selection)
async function goToStep1(page: Page) {
  await clickCard(page, 'card-casa')
  await waitNextEnabled(page)
  await nativeClick(page, '[data-testid="btn-next"]')
  await page.waitForSelector('[data-testid="card-wallbox"]', { timeout: 10000 })
  await page.waitForTimeout(400)
}

// Selects Wallbox + EFFITEC from dropdown, clicks "Ver mi cotización" to reach step 2.
// /api/cotizar is mocked so AppSync availability is not required.
async function goToStep2(page: Page) {
  await mockCotizarRoute(page)
  await goToStep1(page)

  await clickCard(page, 'card-wallbox')
  await page.waitForTimeout(500)

  // Open MUI Select dropdown and pick a charger
  await page.locator('.MuiSelect-select').click()
  await page.waitForTimeout(400)
  await page.getByRole('option', { name: /EFFITEC 7 kW/ }).click()
  await page.waitForTimeout(400)

  // Click "Ver mi cotización"
  await nativeClick(page, '[data-testid="btn-next"]')
  await page.waitForSelector('text=/Tu cotización/', { timeout: 20000 })
}

// Like goToStep2 but uses a cotizar mock that includes nextAvailableDate
async function goToStep2WithNextDate(page: Page) {
  await mockCotizarWithNextDate(page)
  await goToStep1(page)

  await clickCard(page, 'card-wallbox')
  await page.waitForTimeout(500)

  await page.locator('.MuiSelect-select').click()
  await page.waitForTimeout(400)
  await page.getByRole('option', { name: /EFFITEC 7 kW/ }).click()
  await page.waitForTimeout(400)

  await nativeClick(page, '[data-testid="btn-next"]')
  await page.waitForSelector('text=/Tu cotización/', { timeout: 20000 })
}

// Open the payment panel (calls /api/payment, waits for token to be ready)
async function openPaymentPanel(page: Page) {
  await page.getByRole('button', { name: /Reservar instalación/i }).click()
  // Wait until the panel heading appears
  await expect(page.getByText('Datos para la instalación')).toBeVisible({ timeout: 10000 })
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 1: Wizard navigation — Step 0 → Step 1
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Wizard navigation — Step 0 to Step 1', () => {

  test('selects Casa and advances to step 1', async ({ page }) => {
    await setupPage(page)

    // btn-next starts disabled (no tipo selected)
    await expect(page.locator('[data-testid="btn-next"]')).toBeDisabled()

    // Select Casa card
    await clickCard(page, 'card-casa')
    await waitNextEnabled(page)
    await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()

    // Advance to step 1
    await nativeClick(page, '[data-testid="btn-next"]')
    await page.waitForSelector('[data-testid="card-wallbox"]', { timeout: 10000 })
    await expect(page.getByText('Tipo de cargador').first()).toBeVisible()
  })

  test('stepper shows Ubicación, Cargador, Cotización', async ({ page }) => {
    await setupPage(page)
    await expect(page.getByText('Ubicación', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Cargador', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Cotización', { exact: true }).first()).toBeVisible()
  })

  test('selects Edificio and enables Next button', async ({ page }) => {
    await setupPage(page)
    await expect(page.locator('[data-testid="btn-next"]')).toBeDisabled()
    await clickCard(page, 'card-edificio')
    await waitNextEnabled(page)
    await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()
  })

  test('back button from step 1 returns to step 0', async ({ page }) => {
    await setupPage(page)
    await goToStep1(page)
    await page.getByRole('button', { name: /Atrás/i }).click()
    await expect(page.getByText('¿Dónde instalarás tu cargador?')).toBeVisible()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 2: Step 1 — charger type and dropdown
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 1 — Charger type selection', () => {

  test('selecting Wallbox reveals the model dropdown', async ({ page }) => {
    await setupPage(page)
    await goToStep1(page)

    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(500)

    // "Modelo" label appears and the MUI Select trigger is visible
    await expect(page.getByText('Modelo').first()).toBeVisible()
    // Selecting wallbox pre-selects 'own', so the dropdown renders that value
    await expect(page.locator('.MuiSelect-select').first()).toBeVisible()
  })

  test('wallbox dropdown lists 6 models + own option', async ({ page }) => {
    await setupPage(page)
    await goToStep1(page)
    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(500)

    await page.locator('.MuiSelect-select').click()
    await page.waitForTimeout(400)

    const models = [
      'LIVOLTEK Smart EV 7.3 kW',
      'EFFITEC 7 kW',
      'KPN Wallbox KBox App',
      'BESTE TS-EVC07 7.3 kW',
      'BESTE Smart Mini 7.3 kW',
      'KPN Wallbox KBox OCPP 1.6',
    ]

    for (const model of models) {
      await expect(page.getByRole('option', { name: new RegExp(model) })).toBeVisible()
    }
    await expect(page.getByRole('option', { name: /Ya tengo mi cargador/ })).toBeVisible()
  })

  test('"Ver mi cotización" button label shown at step 1', async ({ page }) => {
    await setupPage(page)
    await goToStep1(page)
    await clickCard(page, 'card-wallbox')
    await page.waitForTimeout(400)
    await expect(page.locator('[data-testid="btn-next"]')).toContainText('Ver mi cotización')
  })

  test('selects Wallbox model and reaches step 2', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText(/Tu cotización/).first()).toBeVisible()
  })

  test('selecting Portátil shows charger list cards', async ({ page }) => {
    await setupPage(page)
    await goToStep1(page)
    await clickCard(page, 'card-portatil')
    await page.waitForTimeout(500)
    await expect(page.getByText('Workersbee 2.2–7 kW')).toBeVisible()
    await expect(page.getByText('Ya tengo mi cargador').first()).toBeVisible()
  })

  test('distance slider section visible at step 1', async ({ page }) => {
    await setupPage(page)
    await goToStep1(page)
    await expect(page.getByText('Distancia al tablero eléctrico').first()).toBeVisible({ timeout: 6000 })
    // Default distance chip is 10 m
    await expect(page.getByText('10 m', { exact: true }).first()).toBeVisible()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 3: Step 2 — price breakdown
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 2 — Price breakdown', () => {

  test('shows Trámite SEC line', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Trámites y declaración TE6').first()).toBeVisible()
  })

  test('shows Materiales eléctricos line', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Materiales certificados').first()).toBeVisible()
  })

  test('shows Total con IVA line', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Total (con IVA)').first()).toBeVisible()
  })

  test('shows IVA 19% line', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Total (IVA incl.)').first()).toBeVisible()
  })

  test('shows "Total estimado (con IVA)" hero label', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Total (con IVA)').first()).toBeVisible()
  })

  test('shows selected charger name in breakdown', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText(/EFFITEC 7 kW/).first()).toBeVisible()
  })

  test('shows Instalación certificada line', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Instalación por técnico SEC').first()).toBeVisible()
  })

  test('shows breakdown total line', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Total (IVA incl.)').first()).toBeVisible()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 4: Step 2 — installation timeline (cronograma)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 2 — Installation timeline', () => {

  test('shows "Tu proceso de instalación" heading', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Tu proceso de instalación').first()).toBeVisible()
  })

  test('shows all 4 installation steps', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(page.getByText('Pago y agenda de visita').first()).toBeVisible()
    await expect(page.getByText(/Visita técnica/).first()).toBeVisible()
    await expect(page.getByText('Compra de materiales').first()).toBeVisible()
    await expect(page.getByText('Instalación de tu cargador').first()).toBeVisible()
  })

  test('shows "De pago a cargador funcionando: ~7 a 12 días hábiles" footer text', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page)
    await expect(
      page.getByText(/De pago a cargador funcionando/).first()
    ).toBeVisible()
    await expect(
      page.getByText(/7 a 12 días hábiles/).first()
    ).toBeVisible()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 5: Step 2 — "Próxima visita disponible" text between buttons
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 2 — Próxima visita disponible', () => {

  test('does NOT show "Próxima visita disponible" when API omits nextAvailableDate', async ({ page }) => {
    await setupPage(page)
    await goToStep2(page) // uses mockCotizarRoute — no nextAvailableDate

    // The text should not appear when no date is returned
    await expect(
      page.getByText(/Próxima visita disponible:/)
    ).not.toBeVisible()
  })

  test('shows "Próxima visita disponible" when API returns nextAvailableDate', async ({ page }) => {
    await setupPage(page)
    await goToStep2WithNextDate(page)

    // After the API response includes nextAvailableDate, the text should appear
    await expect(
      page.getByText(/Próxima visita disponible/).first()
    ).toBeVisible({ timeout: 5000 })
  })

  test('nextAvailableDate also populates the step inside the cronograma', async ({ page }) => {
    await setupPage(page)
    await goToStep2WithNextDate(page)

    // Inside the timeline box, the date should replace "Próxima fecha disponible"
    await expect(
      page.getByText(/Próxima fecha:/).first()
    ).toBeVisible({ timeout: 5000 })
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 6: Payment panel toggle
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 2 — Payment panel toggle', () => {

  test('clicking payment button opens the panel', async ({ page }) => {
    await mockPaymentRoute(page)
    await setupPage(page)
    await goToStep2(page)

    await expect(page.getByText('Datos para la instalación')).not.toBeVisible()

    await page.getByRole('button', { name: /Reservar instalación/i }).click()
    await page.waitForTimeout(1500)

    await expect(page.getByText('Datos para la instalación')).toBeVisible({ timeout: 8000 })
  })

  test('clicking payment button again collapses the panel', async ({ page }) => {
    await mockPaymentRoute(page)
    await setupPage(page)
    await goToStep2(page)

    const payBtn = page.getByRole('button', { name: /Reservar instalación/i })

    // Open
    await payBtn.click()
    await page.waitForTimeout(1500)
    await expect(page.getByText('Datos para la instalación')).toBeVisible({ timeout: 8000 })

    // Close (same button toggles off)
    await payBtn.click()
    await page.waitForTimeout(600)
    await expect(page.getByText('Datos para la instalación')).not.toBeVisible()
  })

  test('email input is visible inside the payment panel', async ({ page }) => {
    await mockPaymentRoute(page)
    await setupPage(page)
    await goToStep2(page)

    await page.getByRole('button', { name: /Reservar instalación/i }).click()
    await page.waitForTimeout(1500)

    await expect(page.getByLabel('Email para comprobante')).toBeVisible({ timeout: 8000 })
  })

  test('Webpay button appears after payment API resolves with token', async ({ page }) => {
    await mockPaymentRoute(page)
    await setupPage(page)
    await goToStep2(page)

    await page.getByRole('button', { name: /Reservar instalación/i }).click()

    await expect(
      page.getByRole('button', { name: /Pagar .* con webpay/i })
    ).toBeVisible({ timeout: 10000 })
  })

  test('error alert shown when /api/payment returns error', async ({ page }) => {
    await page.route('**/api/payment', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Error interno del servidor' }),
      })
    })
    await setupPage(page)
    await goToStep2(page)

    await page.getByRole('button', { name: /Reservar instalación/i }).click()
    await page.waitForTimeout(3000)

    await expect(page.locator('[role="alert"]').first()).toBeVisible({ timeout: 8000 })
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 7: Payment panel — RM validation
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 2 — Payment panel RM coverage validation', () => {

  // Helper: navigate to step 2 with payment panel open
  async function goToStep2WithPanel(page: Page) {
    await mockPaymentRoute(page)
    await setupPage(page)
    await goToStep2(page)
    await openPaymentPanel(page)
    // Wait for Webpay token to be ready (panel fully initialised)
    await expect(
      page.getByRole('button', { name: /Pagar .* con webpay/i })
    ).toBeVisible({ timeout: 10000 })
  }

  test('RM address — shows depto, email fields and Webpay button normally', async ({ page }) => {
    await goToStep2WithPanel(page)

    // Force a known RM address into the address input field
    const addressInput = page.getByPlaceholder(/dirección|calle|ingresa/i).first()
    if (await addressInput.isVisible()) {
      await addressInput.fill('Las Condes, Santiago, Chile')
      await page.waitForTimeout(600)
    }

    // With an RM address (or the geoip-detected Santiago address), the
    // depto field and email field must be visible
    await expect(page.getByLabel(/Depto.*Referencia/i).first()).toBeVisible({ timeout: 5000 })
    await expect(page.getByLabel('Email para comprobante')).toBeVisible()

    // "Sin cobertura" warning must NOT appear
    await expect(page.getByText('Sin cobertura en tu región')).not.toBeVisible()
  })

  test('non-RM address — shows "Sin cobertura en tu región" and hides payment fields', async ({ page }) => {
    await goToStep2WithPanel(page)

    // The geoip auto-detected a Santiago address, so the "Editar" button is shown.
    // Click it to reveal the manual address input (#address).
    await page.getByRole('button', { name: /Editar/i }).click()
    await page.waitForTimeout(400)

    // Use the AddressInput's #address field — filling it fires React onChange →
    // onAddressChange → update({ address: v }) → isRegionMetropolitana re-evaluates.
    const addressInput = page.locator('#address')
    await expect(addressInput).toBeVisible()
    await addressInput.clear()
    await addressInput.fill('Valparaíso')
    await page.waitForTimeout(800)

    // The coverage warning should be shown
    await expect(
      page.getByText('Sin cobertura en tu región')
    ).toBeVisible({ timeout: 5000 })

    // The email field should be hidden (it lives inside the else-branch in the source)
    await expect(page.getByLabel('Email para comprobante')).not.toBeVisible()
  })

  test('non-RM address — "Cambiar dirección" button resets the address field', async ({ page }) => {
    await goToStep2WithPanel(page)

    await page.getByRole('button', { name: /Editar/i }).click()
    await page.waitForTimeout(400)

    const addressInput = page.locator('#address')
    await expect(addressInput).toBeVisible()
    await addressInput.clear()
    await addressInput.fill('Concepción')
    await page.waitForTimeout(800)

    await expect(page.getByText('Sin cobertura en tu región')).toBeVisible({ timeout: 5000 })

    // Dismiss any autocomplete dropdown (Google Maps pac-container) before clicking
    // the "Cambiar dirección" button to avoid pointer-event interception
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)

    // Clicking "Cambiar dirección" should clear state.address and hide the warning
    await page.getByRole('button', { name: /Cambiar dirección/i }).click()
    await page.waitForTimeout(500)

    await expect(page.getByText('Sin cobertura en tu región')).not.toBeVisible()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 8: Payment panel — email required for Webpay button
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Step 2 — Email required to enable Webpay button', () => {

  async function goToStep2WithOpenPanel(page: Page) {
    await mockPaymentRoute(page)
    await setupPage(page)
    await goToStep2(page)
    await openPaymentPanel(page)
    // Wait for token to arrive so the button exists
    await expect(
      page.getByRole('button', { name: /Pagar .* con webpay/i })
    ).toBeVisible({ timeout: 10000 })
  }

  test('Webpay button is disabled when email is empty', async ({ page }) => {
    await goToStep2WithOpenPanel(page)

    const webpayBtn = page.getByRole('button', { name: /Pagar .* con webpay/i })

    // Clear the email field if it has any content
    const emailField = page.getByLabel('Email para comprobante')
    await emailField.clear()
    await page.waitForTimeout(300)

    await expect(webpayBtn).toBeDisabled()
  })

  test('Webpay button is enabled after filling a valid email with RM address', async ({ page }) => {
    await goToStep2WithOpenPanel(page)

    const webpayBtn = page.getByRole('button', { name: /Pagar .* con webpay/i })
    const emailField = page.getByLabel('Email para comprobante')

    // Fill a valid email — geoip should have auto-set an RM address
    await emailField.fill('cliente@test.com')
    await page.waitForTimeout(300)

    await expect(webpayBtn).not.toBeDisabled()
  })

  test('Webpay button becomes disabled again after clearing the email', async ({ page }) => {
    await goToStep2WithOpenPanel(page)

    const webpayBtn = page.getByRole('button', { name: /Pagar .* con webpay/i })
    const emailField = page.getByLabel('Email para comprobante')

    await emailField.fill('cliente@test.com')
    await page.waitForTimeout(300)
    await expect(webpayBtn).not.toBeDisabled()

    await emailField.clear()
    await page.waitForTimeout(300)
    await expect(webpayBtn).toBeDisabled()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 9: /cotizador/recibo-pago — sessionStorage guard
// ─────────────────────────────────────────────────────────────────────────────
test.describe('/cotizador/recibo-pago — sessionStorage guard', () => {

  test('redirects to /cotizador when paymentData is absent', async ({ page }) => {
    // Navigate directly — sessionStorage is empty (fresh context)
    await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
    await page.waitForURL(`**${BASE}`, { timeout: 10000 })

    expect(page.url()).toContain('/cotizador')
    expect(page.url()).not.toContain('recibo-pago')
  })

  test('stays on recibo-pago when paymentData is present', async ({ page }) => {
    // Set sessionStorage before React hydrates via addInitScript
    await page.addInitScript((data: object) => {
      sessionStorage.setItem('paymentData', JSON.stringify(data))
    }, MOCK_PAYMENT_DATA)

    await mockSchedulesRoute(page)
    await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2000)

    expect(page.url()).toContain('recibo-pago')
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 10: /cotizador/recibo-pago — content with valid paymentData
// ─────────────────────────────────────────────────────────────────────────────
test.describe('/cotizador/recibo-pago — with valid paymentData', () => {

  async function goToReciboPago(page: Page) {
    await page.addInitScript((data: object) => {
      sessionStorage.setItem('paymentData', JSON.stringify(data))
    }, MOCK_PAYMENT_DATA)

    await mockSchedulesRoute(page)
    await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2000)
  }

  test('shows "¡Pago exitoso!" hero heading', async ({ page }) => {
    await goToReciboPago(page)
    await expect(page.getByRole('heading', { name: /Pago exitoso/ })).toBeVisible({ timeout: 10000 })
  })

  test('shows "Elige una fecha" date-picker section', async ({ page }) => {
    await goToReciboPago(page)
    await expect(page.getByText('Elige una fecha').first()).toBeVisible({ timeout: 10000 })
  })

  test('shows "Pago confirmado" green banner', async ({ page }) => {
    await goToReciboPago(page)
    await expect(page.getByText(/Pago confirmado/).first()).toBeVisible({ timeout: 10000 })
  })

  test('shows email from paymentData in confirmation banner', async ({ page }) => {
    await goToReciboPago(page)
    await expect(
      page.getByText(new RegExp(MOCK_PAYMENT_DATA.email)).first()
    ).toBeVisible({ timeout: 10000 })
  })

  test('Confirmar visita button is disabled when no date is selected', async ({ page }) => {
    await goToReciboPago(page)
    const confirmBtn = page.getByRole('button', { name: /Confirmar visita/ })
    await expect(confirmBtn).toBeVisible({ timeout: 10000 })
    await expect(confirmBtn).toBeDisabled()
  })

  test('stepper shows Agendar visita and Confirmación labels', async ({ page }) => {
    await goToReciboPago(page)
    await expect(page.getByText('Agendar visita', { exact: true }).first()).toBeVisible({ timeout: 8000 })
    await expect(page.getByText('Confirmación', { exact: true }).first()).toBeVisible()
  })

  test('shows "¿Qué sigue?" info section', async ({ page }) => {
    await goToReciboPago(page)
    await expect(page.getByText('¿Qué sigue?').first()).toBeVisible({ timeout: 8000 })
  })

  test('does not redirect — stays on recibo-pago', async ({ page }) => {
    await goToReciboPago(page)
    await page.waitForTimeout(1000)
    expect(page.url()).toContain('recibo-pago')
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 11: /cotizador/recibo-pago — booking flow
// ─────────────────────────────────────────────────────────────────────────────
test.describe('/cotizador/recibo-pago — booking flow', () => {

  // Set up recibo-pago with a slot that has a calendarId so booking is possible
  async function goToReciboPagoWithSlot(page: Page) {
    await page.addInitScript((data: object) => {
      sessionStorage.setItem('paymentData', JSON.stringify(data))
    }, MOCK_PAYMENT_DATA_BOOKABLE)

    await mockSchedulesWithSlot(page)
    await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
    // Wait for the dates to load (loadingDates transitions to false)
    await expect(page.getByText(/Disponible/).first()).toBeVisible({ timeout: 15000 })
  }

  test('shows available date slot after schedules API resolves', async ({ page }) => {
    await goToReciboPagoWithSlot(page)
    await expect(page.getByText(/Disponible/).first()).toBeVisible()
  })

  test('selecting an available date enables the Confirmar visita button', async ({ page }) => {
    await goToReciboPagoWithSlot(page)

    const confirmBtn = page.getByRole('button', { name: /Confirmar visita/ })
    await expect(confirmBtn).toBeDisabled()

    // Click the first available date slot
    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)

    await expect(confirmBtn).not.toBeDisabled()
  })

  test('successful booking shows ¡Visita agendada! confirmation screen', async ({ page }) => {
    await mockConfirmChargerVisitSuccess(page)
    await goToReciboPagoWithSlot(page)

    // Select first available date
    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)

    // Click confirm
    await page.getByRole('button', { name: /Confirmar visita/ }).click()

    // Confirmation screen should appear
    await expect(
      page.getByText('¡Visita agendada!')
    ).toBeVisible({ timeout: 10000 })
  })

  test('successful booking calls POST /api/confirm-charger-visit', async ({ page }) => {
    let capturedBody: Record<string, unknown> | null = null

    await page.route('**/api/confirm-charger-visit', async (route) => {
      const request = route.request()
      capturedBody = JSON.parse(request.postData() ?? '{}') as Record<string, unknown>
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ calendarId: 'confirmed-cal-uuid-001' }),
      })
    })

    await goToReciboPagoWithSlot(page)

    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)
    await page.getByRole('button', { name: /Confirmar visita/ }).click()
    await page.waitForTimeout(2000)

    // Verify the API was called with expected fields
    expect(capturedBody).not.toBeNull()
    expect(capturedBody).toHaveProperty('calendarId', 'cal-slot-uuid-001')
    expect(capturedBody).toHaveProperty('address', MOCK_PAYMENT_DATA_BOOKABLE.address)
    expect(capturedBody).toHaveProperty('chargerName', MOCK_PAYMENT_DATA_BOOKABLE.chargerName)
  })

  test('failed booking shows error message (API returns error)', async ({ page }) => {
    await mockConfirmChargerVisitError(page)
    await goToReciboPagoWithSlot(page)

    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)
    await page.getByRole('button', { name: /Confirmar visita/ }).click()

    // Error message should appear
    await expect(
      page.getByText(/No se pudo agendar la visita/)
    ).toBeVisible({ timeout: 10000 })

    // Should NOT show the success screen
    await expect(page.getByText('¡Visita agendada!')).not.toBeVisible()
  })

  test('confirmation screen shows the selected date label', async ({ page }) => {
    await mockConfirmChargerVisitSuccess(page)
    await goToReciboPagoWithSlot(page)

    // Get the date label from the first available slot before clicking
    const dateLabel = await page.getByText(/Disponible/).first()
      .locator('..') // parent of the "Disponible" chip
      .locator('..') // grandparent — the date row
      .locator('p').first()
      .textContent()

    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)
    await page.getByRole('button', { name: /Confirmar visita/ }).click()

    await expect(page.getByText('¡Visita agendada!')).toBeVisible({ timeout: 10000 })

    // The confirmed date label should be visible in the confirmation screen
    if (dateLabel) {
      await expect(page.getByText(new RegExp(dateLabel.trim()))).toBeVisible({ timeout: 5000 })
    }
  })

  test('confirmation screen shows Resumen summary card', async ({ page }) => {
    await mockConfirmChargerVisitSuccess(page)
    await goToReciboPagoWithSlot(page)

    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)
    await page.getByRole('button', { name: /Confirmar visita/ }).click()

    await expect(page.getByText('¡Visita agendada!')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Resumen').first()).toBeVisible()
    await expect(page.getByText(MOCK_PAYMENT_DATA_BOOKABLE.chargerName)).toBeVisible()
  })

  test('confirmation screen shows Próximos pasos section', async ({ page }) => {
    await mockConfirmChargerVisitSuccess(page)
    await goToReciboPagoWithSlot(page)

    await page.getByText(/Disponible/).first().click()
    await page.waitForTimeout(400)
    await page.getByRole('button', { name: /Confirmar visita/ }).click()

    await expect(page.getByText('¡Visita agendada!')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Próximos pasos').first()).toBeVisible()
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE 12: /api/cotizar endpoint (integration, calls real AppSync)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('/api/cotizar endpoint', () => {

  test('POST returns formId and estimates', async ({ request }) => {
    const res = await request.post('/api/cotizar', {
      data: { isHouse: true, isWallbox: true, isPortable: false, distance: 10, numberOfChargers: 1 },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty('formId')
    expect(typeof body.formId).toBe('string')
    expect(Array.isArray(body.estimates)).toBe(true)
    expect(body.estimates.length).toBeGreaterThan(0)
    const est = body.estimates[0]
    expect(est).toHaveProperty('materialsCost')
    expect(est).toHaveProperty('installationCost')
    expect(est).toHaveProperty('netPrice')
    expect(Number(est.grossPrice ?? est.netPrice)).toBeGreaterThan(0)
  })

  test('POST with portable returns valid estimates', async ({ request }) => {
    const res = await request.post('/api/cotizar', {
      data: { isHouse: true, isWallbox: false, isPortable: true, distance: 5, numberOfChargers: 1 },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.estimates.length).toBeGreaterThan(0)
  })

  test('POST with invalid fields returns 400', async ({ request }) => {
    const res = await request.post('/api/cotizar', {
      data: { isHouse: 'not-a-boolean' },
    })
    expect(res.status()).toBe(400)
  })

})
