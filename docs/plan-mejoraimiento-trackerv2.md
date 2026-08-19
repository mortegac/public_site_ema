Este enfoque sufre de volatilidad absoluta: cualquier recarga manual de la página (F5), redirección externa (ida y vuelta a Webpay) o apertura de enlaces JWT desde el correo electrónico genera un nuevo sessionId. Además, carece de un mecanismo de idempotencia o deduplicación que distinga entre un "evento total" (interacciones repetidas) y un "evento único por usuario/sesión" (hitos del funnel).2. Benchmark con Google Analytics 4 (GA4)Para corregir estas deficiencias estructurales sin añadir costos ni dependencias externas (manteniendo la infraestructura ágil basada en Next.js Route Handlers + AppSync + DynamoDB), adoptamos los tres pilares fundamentales que gobiernan la recolección de datos en Google Analytics 4 (GA4):2.1 Gestión del Identificador de Sesión (session_id)GA4 no amarra la sesión a variables efímeras en memoria ni la resetea ante redirecciones de pasarelas de pago autorizadas. Un session_id en GA4 se mantiene persistente a lo largo de toda la ventana de navegación interactiva del usuario y solo expira tras 30 minutos de inactividad continua. Para lograr esto de forma liviana en la web sin cookies complejas de consentimiento de terceros, se utiliza el almacenamiento local del navegador que sobrevive a los cambios de contexto del dominio.2.2 Deduplicación e Idempotencia en Exploración de FunnelsEn GA4, los informes avanzados de embudos (Funnel Explorations) calculan los ratios basándose en usuarios únicos o sesiones únicas que completaron un hito, no en la cantidad absoluta de veces que se ejecutó el código del evento. Si un usuario activa el evento view_item_list cinco veces en la misma sesión, la métrica de volumen del paso del embudo se computa exactamente como 1. Nuestro sistema debe implementar un registro de control interno de hitos consumidos por sesión.2.3 Exclusión de Referencias Cruzadas (Referral Exclusion)GA4 evita la fragmentación de la sesión ignorando tráficos de referencia provenientes de dominios de pago homologados (ej. webpay.cl, transbank.cl). El retorno del cliente no debe interpretarse como una nueva visita orgánica o directa, sino como la continuación ininterrumpida de la sesión que inició el flujo del cotizador.3. Nueva Especificación Funcional de Sesiones y DeduplicaciónLa estrategia de remediación introduce una separación estricta entre la Persistencia de Sesión y el Mecanismo de Control de Idempotencia.3.1 Ciclo de Vida del Almacenamiento WebPara cumplir con los requerimientos, utilizaremos sessionStorage como la fuente de verdad del identificador de sesión (ec_sid) y del registro de control de eventos únicos (ec_fired_events).¿Por qué sessionStorage? A diferencia de localStorage (que persiste indefinidamente y mezclaría sesiones de días distintos) y de las variables en memoria (que mueren al salir de la página), sessionStorage mantiene los datos intactos ante recargas de página, redirecciones externas (Webpay) y retornos dentro de la misma pestaña o ventana de navegación. Se limpia automáticamente cuando el usuario cierra la pestaña, lo que delimita perfectamente el concepto de "sesión de cotización activa".3.2 Clasificación de Eventos para el FunnelPara evitar alterar las métricas base pero sanear el embudo, clasificaremos las llamadas en dos tipos:Eventos Hito (Idempotentes / Únicos por Sesión): Eventos críticos que marcan el progreso lineal en el funnel. Solo deben registrarse una vez por sesión en la base de datos de tracking. Si el usuario vuelve atrás y entra de nuevo, el sistema omite el envío repetido.Eventos de Micro-Interacción (Interactivos / Repetibles): Eventos que miden el comportamiento granular y el engagement dentro de un mismo paso. Es correcto e indispensable que se registren todas las veces que ocurran para analizar patrones de duda o fricción en la UI.EventoTipoFunción en el TrackerJustificaciónstep_1_loadedHitotrackUniqueMarca la entrada única al funnel.tipo_selectedMicro-interaccióntrackPermite ver cuántas veces el usuario duda entre "casa" y "edificio".address_enteredMicro-interaccióntrackRegistra si el usuario prueba múltiples comunas.step_2_loadedHitotrackUniqueAvanzó efectivamente al paso del cargador.charger_selectedMicro-interaccióntrackMide la comparación entre distintos cargadores del catálogo.distance_changedMicro-interaccióntrackMovimiento continuo del slider de distancia.distance_finalMicro-interaccióntrackDistancia definitiva configurada.step_3_loadedHitotrackUniqueLlegada única a la pantalla de cotización final.section_viewedHitotrackUniqueVisualización única de secciones (desglose, social_proof, etc.) vía IntersectionObserver.cta_reservar_clickedHitotrackUniqueIntención firme de compra.webpay_initiatedHitotrackUniqueRedirección inminente a Transbank.step_3_abandonedHitotrackUniqueCaptura de abandono único mediante beforeunload.payment_confirmedHitotrackUniqueConfirmación de transacción exitosa post-retorno.date_selectedMicro-interaccióntrackSi el usuario cambia de opinión en el calendario de agenda.booking_confirmedHitotrackUniqueAgendamiento finalizado con éxito en Google Calendar.4. Implementación Técnica Detallada: FrontendA continuación se detalla el código completo y refactorizado que reemplaza la lógica previa. Está diseñado bajo estándares estrictos de TypeScript, previniendo errores en entornos SSR (Server-Side Rendering) de Next.js.4.1 Refactor de la Librería de Tracking (src/lib/tracker.ts)TypeScript/**
 * src/lib/tracker.ts
 * Sistema de Analítica Idempotente para Enérgica City
 * Sigue principios de arquitectura GA4 utilizando sessionStorage para evitar duplicados.
 */

