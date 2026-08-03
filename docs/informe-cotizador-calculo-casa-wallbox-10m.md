# Informe: Cálculo de Precio — Casa con Wallbox 7 kW, 10 metros

**Fecha:** 11 de junio de 2026
**Caso:** Instalación residencial, cargador Wallbox 7 kW, distancia al tablero 10 metros
**Precio final al cliente: $653.818 (IVA incluido)**

---

## 1. Resumen ejecutivo

El cotizador calcula el precio de una instalación de carga sumando materiales, mano de obra y costos operacionales fijos, aplica el margen de Enérgica (30%) y luego agrega IVA (19%). Para el caso de una casa con Wallbox 7 kW y 10 metros de cableado, el precio resultante es **$653.818**. Este valor coincide exactamente entre el motor de cálculo del backend (AWS DynamoDB + AppSync) y lo que ve el cliente en el cotizador web, sin diferencias ni ajustes adicionales.

---

## 2. Desglose de costos

### 2.1 Parámetros del sistema (datos reales, base de datos PROD)

| Parámetro | Valor |
|---|---|
| Sueldo mensual instalador | $2.182.885 |
| Días trabajados por mes | 20 |
| Sueldo diario | $109.144 |
| Costo vehículo por día | $45.000 |
| Umbral para 2 días de trabajo | 15 metros |
| Tope mano de obra laboral | 30% de materiales |
| Margen Enérgica | 30% |
| IVA | 19% |

### 2.2 Materiales — receta "Casa 7 kW, sin subterráneo"

| Ítem | Valor |
|---|---|
| Canalización | $28.432 |
| Cableado | $123.129 |
| Protección eléctrica | $64.461 |
| Tablero y montaje | $32.628 |
| **Total materiales** | **$248.650** |

### 2.3 Mano de obra

| Ítem | Valor |
|---|---|
| Sueldo diario (1 día, 10 m < umbral 15 m) | $109.144 |
| Tope 30% de materiales | $74.595 |
| MO laboral aplicada (se aplica tope) | $74.595 |
| Vehículo (1 día × $45.000) | $45.000 |
| **Total mano de obra** | **$119.595** |

### 2.4 Costos operacionales fijos

| Ítem | Valor |
|---|---|
| Trámite SEC (TE6) | $35.000 |
| Marketing | $7.500 |
| Administración | $11.391 |
| Plataforma | $500 |
| **Total costos fijos** | **$54.391** |

---

## 3. Cálculo en 7 pasos

**Paso 1 — Suma de materiales**

$$28.432 + 123.129 + 64.461 + 32.628 = \mathbf{\$248.650}$$

**Paso 2 — Mano de obra**

- Sueldo diario: round($2.182.885 ÷ 20) = $109.144
- Días necesarios: **1** (10 metros es menor al umbral de 15 metros)
- Jornal estimado: $109.144
- Tope del 30% sobre materiales: round($248.650 × 0,30) = $74.595
- Como $109.144 > $74.595, **se aplica el tope**
- MO laboral: $74.595
- Vehículo: $45.000 × 1 día = $45.000
- **Total MO: $74.595 + $45.000 = $119.595**

**Paso 3 — Factor de normalización por tipo de propiedad**

El factor para casas (1,1) está actualmente **desactivado**. No se aplica ajuste.

**Paso 4 — Costo neto a Enérgica**

$$248.650 + 119.595 + 54.391 = \mathbf{\$422.636}$$

Este es el costo real que Enérgica absorbe antes de aplicar su margen.

**Paso 5 — Margen Enérgica (30%)**

- round($422.636 × 0,30) = $126.791
- $422.636 + $126.791 = **$549.427** (precio neto sin IVA)

**Paso 6 — IVA 19%**

- round($549.427 × 0,19) = $104.391
- $549.427 + $104.391 = **$653.818** (precio final con IVA)

Verificación: $653.818 ÷ 1,19 = $549.427 ✓

**Paso 7 — Precio que ve el cliente en el cotizador web**

El frontend calcula: round(($248.650 + $300.777) × 1,19) = round($549.427 × 1,19) = **$653.818**

> Precio backend = Precio al cliente = **$653.818** ✓ Los valores coinciden exactamente.

---

## 4. Comparativa por tipo de cargador (mismo caso: Casa, 10 metros)

| Potencia | Materiales | Mano de obra | Costo Enérgica | Precio final (IVA inc.) |
|---|---|---|---|---|
| Portátil 2.2 kW | $169.256 | $95.777 | $319.424 | $494.149 |
| Wallbox 7 kW | $248.650 | $119.595 | $422.636 | **$653.818** |

---

## 5. Opciones de reserva — Wallbox 7 kW ($653.818)

El cliente puede reservar con descuento según el monto que pague por adelantado:

### Opción A — Reserva del 70% (15% de descuento)

| Concepto | Cálculo | Valor |
|---|---|---|
| Precio con descuento 15% | $653.818 × 0,85 | $555.245 |
| Pago hoy (70% del precio descontado) | $555.245 × 0,70 | $388.672 |
| Saldo al momento de la instalación | $555.245 × 0,30 | $166.573 |

### Opción B — Reserva del 30% (7% de descuento)

| Concepto | Cálculo | Valor |
|---|---|---|
| Precio con descuento 7% | $653.818 × 0,93 | $608.051 |
| Pago hoy (30% del precio descontado) | $608.051 × 0,30 | $182.415 |
| Saldo al momento de la instalación | $608.051 × 0,70 | $425.636 |

---

*Valores calculados con datos reales de la base de datos de producción al 11 de junio de 2026. Todos los montos en pesos chilenos (CLP).*
