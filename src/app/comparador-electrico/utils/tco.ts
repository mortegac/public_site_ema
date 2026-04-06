import { EVehicle } from '../data/vehicles';

// ── Constants ─────────────────────────────────────────────────────────────────
export const PRECIO_KWH_DEFAULT = 155;     // CLP per kWh (Chile 2025)
export const PRECIO_BENCINA_DEFAULT = 1100; // CLP per litre
export const MANT_GAS_YEAR = 360000;       // CLP/year gas maintenance
export const MANT_EV_YEAR = 110000;        // CLP/year EV maintenance
export const TCO_YEARS = 5;

// ── Types ─────────────────────────────────────────────────────────────────────
export interface TCOResult {
  gasValorHoy: number;
  combustible5yr: number;
  electricidad5yr: number;
  mantGas5yr: number;
  mantEV5yr: number;
  inversionNeta: number;
  costoA: number;   // Total keep gas car (fuel + maintenance)
  costoB: number;   // Total switch to EV (net investment + energy + maintenance)
  ahorro5yr: number;
  ahorroMens: number;
  mesesEq: number;
}

export interface ScoredEV extends EVehicle {
  score: number;
}

// ── TCO Calculations ──────────────────────────────────────────────────────────

/**
 * Calculate full TCO comparison between keeping the current gas car and switching to an EV.
 */
export function calcTCO(
  ev: EVehicle,
  gasValorHoy: number,
  kmMes: number,
  consumoL100: number,
  precioCombustible: number = PRECIO_BENCINA_DEFAULT,
  precioKwh: number = PRECIO_KWH_DEFAULT,
  years: number = TCO_YEARS,
): TCOResult {
  const months = years * 12;

  const combustible5yr = (kmMes / 100) * consumoL100 * precioCombustible * months;
  const electricidad5yr = (kmMes / 100) * ev.kwh100 * precioKwh * months;
  const mantGas5yr = MANT_GAS_YEAR * years;
  const mantEV5yr = MANT_EV_YEAR * years;

  // Option A: Keep gas car (operating costs only)
  const costoA = combustible5yr + mantGas5yr;

  // Option B: Buy EV (net investment + operating costs)
  const inversionNeta = ev.precio - gasValorHoy;
  const costoB = inversionNeta + electricidad5yr + mantEV5yr;

  // Savings are based on operating cost difference (not including net investment)
  const ahorroMens = Math.round((combustible5yr + mantGas5yr - electricidad5yr - mantEV5yr) / months);
  const ahorro5yr = Math.round(costoA - costoB);

  const mesesEq = inversionNeta > 0 && ahorroMens > 0
    ? Math.round(inversionNeta / ahorroMens)
    : 0;

  return {
    gasValorHoy,
    combustible5yr: Math.round(combustible5yr),
    electricidad5yr: Math.round(electricidad5yr),
    mantGas5yr: Math.round(mantGas5yr),
    mantEV5yr: Math.round(mantEV5yr),
    inversionNeta: Math.round(inversionNeta),
    costoA: Math.round(costoA),
    costoB: Math.round(costoB),
    ahorro5yr,
    ahorroMens,
    mesesEq,
  };
}

/**
 * Score and filter EVs based on budget, usage profile, and other factors.
 * Returns top N results sorted by score.
 */
export function selectBestEVs(
  allEVs: EVehicle[],
  budget: number,
  tipoUso: 'city' | 'mixed' | 'highway',
  maxResults: number = 4,
): ScoredEV[] {
  const usoMap: Record<'city' | 'mixed' | 'highway', string> = {
    city: 'urbano',
    mixed: 'mixto',
    highway: 'carretera',
  };
  const uso = usoMap[tipoUso];
  const maxP = budget * 1.25;

  const scored: ScoredEV[] = allEVs.map(ev => {
    let score = 0;

    // Usage match
    if (ev.uso.includes(uso as EVehicle['uso'][number])) score += 3;

    // Budget fit
    if (ev.precio <= budget) score += 2;
    else if (ev.precio <= maxP) score += 1;

    // Autonomy bonus
    score += ev.autonomia / 200;

    // Price proximity penalty
    score -= (Math.abs(ev.precio - budget) / budget) * 1.5;

    return { ...ev, score };
  });

  let candidates = scored.filter(ev => ev.precio <= maxP).sort((a, b) => b.score - a.score);

  // Fallback: if not enough candidates, return cheapest options
  if (candidates.length < 3) {
    candidates = scored.sort((a, b) => a.precio - b.precio).slice(0, maxResults);
  }

  return candidates.slice(0, maxResults);
}

// ── Formatting helpers ────────────────────────────────────────────────────────
export function formatCLP(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL');
}

export function formatMillions(n: number): string {
  const m = n / 1_000_000;
  if (m >= 1) return `$${m.toFixed(1).replace('.', ',')} M`;
  return formatCLP(n);
}