const ENDPOINT = '/api/track';
const UID_KEY = 'ec_uid';             // localStorage: Persistencia de usuario anónimo a largo plazo
const SID_KEY = 'ec_sid';             // sessionStorage: Persistencia de sesión única
const FIRED_EVENTS_KEY = 'ec_fired_events'; // sessionStorage: Registro de control de idempotencia

export interface TrackPayload {
  event: string;
  props: Record<string, unknown>;
  sessionId: string;
  anonymousId: string;
  customerId: string | null;
  formId: string | null;
  url: string;
  referrer: string;
  device: 'mobile' | 'desktop';
  step: number | null;
  timestamp: string;
}

// Inicialización segura del SessionID (Estilo GA4 con soporte para SSR)
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr-env';

  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
      
      sessionStorage.setItem(SID_KEY, sid);
      // Al inicializar una nueva sesión limpia, nos aseguramos de vaciar eventos previos
      sessionStorage.removeItem(FIRED_EVENTS_KEY);
    }
    return sid;
  } catch (e) {
    console.error('[Tracker Cache Error] Fallback a sesión efímera:', e);
    return 'efhemeral-sid';
  }
}

// Inicialización segura del AnonymousID persistente (localStorage)
function getAnonymousId(): string {
  if (typeof window === 'undefined') return 'ssr-env';

  try {
    let uid = localStorage.getItem(UID_KEY);
    if (!uid) {
      uid = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(UID_KEY, uid);
    }
    return uid;
  } catch {
    // Si las cookies o el almacenamiento local están bloqueados por modo incógnito estricto
    return getSessionId();
  }
}

function getDevice(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  return /Mobi/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

// Contexto de identidad enriquecido (Caché en memoria del módulo frontend)
let identity: { customerId?: string | null; formId?: string | null } = {
  customerId: null,
  formId: null,
};

/**
 * Establece la identidad global para los eventos de tracking subsiguientes.
 * Sincroniza datos críticos en caliente (email, formId).
 */
export function setTrackerIdentity(next: { customerId?: string | null; formId?: string | null }): void {
  identity = {
    ...identity,
    customerId: next.customerId !== undefined ? next.customerId : identity.customerId,
    formId: next.formId !== undefined ? next.formId : identity.formId,
  };
}

/**
 * TRACK STANDARD (Para Micro-interacciones): Registra absolutamente todas las llamadas.
 */
export function track(event: string, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !event) return;

  const payload: TrackPayload = {
    event,
    props,
    sessionId: getSessionId(),
    anonymousId: getAnonymousId(),
    customerId: identity.customerId ?? null,
    formId: identity.formId ?? null,
    url: window.location.pathname,
    referrer: document.referrer,
    device: getDevice(),
    step: typeof props.step === 'number' ? Math.trunc(props.step) : null,
    timestamp: new Date().toISOString(),
  };

  const data = JSON.stringify(payload);

  // Mecanismo Primario: sendBeacon (Garantiza entrega asíncrona, no bloquea UI, sobrevive a cierres de pestaña)
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' });
      if (navigator.sendBeacon(ENDPOINT, blob)) return;
    }
  } catch (err) {
    console.warn('[Tracker sendBeacon Fallback] Transfiriendo a fetch:', err);
  }

  // Mecanismo Fallback: Fetch asíncrono con bandera keepalive activa
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    keepalive: true,
  }).catch((fetchErr) => {
    console.error('[Tracker Critical Error] Error de red en tracking remoto:', fetchErr);
  });
}

