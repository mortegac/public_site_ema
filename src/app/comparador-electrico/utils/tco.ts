import { EVehicle, VehicleSegment } from '../data/vehicles';

// ── Constants ─────────────────────────────────────────────────────────────────
export const PRECIO_KWH_DEFAULT = 155;
export const PRECIO_BENCINA_DEFAULT = 1545;
export const PRECIO_DIESEL_DEFAULT = 1535;
export const MANT_GAS_YEAR = 360000;
export const MANT_EV_YEAR = 110000;
export const TCO_YEARS_DEFAULT = 4;

// ── Types ─────────────────────────────────────────────────────────────────────
export interface TCOResult {
  gasValorHoy: number;
  years: number;
  combustibleYrs: number;
  electricidadYrs: number;
  mantGasYrs: number;
  mantEVYrs: number;
  inversionNeta: number;
  costoA: number;
  costoB: number;
  ahorroTotal: number;
  ahorroMens: number;
  mesesEq: number;
}

export interface ScoredEV extends EVehicle {
  score: number;
}

// ── TCO Calculation ───────────────────────────────────────────────────────────
export function calcTCO(
  ev: EVehicle,
  gasValorHoy: number,
  kmMes: number,
  consumoL100: number,
  precioCombustible: number = PRECIO_BENCINA_DEFAULT,
  precioKwh: number = PRECIO_KWH_DEFAULT,
  years: number = TCO_YEARS_DEFAULT,
): TCOResult {
  const months = years * 12;

  const combustibleYrs = (kmMes / 100) * consumoL100 * precioCombustible * months;
  const electricidadYrs = (kmMes / 100) * ev.kwh100 * precioKwh * months;
  const mantGasYrs = MANT_GAS_YEAR * years;
  const mantEVYrs = MANT_EV_YEAR * years;

  const costoA = combustibleYrs + mantGasYrs;
  const inversionNeta = ev.precio - gasValorHoy;
  const costoB = inversionNeta + electricidadYrs + mantEVYrs;

  const ahorroMens = Math.round((combustibleYrs + mantGasYrs - electricidadYrs - mantEVYrs) / months);
  const ahorroTotal = Math.round(costoA - costoB);

  const mesesEq = inversionNeta > 0 && ahorroMens > 0
    ? Math.round(inversionNeta / ahorroMens)
    : 0;

  return {
    gasValorHoy,
    years,
    combustibleYrs: Math.round(combustibleYrs),
    electricidadYrs: Math.round(electricidadYrs),
    mantGasYrs: Math.round(mantGasYrs),
    mantEVYrs: Math.round(mantEVYrs),
    inversionNeta: Math.round(inversionNeta),
    costoA: Math.round(costoA),
    costoB: Math.round(costoB),
    ahorroTotal,
    ahorroMens,
    mesesEq,
  };
}

// ── EV Selection ──────────────────────────────────────────────────────────────
export function selectBestEVs(
  allEVs: EVehicle[],
  budget: number,
  tipoUso: 'city' | 'mixed' | 'highway',
  seg?: VehicleSegment,
  maxResults: number = 2,
): ScoredEV[] {
  const usoMap: Record<'city' | 'mixed' | 'highway', string> = {
    city: 'urbano',
    mixed: 'mixto',
    highway: 'carretera',
  };
  const uso = usoMap[tipoUso];
  const maxP = budget * 1.3;

  let pool = seg ? allEVs.filter(ev => ev.seg === seg) : allEVs;
  if (pool.length < 2) pool = allEVs;

  const scored: ScoredEV[] = pool.map(ev => {
    let score = 0;
    if (ev.uso.includes(uso as EVehicle['uso'][number])) score += 3;
    if (ev.precio <= budget) score += 2;
    else if (ev.precio <= maxP) score += 1;
    score += ev.autonomia / 200;
    score -= (Math.abs(ev.precio - budget) / budget) * 1.5;
    return { ...ev, score };
  });

  let candidates = scored.filter(ev => ev.precio <= maxP).sort((a, b) => b.score - a.score);
  if (candidates.length < 2) {
    candidates = scored.sort((a, b) => a.precio - b.precio);
  }

  return candidates.slice(0, maxResults);
}

// ── Formatting ────────────────────────────────────────────────────────────────
export function formatCLP(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL');
}

export function formatMillions(n: number): string {
  const m = n / 1_000_000;
  if (m >= 1) return `$${m.toFixed(1).replace('.', ',')} M`;
  return formatCLP(n);
}
