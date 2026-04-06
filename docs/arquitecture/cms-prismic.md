# CMS — Prismic

## Descripción

Prismic es el CMS headless que gestiona el contenido de las páginas del sitio. Las páginas se crean en el dashboard de Prismic y se renderizan mediante rutas dinámicas en Next.js.

## Configuración

```typescript
// src/prismicio.ts
export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

export const createClient = (config = {}) => {
  // PROD: cache agresivo con tag "prismic"
  // DEV: revalidate cada 5 segundos
  const fetchOptions = process.env.NODE_ENV === 'production'
    ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
    : { next: { revalidate: 5 } };

  const client = baseCreateClient(repositoryName, { routes, fetchOptions, ...config });
  enableAutoPreviews({ client });
  return client;
};
```

## Rutas Dinámicas

- `src/app/[uid]/page.tsx` → Páginas genéricas de Prismic
- `src/app/blog/[uid]/page.tsx` → Posts del blog
- Route resolver: `{ type: "page", path: "/:uid" }`

## Slices (Bloques de Contenido)

Los slices son componentes React que mapean a bloques de contenido del CMS. Se crean y editan con Slice Machine (`npm run sl`).

Ubicación: `src/slices/`

| Slice | Descripción |
|-------|-------------|
| `Hero` | Sección hero principal |
| `ContentWithImage` | Contenido con imagen lateral |
| `CarrouselOptions` | Carrusel de opciones/productos |
| `ContactForm` | Formulario de contacto embebido |
| `Packages` | Visualización de paquetes/precios |
| `Ideas` | Sección de ideas/características |
| `OptionsContent` | Contenido con opciones seleccionables |
| `StepWizard` | Componente de pasos/wizard |
| `ResumeBlog` | Resumen de entradas del blog |
| `Labels` | Etiquetas/chips |

Cada slice puede tener **variantes** (layouts alternativos) en su subdirectorio `variants/`.

## Revalidación (ISR On-Demand)

```typescript
// POST /api/revalidate — llamado desde webhook de Prismic
revalidateTag("prismic"); // Invalida todas las páginas cacheadas con el tag
```

## Preview Mode

- `GET /api/preview` → activa preview con `redirectToPreviewURL()`
- `GET /api/exit-preview` → sale del preview con `exitPreview()`
- El componente `<PrismicPreview repositoryName={...}>` en el layout habilita la barra de preview

## Variables de Entorno

```bash
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=<nombre-repositorio>  # override del repositorio Prismic
```

## Herramientas

```bash
npm run sl   # Abre Slice Machine UI (editor visual de slices en localhost:9999)
```
