import { EVehicle } from '@/app/comparador-electrico/data/vehicles';

export type ComparadorStep = 0 | 1 | 2 | 3;

export type TipoUso = 'city' | 'mixed' | 'highway';
export type LugarCarga = 'home' | 'building';
export type TipoCombustible = 'bencina' | 'diesel';

export interface CurrentVehicleState {
  marca: string;
  modelo: string;
  anio: number;
  combustible: TipoCombustible;
  valorMercadoCLP: number;
  kmMensuales: number;
  consumoL100km: number;
  precioCombustibleCLP: number;
}

export interface UsageProfileState {
  tipoUso: TipoUso;
  lugarCarga: LugarCarga;
  presupuestoCLP: number;
}

export interface ComparadorState {
  step: ComparadorStep;
  currentVehicle: CurrentVehicleState;
  usageProfile: UsageProfileState;
  selectedEVId: number | null;
  evRecommendations: EVehicle[];
}
