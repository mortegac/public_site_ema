# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cotizador2.spec.ts >> Step 2 — Próxima visita disponible >> shows "Próxima visita disponible" when API returns nextAvailableDate
- Location: e2e/cotizador2.spec.ts:456:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForFunction: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - link "Energica City" [ref=e7] [cursor=pointer]:
        - /url: /
        - img "Energica City" [ref=e8]
    - generic [ref=e10]:
      - heading "Cotiza tu instalación" [level=1] [ref=e11]
      - paragraph [ref=e12]: Instalación certificada SEC · Precios claros · Sin sorpresas
      - generic [ref=e14]:
        - generic [ref=e16]:
          - paragraph [ref=e18]: "1"
          - paragraph [ref=e19]: Ubicación
        - generic [ref=e22]:
          - paragraph [ref=e24]: "2"
          - paragraph [ref=e25]: Cargador
        - generic [ref=e28]:
          - paragraph [ref=e30]: "3"
          - paragraph [ref=e31]: Cotización
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - heading "¿Dónde instalarás tu cargador?" [level=6] [ref=e36]
          - paragraph [ref=e37]: El tipo de propiedad afecta el costo de instalación.
          - generic [ref=e38]:
            - button "🏠 Casa Estacionamiento propio" [active] [ref=e40] [cursor=pointer]:
              - paragraph [ref=e41]: 🏠
              - paragraph [ref=e42]: Casa
              - paragraph [ref=e43]: Estacionamiento propio
            - button "🏢 Edificio Estacionamiento propio" [ref=e45] [cursor=pointer]:
              - paragraph [ref=e46]: 🏢
              - paragraph [ref=e47]: Edificio
              - paragraph [ref=e48]: Estacionamiento propio
        - generic [ref=e49]:
          - button "Siguiente →" [disabled]
      - generic [ref=e50]: Instalación certificada SEC · Garantía de 3 meses · Tu compra esta protegida
  - generic [ref=e51]:
    - img "city background" [ref=e54]
    - generic [ref=e55]:
      - generic [ref=e56]:
        - generic [ref=e57]:
          - paragraph [ref=e58]: Redes sociales
          - generic [ref=e59]:
            - link "Instagram" [ref=e60] [cursor=pointer]:
              - /url: https://www.instagram.com/energicacity/
              - img "instagram" [ref=e61]
            - link "Linkedin" [ref=e62] [cursor=pointer]:
              - /url: https://www.linkedin.com/company/energicacity
              - img "linkedin" [ref=e63]
          - paragraph [ref=e64]: ¡Hablemos!
          - link "+56 9 6766 6652" [ref=e65] [cursor=pointer]:
            - /url: https://api.whatsapp.com/send/?phone=56967666652&text=Quiero+informacion+desde+energica.city&type=phone_number&app_absent=0
            - generic [ref=e66]: +56 9 6766 6652
          - link "contacto@energica.city" [ref=e67] [cursor=pointer]:
            - /url: mailto:contacto@energica.city
            - generic [ref=e68]: contacto@energica.city
        - generic [ref=e69]:
          - link "Inicio" [ref=e70] [cursor=pointer]:
            - /url: /
            - generic [ref=e71]: Inicio
          - link "Agenda" [ref=e72] [cursor=pointer]:
            - /url: /agenda
            - generic [ref=e73]: Agenda
          - link "Cotizador" [ref=e74] [cursor=pointer]:
            - /url: /cotizador
            - generic [ref=e75]: Cotizador
          - link "Electrificación de flotas" [ref=e76] [cursor=pointer]:
            - /url: /asesoria_electrificacion_flotas
            - generic [ref=e77]: Electrificación de flotas
          - link "Instalacion de cargadores" [ref=e78] [cursor=pointer]:
            - /url: /instalacion_cargadores
            - generic [ref=e79]: Instalacion de cargadores
          - link "Electrolineras en edificios" [ref=e80] [cursor=pointer]:
            - /url: /cargadores-en-edificios
            - generic [ref=e81]: Electrolineras en edificios
          - link "Sobre Energica" [ref=e82] [cursor=pointer]:
            - /url: /que-es-energica-city
            - generic [ref=e83]: Sobre Energica
      - separator [ref=e84]
      - generic [ref=e85]:
        - generic [ref=e87]:
          - img "logo" [ref=e88]
          - paragraph [ref=e89]: Te ayudamos a concretar tu proyecto de electromovilidad industrial o inmobiliario de manera rentable.
          - link "Av. Apoquindo 5950, Las Condes, Santiago." [ref=e90] [cursor=pointer]:
            - /url: https://maps.app.goo.gl/zWASHCe6ZahfxUACA
            - generic [ref=e91]:
              - img [ref=e92]
              - paragraph [ref=e95]: Av. Apoquindo 5950, Las Condes, Santiago.
          - link "Viña del Mar, Región de Valparaíso, Chile." [ref=e96] [cursor=pointer]:
            - /url: https://maps.app.goo.gl/iPn73DCJrn2uStpL6
            - generic [ref=e97]:
              - img [ref=e98]
              - paragraph [ref=e101]: Viña del Mar, Región de Valparaíso, Chile.
          - paragraph [ref=e102]: Copyright © 2024
        - paragraph [ref=e103]:
          - link "Política de privacidad" [ref=e104] [cursor=pointer]:
            - /url: /privacidad
          - link "| Términos y Condiciones" [ref=e105] [cursor=pointer]:
            - /url: /terminos-condiciones
          - text: .
