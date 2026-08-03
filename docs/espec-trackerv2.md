# Especificación Técnica de Corrección: Optimización de Tracking e Idempotencia del Cotizador Solar

**Estado**: Listo para Implementación  
**Versión**: 2.0 (Refactor de Estabilidad y Alineación con GA4)  
**Fecha de Referencia**: Junio 2026  
**Autor**: Desarrollador Senior con especialidad en IA, Analítica y Growth Marketing  

---

## 1. Introducción y Diagnóstico del Estado Actual

Tras auditar minuciosamente la solución de analítica propia implementada para el funnel del cotizador solar de Enérgica City, se ha identificado una degradación crítica en la calidad y fiabilidad de los datos recolectados. El análisis cruzado del plan de implementación original (`spec-trackking-plan-implementacion.md`), las especificaciones funcionales (`espec-cotizador.md`) y el dashboard de control actual arroja discrepancias matemáticas graves que impiden la toma de decisiones estratégicas de marketing, atribución y retargeting.

### 1.1 Síntomas Técnicos Detectados en el Dashboard
1. **Inversión de Volúmenes en el Embudo (Conversión > 100%):** El dashboard muestra un registro de **116 eventos totales para el Paso 1** y **118 eventos totales para el Paso 2** (una tasa de conversión imposible del **102%**). En un embudo de conversión estrictamente lineal y descendente, ningún paso posterior puede acumular más volumen que su predecesor.
2. **Duplicación de Registros de Pasos:** Los usuarios que navegan de forma iterativa (avanzan al paso 2, regresan al paso 1 mediante la interfaz o el botón "Atrás" del navegador, y vuelven a avanzar al paso 2) disparan los listeners del ciclo de vida de React (`useEffect`) de manera repetida, inflando artificialmente las métricas totales.
3. **Desconexión del Viaje Post-Pago (Fragmentación de Sesiones):** Se registra un desajuste entre los clics en el botón de reserva (`cta_reservar_clicked`, 2 registros), las transacciones Webpay iniciadas (`webpay_initiated`, 3 registros) y los pagos confirmados (`payment_confirmed`, 1 registro). Esto se debe a que la redirección externa hacia la pasarela de Transbank (Webpay) destruye el estado en memoria de la aplicación React. Al retornar a la URL de éxito (`/return?token_ws=...` o `/cotizador/agenda`), el script inicializa un identificador de sesión completamente nuevo, dividiendo el viaje de un único cliente en dos o más usuarios inconexos.

### 1.2 Causa Raíz de la Falla de Diseño
La arquitectura frontend actual define la sesión a nivel de ciclo de vida del módulo JS:
```typescript
// Diseño actual defectuoso (en memoria)
const sessionId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
  ? crypto.randomUUID()
  : Math.random().toString(36).slice(2);