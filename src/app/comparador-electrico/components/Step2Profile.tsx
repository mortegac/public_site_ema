'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Slider,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setUsageProfile,
  nextStep,
  prevStep,
  computeRecommendations,
  selectComparador,
} from '@/store/Comparador/slice';
import { TipoUso, LugarCarga } from '@/store/Comparador/type';

const PR = '#0B1F3A';
const AC = '#00C47C';
const ACL = '#EAFAF4';
const BD = '#E2E8F0';
const MU = '#64748B';

interface OptionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({ icon, title, subtitle, selected, onClick }: OptionCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: '14px 10px 12px',
        border: `1.5px solid ${selected ? AC : BD}`,
        borderRadius: '10px',
        background: selected ? ACL : '#fff',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.2s',
        userSelect: 'none',
        '&:hover': {
          borderColor: AC,
          background: ACL,
        },
      }}
    >
      <Typography fontSize={24} mb={0.5}>{icon}</Typography>
      <Typography fontSize={13} fontWeight={700} color={PR} display="block">
        {title}
      </Typography>
      <Typography fontSize={11} color={MU} display="block" mt={0.25}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default function Step2Profile() {
  const dispatch = useAppDispatch();
  const { usageProfile } = useAppSelector(selectComparador);

  const [tipoUso, setTipoUso] = React.useState<TipoUso>(usageProfile.tipoUso);
  const [lugarCarga, setLugarCarga] = React.useState<LugarCarga>(usageProfile.lugarCarga);
  const [presupuesto, setPresupuesto] = React.useState(usageProfile.presupuestoCLP);
  const [error, setError] = React.useState('');

  const handleContinue = () => {
    if (!tipoUso) { setError('Indica para qué usas tu auto.'); return; }
    if (!lugarCarga) { setError('Indica dónde cargarías el eléctrico.'); return; }
    setError('');
    dispatch(setUsageProfile({ tipoUso, lugarCarga, presupuestoCLP: presupuesto }));
    dispatch(computeRecommendations());
    dispatch(nextStep());
  };

  const formatPresupuesto = (v: number) => `$${(v / 1_000_000).toFixed(0)}.000.000`;

  return (
    <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2.5, sm: 3.5 }, border: `1px solid ${BD}`, boxShadow: '0 2px 20px rgba(11,31,58,.07)' }}>
      <Typography variant="h6" fontWeight={700} color={PR} mb={0.5} letterSpacing="-0.3px">
        Tu perfil de uso
      </Typography>
      <Typography fontSize={14} color={MU} mb={2.5} lineHeight={1.5}>
        Esto nos permite recomendarte el eléctrico más adecuado para ti
      </Typography>

      {/* Tipo de uso */}
      <Box mb={2.5}>
        <Typography fontSize={12} fontWeight={700} color={PR} textTransform="uppercase" letterSpacing="0.3px" mb={1.5}>
          ¿Para qué usas tu auto principalmente?
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', '@media (max-width:420px)': { gridTemplateColumns: '1fr 1fr' } }}>
          <OptionCard
            icon="🏙️" title="Ciudad" subtitle="Traslados cortos"
            selected={tipoUso === 'city'} onClick={() => setTipoUso('city')}
          />
          <OptionCard
            icon="🛣️" title="Mixto" subtitle="Ciudad + autopistas"
            selected={tipoUso === 'mixed'} onClick={() => setTipoUso('mixed')}
          />
          <OptionCard
            icon="🗺️" title="Carretera" subtitle="Viajes largos"
            selected={tipoUso === 'highway'} onClick={() => setTipoUso('highway')}
          />
        </Box>
      </Box>

      {/* Lugar de carga */}
      <Box mb={2.5}>
        <Typography fontSize={12} fontWeight={700} color={PR} textTransform="uppercase" letterSpacing="0.3px" mb={1.5}>
          ¿Dónde cargarías el eléctrico?
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <OptionCard
            icon="🏠" title="Casa propia" subtitle="Estacionamiento individual"
            selected={lugarCarga === 'home'} onClick={() => setLugarCarga('home')}
          />
          <OptionCard
            icon="🏢" title="Edificio / Depto" subtitle="Estacionamiento común"
            selected={lugarCarga === 'building'} onClick={() => setLugarCarga('building')}
          />
        </Box>
      </Box>

      {/* Presupuesto */}
      <Box mb={2.5}>
        <Typography fontSize={12} fontWeight={700} color={PR} textTransform="uppercase" letterSpacing="0.3px" mb={1}>
          Presupuesto máximo para el eléctrico
        </Typography>
        <Typography fontSize={24} fontWeight={800} color={PR} textAlign="center" letterSpacing="-0.5px" mb={1}>
          {formatPresupuesto(presupuesto)}
        </Typography>
        <Slider
          value={presupuesto}
          min={12000000}
          max={65000000}
          step={1000000}
          onChange={(_, val) => setPresupuesto(val as number)}
          sx={{
            color: AC,
            '& .MuiSlider-thumb': { border: '3px solid #fff', boxShadow: '0 1px 6px rgba(0,0,0,.18)' },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={11} color={MU}>$12M</Typography>
          <Typography fontSize={11} color={MU}>$65M</Typography>
        </Box>
      </Box>

      {error && (
        <Box sx={{ background: '#FFF5F5', border: '1px solid #FCA5A5', borderRadius: '10px', p: '12px 16px', mb: 2 }}>
          <Typography fontSize={14} color="#DC2626">{error}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Button
          onClick={() => dispatch(prevStep())}
          sx={{
            color: MU,
            border: `1.5px solid ${BD}`,
            fontWeight: 700,
            px: 3,
            py: 1.5,
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: 15,
            '&:hover': { borderColor: PR, color: PR },
          }}
        >
          ← Atrás
        </Button>
        <Button
          onClick={handleContinue}
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: 15,
            '&:hover': { transform: 'translateY(-1px)' },
          }}
        >
          Ver mi análisis ✦
        </Button>
      </Box>
    </Box>
  );
}
