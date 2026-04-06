'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { prevStep, resetComparador, selectComparador } from '@/store/Comparador/slice';
import { calcTCO, formatCLP } from '../utils/tco';
import { EV_DB } from '../data/vehicles';

const PR = '#0B1F3A';
const AC = '#00C47C';
const ACL = '#EAFAF4';
const BD = '#E2E8F0';
const MU = '#64748B';

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=56967666652&text=Hola!+Me+interesa+información+sobre+cambiarme+a+un+auto+eléctrico&type=phone_number&app_absent=0';

interface CTACardProps {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  variant?: 'dark' | 'whatsapp' | 'default';
  wide?: boolean;
}

function CTACard({ icon, title, description, cta, href, variant = 'default', wide = false }: CTACardProps) {
  const isDark = variant === 'dark';
  const isWhatsapp = variant === 'whatsapp';

  return (
    <Box
      component={Link}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      sx={{
        gridColumn: wide ? 'span 2' : 'span 1',
        '@media (max-width:520px)': { gridColumn: 'span 1' },
        border: `1.5px solid ${isDark ? PR : BD}`,
        borderRadius: '12px',
        p: '20px',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        transition: 'all 0.2s',
        background: isDark ? PR : '#fff',
        '&:hover': {
          borderColor: isWhatsapp ? '#25D366' : AC,
          boxShadow: '0 2px 20px rgba(11,31,58,.07)',
          transform: 'translateY(-2px)',
          background: isWhatsapp ? '#F0FFF5' : isDark ? PR : '#fff',
        },
      }}
    >
      <Typography fontSize={28}>{icon}</Typography>
      <Typography fontSize={15} fontWeight={700} color={isDark ? '#fff' : PR}>
        {title}
      </Typography>
      <Typography fontSize={13} color={isDark ? 'rgba(255,255,255,.65)' : MU} lineHeight={1.4}>
        {description}
      </Typography>
      <Typography fontSize={14} fontWeight={700} color={isWhatsapp ? '#25D366' : AC} mt="auto">
        {cta}
      </Typography>
    </Box>
  );
}

export default function Step4CTAs() {
  const dispatch = useAppDispatch();
  const { currentVehicle, selectedEVId, evRecommendations } = useAppSelector(selectComparador);

  const selectedEV = evRecommendations.find(ev => ev.id === selectedEVId) ?? evRecommendations[0];

  let savingsText = 'El equipo de Energica City te acompaña en cada paso de tu transición a la electromovilidad.';
  if (selectedEV && currentVehicle.valorMercadoCLP > 0) {
    const tco = calcTCO(
      selectedEV,
      currentVehicle.valorMercadoCLP,
      currentVehicle.kmMensuales,
      currentVehicle.consumoL100km,
      currentVehicle.precioCombustibleCLP,
    );
    if (tco.ahorro5yr > 0) {
      savingsText = `El análisis muestra que podrías ahorrar ${formatCLP(tco.ahorro5yr)} en 5 años pasándote al ${selectedEV.marca} ${selectedEV.modelo}. El equipo de Energica City te acompaña en cada paso.`;
    }
  }

  return (
    <Box>
      <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2.5, sm: 3.5 }, border: `1px solid ${BD}`, boxShadow: '0 2px 20px rgba(11,31,58,.07)', mb: 2 }}>
        <Typography variant="h6" fontWeight={700} color={PR} mb={0.5} letterSpacing="-0.3px">
          ¿Listo para dar el salto? ⚡
        </Typography>
        <Typography fontSize={14} color={MU} mb={2.5} lineHeight={1.5}>
          {savingsText}
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          '@media (max-width:520px)': { gridTemplateColumns: '1fr' },
        }}>
          <CTACard
            icon="🔌"
            title="Cotiza la instalación de tu cargador en casa"
            description="Desde $159.000 en casas o $369.000 en edificios. Instaladores certificados SEC. Simula tu proyecto ahora."
            cta="→ energica.city/cotizador"
            href="/cotizador"
            variant="dark"
            wide
          />
          <CTACard
            icon="💬"
            title="Escríbenos por WhatsApp"
            description="Habla con un asesor de electromovilidad ahora mismo"
            cta="→ +56 9 6766 6652"
            href={WHATSAPP_URL}
            variant="whatsapp"
          />
          <CTACard
            icon="📅"
            title="Agenda una visita"
            description="Reserva una asesoría personalizada con nuestro equipo"
            cta="→ Ver disponibilidad"
            href="/agenda"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Button
          onClick={() => dispatch(prevStep())}
          sx={{ color: MU, border: `1.5px solid ${BD}`, fontWeight: 700, px: 3, py: 1.5, borderRadius: '10px', textTransform: 'none', fontSize: 15, '&:hover': { borderColor: PR, color: PR } }}
        >
          ← Ver comparación
        </Button>
        <Button
          onClick={() => dispatch(resetComparador())}
          variant="contained"
          color="primary"
          sx={{ fontWeight: 700, px: 3, py: 1.5, borderRadius: '10px', textTransform: 'none', fontSize: 15, '&:hover': { transform: 'translateY(-1px)' } }}
        >
          Nuevo análisis ↺
        </Button>
      </Box>
    </Box>
  );
}
