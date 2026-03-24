"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled, useTheme } from "@mui/material/styles";
import HpHeaderNew from "@/app/components/shared/header/HpHeaderNew";

// ─── Data constants ───────────────────────────────────────────────────────────
const STEPS = [
  { id: "company",        label: "Tu Empresa",      icon: "🏢" },
  { id: "fleet",          label: "Tu Flota",         icon: "🚛" },
  { id: "operation",      label: "Operación",        icon: "⚡" },
  { id: "infrastructure", label: "Infraestructura",  icon: "🔌" },
  { id: "results",        label: "Resultado",        icon: "📊" },
];

const VEHICLE_TYPES = [
  { id: "bus",         name: "Buses",             icon: "🚌", batteryKWh: 350, avgConsumption: 1.20, dieselEquiv: 45 },
  { id: "truck",       name: "Camiones",           icon: "🚚", batteryKWh: 250, avgConsumption: 0.90, dieselEquiv: 35 },
  { id: "pickup",      name: "Camionetas",         icon: "🛻", batteryKWh:  80, avgConsumption: 0.22, dieselEquiv: 12 },
  { id: "van",         name: "Furgones",           icon: "🚐", batteryKWh:  60, avgConsumption: 0.18, dieselEquiv: 10 },
  { id: "car",         name: "Autos",              icon: "🚗", batteryKWh:  55, avgConsumption: 0.16, dieselEquiv:  8 },
  { id: "light_truck", name: "Camiones livianos",  icon: "📦", batteryKWh: 120, avgConsumption: 0.40, dieselEquiv: 18 },
];

const CHARGER_TYPES = [
  { id: "ac_7",   name: "AC 7.4 kW",  power:   7.4, priceUSD:    800, type: "AC", connector: "Tipo 2" },
  { id: "ac_22",  name: "AC 22 kW",   power:  22,   priceUSD:  2_500, type: "AC", connector: "Tipo 2" },
  { id: "dc_50",  name: "DC 50 kW",   power:  50,   priceUSD: 25_000, type: "DC", connector: "CCS2" },
  { id: "dc_100", name: "DC 100 kW",  power: 100,   priceUSD: 45_000, type: "DC", connector: "CCS2" },
  { id: "dc_150", name: "DC 150 kW",  power: 150,   priceUSD: 65_000, type: "DC", connector: "CCS2" },
  { id: "dc_300", name: "DC 300 kW",  power: 300,   priceUSD:120_000, type: "DC", connector: "CCS2 / Pantógrafo" },
];

const COMPANY_SIZES = [
  { id: "small",  label: "Pequeña",  desc: "1–49 trabajadores",   icon: "🏠" },
  { id: "medium", label: "Mediana",  desc: "50–199 trabajadores", icon: "🏗️" },
  { id: "large",  label: "Grande",   desc: "200+ trabajadores",   icon: "🏭" },
];

const INDUSTRIES = [
  "Transporte público", "Logística y distribución", "Minería", "Retail",
  "Servicios municipales", "Construcción", "Alimentos y bebidas",
  "E-commerce / Delivery", "Otro",
];

const REGIONS = [
  "Región Metropolitana", "Valparaíso", "O'Higgins", "Biobío", "Araucanía",
  "Los Lagos", "Antofagasta", "Atacama", "Coquimbo", "Maule", "Otra",
];

const OPERATION_PROFILES = [
  { id: "depot_night", label: "Carga nocturna en depósito", desc: "Vehículos cargan durante la noche en base",      icon: "🌙" },
  { id: "depot_day",   label: "Carga diurna en depósito",   desc: "Carga entre turnos durante el día",              icon: "☀️" },
  { id: "opportunity", label: "Carga de oportunidad",        desc: "Cargas rápidas durante paradas operativas",     icon: "⚡" },
  { id: "mixed",       label: "Modelo mixto",                desc: "Combinación de carga nocturna y de oportunidad", icon: "🔄" },
];

