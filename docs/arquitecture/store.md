# Redux Store

Configurado con Redux Toolkit + redux-persist en `src/store/store.ts`.

## Configuración

```typescript
// Slices persistidos en localStorage
whitelist: ['customizer', 'wizard', 'clientForms', 'shoppingCart']
```

DevTools habilitado solo en `NODE_ENV !== 'production'`.

## Slices

| Slice | Propósito | Persistido |
|-------|-----------|-----------|
| `customizer` | Tema y configuración UI | ✓ |
| `wizard` | Step actual del wizard genérico | ✓ |
| `clientForms` | Datos del formulario de cotización | ✓ |
| `shoppingCart` | Carrito de compras e info de cliente | ✓ |
| `customer` | Datos del perfil del cliente | ✗ |
| `estimate` | Estimados/presupuestos de instalación | ✗ |
| `calendarVisits` | Disponibilidad y reservas de visitas | ✗ |
| `webpay` | Sesión de pago WebPay | ✗ |
| `paymentTransaction` | Historial y detalles de transacciones | ✗ |
| `supportTicket` | Tickets de soporte | ✗ |
| `webContactForm` | Envíos de formulario de contacto | ✗ |

## Patrón de Módulo

Cada slice sigue la misma estructura de archivos:

```
src/store/<Dominio>/
├── slice.ts       # createSlice + async thunks + selectores
├── type.ts        # Interfaces TypeScript
├── services.ts    # Capa de acceso a datos (llama a Amplify GraphQL)
└── query.ts       # Definiciones de queries/mutations GraphQL
```

### Ejemplo de Slice

```typescript
// Estado
interface CustomerState {
  status: "idle" | "loading" | "failed";
  customer: Customer;
  loading: boolean;
  error: string | null;
}

// Thunk async
export const getCustomer = createAsyncThunk(
  'customer/get',
  async (customerId: string) => customerService.get(customerId)
);

// Selector
export const selectCustomer = (state: RootState) => state.customer;
```

## Hooks Tipados

```typescript
// src/store/hooks.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const dispatch = useAppDispatch();
const customer = useAppSelector(selectCustomer);
dispatch(setCustomer(data));
```

## Providers (`src/store/providers.tsx`)

Componente client-side que envuelve la app:
```tsx
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>
```