/**
 * TRACK UNIQUE (Para Hitos del Funnel): Aplica control de deduplicación estricto por sesión.
 * Si el evento ya fue transmitido en la sesión actual, la función aborta silenciosamente.
 */
export function trackUnique(event: string, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !event) return;

  try {
    const firedEventsRaw = sessionStorage.getItem(FIRED_EVENTS_KEY);
    const firedEvents: string[] = firedEventsRaw ? JSON.parse(firedEventsRaw) : [];

    // Verificación de existencia previa en la sesión actual
    if (firedEvents.includes(event)) {
      console.debug(`[Tracker Deduplication] Evento omitido por regla de idempotencia: "${event}"`);
      return;
    }

    // Inyección en el array de control y sincronización con el almacenamiento del navegador
    firedEvents.push(event);
    sessionStorage.setItem(FIRED_EVENTS_KEY, JSON.stringify(firedEvents));

    // Despacho definitivo del evento único
    track(event, props);
  } catch (e) {
    console.error('[Tracker trackUnique Error] Fallback ejecutando track estándar:', e);
    track(event, props);
  }
}
5. Guía de Instrumentación en el Módulo Cotizador (CotizadorWizard.tsx)Para corregir de inmediato el error de conversión del 102% reflejado en los sistemas, se debe instrumentar el componente principal de control del Wizard sustituyendo estratégicamente las llamadas basándose en la taxonomía definida en la sección 3.2.TypeScript// Ruta del archivo: src/app/cotizador/CotizadorWizard.tsx
import { useEffect, useRef } from 'react';
import { track, trackUnique, setTrackerIdentity } from '@/lib/tracker';

