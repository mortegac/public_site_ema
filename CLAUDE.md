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

## Cloud Infrastructure

### AWS (via Amplify Gen 2)

**AWS Profile (local)**: `amplify-admin-ema`
**AWS Account**: `750104932774`
**Region**: `us-east-2` (Ohio)
**Amplify App ID**: `d2k7ge85k75jcb`

| Service | DEV | PROD |
|---------|-----|------|
| **AppSync GraphQL** | `sdit4qsgvnbqhanpgarq2zxqqq.appsync-api.us-east-2.amazonaws.com/graphql` | `hxncxtno75ac7cetsri66gdlri.appsync-api.us-east-2.amazonaws.com/graphql` |
| **Cognito User Pool** | `us-east-2_YNPJLwx1p` | `us-east-2_bqbta3Q0z` |
| **DynamoDB** | Managed via AppSync/Amplify | Same |

AppSync authorization: API_KEY (default, 30-day expiry), AMAZON_COGNITO_USER_POOLS, AWS_IAM.

### Vercel (Frontend Hosting)

- **Project**: `public_site_ema`
- **Project ID**: `prj_k2B03wNv0JsZBDXGQbkHO7fWsxfd`
- **Org ID**: `team_Wed2Y6MdwJGMzjmBdiyxX4bV`
- Deploys automatically on git push to `main`
- Image CDN and Edge Network provided by Vercel

### External Services

| Service | Purpose | Config |
|---------|---------|--------|
| **Prismic CMS** | Content management (pages, blog, slices) | Repo: `energica-public-site` |
| **Google Analytics** | Traffic analytics | `G-M0V5GMK6FL` |
| **Google Tag Manager** | Tag management | `GTM-5C8WKS5R` |
| **Google Maps Places API** | Address autocomplete in forms | Key in `AddressInput2.tsx` |
| **EmailJS** | Contact form & payment emails | Service ID: `lUerPXXiKXnrvLlVw` |
| **Transbank Webpay** | Chilean payment gateway (via AppSync) | Credentials stored in backend secrets |

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_ENVIRONMENT=PROD       # DEV | PROD — switches Amplify outputs file
NEXT_PUBLIC_GA_ID=G-M0V5GMK6FL
NEXT_PUBLIC_GTM_ID=GTM-5C8WKS5R
```

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

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
