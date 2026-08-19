# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: step2-nav.spec.ts >> navigate to step 2 and screenshot
- Location: e2e/step2-nav.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Siguiente")')
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
    56 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
            - button "🏠 Casa Estacionamiento propio" [ref=e40] [cursor=pointer]:
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
  3  | test('navigate to step 2 and screenshot', async ({ page }) => {
  4  |   await page.goto('/cotizador')
  5  |   // Wait for the Casa button to be visible (page loaded enough)
  6  |   await page.locator('text=Casa').first().waitFor({ state: 'visible', timeout: 15000 })
  7  | 
  8  |   await page.screenshot({ path: 'test-results/nav-step1.png', fullPage: true })
  9  | 
  10 |   // Select "Casa"
  11 |   await page.locator('text=Casa').first().click()
  12 |   await page.waitForTimeout(300)
  13 | 
  14 |   // Click "Siguiente →"
> 15 |   await page.locator('button:has-text("Siguiente")').click()
     |                                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  16 |   await page.waitForTimeout(1500)
  17 | 
  18 |   // Capture step 2 state - dump buttons and text
  19 |   const buttons2 = await page.locator('button').allTextContents()
  20 |   console.log('STEP2 BUTTONS:', JSON.stringify(buttons2))
  21 |   const bodyText2 = await page.locator('body').innerText()
  22 |   console.log('STEP2 TEXT:', bodyText2.substring(0, 3000))
  23 | 
  24 |   await page.screenshot({ path: 'test-results/nav-step2.png', fullPage: true })
  25 | 
  26 |   // If there's another "Siguiente" (charger step), click it
  27 |   const nextBtn = page.locator('button:has-text("Siguiente")')
  28 |   if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
  29 |     await nextBtn.click()
  30 |     await page.waitForTimeout(1500)
  31 | 
  32 |     const buttons3 = await page.locator('button').allTextContents()
  33 |     console.log('STEP3 BUTTONS:', JSON.stringify(buttons3))
  34 |     const bodyText3 = await page.locator('body').innerText()
  35 |     console.log('STEP3 TEXT:', bodyText3.substring(0, 4000))
  36 | 
  37 |     await page.screenshot({ path: 'test-results/nav-step3.png', fullPage: true })
  38 |   }
  39 | })
  40 | 
```