# Informe: Cómo calcula el precio el Cotizador de Enérgica

**Caso de ejemplo:** Casa · Cargador Portátil · 10 metros desde el tablero
**Precio final al cliente:** $523.899 (IVA incluido)
**Fecha:** Junio 2026

---

## 1. Resumen Ejecutivo

El cotizador calcula el precio de instalación de un cargador eléctrico en cuatro capas: materiales reales, mano de obra, costos operacionales de Enérgica y margen comercial. El resultado neto que registra el sistema es **$494.149** (IVA incluido). Sin embargo, el sitio web aplica adicionalmente un cargo fijo de trámite SEC propio, lo que eleva el precio visible al cliente a **$523.899**. Esta diferencia de $29.750 existe porque el cargo SEC está definido de forma distinta en el sistema de backend y en el sitio web (ver Sección 4).

---

## 2. Desglose de Costos

| Concepto | Monto |
|---|---|
| **Materiales** | |
| Canalización | $18.797 |
| Cableado | $69.146 |
| Protección eléctrica | $52.142 |
| Tablero y montaje | $29.171 |
| **Subtotal materiales** | **$169.256** |
| | |
| **Mano de obra** | |
| Jornal instalador (1 día, con tope 30%) | $50.777 |
| Vehículo (1 día) | $45.000 |
| **Subtotal mano de obra** | **$95.777** |
| | |
| **Costos operacionales** | |
| Trámite SEC (TE6, backend) | $35.000 |
| Marketing | $7.500 |
| Administración | $11.391 |
| Plataforma | $500 |
| **Subtotal operacional** | **$54.391** |
| | |
| **Costo total Enérgica (sin margen)** | **$319.424** |
| Margen Enérgica (30%) | $95.827 |
| **Precio neto sin IVA** | **$415.251** |
| IVA (19%) | $78.898 |
| **Precio bruto sistema (backend)** | **$494.149** |
| Cargo SEC sitio web ($25.000 × 1,30 margen × 1,19 IVA) | $29.750 |
| **Precio final al cliente (web)** | **$523.899** |

---

## 3. El Cálculo Paso a Paso

### Paso 1 — Materiales reales

El sistema consulta en la base de datos los materiales necesarios para una instalación tipo Casa de 2.2 kW a 10 metros. Los precios provienen de cotizaciones reales de proveedores.

| Material | Precio |
|---|---|
| Canalización | $18.797 |
| Cableado | $69.146 |
| Protección eléctrica | $52.142 |
| Tablero y montaje | $29.171 |
| **Total materiales** | **$169.256** |

---

### Paso 2 — Mano de obra

El sistema calcula cuánto cuesta el trabajo del instalador para ese proyecto específico, con dos reglas importantes:

**¿Cuántos días se necesitan?**
A 10 metros, la instalación se completa en 1 día (el umbral para necesitar 2 días es 15 metros).

**Sueldo diario del instalador:**
$2.182.885 ÷ 20 días hábiles = **$109.144 por día**

**Regla del tope:** La mano de obra no puede superar el 30% del costo de materiales.
- Tope = $169.256 × 30% = $50.777
- Como el jornal real ($109.144) supera el tope, se usa el tope: **$50.777**

**Vehículo:** $45.000 × 1 día = **$45.000**

**Total mano de obra: $50.777 + $45.000 = $95.777**

---

### Paso 3 — Factor de ajuste por tipo de propiedad

Existe un factor de normalización para instalaciones en casas (1,1). Este factor está temporalmente desactivado, por lo que no modifica los montos en este cálculo.

---

### Paso 4 — Costos operacionales

Cada cotización incluye los costos fijos que Enérgica incurre para operar el servicio:

| Concepto | Monto |
|---|---|
| Trámite SEC (TE6) | $35.000 |
| Marketing | $7.500 |
| Administración | $11.391 |
| Plataforma | $500 |
| **Total** | **$54.391** |

---

### Paso 5 — Costo neto de Enérgica

Esta es la suma de todo lo que le cuesta a Enérgica entregar el proyecto:

$169.256 + $95.777 + $54.391 = **$319.424**

---

### Paso 6 — Margen comercial (30%)

Enérgica aplica un margen de ganancia del 30% sobre el costo total:

- Margen = $319.424 × 30% = $95.827
- Precio con margen = $319.424 + $95.827 = **$415.251** (neto, sin IVA)

---

### Paso 7 — IVA (19%)

- IVA = $415.251 × 19% = $78.898
- **Precio bruto registrado en el sistema: $415.251 + $78.898 = $494.149**

Este es el valor que queda guardado en la base de datos como precio oficial de la cotización.

---

### Paso 8 — Precio que ve el cliente en el sitio web

El sitio web recibe del sistema dos números:
- Costo de materiales: $169.256
- Costo de instalación: $245.995 (= $415.251 − $169.256)

Luego suma su propio cargo de trámite SEC de $25.000 y aplica IVA al total:

($169.256 + $245.995 + $25.000) × 1,19 = $440.251 × 1,19 = **$523.899**

Este es el número que aparece en pantalla.

---

## 4. Discrepancia SEC/TE6: Explicación para Negocio

El sistema tiene actualmente dos valores distintos para el cargo de trámite ante la SEC:

| Origen | Valor | Naturaleza |
|---|---|---|
| Sistema de backend (base de datos) | $35.000 | Configurable desde el panel de administración |
| Sitio web (código web) | $25.000 | Valor fijo en el código, requiere un despliegue para cambiarlo |

El sitio web suma su propio $25.000 encima del precio que ya entregó el backend (el cual ya incluyó los $35.000 de TE6 en el cálculo del costo operacional). Esto genera que el precio final al cliente sea **$29.750 mayor** que el precio registrado internamente en el sistema ($523.899 vs $494.149).

**Impacto:** El cliente ve un precio más alto del que el sistema registra como precio de venta. Si esto no es intencional, la corrección implica alinear ambos valores o eliminar el cargo duplicado del sitio web.

---

## 5. Opciones de Reserva con Descuento

El cotizador ofrece dos modalidades de reserva con descuento sobre el precio final ($523.899):

### Reserva 70% — Descuento del 15%

El cliente paga hoy el 70% del precio con descuento.

| Concepto | Cálculo | Resultado |
|---|---|---|
| Precio con descuento | $523.899 × 0,85 | **$445.314** |
| Pago hoy (70%) | $445.314 × 0,70 | **$311.720** |
| Saldo pendiente (30%) | $445.314 × 0,30 | $133.594 |

### Reserva 30% — Descuento del 7%

El cliente paga hoy el 30% del precio con descuento.

| Concepto | Cálculo | Resultado |
|---|---|---|
| Precio con descuento | $523.899 × 0,93 | **$487.226** |
| Pago hoy (30%) | $487.226 × 0,30 | **$146.168** |
| Saldo pendiente (70%) | $487.226 × 0,70 | $341.058 |

### Resumen comparativo

| Modalidad | Precio final | Ahorro | Pago hoy |
|---|---|---|---|
| Sin reserva (precio completo) | $523.899 | — | $523.899 |
| Reserva 30% (7% dcto) | $487.226 | $36.673 | $146.168 |
| Reserva 70% (15% dcto) | $445.314 | $78.585 | $311.720 |

El mayor descuento se obtiene comprometiendo el 70% del precio al momento de la cotización.

---

*Documento generado a partir de datos reales de DynamoDB — Junio 2026.*
*Para consultas técnicas, contactar al equipo de desarrollo.*
