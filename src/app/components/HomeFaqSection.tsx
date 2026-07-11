'use client';
import { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';

const FAQ_ITEMS = [
  {
    q: '¿Qué es el trámite TE-6 y por qué es obligatorio?',
    a: (
      <>
        En Enérgica City nos encargamos de la declaración TE-6 ante la SEC.{' '}
        El <strong>Trámite Eléctrico 6 (TE-6)</strong> es el registro obligatorio exigido por la SEC para poner
        en marcha cualquier punto de carga de vehículos eléctricos. Gestionamos todo el proceso por ti:
        desde el levantamiento de la información técnica, la ubicación y el tipo de acceso
        (público o privado), hasta los modos de carga habilitados.
      </>
    ),
  },
  {
    q: '¿Cuánto demora instalar un cargador en mi casa?',
    a: (
      <>
        El tiempo de puesta en marcha depende de tu instalación actual. Si tu empalme resiste
        la potencia del equipo, <strong>¡en 2 a 5 días hábiles quedará operativo!</strong> Si la red requiere
        una ampliación o un nuevo empalme, la distribuidora maneja plazos regulados de 10 a 90 días
        hábiles. En cualquier escenario, nuestro equipo de Enérgica City toma el control de todo el
        papeleo y la coordinación para acelerar el proceso al máximo.
      </>
    ),
  },
  {
    q: '¿En qué se diferencian los Modos 2, 3 y 4 de carga para vehículos eléctricos?',
    a: (
      <>
        La diferencia principal está en la velocidad de carga y el tipo de instalación:
        <br /><br />
        <strong>Modo 2 (Carga lenta):</strong> Se conecta directo a cualquier enchufe convencional. Funciona entre 2,2 y 11 kW y es la alternativa más económica, aunque la más lenta. Ideal si recorres menos de 30 km al día y puedes dejar el auto conectado muchas horas.
        <br /><br />
        <strong>Modo 3 (Carga estándar):</strong> Utiliza un cargador fijo de pared o pedestal tipo Wallbox, operando entre 3,5 y 50 kW. Es el sistema ideal y más seguro para casas, edificios residenciales o estacionamientos de empresas.
        <br /><br />
        <strong>Modo 4 (Carga rápida):</strong> Inyecta energía en corriente continua (DC) desde los 44 kW. Se usa en electrolineras públicas o flotas que necesitan reabastecerse en tiempo récord.
      </>
    ),
  },
  {
    q: '¿Cuáles son las alternativas si mi empalme no tiene suficiente potencia?',
    a: (
      <>
        Ante un escenario de potencia limitada, evaluamos tres opciones técnicas:
        <br /><br />
        <strong>Ampliación de empalme:</strong> Modificación de la capacidad contratada ante la distribuidora.
        <br /><br />
        <strong>Empalme dedicado:</strong> Habilitación de una nueva acometida y medidor exclusivo para la infraestructura de carga.
        <br /><br />
        <strong>Control dinámico de potencia:</strong> Sistema de gestión energética que regula la carga del vehículo según la demanda instantánea del inmueble.
        <br /><br />
        Realizamos un diagnóstico en terreno para determinar la factibilidad técnica y económica de cada opción.
      </>
    ),
  },
  {
    q: 'Vivo en un edificio, ¿puedo instalar un cargador en mi estacionamiento?',
    a: (
      <>
        <strong>¡Sí, totalmente!</strong> Las normativas vigentes te permiten solicitar la conexión para tu
        vehículo en los estacionamientos comunitarios. Sabemos que hablar con la administración puede generar
        dudas, por lo que te acompañamos en todo el proceso de aprobación con tu comunidad, entregándote los
        argumentos técnicos necesarios.
        <br /><br />
        Resolvemos todo el papeleo y la ejecución eléctrica para que tengas tu punto de carga de forma
        rápida y 100% legal. Lo mejor de todo es que con <strong>Enérgica City puedes realizar esta
        instalación con costo $0</strong>: solo debes postular y nos pondremos en contacto contigo para
        evaluar tu caso y guiarte en el proceso.
      </>
    ),
  },
];

const CHEVRON = (
  <svg
    className="faq-chevron"
    width="12"
    height="8"
    viewBox="0 0 8 6"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginLeft: 12, transition: 'transform 0.25s ease' }}
  >
    <path d="m1 1.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function HomeFaqSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLDetailsElement>('details.faq-item');
    if (!items) return;
    const handlers: Array<() => void> = [];
    items.forEach((item) => {
      const handler = () => {
        if (item.open) {
          items.forEach((other) => { if (other !== item) other.open = false; });
        }
      };
      item.addEventListener('toggle', handler);
      handlers.push(() => item.removeEventListener('toggle', handler));
    });
    return () => handlers.forEach((off) => off());
  }, []);

  return (
    <Box
      component="section"
      aria-label="Preguntas frecuentes"
      sx={{
        bgcolor: '#F8FAFC',
        py: { xs: 7, md: 10 },
        // chevron rotation when details is open
        '& details.faq-item[open] .faq-chevron': { transform: 'rotate(180deg)' },
        '& .faq-panel': {
          display: 'grid',
          gridTemplateRows: '0fr',
          transition: 'grid-template-rows 0.25s ease',
        },
        '& details.faq-item[open] .faq-panel': { gridTemplateRows: '1fr' },
        '& .faq-panel-inner': { overflow: 'hidden' },
      }}
    >
      <Container maxWidth="md" ref={ref}>
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography
            component="h2"
            fontSize={{ xs: '22px', md: '28px' }}
            fontWeight={700}
            color="#221C35"
            mb="8px"
          >
            Preguntas frecuentes
          </Typography>
        </Box>

        {/* Accordion */}
        <Box
          sx={{
            bgcolor: 'rgba(34,28,53,0.05)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <Box
              key={i}
              component="details"
              className="faq-item"
              sx={{
                borderBottom: i < FAQ_ITEMS.length - 1 ? '1px solid rgba(34,28,53,0.12)' : 'none',
                color: '#221C35',
                '& summary': {
                  listStyle: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: '20px 24px',
                  fontWeight: 700,
                  fontSize: '16px',
                  userSelect: 'none',
                  '&::-webkit-details-marker': { display: 'none' },
                },
                '& .faq-answer': {
                  px: '24px',
                  pb: '20px',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  opacity: 0.85,
                  '& strong': { opacity: 1 },
                },
              }}
            >
              <summary>
                <span>{item.q}</span>
                {CHEVRON}
              </summary>
              <div className="faq-panel">
                <div className="faq-panel-inner">
                  <Box className="faq-answer">{item.a}</Box>
                </div>
              </div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
