# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cotizador2.spec.ts >> /cotizador/recibo-pago — booking flow >> successful booking shows ¡Visita agendada! confirmation screen
- Location: e2e/cotizador2.spec.ts:831:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Disponible/).first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText(/Disponible/).first()

```

# Test source

```ts
  710 |     // Navigate directly — sessionStorage is empty (fresh context)
  711 |     await page.goto(`${BASE}/recibo-pago`, { waitUntil: 'domcontentloaded' })
  712 |     await page.waitForURL(`**${BASE}`, { timeout: 10000 })
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
> 810 |     await expect(page.getByText(/Disponible/).first()).toBeVisible({ timeout: 15000 })
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  811 |   }
  812 | 
  813 |   test('shows available date slot after schedules API resolves', async ({ page }) => {
  814 |     await goToReciboPagoWithSlot(page)
  815 |     await expect(page.getByText(/Disponible/).first()).toBeVisible()
  816 |   })
  817 | 
  818 |   test('selecting an available date enables the Confirmar visita button', async ({ page }) => {
  819 |     await goToReciboPagoWithSlot(page)
  820 | 
  821 |     const confirmBtn = page.getByRole('button', { name: /Confirmar visita/ })
  822 |     await expect(confirmBtn).toBeDisabled()
  823 | 
  824 |     // Click the first available date slot
  825 |     await page.getByText(/Disponible/).first().click()
  826 |     await page.waitForTimeout(400)
  827 | 
  828 |     await expect(confirmBtn).not.toBeDisabled()
  829 |   })
  830 | 
  831 |   test('successful booking shows ¡Visita agendada! confirmation screen', async ({ page }) => {
  832 |     await mockConfirmChargerVisitSuccess(page)
  833 |     await goToReciboPagoWithSlot(page)
  834 | 
  835 |     // Select first available date
  836 |     await page.getByText(/Disponible/).first().click()
  837 |     await page.waitForTimeout(400)
  838 | 
  839 |     // Click confirm
  840 |     await page.getByRole('button', { name: /Confirmar visita/ }).click()
  841 | 
  842 |     // Confirmation screen should appear
  843 |     await expect(
  844 |       page.getByText('¡Visita agendada!')
  845 |     ).toBeVisible({ timeout: 10000 })
  846 |   })
  847 | 
  848 |   test('successful booking calls POST /api/confirm-charger-visit', async ({ page }) => {
  849 |     let capturedBody: Record<string, unknown> | null = null
  850 | 
  851 |     await page.route('**/api/confirm-charger-visit', async (route) => {
  852 |       const request = route.request()
  853 |       capturedBody = JSON.parse(request.postData() ?? '{}') as Record<string, unknown>
  854 |       await route.fulfill({
  855 |         status: 200,
  856 |         contentType: 'application/json',
  857 |         body: JSON.stringify({ calendarId: 'confirmed-cal-uuid-001' }),
  858 |       })
  859 |     })
  860 | 
  861 |     await goToReciboPagoWithSlot(page)
  862 | 
  863 |     await page.getByText(/Disponible/).first().click()
  864 |     await page.waitForTimeout(400)
  865 |     await page.getByRole('button', { name: /Confirmar visita/ }).click()
  866 |     await page.waitForTimeout(2000)
  867 | 
  868 |     // Verify the API was called with expected fields
  869 |     expect(capturedBody).not.toBeNull()
  870 |     expect(capturedBody).toHaveProperty('calendarId', 'cal-slot-uuid-001')
  871 |     expect(capturedBody).toHaveProperty('address', MOCK_PAYMENT_DATA_BOOKABLE.address)
  872 |     expect(capturedBody).toHaveProperty('chargerName', MOCK_PAYMENT_DATA_BOOKABLE.chargerName)
  873 |   })
  874 | 
  875 |   test('failed booking shows error message (API returns error)', async ({ page }) => {
  876 |     await mockConfirmChargerVisitError(page)
  877 |     await goToReciboPagoWithSlot(page)
  878 | 
  879 |     await page.getByText(/Disponible/).first().click()
  880 |     await page.waitForTimeout(400)
  881 |     await page.getByRole('button', { name: /Confirmar visita/ }).click()
  882 | 
  883 |     // Error message should appear
  884 |     await expect(
  885 |       page.getByText(/No se pudo agendar la visita/)
  886 |     ).toBeVisible({ timeout: 10000 })
  887 | 
  888 |     // Should NOT show the success screen
  889 |     await expect(page.getByText('¡Visita agendada!')).not.toBeVisible()
  890 |   })
  891 | 
  892 |   test('confirmation screen shows the selected date label', async ({ page }) => {
  893 |     await mockConfirmChargerVisitSuccess(page)
  894 |     await goToReciboPagoWithSlot(page)
  895 | 
  896 |     // Get the date label from the first available slot before clicking
  897 |     const dateLabel = await page.getByText(/Disponible/).first()
  898 |       .locator('..') // parent of the "Disponible" chip
  899 |       .locator('..') // grandparent — the date row
  900 |       .locator('p').first()
  901 |       .textContent()
  902 | 
  903 |     await page.getByText(/Disponible/).first().click()
  904 |     await page.waitForTimeout(400)
  905 |     await page.getByRole('button', { name: /Confirmar visita/ }).click()
  906 | 
  907 |     await expect(page.getByText('¡Visita agendada!')).toBeVisible({ timeout: 10000 })
  908 | 
  909 |     // The confirmed date label should be visible in the confirmation screen
  910 |     if (dateLabel) {
```