```

# Test source

```ts
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
  140 |     })
  141 |   })
  142 | }
  143 | 
  144 | async function mockConfirmChargerVisitSuccess(page: Page) {
  145 |   await page.route('**/api/confirm-charger-visit', async (route) => {
  146 |     await route.fulfill({
  147 |       status: 200,
  148 |       contentType: 'application/json',
  149 |       body: JSON.stringify({ calendarId: 'confirmed-cal-uuid-001' }),
  150 |     })
  151 |   })
  152 | }
  153 | 
  154 | async function mockConfirmChargerVisitError(page: Page) {
  155 |   await page.route('**/api/confirm-charger-visit', async (route) => {
  156 |     await route.fulfill({
  157 |       status: 200,
  158 |       contentType: 'application/json',
  159 |       body: JSON.stringify({ error: 'No se pudo agendar la visita. Intenta nuevamente.' }),
  160 |     })
  161 |   })
  162 | }
  163 | 
  164 | // ─── Click helpers ────────────────────────────────────────────────────────────
  165 | const nativeClick = (page: Page, sel: string) =>
  166 |   page.locator(sel).click()
  167 | 
  168 | const clickCard = (page: Page, testId: string) =>
  169 |   page.getByTestId(testId).click()
  170 | 
  171 | // Poll until btn-next loses its disabled attribute
  172 | const waitNextEnabled = (page: Page) =>
