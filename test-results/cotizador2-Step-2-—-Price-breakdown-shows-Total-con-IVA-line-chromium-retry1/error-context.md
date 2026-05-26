# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cotizador2.spec.ts >> Step 2 — Price breakdown >> shows Total con IVA line
- Location: e2e/cotizador2.spec.ts:370:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('[data-testid="btn-next"]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]: Internal Server Error
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test'
  2   | 
  3   | // ─── Constants ────────────────────────────────────────────────────────────────
  4   | const BASE = '/cotizador'
  5   | const GEO = { latitude: -33.4489, longitude: -70.6693, accuracy: 10 }
  6   | 
  7   | // Minimal valid paymentData blob for recibo-pago tests
  8   | const MOCK_PAYMENT_DATA = {
  9   |   tipo: 'casa',
  10  |   chargerName: 'EFFITEC 7 kW',
  11  |   dist: 10,
  12  |   address: 'Av. Providencia 1234, Providencia, Santiago, Chile',
  13  |   depto: '',
  14  |   email: 'test@example.com',
  15  |   total: 1200000,
  16  |   neto: 1008403,
  17  |   iva: 191597,
  18  |   chargerPrice: 595000,
  19  |   mat: 171600,
  20  |   inst: 216803,
  21  |   sec: 25000,
  22  |   isOwn: false,
  23  | }
  24  | 
  25  | // paymentData with customerId for booking flow tests
  26  | const MOCK_PAYMENT_DATA_BOOKABLE = {
  27  |   ...MOCK_PAYMENT_DATA,
  28  |   customerId: 'customer-uuid-001',
  29  | }
  30  | 
  31  | // ─── Core setup ───────────────────────────────────────────────────────────────
  32  | // Mirrors the original working test pattern: grant geo permissions, goto with
  33  | // waitUntil:'load', then wait for the wizard to fully hydrate.
  34  | // No API mocking for geo routes — /api/geoip returns Santiago by default on localhost.
  35  | async function setupPage(page: Page) {
  36  |   await page.context().grantPermissions(['geolocation'])
  37  |   await page.context().setGeolocation(GEO)
  38  |   await page.goto(BASE, { waitUntil: 'load' })
> 39  |   await page.waitForSelector('[data-testid="btn-next"]', { timeout: 20000 })
      |              ^ TimeoutError: page.waitForSelector: Timeout 20000ms exceeded.
  40  |   // Allow geo detection + React hydration to fully settle before interacting
  41  |   await page.waitForTimeout(4000)
  42  | }
  43  | 
  44  | // ─── API route mocks ──────────────────────────────────────────────────────────
  45  | // These are registered BEFORE page.goto so they intercept in-page fetch calls.
  46  | // /api/geoip and /api/geocode are NOT mocked — they work on localhost already.
  47  | 
  48  | async function mockCotizarRoute(page: Page) {
  49  |   await page.route('**/api/cotizar', async (route) => {
  50  |     await route.fulfill({
  51  |       status: 200,
  52  |       contentType: 'application/json',
  53  |       body: JSON.stringify({
  54  |         formId: 'mock-form-id-001',
  55  |         estimates: [
  56  |           {
  57  |             estimateId: 'est-001',
  58  |             chargerPotence: 7,
  59  |             materialsCost: 171600,
  60  |             installationCost: 216803,
  61  |             netPrice: 388403,
  62  |             VAT: 73796,
  63  |             grossPrice: 462199,
  64  |           },
  65  |         ],
  66  |       }),
  67  |     })
  68  |   })
  69  | }
  70  | 
  71  | // Mock /api/cotizar with a nextAvailableDate included in the response
  72  | async function mockCotizarWithNextDate(page: Page) {
  73  |   await page.route('**/api/cotizar', async (route) => {
  74  |     await route.fulfill({
  75  |       status: 200,
  76  |       contentType: 'application/json',
  77  |       body: JSON.stringify({
  78  |         formId: 'mock-form-id-002',
  79  |         nextAvailableDate: '2026-06-02T09:00:00.000Z',
  80  |         estimates: [
  81  |           {
  82  |             estimateId: 'est-001',
  83  |             chargerPotence: 7,
  84  |             materialsCost: 171600,
  85  |             installationCost: 216803,
  86  |             netPrice: 388403,
  87  |             VAT: 73796,
  88  |             grossPrice: 462199,
  89  |           },
  90  |         ],
  91  |       }),
  92  |     })
  93  |   })
  94  | }
  95  | 
  96  | async function mockPaymentRoute(page: Page) {
  97  |   await page.route('**/api/payment', async (route) => {
  98  |     await route.fulfill({
  99  |       status: 200,
  100 |       contentType: 'application/json',
  101 |       body: JSON.stringify({
  102 |         token: 'mock-token-abc123',
  103 |         url: 'https://webpay3gint.transbank.cl/webpayserver/initTransaction',
  104 |         order: 'ORD-00001',
  105 |         buy_order: 'ORD-00001',
  106 |       }),
  107 |     })
  108 |   })
  109 | }
  110 | 
  111 | async function mockSchedulesRoute(page: Page) {
  112 |   await page.route('**/api/schedules*', async (route) => {
  113 |     await route.fulfill({
  114 |       status: 200,
  115 |       contentType: 'application/json',
  116 |       body: JSON.stringify({ items: [] }),
  117 |     })
  118 |   })
  119 | }
  120 | 
  121 | // Mock /api/schedules with one available slot that has a calendarId
  122 | async function mockSchedulesWithSlot(page: Page) {
  123 |   const tomorrow = new Date()
  124 |   tomorrow.setDate(tomorrow.getDate() + 2)
  125 |   tomorrow.setHours(9, 0, 0, 0)
  126 | 
  127 |   await page.route('**/api/schedules*', async (route) => {
  128 |     await route.fulfill({
  129 |       status: 200,
  130 |       contentType: 'application/json',
  131 |       body: JSON.stringify({
  132 |         items: [
  133 |           {
  134 |             calendarId: 'cal-slot-uuid-001',
  135 |             startDate: tomorrow.toISOString(),
  136 |             endDate: new Date(tomorrow.getTime() + 3600000).toISOString(),
  137 |           },
  138 |         ],
  139 |       }),
```