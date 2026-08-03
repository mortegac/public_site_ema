# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: step3-cotizacion.spec.ts >> navigate to cotizacion step and inspect email button area
- Location: e2e/step3-cotizacion.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="btn-next"]')
    - locator resolved to <button disabled tabindex="-1" type="button" data-testid="btn-next" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary Mui-disabled MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary mui-1rykbp5-MuiButtonBase-root-MuiButton-root">Siguiente →</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    53 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

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
          - paragraph [ref=e37]: Indícanos si vives en casa o departamento de un edificio
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
      - link "No quiero instalación, solo comprar un cargador" [ref=e51] [cursor=pointer]:
        - /url: /cargadores-vehiculos-electricos-sin-instalacion
      - generic [ref=e52]: Instalación certificada SEC · Garantía de 3 meses · Tu compra esta protegida
  - generic [ref=e53]:
    - img "city background" [ref=e56]
    - generic [ref=e57]:
      - generic [ref=e58]:
        - generic [ref=e59]:
          - paragraph [ref=e60]: Redes sociales
          - generic [ref=e61]:
            - link "Instagram" [ref=e62] [cursor=pointer]:
              - /url: https://www.instagram.com/energicacity/
              - img "instagram" [ref=e63]
            - link "Linkedin" [ref=e64] [cursor=pointer]:
              - /url: https://www.linkedin.com/company/energicacity
              - img "linkedin" [ref=e65]
          - paragraph [ref=e66]: ¡Hablemos!
          - link "+56 9 6766 6652" [ref=e67] [cursor=pointer]:
            - /url: https://api.whatsapp.com/send/?phone=56967666652&text=Quiero+informacion+desde+energica.city&type=phone_number&app_absent=0
            - generic [ref=e68]: +56 9 6766 6652
          - link "contacto@energica.city" [ref=e69] [cursor=pointer]:
            - /url: mailto:contacto@energica.city
            - generic [ref=e70]: contacto@energica.city
        - generic [ref=e71]:
          - link "Inicio" [ref=e72] [cursor=pointer]:
            - /url: /
            - generic [ref=e73]: Inicio
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
          - paragraph [ref=e102]: Copyright © 2026
        - paragraph [ref=e103]:
          - link "Política de privacidad" [ref=e104] [cursor=pointer]:
            - /url: /privacidad
          - link "| Términos y Condiciones" [ref=e105] [cursor=pointer]:
            - /url: /terminos-condiciones
          - text: .
```

# Test source

```ts
  1  | import { test } from '@playwright/test'
  2  | 
  3  | test('navigate to cotizacion step and inspect email button area', async ({ page }) => {
  4  |   await page.goto('/cotizador')
  5  |   // Wait for step 0 to be visible
  6  |   await page.locator('[data-testid="card-casa"]').waitFor({ state: 'visible', timeout: 15000 })
  7  | 
  8  |   // Step 0: Select Casa
  9  |   await page.locator('[data-testid="card-casa"]').click()
  10 |   await page.waitForTimeout(300)
> 11 |   await page.locator('[data-testid="btn-next"]').click()
     |                                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
  12 |   await page.waitForTimeout(1000)
  13 | 
  14 |   // Step 1 (Cargador): select Wallbox — this sets tipoC='wallbox', chargerId='own', enabling the button
  15 |   await page.locator('[data-testid="card-wallbox"]').waitFor({ state: 'visible', timeout: 5000 })
  16 |   await page.locator('[data-testid="card-wallbox"]').click()
  17 |   await page.waitForTimeout(500)
  18 | 
  19 |   // Click "Ver mi cotización"
  20 |   await page.locator('[data-testid="btn-next"]').click()
  21 | 
  22 |   // Wait for the loading overlay to disappear and the price to appear
  23 |   // The price step shows "Total estimado (con IVA)" when ready
  24 |   await page.locator('text=Total estimado (con IVA)').waitFor({ state: 'visible', timeout: 15000 })
  25 |   await page.waitForTimeout(500) // small settle time
  26 | 
  27 |   // Now on cotizacion step with price visible
  28 |   const bodyText = await page.locator('body').innerText()
  29 |   console.log('COTIZACION TEXT:', bodyText.substring(0, 6000))
  30 | 
  31 |   await page.screenshot({ path: 'test-results/cotiz-price-top-viewport.png', fullPage: false })
  32 |   await page.screenshot({ path: 'test-results/cotiz-price-full.png', fullPage: true })
  33 | 
  34 |   // Count trust badge appearances
  35 |   const trustBadgeCount = await page.locator('text=Tu reserva protegida').count()
  36 |   console.log('TRUST BADGE COUNT:', trustBadgeCount)
  37 | 
  38 |   // Check shield/badge near price (line ~817 in code — should be just below price)
  39 |   const shieldNearPrice = page.locator('text=Tu reserva protegida').first()
  40 |   const shieldBox = await shieldNearPrice.boundingBox().catch(() => null)
  41 |   console.log('SHIELD NEAR PRICE BOX:', JSON.stringify(shieldBox))
  42 | 
  43 |   // Find email button
  44 |   const emailBtn = page.locator('button:has-text("Enviar mi cotización por email")')
  45 |   const emailVisible = await emailBtn.isVisible({ timeout: 3000 }).catch(() => false)
  46 |   console.log('EMAIL BUTTON VISIBLE:', emailVisible)
  47 | 
  48 |   if (emailVisible) {
  49 |     // Scroll to email button
  50 |     await emailBtn.scrollIntoViewIfNeeded()
  51 |     await page.waitForTimeout(500)
  52 |     await page.screenshot({ path: 'test-results/cotiz-email-area.png', fullPage: false })
  53 | 
  54 |     const emailBox = await emailBtn.boundingBox()
  55 |     console.log('EMAIL BTN BOUNDING BOX:', JSON.stringify(emailBox))
  56 | 
  57 |     // Check all trust badge occurrences and their positions
  58 |     const trustBadges = page.locator('text=Tu reserva protegida')
  59 |     const count = await trustBadges.count()
  60 |     console.log('ALL TRUST BADGES COUNT:', count)
  61 |     for (let i = 0; i < count; i++) {
  62 |       const box = await trustBadges.nth(i).boundingBox()
  63 |       console.log(`TRUST BADGE [${i}] BOUNDING BOX:`, JSON.stringify(box))
  64 |     }
  65 | 
  66 |     // Check if any trust badge appears below the email button (higher Y value)
  67 |     if (emailBox && count > 0) {
  68 |       const emailBottomY = emailBox.y + emailBox.height
  69 |       for (let i = 0; i < count; i++) {
  70 |         const tBox = await trustBadges.nth(i).boundingBox()
  71 |         if (tBox) {
  72 |           const isBelowEmail = tBox.y > emailBottomY && tBox.y < emailBottomY + 200
  73 |           console.log(`TRUST BADGE [${i}] IS DIRECTLY BELOW EMAIL BTN:`, isBelowEmail, `(badge Y=${tBox.y}, emailBottom=${emailBottomY})`)
  74 |         }
  75 |       }
  76 |     }
  77 |   } else {
  78 |     console.log('EMAIL BUTTON NOT FOUND')
  79 |   }
  80 | })
  81 | 
```