> 173 |   page.waitForFunction(
      |        ^ Error: page.waitForFunction: Test timeout of 30000ms exceeded.
  174 |     () => !document.querySelector('[data-testid="btn-next"]')?.hasAttribute('disabled'),
  175 |     { timeout: 10000 }
  176 |   )
  177 | 
  178 | // ─── Multi-step navigation helpers ───────────────────────────────────────────
  179 | // Selects "Casa" and advances to step 1 (charger type selection)
  180 | async function goToStep1(page: Page) {
  181 |   await clickCard(page, 'card-casa')
  182 |   await waitNextEnabled(page)
  183 |   await nativeClick(page, '[data-testid="btn-next"]')
  184 |   await page.waitForSelector('[data-testid="card-wallbox"]', { timeout: 10000 })
  185 |   await page.waitForTimeout(400)
  186 | }
  187 | 
  188 | // Selects Wallbox + EFFITEC from dropdown, clicks "Ver mi cotización" to reach step 2.
  189 | // /api/cotizar is mocked so AppSync availability is not required.
  190 | async function goToStep2(page: Page) {
  191 |   await mockCotizarRoute(page)
  192 |   await goToStep1(page)
  193 | 
  194 |   await clickCard(page, 'card-wallbox')
  195 |   await page.waitForTimeout(500)
  196 | 
  197 |   // Open MUI Select dropdown and pick a charger
  198 |   await page.locator('.MuiSelect-select').click()
  199 |   await page.waitForTimeout(400)
  200 |   await page.getByRole('option', { name: /EFFITEC 7 kW/ }).click()
  201 |   await page.waitForTimeout(400)
  202 | 
  203 |   // Click "Ver mi cotización"
  204 |   await nativeClick(page, '[data-testid="btn-next"]')
  205 |   await page.waitForSelector('text=/Tu cotización/', { timeout: 20000 })
  206 | }
  207 | 
  208 | // Like goToStep2 but uses a cotizar mock that includes nextAvailableDate
  209 | async function goToStep2WithNextDate(page: Page) {
  210 |   await mockCotizarWithNextDate(page)
  211 |   await goToStep1(page)
  212 | 
  213 |   await clickCard(page, 'card-wallbox')
  214 |   await page.waitForTimeout(500)
  215 | 
  216 |   await page.locator('.MuiSelect-select').click()
  217 |   await page.waitForTimeout(400)
  218 |   await page.getByRole('option', { name: /EFFITEC 7 kW/ }).click()
  219 |   await page.waitForTimeout(400)
  220 | 
  221 |   await nativeClick(page, '[data-testid="btn-next"]')
  222 |   await page.waitForSelector('text=/Tu cotización/', { timeout: 20000 })
  223 | }
  224 | 
  225 | // Open the payment panel (calls /api/payment, waits for token to be ready)
  226 | async function openPaymentPanel(page: Page) {
  227 |   await page.getByRole('button', { name: /Reservar instalación/i }).click()
  228 |   // Wait until the panel heading appears
  229 |   await expect(page.getByText('Datos para la instalación')).toBeVisible({ timeout: 10000 })
  230 | }
  231 | 
  232 | // ─────────────────────────────────────────────────────────────────────────────
  233 | // TEST SUITE 1: Wizard navigation — Step 0 → Step 1
  234 | // ─────────────────────────────────────────────────────────────────────────────
  235 | test.describe('Wizard navigation — Step 0 to Step 1', () => {
  236 | 
  237 |   test('selects Casa and advances to step 1', async ({ page }) => {
  238 |     await setupPage(page)
  239 | 
  240 |     // btn-next starts disabled (no tipo selected)
  241 |     await expect(page.locator('[data-testid="btn-next"]')).toBeDisabled()
  242 | 
  243 |     // Select Casa card
  244 |     await clickCard(page, 'card-casa')
  245 |     await waitNextEnabled(page)
  246 |     await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()
  247 | 
  248 |     // Advance to step 1
  249 |     await nativeClick(page, '[data-testid="btn-next"]')
  250 |     await page.waitForSelector('[data-testid="card-wallbox"]', { timeout: 10000 })
  251 |     await expect(page.getByText('Tipo de cargador').first()).toBeVisible()
  252 |   })
  253 | 
  254 |   test('stepper shows Ubicación, Cargador, Cotización', async ({ page }) => {
  255 |     await setupPage(page)
  256 |     await expect(page.getByText('Ubicación', { exact: true }).first()).toBeVisible()
  257 |     await expect(page.getByText('Cargador', { exact: true }).first()).toBeVisible()
  258 |     await expect(page.getByText('Cotización', { exact: true }).first()).toBeVisible()
  259 |   })
  260 | 
  261 |   test('selects Edificio and enables Next button', async ({ page }) => {
  262 |     await setupPage(page)
  263 |     await expect(page.locator('[data-testid="btn-next"]')).toBeDisabled()
  264 |     await clickCard(page, 'card-edificio')
  265 |     await waitNextEnabled(page)
  266 |     await expect(page.locator('[data-testid="btn-next"]')).not.toBeDisabled()
  267 |   })
  268 | 
  269 |   test('back button from step 1 returns to step 0', async ({ page }) => {
  270 |     await setupPage(page)
  271 |     await goToStep1(page)
  272 |     await page.getByRole('button', { name: /Atrás/i }).click()
  273 |     await expect(page.getByText('¿Dónde instalarás tu cargador?')).toBeVisible()
```