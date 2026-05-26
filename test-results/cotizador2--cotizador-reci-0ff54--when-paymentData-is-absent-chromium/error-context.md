# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cotizador2.spec.ts >> /cotizador/recibo-pago — sessionStorage guard >> redirects to /cotizador when paymentData is absent
- Location: e2e/cotizador2.spec.ts:709:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/cotizador" until "load"
============================================================
```

# Test source

```ts
  612 | 
  613 |     // The email field should be hidden (it lives inside the else-branch in the source)
  614 |     await expect(page.getByLabel('Email para comprobante')).not.toBeVisible()
  615 |   })
  616 | 
  617 |   test('non-RM address — "Cambiar dirección" button resets the address field', async ({ page }) => {
  618 |     await goToStep2WithPanel(page)
  619 | 
  620 |     await page.getByRole('button', { name: /Editar/i }).click()
  621 |     await page.waitForTimeout(400)
  622 | 
  623 |     const addressInput = page.locator('#address')
  624 |     await expect(addressInput).toBeVisible()
  625 |     await addressInput.clear()
  626 |     await addressInput.fill('Concepción')
  627 |     await page.waitForTimeout(800)
  628 | 
  629 |     await expect(page.getByText('Sin cobertura en tu región')).toBeVisible({ timeout: 5000 })
  630 | 
  631 |     // Dismiss any autocomplete dropdown (Google Maps pac-container) before clicking
  632 |     // the "Cambiar dirección" button to avoid pointer-event interception
  633 |     await page.keyboard.press('Escape')
  634 |     await page.waitForTimeout(300)
  635 | 
  636 |     // Clicking "Cambiar dirección" should clear state.address and hide the warning
  637 |     await page.getByRole('button', { name: /Cambiar dirección/i }).click()
  638 |     await page.waitForTimeout(500)
  639 | 
  640 |     await expect(page.getByText('Sin cobertura en tu región')).not.toBeVisible()
  641 |   })
  642 | 
  643 | })
  644 | 
  645 | // ─────────────────────────────────────────────────────────────────────────────
  646 | // TEST SUITE 8: Payment panel — email required for Webpay button
  647 | // ─────────────────────────────────────────────────────────────────────────────
  648 | test.describe('Step 2 — Email required to enable Webpay button', () => {
  649 | 
  650 |   async function goToStep2WithOpenPanel(page: Page) {
  651 |     await mockPaymentRoute(page)
  652 |     await setupPage(page)
  653 |     await goToStep2(page)
  654 |     await openPaymentPanel(page)
  655 |     // Wait for token to arrive so the button exists
  656 |     await expect(
  657 |       page.getByRole('button', { name: /Pagar .* con webpay/i })
  658 |     ).toBeVisible({ timeout: 10000 })
  659 |   }
  660 | 
  661 |   test('Webpay button is disabled when email is empty', async ({ page }) => {
  662 |     await goToStep2WithOpenPanel(page)
  663 | 
  664 |     const webpayBtn = page.getByRole('button', { name: /Pagar .* con webpay/i })
  665 | 
  666 |     // Clear the email field if it has any content
  667 |     const emailField = page.getByLabel('Email para comprobante')
  668 |     await emailField.clear()
  669 |     await page.waitForTimeout(300)
  670 | 
  671 |     await expect(webpayBtn).toBeDisabled()
  672 |   })
  673 | 
  674 |   test('Webpay button is enabled after filling a valid email with RM address', async ({ page }) => {
  675 |     await goToStep2WithOpenPanel(page)
  676 | 
  677 |     const webpayBtn = page.getByRole('button', { name: /Pagar .* con webpay/i })
  678 |     const emailField = page.getByLabel('Email para comprobante')
  679 | 
  680 |     // Fill a valid email — geoip should have auto-set an RM address
  681 |     await emailField.fill('cliente@test.com')
  682 |     await page.waitForTimeout(300)
  683 | 
  684 |     await expect(webpayBtn).not.toBeDisabled()
  685 |   })
  686 | 
  687 |   test('Webpay button becomes disabled again after clearing the email', async ({ page }) => {
  688 |     await goToStep2WithOpenPanel(page)
  689 | 
  690 |     const webpayBtn = page.getByRole('button', { name: /Pagar .* con webpay/i })
  691 |     const emailField = page.getByLabel('Email para comprobante')
  692 | 
  693 |     await emailField.fill('cliente@test.com')
  694 |     await page.waitForTimeout(300)
  695 |     await expect(webpayBtn).not.toBeDisabled()
  696 | 
  697 |     await emailField.clear()
  698 |     await page.waitForTimeout(300)
  699 |     await expect(webpayBtn).toBeDisabled()
  700 |   })
  701 | 
  702 | })
  703 | 
  704 | // ─────────────────────────────────────────────────────────────────────────────
  705 | // TEST SUITE 9: /cotizador/recibo-pago — sessionStorage guard
  706 | // ─────────────────────────────────────────────────────────────────────────────
  707 | test.describe('/cotizador/recibo-pago — sessionStorage guard', () => {
  708 | 
  709 |   test('redirects to /cotizador when paymentData is absent', async ({ page }) => {
  710 |     // Navigate directly — sessionStorage is empty (fresh context)
  711 |     await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
> 712 |     await page.waitForURL(`**${BASE}`, { timeout: 10000 })
      |                ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
  713 | 
  714 |     expect(page.url()).toContain('/cotizador')
  715 |     expect(page.url()).not.toContain('recibo-pago')
  716 |   })
  717 | 
  718 |   test('stays on recibo-pago when paymentData is present', async ({ page }) => {
  719 |     // Set sessionStorage before React hydrates via addInitScript
  720 |     await page.addInitScript((data: object) => {
  721 |       sessionStorage.setItem('paymentData', JSON.stringify(data))
  722 |     }, MOCK_PAYMENT_DATA)
  723 | 
  724 |     await mockSchedulesRoute(page)
  725 |     await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
  726 |     await page.waitForTimeout(2000)
  727 | 
  728 |     expect(page.url()).toContain('recibo-pago')
  729 |   })
  730 | 
  731 | })
  732 | 
  733 | // ─────────────────────────────────────────────────────────────────────────────
  734 | // TEST SUITE 10: /cotizador/recibo-pago — content with valid paymentData
  735 | // ─────────────────────────────────────────────────────────────────────────────
  736 | test.describe('/cotizador/recibo-pago — with valid paymentData', () => {
  737 | 
  738 |   async function goToReciboPago(page: Page) {
  739 |     await page.addInitScript((data: object) => {
  740 |       sessionStorage.setItem('paymentData', JSON.stringify(data))
  741 |     }, MOCK_PAYMENT_DATA)
  742 | 
  743 |     await mockSchedulesRoute(page)
  744 |     await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
  745 |     await page.waitForTimeout(2000)
  746 |   }
  747 | 
  748 |   test('shows "¡Pago exitoso!" hero heading', async ({ page }) => {
  749 |     await goToReciboPago(page)
  750 |     await expect(page.getByRole('heading', { name: /Pago exitoso/ })).toBeVisible({ timeout: 10000 })
  751 |   })
  752 | 
  753 |   test('shows "Elige una fecha" date-picker section', async ({ page }) => {
  754 |     await goToReciboPago(page)
  755 |     await expect(page.getByText('Elige una fecha').first()).toBeVisible({ timeout: 10000 })
  756 |   })
  757 | 
  758 |   test('shows "Pago confirmado" green banner', async ({ page }) => {
  759 |     await goToReciboPago(page)
  760 |     await expect(page.getByText(/Pago confirmado/).first()).toBeVisible({ timeout: 10000 })
  761 |   })
  762 | 
  763 |   test('shows email from paymentData in confirmation banner', async ({ page }) => {
  764 |     await goToReciboPago(page)
  765 |     await expect(
  766 |       page.getByText(new RegExp(MOCK_PAYMENT_DATA.email)).first()
  767 |     ).toBeVisible({ timeout: 10000 })
  768 |   })
  769 | 
  770 |   test('Confirmar visita button is disabled when no date is selected', async ({ page }) => {
  771 |     await goToReciboPago(page)
  772 |     const confirmBtn = page.getByRole('button', { name: /Confirmar visita/ })
  773 |     await expect(confirmBtn).toBeVisible({ timeout: 10000 })
  774 |     await expect(confirmBtn).toBeDisabled()
  775 |   })
  776 | 
  777 |   test('stepper shows Agendar visita and Confirmación labels', async ({ page }) => {
  778 |     await goToReciboPago(page)
  779 |     await expect(page.getByText('Agendar visita', { exact: true }).first()).toBeVisible({ timeout: 8000 })
  780 |     await expect(page.getByText('Confirmación', { exact: true }).first()).toBeVisible()
  781 |   })
  782 | 
  783 |   test('shows "¿Qué sigue?" info section', async ({ page }) => {
  784 |     await goToReciboPago(page)
  785 |     await expect(page.getByText('¿Qué sigue?').first()).toBeVisible({ timeout: 8000 })
  786 |   })
  787 | 
  788 |   test('does not redirect — stays on recibo-pago', async ({ page }) => {
  789 |     await goToReciboPago(page)
  790 |     await page.waitForTimeout(1000)
  791 |     expect(page.url()).toContain('recibo-pago')
  792 |   })
  793 | 
  794 | })
  795 | 
  796 | // ─────────────────────────────────────────────────────────────────────────────
  797 | // TEST SUITE 11: /cotizador/recibo-pago — booking flow
  798 | // ─────────────────────────────────────────────────────────────────────────────
  799 | test.describe('/cotizador/recibo-pago — booking flow', () => {
  800 | 
  801 |   // Set up recibo-pago with a slot that has a calendarId so booking is possible
  802 |   async function goToReciboPagoWithSlot(page: Page) {
  803 |     await page.addInitScript((data: object) => {
  804 |       sessionStorage.setItem('paymentData', JSON.stringify(data))
  805 |     }, MOCK_PAYMENT_DATA_BOOKABLE)
  806 | 
  807 |     await mockSchedulesWithSlot(page)
  808 |     await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
  809 |     // Wait for the dates to load (loadingDates transitions to false)
  810 |     await expect(page.getByText(/Disponible/).first()).toBeVisible({ timeout: 15000 })
  811 |   }
  812 | 
```