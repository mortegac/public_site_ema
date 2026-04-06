# Entornos y Configuración

## Variables de Entorno

```bash
# Amplify backend (DEV | PROD)
NEXT_PUBLIC_ENVIRONMENT=DEV

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Prismic CMS (override del repositorio)
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=<nombre-repositorio>
```

Crea un `.env.local` para desarrollo local. El archivo `.env.production` se usa en el build de producción.

## Backends de Amplify

| Env | Config | Descripción |
|-----|--------|-------------|
| `DEV` | `amplify_outputs_dev.json` | Backend de desarrollo (AppSync + DynamoDB separados) |
| `PROD` | `amplify_outputs.json` | Backend de producción |

La lógica de selección vive en `src/utils/amplify-config.ts`. Si falla la carga del config DEV, hace fallback a PROD.

## Indicador de Entorno

El componente `<HeaderENV />` se muestra **solo en DEV** para indicar visualmente que se está en entorno de desarrollo:

```typescript
{!isProduction() && <HeaderENV />}
```

## Analytics condicional

El hook `useAnalytics` solo envía eventos a GA4/GTM cuando `isProduction()` es `true`. En DEV los eventos se ignoran.

## Build

```bash
# Desarrollo local (DEV backend)
NEXT_PUBLIC_ENVIRONMENT=DEV npm run dev

# Preview del build de producción
NEXT_PUBLIC_ENVIRONMENT=PROD npm run build && npm run start
```

## Optimizaciones de Build (`next.config.mjs`)

- `removeConsole` en producción (excepto `error` y `warn`)
- `optimizePackageImports` para MUI (tree-shaking agresivo)
- Imágenes desde `images.prismic.io` permitidas con cache mínimo de 60s
- Formatos de imagen: `avif`, `webp`
- Header `X-DNS-Prefetch-Control: on` en todas las rutas
