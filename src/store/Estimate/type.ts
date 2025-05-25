export type Estimate = {
  estimateId: string;
  stateValidation: "automated" | "installerVerified" | "installerModified";
  isApproved: boolean;
  isUnderground?: boolean;
  isHouse?: boolean;
  chargerPotence?: number;
  numberOfChargers?: number;
  distanceExposed?: number;
  distanceUnderground?: number;
  preChanneledDistance?: number;
  hasTireStops: boolean;
  vehicleModel: string;
  vehicleBrand: string;
  chargerBrand: string;
  chargerModel: string;
  numberOfBends?: number;
  numberOfWallBreaches?: number;
  numberOfInstallers?: number;
  numberOfManDays?: number;
  undergroundDistance?: number;
  needsElectricPoles: boolean;
  distanceBPC?: number;
  parkingFloorNumber?: string;
  installedFromAppartment?: boolean;
  electricRoomFloorNumber?: string;
  chargerCost?: number;
  otherInstallationCosts?: number;
  materialsCost?: number;
  canalizationCost?: number;
  cableingCost?: number;
  electricalProtectionCost?: number;
  manpowerCost?: number;
  TE6Cost?: number;
  boardAndAssemblyCost?: number;
  groundWebMeasurementCost?: number;
  energicaNetCost?: number;
  energicaMargin: number;
  energicaMarginCost?: number;
  netCost?: number;
  vat?: number;
  vatPercentage: number;
  totalInstallationGross?: number;
  formId: string;
};


export const emptyEstimate: Estimate = {
  estimateId: "",
  stateValidation: "automated",
  isApproved: false,
  isUnderground: false,
  isHouse: false,
  chargerPotence: 0,
  numberOfChargers: 0,
  distanceExposed: 0,
  distanceUnderground: 0,
  preChanneledDistance: 0,
  hasTireStops: false,
  vehicleModel: "",
  vehicleBrand: "",
  chargerBrand: "",
  chargerModel: "",
  numberOfBends: 0,
  numberOfWallBreaches: 0,
  numberOfInstallers: 0,
  numberOfManDays: 0,
  undergroundDistance: 0,
  needsElectricPoles: false,
  distanceBPC: 0,
  parkingFloorNumber: "",
  installedFromAppartment: false,
  electricRoomFloorNumber: "",
  chargerCost: 0,
  otherInstallationCosts: 0,
  materialsCost: 0,
  canalizationCost: 0,
  cableingCost: 0,
  electricalProtectionCost: 0,
  manpowerCost: 0,
  TE6Cost: 0,
  boardAndAssemblyCost: 0,
  groundWebMeasurementCost: 0,
  energicaNetCost: 0,
  energicaMargin: 0,
  energicaMarginCost: 0,
  netCost: 0,
  vat: 0,
  vatPercentage: 0,
  totalInstallationGross: 0,
  formId: ""
};

export type estimateInput = {
  formId: string | null
};
