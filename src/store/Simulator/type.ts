export interface SimulatorFleetItemInput {
  vehicleType: string;
  quantity: number;
  avgDailyKm: number;
  consumptionKWhPer100km: number;
}

export interface SaveSimulatorInput {
  // Step 0 — Company
  companyName?: string | null;
  companySize?: string | null;
  industry?: string | null;
  region?: string | null;

  // Step 1 — Fleet
  fleetItems: SimulatorFleetItemInput[];
  avgDailyKm: number;

  // Step 2 — Operation
  operationProfile?: string | null;
  operatingHours: number;
  daysPerWeek: number;

  // Step 3 — Infrastructure
  connectionType?: string | null;
  hasTransformer?: boolean | null;
  availablePowerKW: number;
  areaM2: number;

  // Optional customer link
  customerId?: string | null;
}

export interface SaveSimulatorResponse {
  simulatorLeadId: string;
  simulatorResultId: string;
  message: string;
}
