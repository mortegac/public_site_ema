# Flujo de Pagos — Transbank WebPay

## Descripción General

La integración con WebPay/Transbank permite procesar pagos de servicios de instalación. El flujo se gestiona mediante mutations GraphQL que llaman a Lambda resolvers en el backend de Amplify.

## Etapas del Flujo

### 1. WebpayStart — Iniciar Pago

```graphql
mutation webpayStart($shoppingCartId: ID!, $glosa: String!) {
  WebpayStart(shoppingCartId: $shoppingCartId, glosa: $glosa) {
    order
    token
    url     # URL de redirección a WebPay
    buy_order
    email
  }
}
```

- Se dispara cuando el usuario procede al checkout
- Devuelve una URL + token para redirigir al portal de pago de Transbank
- La `glosa` es la descripción del producto/servicio

### 2. Redirección a Transbank

El usuario es redirigido al portal de pago de Transbank. Al completar (o cancelar), Transbank redirige de vuelta a `/return` con parámetros GET.

### 3. WebpayCommit — Confirmar Transacción

```graphql
mutation webpayCommit($token: String!) {
  WebpayCommit(token: $token) {
    message
    buy_order
    email
    status
  }
}
```

Confirma la autorización del pago con el `token_ws` recibido de Transbank.

### 4. WebpayStatus — Consultar Estado

```graphql
mutation webpayStatus($token: String!) {
  WebpayStatus(token: $token) {
    shoppingCartId
    amount
    card_number      # Últimos 4 dígitos
    payment_type_code
    paymentTransactionId
    status
  }
}
```

## Manejo del Retorno (`src/app/return/page.tsx`)

La página `/return` procesa 4 escenarios según los parámetros recibidos:

| Escenario | Parámetros recibidos | Significado |
|-----------|---------------------|-------------|
| Pago exitoso | Solo `token_ws` | Flujo normal — procesar con WebpayCommit |
| Timeout | `TBK_ID_SESION` + `TBK_ORDEN_COMPRA` | Pago expiró |
| Usuario canceló | Solo `TBK_TOKEN` | Usuario abortó el pago |
| Estado inválido | Todos los tokens presentes | Error — contactar banco |

## Post-Pago

- **Éxito**: Envío de email de confirmación vía EmailJS → redirect a `/agenda/recibo-pago`
- **Fallo**: Redirect a `/agenda/rechazo-pago`
- Timeout de 3 segundos antes del redirect (feedback visual al usuario)
- Datos de la transacción guardados en `sessionStorage`

## Store de WebPay (`src/store/Webpay/`)

Maneja el estado de la sesión de pago en Redux (no persistido).

## Archivos Clave

- `src/store/Webpay/services.ts` — mutations GraphQL de WebPay
- `src/app/return/page.tsx` — procesamiento del retorno (536 líneas)
- `src/app/return/components/Invoice.tsx` — componente de boleta
- `src/app/return/components/RetryTransaction.tsx` — reintentar pago
- `src/app/agenda/recibo-pago/page.tsx` — página de éxito
- `src/app/agenda/rechazo-pago/page.tsx` — página de rechazo
- `amplify/resolvers/` — Lambda resolvers de Transbank
