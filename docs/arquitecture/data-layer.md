# Capa de Datos (Amplify + GraphQL)

## Configuración de Amplify

Punto de entrada: `src/utils/amplify-config.ts`

```typescript
// Selecciona config según NEXT_PUBLIC_ENVIRONMENT
// DEV  → amplify_outputs_dev.json
// PROD → amplify_outputs.json (fallback si falla la carga)
export const configureAmplify = () => { ... };
export const isProduction = () => process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';
```

`configureAmplify()` se ejecuta al importar el módulo (inicialización automática).

## Cliente GraphQL

```typescript
import { generateClient } from "aws-amplify/api";
import type * as MAIN from "@types";

const client = generateClient<MAIN.MainTypes>();
```

## Esquema de Datos (`amplify/data/main.schema.ts`)

Modelos principales en DynamoDB:

| Modelo | Descripción |
|--------|-------------|
| `Customer` | Cliente (nombre, teléfono, dirección, ubicación GPS, tipo residencia) |
| `ClientForm` | Formulario de cotización (tipo cargador, tipo edificio, distancia) |
| `Estimate` | Estimado de instalación con desglose de costos |
| `ShoppingCart` | Carrito de compras con productos y estado |
| `CalendarVisit` | Visita técnica en calendario (estados: available, reserved, payed, payedAndAgended, error, occupied, stale, timedOut, waiting) |
| `User` | Usuario del sistema con roles |
| `TimeSlot / UserTimeSlot` | Disponibilidad horaria de usuarios |
| `Company` | Estructura organizacional |
| `Role / Permission / PermissionPerRole` | RBAC — roles y permisos |
| `SupportTicket / TicketComment` | Sistema de soporte |
| `PaymentTransaction` | Registro de transacciones Transbank |

Esquema secundario: `amplify/data/parameters.schema.ts` (parámetros de configuración).

## Queries GraphQL

Organizadas por modelo en `src/utils/queries/`:

```
src/utils/queries/
├── Customer/
├── ShoppingCart/
├── Estimate/
├── Product/
├── PaymentTransaction/
├── Parameter/
├── Price/
├── InstallationRecipe/
├── Permission/
└── ... (25+ módulos)
```

## Lambda Resolvers (`amplify/resolvers/`)

Funciones Lambda que implementan lógica de negocio:
- WebPay (iniciar, confirmar, consultar estado)
- Google Calendar (sincronización de visitas)
- Estimados de instalación
- Otros resolvers custom

## Patrón de Servicio

```typescript
// src/store/Customer/services.ts
import { configureAmplify } from "@/utils/amplify-config";
import { generateClient } from "aws-amplify/api";
import * as MAIN from "@types";

export const getCustomerService = async (customerId: string) => {
  configureAmplify();
  const client = generateClient<MAIN.MainTypes>();
  return client.graphql({ query: GET_CUSTOMER, variables: { customerId } });
};
```

## Variables de Entorno

```bash
NEXT_PUBLIC_ENVIRONMENT=DEV   # o PROD — controla qué amplify_outputs*.json se carga
```