export default function CotizadorWizard() {
  // ... selectores de estado interno del cotizador de Enérgica City ...
  const { state, update } = useWizardState(); // Asumiendo arquitectura nativa existente

  // =========================================================================
  // PASO 1: Ubicación y Tipo de Propiedad (state.step === 0)
  // =========================================================================
  
  // Entrada única al cotizador
  useEffect(() => {
    trackUnique('step_1_loaded', { step: 1 });
  }, []);

  const handleTipoPropiedad = (tipo: 'casa' | 'edificio') => {
    update({ tipo });
    // Micro-interacción: Se usa track estándar por si el usuario cambia alternadamente la selección
    track('tipo_selected', { tipo, step: 1 });
  };

  const handleConfirmAddress = (addressCity: string, addressState: string) => {
    // Protección de privacidad estricta: Solo capturar la comuna (GAP-11 del spec de privacidad)
    const comunaSanitizada = addressCity.trim().toLowerCase();
    track('address_entered', { comuna: comunaSanitizada, step: 1 });
    
    // Ejecución de lógica de negocio hacia paso 2...
  };

  // =========================================================================
  // PASO 2: Selección de Cargador y Distancia (state.step === 1)
  // =========================================================================
  
  useEffect(() => {
    if (state.step === 1) {
      trackUnique('step_2_loaded', { step: 2 });
    }
  }, [state.step]);

  const handleChargerSelection = (id: string, name: string, type: string) => {
    update({ chargerId: id });
    // Micro-interacción: El usuario puede explorar el catálogo múltiples veces
    track('charger_selected', { 
      charger: id === 'own' ? 'Cliente trae cargador' : name, 
      type: type, // 'portable' | 'wallbox'
      step: 2 
    });
  };

  // Slider de distancia del tablero eléctrico (Integración con Material-UI Slider)
  const handleDistanceSliderChange = (newDist: number) => {
    update({ dist: newDist });
    // Disparo continuo: Mapea la fricción del usuario interactuando con el control
    track('distance_changed', { distance: newDist, step: 2 });
  };

  const handleDistanceSliderCommitted = (finalDist: number) => {
    // Evento definitivo: Se ejecuta únicamente al soltar el clic del ratón o soltar el control táctil
    track('distance_final', { distance: finalDist, step: 2 });
  };

  // =========================================================================
  // PASO 3: Cotización Final y Conversión (state.step === 2)
  // =========================================================================
  
  useEffect(() => {
    if (state.step === 2 && state.apiResult) {
      // Sincronización del ID de formulario interconectado al tracker global
      if (state.formId) {
        setTrackerIdentity({ formId: state.formId });
      }

      trackUnique('step_3_loaded', {
        step: 3,
        total: state.apiResult.total,
        charger: state.chargerId === 'own' ? 'Propio' : state.apiResult.chargerName,
        distance: state.dist,
        tipo: state.tipo
      });
    }
  }, [state.step, state.apiResult, state.formId]);

  // Engagement Pasivo (IntersectionObserver para Secciones Críticas)
  useEffect(() => {
    if (state.step !== 2) return;

    const EVENT_BY_SECTION: Record<string, string> = {
      desglose: 'desglose_viewed',
      timeline: 'timeline_viewed',
      social_proof: 'social_proof_viewed',
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const targetSection = (e.target as HTMLElement).dataset.track;
          
          if (targetSection && EVENT_BY_SECTION[targetSection]) {
            // Se utiliza trackUnique global para evitar inflar lecturas por scroll errático
            trackUnique('section_viewed', { section: targetSection, step: 3 });
            trackUnique(EVENT_BY_SECTION[targetSection], { step: 3 });
            
            // Deja de observar inmediatamente tras la primera lectura válida
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 } // 50% de la sección visible en el viewport del dispositivo
    );

    document.querySelectorAll('[data-track]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [state.step]);

  // Lógica del Botón "Reservar" e inicio de pasarela externa de pagos
  const handleInitiatePayment = (emailUsuario: string) => {
    const totalTransaccion = state.apiResult?.total ?? 0;
    const opcionPagoMapeada = mapToSelectedPaymentOption(state.selectedReserveOption, state.typeOfCart, state.tipo);

    // Enriquecimiento final de identidad antes de abandonar el sitio web
    setTrackerIdentity({ customerId: emailUsuario.trim().toLowerCase() });

    trackUnique('cta_reservar_clicked', { step: 3, total: totalTransaccion });
    
    trackUnique('payment_option_selected', {
      step: 3,
      option: opcionPagoMapeada,
      tipo: state.tipo,
      hasCharger: state.chargerId === 'own',
      total: totalTransaccion,
    });

    trackUnique('webpay_initiated', {
      step: 3,
      total: totalTransaccion,
      hasCharger: state.chargerId === 'own',
      selectedPaymentOption: opcionPagoMapeada,
      tipo: state.tipo,
    });

    // Redirección forzada hacia /api/payment -> Transbank Webpay
  };

  // Captura Idempotente de Abandonos (beforeunload)
  const paidRef = useRef(state.paid);
  const stepRef = useRef(state.step);
  const resultRef = useRef(state.apiResult);

  useEffect(() => {
    paidRef.current = state.paid;
    stepRef.current = state.step;
    resultRef.current = state.apiResult;
  }, [state.paid, state.step, state.apiResult]);

  useEffect(() => {
    const stepStart = Date.now();

    function onBeforeUnload() {
      if (stepRef.current === 2 && !paidRef.current) {
        // Al ejecutarse saliendo del hilo principal, trackUnique evalúa sessionStorage sincrónicamente
        trackUnique('step_3_abandoned', {
          step: 3,
          total: resultRef.current?.total ?? null,
          timeOnStepMs: Date.now() - stepStart,
        });
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  return (
    // Componente JSX Estructural...
    // Ejemplo de contenedores de tracking pasivo:
    // <div data-track="social_proof"> ...testimonios de clientes... </div>
  );
}

// Helper de mapeo funcional provisto en especificaciones base
function mapToSelectedPaymentOption(selectedReserveOption: string, typeOfCart: string, tipo: string): string | undefined {
  if (typeOfCart === 'visit' && tipo === 'edificio') return 'paga-visita-mas-kit-comunidad';
  if (typeOfCart === 'visit' && tipo === 'casa') return 'visita-tecnica';
  if (selectedReserveOption === 'r70') return 'reserva-70-porc';
  if (selectedReserveOption === 'r30') return 'reserva-30-porc';
  return undefined;
}
6. Manejo del Retorno de Pago y AgendaGracias al uso avanzado de sessionStorage, el estado de la sesión ya no se fragmenta al retornar del flujo externo de Transbank. El cliente es redirigido de vuelta al sitio de Enérgica City, manteniendo intacto su ecosistema de identificadores.6.1 Instrumentación en Pantalla de Éxito Comercial (ReciboPagoClient.tsx)Ubicación del archivo: src/app/cotizador/recibo-pago/ReciboPagoClient.tsxAl procesar la carga definitiva de confirmación de pago y validación del token_ws mediante la API local:TypeScriptimport { useEffect } from 'react';
import { trackUnique, setTrackerIdentity } from '@/lib/tracker';

export default function ReciboPagoClient({ datosTransaccion, metadataInstall }) {
  useEffect(() => {
    if (datosTransaccion && metadataInstall) {
      // 1. Re-inyectar identidad en caso de accesos asíncronos o limpiezas de memoria JS
      setTrackerIdentity({
        customerId: datosTransaccion.email.trim().toLowerCase(),
        formId: metadataInstall.formId,
      });

      // 2. Disparar el Hito Definitivo de conversión del embudo comercial
      trackUnique('payment_confirmed', {
        step: null, // Evento post-funnel directo
        total: datosTransaccion.amount,
        buyOrder: datosTransaccion.buyOrder,
        paymentType: metadataInstall.paymentType
      });
    }
  }, [datosTransaccion, metadataInstall]);

  return (
    // Renderizado UI de comprobante de pago...
  );
}
6.2 Instrumentación en Pantalla de Agendamiento de Visitas (AgendaClient.tsx)Ubicación del archivo: src/app/cotizador/agenda/AgendaClient.tsxEsta sección cubre tanto el flujo orgánico continuo como los re-ingresos tardíos provocados por el cliente al interactuar con el enlace seguro JWT enviado automáticamente a su correo electrónico.TypeScriptimport { useEffect } from 'react';
import { track, trackUnique, setTrackerIdentity } from '@/lib/tracker';

export default function AgendaClient({ decodedJwtData, activeVisitData }) {
  useEffect(() => {
    if (decodedJwtData) {
      // Reconstrucción infalible de contexto analítico desde los claims firmados del JWT
      setTrackerIdentity({
        customerId: decodedJwtData.email.trim().toLowerCase(),
        formId: decodedJwtData.formid
      });
    }
  }, [decodedJwtData]);

  const handleSlotSelection = (fechaSeleccionada: string, daysFromNow: number) => {
    // Al ser una micro-interacción de selección que puede cambiar varias veces, usamos track standard
    track('date_selected', {
      date: fechaSeleccionada,
      daysFromNow: daysFromNow,
    });
  };

  const handleConfirmacionAgendaExitosa = (fechaConfirmada: string) => {
    // Cierre definitivo del viaje del cliente: Agenda confirmada en Google Calendar
    trackUnique('booking_confirmed', {
      step: null,
      date: fechaConfirmada,
    });
  };

  return (
    // Interfaz de control del Calendario de Visitas Técnicas...
  );
}
7. Verificación, Pruebas y Aseguramiento de Calidad (QA)Para auditar y validar que este refactor solucione los problemas detectados en el dashboard sin romper la experiencia UX de usuario, ejecute el siguiente protocolo de control de calidad:7.1 Pruebas en Entorno Local (Chrome DevTools)Validación de Sesión Persistente: Abra el Cotizador Solar, acceda a la consola de desarrollador (F12) -> pestaña Application -> Session Storage. Verifique la existencia de la clave ec_sid con un formato UUID estructurado. Recargue la página manualmente con Ctrl + F5 y certifique que el valor de ec_sid se conserva idéntico.Validación de Deduplicación: Navegue progresivamente hasta el Paso 2 del cotizador. Retroceda al Paso 1 mediante los controles internos de la interfaz gráfica del sitio y vuelva a avanzar al Paso 2. Inspeccione la clave ec_fired_events en el Session Storage. Debe contener exactamente un registro para step_1_loaded y un registro para step_2_loaded. En la pestaña de red (Network Tab), filtre por la ruta /api/track y compruebe que no se despacharon solicitudes duplicadas para dichos eventos.Simulación de Simetría Webpay: Estando en el Paso 3, modifique artificialmente la localización del navegador ejecutando en consola window.location.href = "https://www.google.com". Posteriormente pulse el botón de retroceso nativo del navegador para regresar al Cotizador. Compruebe que el identificador ec_sid y los estados del array ec_fired_events continúan intactos en su almacenamiento.7.2 Validación en Consola de DynamoDB / AppSyncRealice una simulación completa de flujo de compra de punta a punta hasta la agenda del calendario y ejecute la siguiente query GraphQL en el Backoffice para auditar los registros brutos depositados en DynamoDB:GraphQLquery VerifyIdempotencyFunnel($sessionId: String!) {
  CotizadorEventsBySessionId(sessionId: $sessionId, sortDirection: ASC) {
    items {
      event
      step
      anonymousId
      formId
      customerId
      createdAt
    }
  }
}
Criterio de Aceptación: La lista resultante de elementos (items) debe reflejar una secuencia cronológica limpia, donde los nombres de los eventos categorizados como "Hito" aparezcan máximo una sola vez por bloque de sesión indexado, eliminando de forma definitiva las anomalías analíticas superiores al 100% observadas previamente.