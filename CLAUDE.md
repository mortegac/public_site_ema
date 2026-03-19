# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint

# Prismic Slice Machine editor (CMS content blocks)
npm run sl
```

No test commands are configured. Environment is controlled via `NEXT_PUBLIC_ENVIRONMENT` (DEV | PROD) — set this in `.env.local` to switch Amplify backends.

## Architecture

This is the **public-facing website** for ENERGICA, a Chilean solar energy company. Built with Next.js 15 App Router + TypeScript.

### Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19
- **CMS**: Prismic (headless) — content-managed pages via dynamic `[uid]` routes
- **State**: Redux Toolkit + redux-persist (`src/store/`)
- **Backend**: AWS Amplify Gen 2 (AppSync GraphQL + DynamoDB + Cognito)
- **UI**: Material UI (MUI) v7 with Emotion CSS-in-JS
- **Forms**: React Hook Form + Yup validation
- **Payment**: Transbank WebPay integration

### Path Aliases
`@/*` maps to `src/*`.

### Environment / Amplify Configuration
- `NEXT_PUBLIC_ENVIRONMENT=DEV` → loads `amplify_outputs_dev.json`
- `NEXT_PUBLIC_ENVIRONMENT=PROD` → loads `amplify_outputs.json`
- Config entry point: `src/utils/amplify-config.ts`

### Routing
File-based routing via Next.js App Router (`src/app/`):
- `[uid]/` — Prismic dynamic pages
- `blog/[uid]/` — Blog posts from Prismic
- `cotizador/` — Solar quote calculator wizard
- `agenda/` — Appointment scheduling (with payment flow: `recibo-pago/`, `rechazo-pago/`, `recibo-virtual/`)
- `return/` — Transbank payment return pages
- `soporte/`, `contactanos/`, `faqs/`, `privacidad/`, `terminos-condiciones/`
- `api/` — Next.js API routes (Prismic preview, revalidation)

### Redux Store Structure (`src/store/`)
Each feature module follows the pattern: `slice.ts` / `type.ts` / `services.ts` / `query.ts`

Active slices:
- `Customer` — customer data
- `Estimate` — quotation estimates
- `ShoppingCart` — e-commerce cart
- `Webpay` — payment gateway state
- `PaymentTransaction` — payment history
- `CalendarVisits` — appointment scheduling
- `ClientForms` — client form submissions
- `SupportTicket` — support tickets
- `WebContactForm` — web contact forms
- `Wizard` — multi-step form progress
- `customizer` — UI theme/language

Persisted slices (localStorage): `customizer`, `wizard`, `clientForms`, `shoppingCart`

### Data Layer
- Services use `generateClient<MAIN.MainTypes>()` (Amplify Gen 2 Data client) to call AppSync GraphQL
- GraphQL queries/mutations organized per model in `src/utils/queries/`
- Lambda resolvers in `amplify/resolvers/` (Transbank WebPay, Google Calendar, estimates, etc.)
- Amplify backend schema: `amplify/data/main.schema.ts` + `amplify/data/parameters.schema.ts`

### CMS / Prismic
- Content slices in `src/slices/` — each slice has variants for different layouts
- Prismic client: `src/prismicio.ts`
- Preview mode and on-demand revalidation via `src/app/api/`
- Slice Machine editor: `npm run sl`

### Component Organization
- `src/components/` — global reusable components (analytics, layouts, shared)
- `src/app/components/` — page-specific components
  - `CotizadorWizard/` — multi-step solar quote calculator
  - `AgendaWizard/` — multi-step scheduling wizard
  - `BookingCalendar/` — calendar UI
  - `forms/` — form components

### Analytics
Google Analytics + Google Tag Manager integration in `src/components/analytics/`. Event tracking documented in `EVENTOS-GTAG.md`.
