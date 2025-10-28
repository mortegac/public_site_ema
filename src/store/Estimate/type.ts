export type EstimateData = {
  SECCost: string;
  VAT: string;
  chargerPotence: string;    //22, 35, 7
  estimateId: string;
  grossPrice: string;
  installationCost: string;
  materialsCost: string;
  netPrice: string;
  referenceChargerPrice: string;
}
export const emptyEstimateData: EstimateData = {
  SECCost: "",
  VAT: "",
  chargerPotence: "",
  estimateId: "",
  grossPrice: "",
  installationCost: "",
  materialsCost: "",
  netPrice: "",
  referenceChargerPrice: "",
}

// Tipo para array de EstimateData
export type EstimateDataArray = EstimateData[];

// Tipo auxiliar para aceptar tanto un objeto único como un array
export type EstimateDataSingleOrArray = EstimateData | EstimateData[];
// export type Estimate = {
//   estimateId: string;
//   stateValidation: "automated" | "installerVerified" | "installerModified";
//   isApproved: boolean;
//   isUnderground?: boolean;
//   isHouse?: boolean;
//   chargerPotence?: number;
//   numberOfChargers?: number;
//   distance?: number;
//   distanceExposed?: number;
//   distanceUnderground?: number;
//   preChanneledDistance?: number;
//   hasTireStops: boolean;
//   vehicleModel: string;
//   vehicleBrand: string;
//   chargerBrand: string;
//   chargerModel: string;
//   numberOfBends?: number;
//   numberOfWallBreaches?: number;
//   numberOfInstallers?: number;
//   numberOfManDays?: number;
//   undergroundDistance?: number;
//   needsElectricPoles: boolean;
//   distanceBPC?: number;
//   parkingFloorNumber?: string;
//   installedFromAppartment?: boolean;
//   electricRoomFloorNumber?: string;
//   chargerCost?: number;
//   otherInstallationCosts?: number;
//   materialsCost?: number;
//   canalizationCost?: number;
//   cableingCost?: number;
//   electricalProtectionCost?: number;
//   manpowerCost?: number;
//   TE6Cost?: number;
//   boardAndAssemblyCost?: number;
//   groundWebMeasurementCost?: number;
//   energicaNetCost?: number;
//   energicaMargin: number;
//   energicaMarginCost?: number;
//   netCost?: number;
//   vat?: number;
//   vatPercentage: number;
//   totalInstallationGross?: number;
//   formId: string;
// };
// export const emptyEstimate: Estimate = {
//   estimateId: "",
//   stateValidation: "automated",
//   isApproved: false,
//   isUnderground: false,
//   isHouse: false,
//   chargerPotence: 0,
//   numberOfChargers: 0,
//   distance: 0,
//   distanceExposed: 0,
//   distanceUnderground: 0,
//   preChanneledDistance: 0,
//   hasTireStops: false,
//   vehicleModel: "",
//   vehicleBrand: "",
//   chargerBrand: "",
//   chargerModel: "",
//   numberOfBends: 0,
//   numberOfWallBreaches: 0,
//   numberOfInstallers: 0,
//   numberOfManDays: 0,
//   undergroundDistance: 0,
//   needsElectricPoles: false,
//   distanceBPC: 0,
//   parkingFloorNumber: "",
//   installedFromAppartment: false,
//   electricRoomFloorNumber: "",
//   chargerCost: 0,
//   otherInstallationCosts: 0,
//   materialsCost: 0,
//   canalizationCost: 0,
//   cableingCost: 0,
//   electricalProtectionCost: 0,
//   manpowerCost: 0,
//   TE6Cost: 0,
//   boardAndAssemblyCost: 0,
//   groundWebMeasurementCost: 0,
//   energicaNetCost: 0,
//   energicaMargin: 0,
//   energicaMarginCost: 0,
//   netCost: 0,
//   vat: 0,
//   vatPercentage: 0,
//   totalInstallationGross: 0,
//   formId: ""
// };
export type Estimate = {
  estimateId_22: string;
  estimateId_35: string;
  estimateId_7: string;
  materiales_22: string;
  materiales_35: string;
  materiales_7: string;
  
  instalacion_22: string;
  instalacion_35: string;
  instalacion_7: string;
  
  SEC_22: string;
  SEC_35: string;
  SEC_7: string;
  
  cargador_22: string;
  cargador_35: string;
  cargador_7: string;
  
  neto_22: string;
  neto_35: string;
  neto_7: string;
  
  iva_22: string;
  iva_35: string;
  iva_7: string;
  
  bruto_22: string;
  bruto_35: string;
  bruto_7: string;
  
  mts: string;
  typeOfResidence: string;
  formId: string;

}


export const emptyEstimate: Estimate = {
  estimateId: "",
  materiales_22:  "",
  materiales_35:  "",
  materiales_7:  "",
  
  instalacion_22:  "",
  instalacion_35:  "",
  instalacion_7:  "",
  
  SEC_22:  "",
  SEC_35:  "",
  SEC_7:  "",
  
  cargador_22:  "",
  cargador_35:  "",
  cargador_7:  "",
  
  neto_22:  "",
  neto_35:  "",
  neto_7:  "",
  
  iva_22:  "",
  iva_35:  "",
  iva_7:  "",
  
  bruto_22:  "",
  bruto_35:  "",
  bruto_7:  "",
  
  mts:  "",
  typeOfResidence:  "",
  formId: ""
};

export type estimateInput = {
  formId: string | null
};
