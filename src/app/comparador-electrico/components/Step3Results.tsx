'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedEV, prevStep, nextStep, selectComparador } from '@/store/Comparador/slice';
import { calcTCO, formatCLP } from '../utils/tco';
import { EVehicle, GasVehicle, SEG_LABELS } from '../data/vehicles';

const PR = '#2A3547';
const AC = '#00C47C';
const ACL = '#EAFAF4';
const ACD = '#009E63';
const AM = '#F59E0B';
const AML = '#FFFBEB';
const BD = '#E2E8F0';
const MU = '#64748B';

// ── Bar ───────────────────────────────────────────────────────────────────────
interface BarProps {
  label: string;
  width: number;
  amount: string;
  color: 'gas' | 'ev';
  labelFontSize?: number;
  amountFontSize?: number;
}

function Bar({ label, width, amount, color, labelFontSize = 11, amountFontSize = 12 }: BarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.width = '0%';
    const timer = setTimeout(() => { el.style.width = `${width}%`; }, 80);
    return () => clearTimeout(timer);
  }, [width]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Typography fontSize={labelFontSize} fontWeight={600} color={MU} sx={{ width: 88, flexShrink: 0, lineHeight: 1.3 }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1, height: 10, background: BD, borderRadius: '5px', overflow: 'hidden' }}>
        <Box
          ref={barRef}
          sx={{
            height: '100%',
            borderRadius: '5px',
            background: color === 'gas' ? AM : AC,
            transition: 'width 0.7s cubic-bezier(.4,0,.2,1)',
          }}
        />
      </Box>
      <Typography fontSize={amountFontSize} fontWeight={700} color={PR} sx={{ width: 96, textAlign: 'right', flexShrink: 0 }}>
        {amount}
      </Typography>
    </Box>
  );
}

// ── EV Card ───────────────────────────────────────────────────────────────────
interface EVCardProps {
  ev: EVehicle;
  isSelected: boolean;
  isRecommended: boolean;
  index: number;
  onSelect: (id: number) => void;
}