const CONNECTION_TYPES = [
  { id: "mono",   label: "Monofásica",   desc: "220V",              icon: "⚡" },
  { id: "tri_bt", label: "Trifásica BT", desc: "380V Baja Tensión", icon: "⚡⚡" },
  { id: "tri_mt", label: "Trifásica MT", desc: "Media Tensión",     icon: "⚡⚡⚡" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Fleet = Record<string, number>;

interface ChargerRec {
  id: string; name: string; power: number; priceUSD: number;
  type: string; connector: string; qty: number;
}

interface SimResults {
  chargerRecs: ChargerRec[];
  totalChargers: number;
  totalPowerKW: number;
  needsTransformer: boolean;
  chargerCostCLP: number;
  transformerCost: number;
  civilWorksCost: number;
  electricalWorksCost: number;
  engineeringCost: number;
  permittingCost: number;
  totalInvestment: number;
  monthlyEnergyKWh: number;
  monthlyEnergyCost: number;
  monthlyDieselCost: number;
  monthlySavings: number;
  paybackMonths: number;
  annualCO2Tons: number;
}

// ─── Styled components ────────────────────────────────────────────────────────
const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  minHeight: "100vh",
  padding: "32px 64px 80px",
  [theme.breakpoints.down("md")]: { padding: "24px 24px 60px" },
  [theme.breakpoints.down("sm")]: { padding: "16px 16px 40px" },
}));

const StepCard = styled(Box)<{ animating?: boolean }>(({ theme, animating }) => ({
  maxWidth: 800,
  margin: "0 auto",
  background: "#fff",
  borderRadius: 12,
  border: "1px solid rgba(0,17,51,0.1)",
  padding: "40px 48px",
  boxShadow: "0 2px 12px rgba(0,17,51,0.06)",
  opacity: animating ? 0.5 : 1,
  transform: animating ? "translateY(6px)" : "translateY(0)",
  transition: "all 0.28s ease",
  [theme.breakpoints.down("md")]: { padding: "28px 24px" },
  [theme.breakpoints.down("sm")]: { padding: "20px 16px" },
}));

const SectionLabel = styled(Typography)({
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#64748b",
  marginBottom: 8,
  marginTop: 16,
});

const FieldInput = styled("input")(({ theme }) => ({
  height: 48,
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid rgba(0,17,51,0.15)",
  borderRadius: 7,
  padding: "0 13px",
  color: "#2A3547",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  outline: "none",
  transition: "box-shadow 0.2s",
  "&:focus": { boxShadow: `0 0 0 2px ${theme.palette.primary.main}40` },
  "&::placeholder": { color: "#94a3b8" },
}));

const FieldSelect = styled("select")(({ theme }) => ({
  height: 48,
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid rgba(0,17,51,0.15)",
  borderRadius: 7,
  padding: "0 13px",
  color: "#2A3547",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  outline: "none",
  cursor: "pointer",
  background: "#fff",
  "&:focus": { boxShadow: `0 0 0 2px ${theme.palette.primary.main}40` },
}));

const SelectCard = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  padding: "16px 14px",
  borderRadius: 10,
  border: `1.5px solid ${selected ? theme.palette.primary.main : "rgba(0,17,51,0.12)"}`,
  background: selected ? `${theme.palette.primary.main}08` : "#fff",
  cursor: "pointer",
  textAlign: "center",
  transition: "border-color 0.2s, background 0.2s",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    background: `${theme.palette.primary.main}06`,
  },
}));

const MetricBox = styled(Box)({
  padding: 16,
  borderRadius: 10,
  background: "#f8fafc",
  border: "1px solid rgba(0,17,51,0.08)",
  textAlign: "center",
});

const CostRow = styled(Box)<{ even?: boolean }>(({ even }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "11px 16px",
  background: even ? "#f8fafc" : "#fff",
  borderBottom: "1px solid rgba(0,17,51,0.07)",
}));

// ─── AnimatedNumber ───────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const end = value;
    const duration = 1000;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(end * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <span>{prefix}{display.toLocaleString("es-CL")}</span>;
}

