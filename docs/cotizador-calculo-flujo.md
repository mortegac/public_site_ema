# Flujo de Cálculo del Cotizador — Enérgica

## Resumen ejecutivo

El cotizador genera una cotización de instalación de cargadores eléctricos en dos etapas: una estimación instantánea en el navegador (para mostrar precios mientras el usuario navega) y un cálculo definitivo en el servidor (que es el precio final que se presenta y se guarda).

---

## Inputs del usuario

El usuario responde tres preguntas en el wizard:

| Paso | Campo | Valores posibles |
|------|-------|-----------------|
| 1 | Tipo de instalación | `casa` o `edificio` |
| 1 | Distancia de cableado | 1 a 60 metros (slider) |
| 1 | Cargador | Portable / Wallbox / Ya tengo uno |
| 1 (edificio) | Piso del departamento | Número |
| 1 (edificio) | Piso del estacionamiento | Nivel 0, subterráneo 1–4 |
| 1 (edificio) | Estacionamiento de visitas | Sí / No |

---

## Arquitectura del cálculo

```
Usuario → Wizard (estimación instantánea)
               ↓ al avanzar al paso 2
          /api/cotizar
               ↓
          AppSync → Lambda ProcessEstimate
               ↓
          Precio definitivo + desglose
```

---

## Etapa 1 — Estimación instantánea (frontend)

Mientras el usuario ajusta la distancia y elige el cargador, el precio se actualiza en tiempo real usando esta fórmula:

### Precios base por tipo

| Concepto | Casa | Edificio |
|----------|-----:|--------:|
| Materiales | $156.000 | $215.000 |
| Instalación | $182.000 | $258.000 |
| Trámite SEC | $25.000 | $35.000 |

### Factor de distancia

| Distancia | Factor |
|-----------|-------:|
| 0–5 m | 0,85 |
| 6–10 m | 1,00 |
| 11–20 m | 1,18 |
| 21–40 m | 1,35 |
| > 40 m | 1,55 |

### Fórmula

```
factor_total = factor_distancia
materiales   = base_materiales × factor_total
instalación  = base_instalación × factor_total
SEC          = valor fijo (no varía con la distancia)
cargador     = precio_cargador / 1,19  (precio neto sin IVA)

neto  = materiales + instalación + SEC + cargador
IVA   = neto × 0,19
total = neto + IVA
```

> Esta estimación es solo para mostrar un precio orientativo mientras el usuario navega. El precio definitivo lo calcula el servidor.

---

## Etapa 2 — Cálculo definitivo (backend Lambda)

Al presionar "Ver cotización", el sistema envía los datos al servidor. La Lambda `ProcessEstimate` ejecuta un cálculo más detallado:

### Paso 1 — Materiales reales (recipe)

Se consulta en base de datos una "receta de instalación" según tipo (casa/edificio) y potencia del cargador (7 kW, 3,5 kW o 2,2 kW). La receta desglosa:

- Cableado fijo y variable (calculado según corriente y distancia)
- Canalización y ductos
- Tablero eléctrico y componentes
- Selección de sección de cable según norma eléctrica (mín. 2,5 mm², valida caída de voltaje ≤ 6,16V)

### Paso 2 — Mano de obra

```
días_trabajo = 1 si distancia < 15 m
               2 si distancia ≥ 15 m

costo_mano_obra = jornal_instalador × días_trabajo
costo_vehículo  = $45.000 × días_trabajo
mano_obra_total = MIN(costo_mano_obra, materiales × 30%) + costo_vehículo
```

### Paso 3 — Costos operacionales y margen

| Ítem | Monto |
|------|------:|
| Marketing | $7.500 |
| Administración | $11.391 |
| Plataforma | $500 |
| Trámite SEC | $35.000 |
| **Margen Enérgica** | **30% sobre costo neto** |

Para cotizaciones de BYD (zeero.energica.city), se agrega además un cargo de dealer del 9,78%.

### Paso 4 — Total

```
costo_neto    = materiales + mano_obra + costos_operacionales
con_margen    = costo_neto × 1,30
IVA           = con_margen × 0,19
total_final   = con_margen + IVA
```

---

## Diferencia Casa vs. Edificio

| Aspecto | Casa | Edificio |
|---------|------|---------|
| Precios base | Menores | 38% más altos |
| Trámite SEC | $25.000 | $35.000 |
| Complejidad | Instalación directa | Requiere tablero común, recorrido por estacionamiento |

El sistema registra el piso del departamento y del estacionamiento para uso futuro en la cotización (actualmente es información informativa).

---

## Flujo paso a paso

```
1. Usuario elige CASA o EDIFICIO
      ↓
2. Usuario ajusta distancia y elige cargador
   → Sistema muestra precio orientativo en tiempo real
      ↓
3. Usuario presiona "Ver cotización"
   → Se guarda formulario en base de datos (ClientForm)
   → Se llama a ProcessEstimate en el servidor
   → Se reciben hasta 2 alternativas (7kW y 3,5kW para wallbox; 2,2kW para portable)
      ↓
4. Se muestra Step 3 con precio definitivo desglosado:
   - Costo de instalación (neto y con IVA)
   - Costo del cargador (si el cliente lo compra a Enérgica)
   - Total final con IVA
      ↓
5. El cliente elige: Reservar / Pagar / Enviar por email
```

---

## Notas técnicas

- El cálculo del backend es siempre el precio final. El cálculo del frontend es solo una estimación de UX.
- Si el servidor falla, el sistema muestra el precio estimado del frontend como fallback.
- El cargador es un precio separado de la instalación. Si el cliente ya tiene cargador, ese ítem es $0.
- El IVA (19%) se aplica sobre el precio neto de instalación + cargador.
- Los precios están en pesos chilenos (CLP) y no incluyen descuentos ni promociones especiales.

---

*Documento generado el 2026-06-16. Refleja la lógica de cálculo vigente en esa fecha.*