function EVCard({ ev, isSelected, isRecommended, index, onSelect }: EVCardProps) {
  const { palette } = useTheme();
  const primary = palette.primary.main;

  return (
    <Box
      onClick={() => onSelect(ev.id)}
      sx={{
        border: `1.5px solid ${isSelected ? AC : BD}`,
        borderRadius: '12px',
        p: 2,
        background: isSelected ? ACL : '#fff',
        cursor: 'pointer',
        transition: 'all 0.22s',
        userSelect: 'none',
        boxShadow: isSelected ? `0 0 0 3px rgba(0,196,124,.18)` : 'none',
        '&:hover': { borderColor: AC, boxShadow: '0 2px 12px rgba(0,196,124,.15)' },
      }}
    >
      {ev.img && (
        <Box sx={{ width: '100%', height: 72, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', background: '#F8FAFC' }}>
          <img src={`/images/vehicles/ev/${ev.img}`} alt={`${ev.marca} ${ev.modelo}`} style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain' }} />
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap', mb: 1 }}>
        {isRecommended && index === 0 && (
          <Box sx={{ fontSize: 10, fontWeight: 700, px: '8px', py: '2px', borderRadius: '20px', background: primary, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            ⭐ Recomendado
          </Box>
        )}
        {isSelected && (
          <Box sx={{ fontSize: 10, fontWeight: 700, px: '8px', py: '2px', borderRadius: '20px', background: AC, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            ✓ Seleccionado
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', mb: 1 }}>
        <Typography fontSize={15} fontWeight={800} color={PR} lineHeight={1.2}>{ev.marca} {ev.modelo}</Typography>
        <Typography fontSize={12} fontWeight={700} color={MU} whiteSpace="nowrap">{formatCLP(ev.precio)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mb: 1 }}>
        <Typography fontSize={12} color={PR}>🔋 {ev.autonomia} km autonomía</Typography>
        <Typography fontSize={12} color={PR}>⚡ {ev.kwh100} kWh/100km · {ev.tipo}</Typography>
      </Box>
      <Button
        onClick={(e) => { e.stopPropagation(); onSelect(ev.id); }}
        fullWidth
        sx={{
          mt: 1,
          py: '8px',
          border: `1.5px solid ${AC}`,
          borderRadius: '8px',
          background: isSelected ? AC : 'transparent',
          color: isSelected ? '#fff' : ACD,
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'none',
          '&:hover': { background: isSelected ? ACD : ACL },
        }}
      >
        {isSelected ? '✓ Comparando este modelo' : 'Comparar este modelo →'}
      </Button>
    </Box>
  );
}

// ── Gas Alternative Card ──────────────────────────────────────────────────────
interface GasCardProps {
  car: GasVehicle;
  combustible: 'bencina' | 'diesel';
  kmMensuales: number;
  precioCombustibleCLP: number;
}

function GasCard({ car, combustible, kmMensuales, precioCombustibleCLP }: GasCardProps) {
  const mensual = Math.round((kmMensuales / 100) * car.consumo * precioCombustibleCLP);
  const titleCase = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());
  const marcaDisplay = titleCase(car.marca);
  const modeloDisplay = titleCase(car.modelo);

  return (
    <Box sx={{
      border: `1.5px solid ${BD}`,
      borderRadius: '12px',
      p: 2,
      background: '#fff',
      transition: 'border-color 0.2s',
      '&:hover': { borderColor: AM },
    }}>
      {car.img && (
        <Box sx={{ width: '100%', height: 72, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', background: '#F8FAFC' }}>
          <img src={`/images/vehicles/gas/${car.img}`} alt={`${marcaDisplay} ${modeloDisplay}`} style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain' }} />
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap', mb: 1 }}>
        <Box sx={{ fontSize: 10, fontWeight: 700, px: '8px', py: '2px', borderRadius: '20px', background: AML, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.4px', border: `1px solid ${AM}` }}>
          🔥 {combustible === 'diesel' ? 'Diésel' : 'Bencina'}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', mb: 1 }}>
        <Typography fontSize={15} fontWeight={800} color={PR} lineHeight={1.2}>{marcaDisplay} {modeloDisplay}</Typography>
        <Typography fontSize={12} fontWeight={700} color={MU} whiteSpace="nowrap">{formatCLP(car.precio)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Typography fontSize={12} color={PR}>⛽ {car.consumo} L/100km</Typography>
        <Typography fontSize={12} color={PR}>💸 {formatCLP(mensual)}/mes combustible</Typography>
      </Box>
    </Box>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Step3Results() {
  const dispatch = useAppDispatch();
  const { currentVehicle, usageProfile, selectedEVId, evRecommendations, gasRecommendations, segmento } = useAppSelector(selectComparador);
  const [showDetails, setShowDetails] = React.useState(false);
  const costSectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const years = usageProfile.years ?? 4;
  const yrLabel = years === 1 ? '1 año' : `${years} años`;
  const segLabel = segmento ? SEG_LABELS[segmento] : '';
  const selectedEV = evRecommendations.find(ev => ev.id === selectedEVId) ?? evRecommendations[0];

  if (!selectedEV) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color={MU}>No se encontraron alternativas. Ajusta tu presupuesto.</Typography>
        <Button onClick={() => dispatch(prevStep())} sx={{ mt: 2, color: MU, border: `1.5px solid ${BD}`, borderRadius: '10px', textTransform: 'none', px: 3, py: 1.5, fontWeight: 700 }}>
          ← Ajustar perfil
        </Button>
      </Box>
    );
  }

  const tco = calcTCO(
    selectedEV,
    currentVehicle.precioListaCLP,
    currentVehicle.kmMensuales,
    currentVehicle.consumoL100km,
    currentVehicle.precioCombustibleCLP,
    undefined,
    years,
  );

  const months = years * 12;
  const maxMonthly = Math.max(tco.combustibleYrs / months, tco.electricidadYrs / months) * 1.35 || 1;
  const gasBarW = Math.round((tco.combustibleYrs / months) / maxMonthly * 100);
  const evBarW = Math.round((tco.electricidadYrs / months) / maxMonthly * 100);

  const maxTotal = Math.max(tco.costoA, tco.costoB) * 1.1 || 1;
  const totalGasW = Math.round(tco.costoA / maxTotal * 100);
  const totalEvW = Math.round(tco.costoB / maxTotal * 100);

  const invColorStyle = tco.inversionNeta <= 5000000 ? AC : '#FCD34D';

  const handleSelectEV = (id: number) => {
    dispatch(setSelectedEV(id));
    setTimeout(() => {
      costSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <Box>
      {/* Summary banner */}
      <Box sx={{ background: ACL, border: '1px solid rgba(0,196,124,.25)', borderRadius: '10px', p: '16px 18px', fontSize: 15, color: PR, lineHeight: 1.6, mb: 2 }}>
        📊 Con tu {currentVehicle.marca} {currentVehicle.modelo} gastas aprox.{' '}
        <strong>{formatCLP((currentVehicle.kmMensuales / 100) * currentVehicle.consumoL100km * currentVehicle.precioCombustibleCLP)}/mes</strong> en combustible.
        {tco.ahorroTotal > 0 && (
          <> Ahorrarías <strong>{formatCLP(tco.ahorroMens)}/mes</strong> en energía pasándote a eléctrico.</>
        )}
      </Box>

      {/* EV alternatives */}
      <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2.5, sm: 3.5 }, border: `1px solid ${BD}`, boxShadow: '0 2px 20px rgba(11,31,58,.07)', mb: 2 }}>
        <Typography fontSize={11} fontWeight={800} letterSpacing="1.2px" color={AC} textTransform="uppercase" mb={0.5}>
          ⚡ Alternativas eléctricas{segLabel ? ` — ${segLabel}` : ''}
        </Typography>
        <Typography fontSize={13} color={MU} mb={1.5}>
          Toca cualquier modelo para simular sus costos
        </Typography>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: 11, color: MU, background: BD, borderRadius: '20px', px: '10px', py: '3px', mb: 1.5 }}>
          Misma categoría que tu {currentVehicle.marca} {currentVehicle.modelo}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', '@media (max-width:520px)': { gridTemplateColumns: '1fr' } }}>
          {evRecommendations.map((ev, i) => (
            <EVCard
              key={ev.id}
              ev={ev}
              isSelected={ev.id === selectedEV.id}
              isRecommended={i === 0}
              index={i}
              onSelect={handleSelectEV}
            />
          ))}
        </Box>
      </Box>

      {/* Gas alternatives */}
      {gasRecommendations.length > 0 && (
        <Box sx={{ background: '#fff', borderRadius: 2, p: { xs: 2.5, sm: 3.5 }, border: `1px solid ${BD}`, boxShadow: '0 2px 20px rgba(11,31,58,.07)', mb: 2 }}>
          <Typography fontSize={11} fontWeight={800} letterSpacing="1.2px" color={AM} textTransform="uppercase" mb={0.5}>
            🔥 Alternativas a combustión{segLabel ? ` — ${segLabel}` : ''}
          </Typography>
          <Typography fontSize={13} color={MU} mb={1.5}>
            Autos nuevos del mismo segmento como referencia
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', '@media (max-width:520px)': { gridTemplateColumns: '1fr' } }}>
            {gasRecommendations.map((car, i) => (
              <GasCard
                key={`${car.id}-${i}`}
                car={car}
                combustible={currentVehicle.combustible}
                kmMensuales={currentVehicle.kmMensuales}
                precioCombustibleCLP={currentVehicle.precioCombustibleCLP}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Cost analysis */}
      <Box ref={costSectionRef} sx={{ background: '#fff', borderRadius: 2, p: { xs: 2.5, sm: 3.5 }, border: `1px solid ${BD}`, boxShadow: '0 2px 20px rgba(11,31,58,.07)', mb: 2 }}>
        <Typography fontSize={11} fontWeight={800} letterSpacing="1.2px" color={AC} textTransform="uppercase" mb={0.5}>
          Comparando: {selectedEV.marca} {selectedEV.modelo}
        </Typography>
        <Typography fontSize={13} color={MU} mb={2}>
          Ambas opciones parten del mismo precio de lista nuevo.{' '}
          <strong>{currentVehicle.marca} {currentVehicle.modelo}</strong> ({formatCLP(tco.gasValorHoy)}) vs{' '}
          <strong>{selectedEV.marca} {selectedEV.modelo}</strong> ({formatCLP(selectedEV.precio)})
        </Typography>

        {/* Net investment banner */}
        <Box sx={{ background: primary, borderRadius: '12px', p: '18px 22px', mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography fontSize={13} color="rgba(255,255,255,.65)">
              {tco.inversionNeta >= 0 ? 'Pagarías de diferencia al cambio' : 'Tendrías un excedente de'}
            </Typography>
            <Typography fontSize={11} color="rgba(255,255,255,.4)" mt={0.25}>
              Precio EV − precio lista {currentVehicle.marca} {currentVehicle.modelo}
            </Typography>
          </Box>
          <Typography fontSize={26} fontWeight={900} letterSpacing="-1px" color={invColorStyle}>
            {formatCLP(Math.abs(tco.inversionNeta))}
          </Typography>
        </Box>

        {/* Monthly energy bars */}
        <Typography fontSize={11} fontWeight={800} letterSpacing="1.2px" color={AC} textTransform="uppercase" mb={1.5}>
          Costo mensual de energía
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mb: 2.5 }}>
          <Bar label={`${currentVehicle.marca} ${currentVehicle.modelo}`} width={gasBarW} amount={`${formatCLP(tco.combustibleYrs / months)}/mes`} color="gas" />
          <Bar label={`${selectedEV.marca} ${selectedEV.modelo}`} width={evBarW} amount={`${formatCLP(tco.electricidadYrs / months)}/mes`} color="ev" />
        </Box>

        {/* TCO */}
        <Typography fontSize={11} fontWeight={800} letterSpacing="1.2px" color={AC} textTransform="uppercase" mb={0.5}>
          Costo total a {yrLabel} (TCO)
        </Typography>
        <Typography fontSize={12} color={MU} mb={1.5} lineHeight={1.5}>
          Ambas opciones parten del mismo capital hoy. Incluye compra, energía y mantenimiento.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', mb: 1.5, '@media (max-width:520px)': { gridTemplateColumns: '1fr' } }}>
          <Box sx={{ border: `1.5px solid ${BD}`, borderRadius: '12px', p: '16px 18px' }}>
            <Typography fontSize={11} fontWeight={700} letterSpacing="0.5px" color={MU} textTransform="uppercase" mb={1.25}>
              🔴 Conservar {currentVehicle.marca} {currentVehicle.modelo}
            </Typography>
            {[
              { label: `Combustible ${yrLabel}`, value: formatCLP(tco.combustibleYrs) },
              { label: `Mantenimiento ${yrLabel}`, value: formatCLP(tco.mantGasYrs) },
            ].map(row => (
              <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: '5px', borderBottom: `1px solid ${BD}`, fontSize: 13 }}>
                <Typography component="span" fontSize={13} color={MU}>{row.label}</Typography>
                <Typography component="span" fontSize={13} fontWeight={600} color={PR}>{row.value}</Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', pt: '8px' }}>
              <Typography fontSize={14} fontWeight={700} color={MU}>Total {yrLabel}</Typography>
              <Typography fontSize={14} fontWeight={700} color={AM}>{formatCLP(tco.costoA)}</Typography>
            </Box>
          </Box>

          <Box sx={{ border: `1.5px solid ${AC}`, borderRadius: '12px', p: '16px 18px', background: ACL }}>
            <Typography fontSize={11} fontWeight={700} letterSpacing="0.5px" color={ACD} textTransform="uppercase" mb={1.25}>
              ⚡ {selectedEV.marca} {selectedEV.modelo}
            </Typography>
            {[
              { label: 'Inversión neta', value: formatCLP(tco.inversionNeta) },
              { label: `Electricidad ${yrLabel}`, value: formatCLP(tco.electricidadYrs) },
              { label: `Mantenimiento ${yrLabel}`, value: formatCLP(tco.mantEVYrs) },
            ].map(row => (
              <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: '5px', borderBottom: `1px solid ${BD}`, fontSize: 13 }}>
                <Typography component="span" fontSize={13} color={MU}>{row.label}</Typography>
                <Typography component="span" fontSize={13} fontWeight={600} color={PR}>{row.value}</Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', pt: '8px' }}>
              <Typography fontSize={14} fontWeight={700} color={MU}>Total {yrLabel}</Typography>
              <Typography fontSize={14} fontWeight={700} color={ACD}>{formatCLP(tco.costoB)}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Total bars */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mb: 2 }}>
          <Bar label="Conservar auto" width={totalGasW} amount={formatCLP(tco.costoA)} color="gas" labelFontSize={10} amountFontSize={11} />
          <Bar label="Cambiar a EV" width={totalEvW} amount={formatCLP(tco.costoB)} color="ev" labelFontSize={10} amountFontSize={11} />
        </Box>

        {/* Savings strip */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: 2 }}>
          <Box sx={{ flex: 1, minWidth: 130, background: tco.ahorroTotal > 0 ? ACL : '#fff', border: `1.5px solid ${tco.ahorroTotal > 0 ? AC : BD}`, borderRadius: '12px', p: '14px 16px', textAlign: 'center' }}>
            <Typography fontSize={11} color={MU} fontWeight={600} mb={0.5}>Ahorro total {yrLabel}</Typography>
            <Typography fontSize={20} fontWeight={800} color={tco.ahorroTotal > 0 ? ACD : PR}>{formatCLP(Math.abs(tco.ahorroTotal))}</Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 130, background: tco.ahorroMens > 0 ? ACL : '#fff', border: `1.5px solid ${tco.ahorroMens > 0 ? AC : BD}`, borderRadius: '12px', p: '14px 16px', textAlign: 'center' }}>
            <Typography fontSize={11} color={MU} fontWeight={600} mb={0.5}>Ahorro mensual energía</Typography>
            <Typography fontSize={20} fontWeight={800} color={tco.ahorroMens > 0 ? ACD : PR}>{formatCLP(Math.abs(tco.ahorroMens))}</Typography>
          </Box>
          {tco.mesesEq > 0 && (
            <Box sx={{ flex: 1, minWidth: 130, background: '#fff', border: `1.5px solid ${BD}`, borderRadius: '12px', p: '14px 16px', textAlign: 'center' }}>
              <Typography fontSize={11} color={MU} fontWeight={600} mb={0.5}>Punto de equilibrio</Typography>
              <Typography fontSize={20} fontWeight={800} color={PR}>{tco.mesesEq} meses</Typography>
            </Box>
          )}
        </Box>

        {/* Expandable details */}
        <Box mt={2}>
          <Button
            onClick={() => setShowDetails(v => !v)}
            sx={{ color: MU, fontSize: 13, textTransform: 'none', p: 0, fontWeight: 600, '&:hover': { background: 'none', color: primary } }}
          >
            {showDetails ? '▲' : '▼'} ¿Qué incluye este cálculo?
          </Button>
          <Collapse in={showDetails}>
            <Box sx={{ mt: 1.5, p: '14px 16px', background: '#F8F9FA', borderRadius: '10px', fontSize: 13, color: MU, lineHeight: 1.7 }}>
              <Typography fontWeight={700} color={PR} mb={0.5} fontSize={13}>Supuestos del cálculo TCO a {yrLabel}:</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Precio electricidad: $155/kWh (tarifa residencial Chile 2025)</li>
                <li>Mantenimiento combustión: ${(360000).toLocaleString('es-CL')}/año (aceite, filtros, frenos)</li>
                <li>Mantenimiento eléctrico: ${(110000).toLocaleString('es-CL')}/año (significativamente menor)</li>
                <li>Precio combustible: {formatCLP(currentVehicle.precioCombustibleCLP)}/L</li>
                <li>Recorrido mensual: {currentVehicle.kmMensuales.toLocaleString('es-CL')} km/mes</li>
                <li>No incluye seguros, patentes ni financiamiento</li>
              </ul>
            </Box>
          </Collapse>
        </Box>
      </Box>

      {/* Conclusion */}
      <Box sx={{ background: ACL, borderLeft: `3px solid ${AC}`, borderRadius: '0 12px 12px 0', p: '16px 18px', fontSize: 15, color: PR, lineHeight: 1.65, mb: 2 }}>
        💡 <strong>Conclusión:</strong>{' '}
        {tco.ahorroTotal > 0
          ? `Cambiar al ${selectedEV.marca} ${selectedEV.modelo} te permitiría ahorrar ${formatCLP(tco.ahorroTotal)} en ${yrLabel}. Tu inversión neta se recupera en aproximadamente ${tco.mesesEq > 0 ? `${tco.mesesEq} meses` : 'muy poco tiempo'}.`
          : `Con tu perfil de uso, el ${selectedEV.marca} ${selectedEV.modelo} tiene un costo total similar. Considera también los beneficios adicionales: cero emisiones, conducción más suave y menor mantenimiento.`
        }
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Button
          onClick={() => dispatch(prevStep())}
          sx={{ color: MU, border: `1.5px solid ${BD}`, fontWeight: 700, px: 3, py: 1.5, borderRadius: '10px', textTransform: 'none', fontSize: 15, '&:hover': { borderColor: primary, color: primary } }}
        >
          ← Atrás
        </Button>
        <Button
          onClick={() => dispatch(nextStep())}
          variant="contained"
          color="primary"
          sx={{ fontWeight: 700, px: 4, py: 1.5, borderRadius: '10px', textTransform: 'none', fontSize: 15, '&:hover': { transform: 'translateY(-1px)' } }}
        >
          Ver próximos pasos →
        </Button>
      </Box>
    </Box>
  );
}