// ─── Calculation engine ───────────────────────────────────────────────────────
const USD_CLP = 950;

function calcResults(
  fleet: Fleet, avgDailyKm: number, operationProfile: string,
  daysPerWeek: number, availablePowerKW: number,
  hasTransformer: boolean | null, areaM2: number,
): SimResults {
  let totalDailyEnergy = 0;
  let totalDieselLiters = 0;
  const chargerRecs: ChargerRec[] = [];
  let totalChargers = 0;
  let totalChargerCostUSD = 0;

  const lightCount = (fleet.pickup || 0) + (fleet.van || 0) + (fleet.car || 0) + (fleet.light_truck || 0);
  const heavyCount = (fleet.bus || 0) + (fleet.truck || 0);

  Object.entries(fleet).forEach(([vehicleId, count]) => {
    if (!count) return;
    const vt = VEHICLE_TYPES.find(v => v.id === vehicleId)!;
    totalDailyEnergy += vt.avgConsumption * avgDailyKm * count;
    totalDieselLiters += vt.dieselEquiv * count * (daysPerWeek / 7) * 30;
  });

  const addRec = (id: string, qty: number) => {
    const ct = CHARGER_TYPES.find(c => c.id === id)!;
    chargerRecs.push({ ...ct, qty });
    totalChargers += qty;
    totalChargerCostUSD += qty * ct.priceUSD;
  };

  if (operationProfile === "depot_night" || operationProfile === "mixed") {
    if (lightCount > 0) addRec("ac_22", Math.ceil(lightCount * 0.7));
    if (heavyCount > 0) addRec(heavyCount > 5 ? "dc_150" : "dc_100", Math.ceil(heavyCount * 0.5));
  }
  if (operationProfile === "opportunity" || operationProfile === "mixed") {
    if (heavyCount > 0) addRec("dc_300", Math.max(1, Math.ceil(heavyCount * 0.3)));
    if (lightCount > 0 && operationProfile === "opportunity") addRec("dc_50", Math.max(1, Math.ceil(lightCount * 0.3)));
  }
  if (operationProfile === "depot_day") {
    if (lightCount > 0) addRec("ac_22", Math.ceil(lightCount * 0.5));
    if (heavyCount > 0) addRec("dc_150", Math.ceil(heavyCount * 0.6));
  }
  if (chargerRecs.length === 0) addRec("ac_22", Math.max(1, Math.ceil(Object.values(fleet).reduce((s, v) => s + (v || 0), 0) * 0.5)));

  const totalPowerKW = chargerRecs.reduce((s, c) => s + c.power * c.qty, 0);
  const chargerCostCLP = totalChargerCostUSD * USD_CLP;
  const needsTransformer = totalPowerKW > availablePowerKW || !hasTransformer;
  const transformerCost = needsTransformer
    ? (totalPowerKW > 500 ? 35_000_000 : totalPowerKW > 200 ? 18_000_000 : 8_000_000) : 0;
  const civilWorksCost = totalChargers * 2_500_000 + areaM2 * 15_000;
  const electricalWorksCost = totalChargers * 3_500_000;
  const engineeringCost = (chargerCostCLP + civilWorksCost + electricalWorksCost) * 0.08;
  const permittingCost = 2_500_000;
  const totalInvestment = chargerCostCLP + transformerCost + civilWorksCost + electricalWorksCost + engineeringCost + permittingCost;

  const monthlyEnergyKWh = totalDailyEnergy * (daysPerWeek / 7) * 30;
  const monthlyEnergyCost = monthlyEnergyKWh * 85;
  const monthlyDieselCost = totalDieselLiters * 1_050;
  const monthlySavings = monthlyDieselCost - monthlyEnergyCost;
  const paybackMonths = monthlySavings > 0 ? Math.ceil(totalInvestment / monthlySavings) : 0;
  const annualCO2Tons = totalDieselLiters * 12 * 2.68 / 1_000;

  return {
    chargerRecs, totalChargers, totalPowerKW, needsTransformer,
    chargerCostCLP, transformerCost, civilWorksCost, electricalWorksCost,
    engineeringCost, permittingCost, totalInvestment,
    monthlyEnergyKWh, monthlyEnergyCost, monthlyDieselCost,
    monthlySavings, paybackMonths, annualCO2Tons,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SimuladorClient() {
  const theme = useTheme();
  const PRIMARY = theme.palette.primary.main; // #E81A68

  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Step 0
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");

  // Step 1
  const [fleet, setFleet] = useState<Fleet>({});
  const [avgDailyKm, setAvgDailyKm] = useState(150);

  // Step 2
  const [operationProfile, setOperationProfile] = useState("");
  const [operatingHours, setOperatingHours] = useState(16);
  const [daysPerWeek, setDaysPerWeek] = useState(6);

  // Step 3
  const [connectionType, setConnectionType] = useState("");
  const [hasTransformer, setHasTransformer] = useState<boolean | null>(null);
  const [availablePowerKW, setAvailablePowerKW] = useState(100);
  const [areaM2, setAreaM2] = useState(200);

  const totalVehicles = Object.values(fleet).reduce((s, v) => s + (v || 0), 0);

  const canProceed = [
    !!(companySize && industry && region),
    totalVehicles > 0,
    !!operationProfile,
    !!(connectionType && hasTransformer !== null),
    true,
  ][step];

  const results: SimResults | null =
    step === 4
      ? calcResults(fleet, avgDailyKm, operationProfile, daysPerWeek, availablePowerKW, hasTransformer, areaM2)
      : null;

  function navigate(dir: 1 | -1) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setStep(s => Math.max(0, Math.min(STEPS.length - 1, s + dir)));
      setAnimating(false);
    }, 280);
  }

  function resetSimulator() {
    setStep(0);
    setCompanyName(""); setCompanySize(""); setIndustry(""); setRegion("");
    setFleet({}); setAvgDailyKm(150);
    setOperationProfile(""); setOperatingHours(16); setDaysPerWeek(6);
    setConnectionType(""); setHasTransformer(null); setAvailablePowerKW(100); setAreaM2(200);
  }

  const updateFleet = (id: string, delta: number) =>
    setFleet(f => ({ ...f, [id]: Math.max(0, (f[id] || 0) + delta) }));

  // ── Steps ─────────────────────────────────────────────────────────────────

  function renderCompany() {
    return (
      <Box>
        <SectionLabel>Nombre de tu empresa (opcional)</SectionLabel>
        <FieldInput
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder="Ej: Transportes Ejemplo SpA"
        />

        <SectionLabel sx={{ mt: 2.5 }}>Tamaño de la empresa *</SectionLabel>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5 }}>
          {COMPANY_SIZES.map(cs => (
            <SelectCard key={cs.id} selected={companySize === cs.id} onClick={() => setCompanySize(cs.id)}>
              <Typography sx={{ fontSize: 28, mb: 0.5 }}>{cs.icon}</Typography>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>{cs.label}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mt: 0.25 }}>{cs.desc}</Typography>
            </SelectCard>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mt: 2 }}>
          <Box>
            <SectionLabel>Industria *</SectionLabel>
            <FieldSelect value={industry} onChange={e => setIndustry(e.target.value)}>
              <option value="">Seleccionar...</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </FieldSelect>
          </Box>
          <Box>
            <SectionLabel>Región *</SectionLabel>
            <FieldSelect value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">Seleccionar...</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </FieldSelect>
          </Box>
        </Box>
      </Box>
    );
  }

  function renderFleet() {
    return (
      <Box>
        <Typography sx={{ fontSize: "0.875rem", color: "#64748b", mb: 2.5, lineHeight: 1.6 }}>
          Indica cuántos vehículos de cada tipo planeas incorporar a tu flota eléctrica.
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 1.5 }}>
          {VEHICLE_TYPES.map(vt => {
            const count = fleet[vt.id] || 0;
            return (
              <Box key={vt.id} sx={{
                p: "16px", borderRadius: "10px",
                border: `1.5px solid ${count > 0 ? PRIMARY : "rgba(0,17,51,0.12)"}`,
                background: count > 0 ? `${PRIMARY}06` : "#fff",
                transition: "border-color 0.2s, background 0.2s",
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.5 }}>
                  <Typography sx={{ fontSize: 24 }}>{vt.icon}</Typography>
                  <Box>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>{vt.name}</Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>Batería ~{vt.batteryKWh} kWh</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <IconButton
                    size="small"
                    onClick={() => updateFleet(vt.id, -1)}
                    sx={{ border: "1px solid rgba(0,17,51,0.15)", borderRadius: "7px", width: 34, height: 34 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Box
                    component="input"
                    type="number"
                    value={count}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFleet(f => ({ ...f, [vt.id]: Math.max(0, parseInt(e.target.value) || 0) }))
                    }
                    sx={{
                      flex: 1, textAlign: "center", height: 34,
                      border: "1px solid rgba(0,17,51,0.15)", borderRadius: "7px",
                      fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 600,
                      color: "#2A3547", outline: "none", background: "#fff",
                      "&::-webkit-inner-spin-button": { appearance: "none" },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => updateFleet(vt.id, 1)}
                    color="primary"
                    sx={{ border: `1px solid ${PRIMARY}`, borderRadius: "7px", width: 34, height: 34 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Box>

        {totalVehicles > 0 && (
          <Box sx={{ mt: 3, p: "16px 20px", borderRadius: "10px", background: "#f8fafc", border: "1px solid rgba(0,17,51,0.08)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>
                Total flota: {totalVehicles} vehículos
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {Object.entries(fleet).filter(([, v]) => v > 0).map(([k, v]) => {
                  const vt = VEHICLE_TYPES.find(x => x.id === k)!;
                  return (
                    <Chip key={k} label={`${v} ${vt.name}`} size="small" color="primary" variant="outlined"
                      sx={{ fontSize: "0.75rem", height: 24 }} />
                  );
                })}
              </Box>
            </Box>
            <Typography sx={{ fontSize: "0.8125rem", color: "#64748b", mb: 1 }}>
              Recorrido diario promedio por vehículo
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Slider
                min={20} max={500} value={avgDailyKm}
                onChange={(_, v) => setAvgDailyKm(v as number)}
                color="primary"
                sx={{ flex: 1 }}
              />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: PRIMARY, minWidth: 70, textAlign: "right" }}>
                {avgDailyKm} km
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  function renderOperation() {
    return (
      <Box>
        <SectionLabel>Perfil de carga *</SectionLabel>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, mb: 3 }}>
          {OPERATION_PROFILES.map(op => (
            <SelectCard key={op.id} selected={operationProfile === op.id} onClick={() => setOperationProfile(op.id)}
              sx={{ textAlign: "left", p: "18px 16px" }}>
              <Typography sx={{ fontSize: 26, display: "block", mb: 0.75 }}>{op.icon}</Typography>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>{op.label}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mt: 0.5, lineHeight: 1.4 }}>{op.desc}</Typography>
            </SelectCard>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
          <Box>
            <SectionLabel>Horas de operación diaria</SectionLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Slider min={4} max={24} value={operatingHours} onChange={(_, v) => setOperatingHours(v as number)} color="primary" sx={{ flex: 1 }} />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: PRIMARY, minWidth: 44, textAlign: "right" }}>
                {operatingHours}h
              </Typography>
            </Box>
          </Box>
          <Box>
            <SectionLabel>Días de operación por semana</SectionLabel>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[5, 6, 7].map(d => (
                <Button
                  key={d}
                  variant={daysPerWeek === d ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setDaysPerWeek(d)}
                  sx={{ flex: 1, borderRadius: "7px", fontSize: "0.875rem" }}
                >
                  {d} días
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  function renderInfrastructure() {
    return (
      <Box>
        <SectionLabel>Tipo de conexión eléctrica disponible *</SectionLabel>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5, mb: 3 }}>
          {CONNECTION_TYPES.map(ct => (
            <SelectCard key={ct.id} selected={connectionType === ct.id} onClick={() => setConnectionType(ct.id)}>
              <Typography sx={{ fontSize: 22, mb: 0.5 }}>{ct.icon}</Typography>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>{ct.label}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{ct.desc}</Typography>
            </SelectCard>
          ))}
        </Box>

        <SectionLabel>¿Cuentas con transformador propio? *</SectionLabel>
        <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
          {[
            { val: true,  label: "Sí, tengo transformador" },
            { val: false, label: "No tengo / No sé" },
          ].map(opt => (
            <Button
              key={String(opt.val)}
              variant={hasTransformer === opt.val ? "contained" : "outlined"}
              color="primary"
              onClick={() => setHasTransformer(opt.val)}
              sx={{ flex: 1, borderRadius: "7px", fontSize: "0.875rem", py: 1.25 }}
            >
              {opt.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
          <Box>
            <SectionLabel>Potencia disponible (kW)</SectionLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Slider min={20} max={2000} step={10} value={availablePowerKW} onChange={(_, v) => setAvailablePowerKW(v as number)} color="primary" sx={{ flex: 1 }} />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: PRIMARY, minWidth: 70, textAlign: "right" }}>
                {availablePowerKW} kW
              </Typography>
            </Box>
          </Box>
          <Box>
            <SectionLabel>Área disponible (m²)</SectionLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Slider min={50} max={5000} step={50} value={areaM2} onChange={(_, v) => setAreaM2(v as number)} color="primary" sx={{ flex: 1 }} />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: PRIMARY, minWidth: 70, textAlign: "right" }}>
                {areaM2} m²
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  function renderResults(r: SimResults) {
    const costItems = [
      { label: "Equipos de carga",         value: r.chargerCostCLP },
      { label: "Transformador eléctrico",  value: r.transformerCost, note: r.needsTransformer ? "Requerido" : "No requerido" },
      { label: "Obras civiles",            value: r.civilWorksCost },
      { label: "Obras eléctricas",         value: r.electricalWorksCost },
      { label: "Ingeniería y proyecto",    value: r.engineeringCost },
      { label: "Permisos SEC y TE6",       value: r.permittingCost },
    ];

    return (
      <Box>
        {/* Investment hero */}
        <Box sx={{
          background: `${PRIMARY}08`, borderRadius: "12px",
          p: "24px 28px", mb: 3,
          border: `1px solid ${PRIMARY}25`,
        }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", mb: 0.75 }}>
            Inversión estimada total
          </Typography>
          <Typography sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, color: PRIMARY, lineHeight: 1.1 }}>
            $<AnimatedNumber value={Math.round(r.totalInvestment)} />
          </Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: "#64748b", mt: 0.5 }}>
            CLP · IVA no incluido · Valores referenciales
          </Typography>
        </Box>

        {/* Key metrics */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1.5, mb: 3 }}>
          {[
            { label: "Cargadores",     value: r.totalChargers,              unit: "unidades" },
            { label: "Potencia total", value: r.totalPowerKW,               unit: "kW" },
            { label: "Ahorro mensual", value: Math.round(r.monthlySavings), unit: "CLP/mes", prefix: "$" },
            { label: "Payback",        value: r.paybackMonths,              unit: "meses" },
          ].map((m, i) => (
            <MetricBox key={i}>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 0.75, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {m.label}
              </Typography>
              <Typography sx={{ fontSize: "1.375rem", fontWeight: 700, color: PRIMARY }}>
                <AnimatedNumber value={m.value} prefix={m.prefix} />
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>{m.unit}</Typography>
            </MetricBox>
          ))}
        </Box>

        {/* Charger recommendations */}
        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547", mb: 1.5 }}>
          ⚡ Cargadores recomendados
        </Typography>
        <Box sx={{ display: "grid", gap: 1, mb: 3 }}>
          {r.chargerRecs.map((cr, i) => (
            <Box key={i} sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              p: "12px 16px", borderRadius: "10px",
              background: "#f8fafc", border: "1px solid rgba(0,17,51,0.08)",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Chip
                  label={cr.type}
                  size="small"
                  color={cr.type === "DC" ? "info" : "primary"}
                  sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                />
                <Box>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>{cr.name}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{cr.connector}</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: "1.125rem", fontWeight: 700, color: PRIMARY }}>×{cr.qty}</Typography>
            </Box>
          ))}
        </Box>

        {/* Cost breakdown */}
        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547", mb: 1.5 }}>
          📋 Desglose de costos
        </Typography>
        <Box sx={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,17,51,0.08)", mb: 3 }}>
          {costItems.map((item, i) => (
            <CostRow key={i} even={i % 2 === 0}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "0.875rem", color: "#2A3547" }}>{item.label}</Typography>
                {item.note && (
                  <Chip
                    label={item.note} size="small"
                    sx={{
                      fontSize: "0.6875rem", height: 20,
                      background: item.value > 0 ? "rgba(229,57,53,0.1)" : "rgba(232,26,104,0.08)",
                      color: item.value > 0 ? "#e53935" : PRIMARY,
                    }}
                  />
                )}
              </Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547" }}>
                ${Math.round(item.value).toLocaleString("es-CL")}
              </Typography>
            </CostRow>
          ))}
        </Box>

        {/* Diesel vs Electric */}
        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A3547", mb: 1.5 }}>
          🔋 Diésel vs Eléctrico (costo mensual)
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 3 }}>
          <Box sx={{ p: "16px", borderRadius: "10px", textAlign: "center", background: "rgba(229,57,53,0.05)", border: "1px solid rgba(229,57,53,0.2)" }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#e53935", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", mb: 0.75 }}>Diésel</Typography>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#e53935" }}>
              $<AnimatedNumber value={Math.round(r.monthlyDieselCost)} />
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>/mes</Typography>
          </Box>
          <Box sx={{ p: "16px", borderRadius: "10px", textAlign: "center", background: `${PRIMARY}08`, border: `1px solid ${PRIMARY}25` }}>
            <Typography sx={{ fontSize: "0.75rem", color: PRIMARY, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", mb: 0.75 }}>Eléctrico</Typography>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: PRIMARY }}>
              $<AnimatedNumber value={Math.round(r.monthlyEnergyCost)} />
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>/mes</Typography>
          </Box>
        </Box>

        {/* CO2 */}
        <Box sx={{
          p: "16px 20px", borderRadius: "10px", mb: 3,
          background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
          display: "flex", alignItems: "center", gap: 2,
        }}>
          <Typography sx={{ fontSize: 32 }}>🌱</Typography>
          <Box>
            <Typography sx={{ fontSize: "0.8125rem", color: "#64748b" }}>Reducción estimada de CO₂</Typography>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#10b981" }}>
              <AnimatedNumber value={Math.round(r.annualCO2Tons)} /> toneladas/año
            </Typography>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{
          p: "28px 24px", borderRadius: "12px", textAlign: "center",
          background: `${PRIMARY}06`, border: `1px solid ${PRIMARY}20`,
        }}>
          {companyName && (
            <Typography sx={{ fontSize: "0.8125rem", color: "#64748b", mb: 0.75 }}>
              Simulación para <strong style={{ color: "#2A3547" }}>{companyName}</strong>
            </Typography>
          )}
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#2A3547", mb: 1 }}>
            ¿Listo para electrificar tu flota?
          </Typography>
          <Typography sx={{ fontSize: "0.875rem", color: "#64748b", mb: 3, lineHeight: 1.6, maxWidth: 460, mx: "auto" }}>
            Nuestros expertos evaluarán tu caso con GRETA, nuestra herramienta de análisis de electromovilidad, para entregarte un proyecto detallado y certificado SEC.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
            <Button component={Link} href="/agenda" variant="contained" color="primary"
              sx={{ borderRadius: "7px", px: 3.5, py: 1.25, fontSize: "0.875rem" }}>
              Agendar Reunión
            </Button>
            <Button component={Link} href="/contactanos" variant="outlined" color="primary"
              sx={{ borderRadius: "7px", px: 3.5, py: 1.25, fontSize: "0.875rem" }}>
              Contactar un experto
            </Button>
          </Box>
        </Box>

        <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", mt: 2, lineHeight: 1.6 }}>
          * Los valores presentados son estimaciones referenciales y no constituyen una cotización formal.
          Los costos reales dependerán de un estudio técnico detallado. Simulación powered by GRETA — Enérgica City.
        </Typography>
      </Box>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <HpHeaderNew />
      <PageWrapper>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>

          {/* Page header */}
          <Box sx={{ textAlign: "center", mb: 5, mt: 1 }}>
            <Chip
              label="Simulador B2B · Enérgica City"
              color="primary"
              variant="outlined"
              sx={{ mb: 1.5, fontSize: "0.75rem", fontWeight: 600, letterSpacing: 0.5 }}
            />
            <Typography variant="h1" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, fontWeight: 700, color: "#2A3547", mb: 1 }}>
              Simulador de Electroterminal
            </Typography>
            <Typography sx={{ fontSize: "0.9375rem", color: "#64748b", maxWidth: 520, mx: "auto", lineHeight: 1.6 }}>
              Calcula el costo de instalar infraestructura de carga para tu flota de vehículos eléctricos en minutos.
            </Typography>
          </Box>

          {/* Stepper */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            {STEPS.map((s, i) => (
              <Box key={s.id} sx={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                <Button
                  onClick={() => i < step && setStep(i)}
                  disabled={i >= step}
                  variant={i <= step ? "contained" : "outlined"}
                  color="primary"
                  sx={{
                    minWidth: 44, width: 44, height: 44, borderRadius: "50%", p: 0,
                    fontSize: i < step ? "1rem" : "1.125rem",
                    flexShrink: 0,
                    boxShadow: i === step ? `0 0 0 4px ${PRIMARY}25` : "none",
                    ...(i > step && { borderColor: "rgba(0,17,51,0.15)", color: "#94a3b8" }),
                  }}
                >
                  {i < step ? "✓" : s.icon}
                </Button>
                {i < STEPS.length - 1 && (
                  <Box sx={{
                    flex: 1, height: 2, mx: 0.75,
                    background: i < step ? PRIMARY : "rgba(0,17,51,0.1)",
                    transition: "background 0.4s ease",
                  }} />
                )}
              </Box>
            ))}
          </Box>

          {/* Step label */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: PRIMARY, letterSpacing: 1.5, textTransform: "uppercase", display: "block" }}>
              Paso {step + 1} de {STEPS.length}
            </Typography>
            <Typography component="h2" sx={{ fontSize: "1.25rem", fontWeight: 700, mt: 0.5, color: "#2A3547" }}>
              {STEPS[step].label}
            </Typography>
          </Box>

          {/* Step content */}
          <StepCard animating={animating}>
            {step === 0 && renderCompany()}
            {step === 1 && renderFleet()}
            {step === 2 && renderOperation()}
            {step === 3 && renderInfrastructure()}
            {step === 4 && results && renderResults(results)}
          </StepCard>

          {/* Navigation */}
          {step < 4 && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, maxWidth: 800, mx: "auto" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(-1)}
                disabled={step === 0}
                sx={{ borderRadius: "7px", px: 3.5, py: 1.25, fontSize: "0.875rem" }}
              >
                ← Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(1)}
                disabled={!canProceed}
                sx={{ borderRadius: "7px", px: 4, py: 1.25, fontSize: "0.875rem", fontWeight: 600 }}
              >
                {step === 3 ? "Calcular →" : "Siguiente →"}
              </Button>
            </Box>
          )}

          {step === 4 && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={resetSimulator}
                sx={{ borderRadius: "7px", px: 3.5, py: 1.25, fontSize: "0.875rem" }}
              >
                ↻ Nueva simulación
              </Button>
            </Box>
          )}

        </Box>
      </PageWrapper>
    </>
  );
}
