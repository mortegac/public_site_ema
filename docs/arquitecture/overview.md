# Arquitectura General

Sitio web público de **ENERGICA**, empresa chilena de energía solar/instalaciones de carga. Es una SPA orientada al cliente para cotizaciones de instalaciones y agendamiento de visitas técnicas.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15.5 (App Router) + React 19 |
| Lenguaje | TypeScript 5.2 |
| CMS | Prismic (headless) |
| Estado | Redux Toolkit + redux-persist |
| Backend | AWS Amplify Gen 2 (AppSync GraphQL + DynamoDB) |
| UI | Material UI (MUI) v7 + Emotion CSS-in-JS |
| Formularios | React Hook Form + Yup |
| Pagos | Transbank WebPay |
| Analytics | Google Analytics 4 + Google Tag Manager |
| Hosting | Vercel |

## Estructura de Directorios

```
src/
├── app/                    # Next.js App Router — páginas y API routes
│   ├── [uid]/              # Páginas dinámicas desde Prismic
│   ├── cotizador/          # Cotizador de instalación solar
│   ├── agenda/             # Agendamiento de visita técnica
│   ├── return/             # Retorno de pagos WebPay
│   ├── components/         # Componentes específicos de páginas
│   └── api/                # API routes (Prismic preview, revalidation)
├── components/             # Componentes globales (analytics, layouts, shared)
├── slices/                 # Content slices de Prismic Slice Machine
├── store/                  # Redux store — slices por dominio
├── utils/                  # Utilidades, queries GraphQL, configuración
└── hooks/                  # Custom React hooks
```

## Flujos Principales

1. **Cotización** (`/cotizador`) → formulario multi-paso → estimado de instalación
2. **Agendamiento** (`/agenda`) → calendario → pago WebPay → confirmación
3. **Páginas de contenido** (`/[uid]`, `/blog/[uid]`) → renderizadas desde Prismic CMS

## Aliases de Paths (tsconfig)

```
@/*        → src/*
@types     → amplify/data/resource
@queries   → src/utils/queries/index.ts
@client    → src/app/init.ts
@log       → src/utils/log.ts
@error     → src/utils/error.ts
```
