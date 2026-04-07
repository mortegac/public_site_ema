// Static vehicle database — no API calls needed

export interface EVehicle {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  autonomia: number;
  kwh100: number;
  bateria: number;
  tipo: string;
  segmento: string;
  plazas: number;
  cargaAC: number;
  cargaDC: number;
  tiempoCarga3080min: number;
  maletero: number;
  uso: Array<'urbano' | 'mixto' | 'carretera'>;
  disponibleChile: boolean;
  concesionario: string;
  notas: string;
}

export interface GasVehicle {
  marca: string;
  modelos: string[];
  precioNuevo: number;
  consumoBencina: number | null;
  consumoDiesel: number | null;
}

// ── Electric Vehicles (Chile 2025) ────────────────────────────────────────────
export const EV_DB: EVehicle[] = [
  {
    id: 1, marca: 'Renault', modelo: 'Kwid E-Tech', anio: 2025,
    precio: 14990000, autonomia: 298, kwh100: 14.5, bateria: 26.8,
    tipo: 'Hatchback', segmento: 'A', plazas: 5, cargaAC: 22, cargaDC: 30,
    tiempoCarga3080min: 58, maletero: 290, uso: ['urbano'],
    disponibleChile: true, concesionario: 'Renault Chile', notas: 'El más barato del mercado',
  },
  {
    id: 2, marca: 'Ora', modelo: '03', anio: 2025,
    precio: 15990000, autonomia: 300, kwh100: 14.3, bateria: 47.8,
    tipo: 'Hatchback', segmento: 'B', plazas: 5, cargaAC: 11, cargaDC: 80,
    tiempoCarga3080min: 35, maletero: 228, uso: ['urbano', 'mixto'],
    disponibleChile: true, concesionario: 'Great Wall Motors Chile', notas: 'Diseño retro',
  },
  {
    id: 3, marca: 'Geely', modelo: 'EX2 Pro', anio: 2025,
    precio: 17000000, autonomia: 395, kwh100: 15.0, bateria: 39.4,
    tipo: 'Hatchback', segmento: 'B', plazas: 5, cargaAC: 6.6, cargaDC: 70,
    tiempoCarga3080min: 21, maletero: 270, uso: ['urbano', 'mixto'],
    disponibleChile: true, concesionario: 'Geely Chile', notas: 'Buena autonomía por precio',
  },
  {
    id: 4, marca: 'DFSK', modelo: 'Seres 3', anio: 2025,
    precio: 16990000, autonomia: 300, kwh100: 15.5, bateria: 38.0,
    tipo: 'SUV', segmento: 'B', plazas: 5, cargaAC: 7.0, cargaDC: 40,
    tiempoCarga3080min: 60, maletero: 338, uso: ['urbano'],
    disponibleChile: true, concesionario: 'DFSK Chile', notas: '',
  },
  {
    id: 5, marca: 'BYD', modelo: 'Dolphin', anio: 2025,
    precio: 19000000, autonomia: 340, kwh100: 14.5, bateria: 44.9,
    tipo: 'Hatchback', segmento: 'B', plazas: 5, cargaAC: 11, cargaDC: 60,
    tiempoCarga3080min: 30, maletero: 345, uso: ['urbano', 'mixto'],
    disponibleChile: true, concesionario: 'BYD Chile', notas: 'Bestseller BYD',
  },
  {
    id: 6, marca: 'BYD', modelo: 'Dolphin Mini', anio: 2025,
    precio: 20990000, autonomia: 310, kwh100: 13.8, bateria: 38.4,
    tipo: 'Hatchback', segmento: 'A', plazas: 4, cargaAC: 6.6, cargaDC: 40,
    tiempoCarga3080min: 40, maletero: 230, uso: ['urbano'],
    disponibleChile: true, concesionario: 'BYD Chile', notas: 'Versión compacta del Dolphin',
  },
  {
    id: 7, marca: 'MG', modelo: 'ZS EV', anio: 2025,
    precio: 21000000, autonomia: 320, kwh100: 16.2, bateria: 50.3,
    tipo: 'SUV', segmento: 'B', plazas: 5, cargaAC: 11, cargaDC: 76,
    tiempoCarga3080min: 40, maletero: 448, uso: ['urbano', 'mixto'],
    disponibleChile: true, concesionario: 'MG Chile', notas: 'Buen maletero para SUV compacto',
  },
  {
    id: 8, marca: 'Chery', modelo: 'Omoda E5', anio: 2025,
    precio: 22500000, autonomia: 430, kwh100: 15.8, bateria: 61.0,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 80,
    tiempoCarga3080min: 40, maletero: 384, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Chery Chile', notas: '',
  },
  {
    id: 9, marca: 'BYD', modelo: 'Atto 3', anio: 2025,
    precio: 24000000, autonomia: 420, kwh100: 15.2, bateria: 60.5,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 80,
    tiempoCarga3080min: 35, maletero: 440, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'BYD Chile', notas: 'El SUV eléctrico más vendido de BYD',
  },
  {
    id: 10, marca: 'MG', modelo: 'MG4', anio: 2025,
    precio: 26990000, autonomia: 350, kwh100: 14.9, bateria: 64.0,
    tipo: 'Hatchback', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 117,
    tiempoCarga3080min: 24, maletero: 363, uso: ['urbano', 'mixto'],
    disponibleChile: true, concesionario: 'MG Chile', notas: 'Carga rápida destacada',
  },
  {
    id: 11, marca: 'Kia', modelo: 'EV3', anio: 2025,
    precio: 28000000, autonomia: 500, kwh100: 14.3, bateria: 58.3,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 135,
    tiempoCarga3080min: 30, maletero: 460, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Kia Chile', notas: 'Excelente autonomía en su rango de precio',
  },
  {
    id: 12, marca: 'Volvo', modelo: 'EX30', anio: 2025,
    precio: 29000000, autonomia: 480, kwh100: 15.2, bateria: 64.0,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 153,
    tiempoCarga3080min: 25, maletero: 318, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Volvo Chile', notas: 'Premium accesible; más vendido 2025',
  },
  {
    id: 13, marca: 'Peugeot', modelo: 'e-2008', anio: 2025,
    precio: 40090000, autonomia: 400, kwh100: 15.8, bateria: 54.0,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 100,
    tiempoCarga3080min: 38, maletero: 434, uso: ['urbano', 'mixto'],
    disponibleChile: true, concesionario: 'Peugeot Chile', notas: '',
  },
  {
    id: 14, marca: 'Hyundai', modelo: 'Kona EV', anio: 2025,
    precio: 34790000, autonomia: 480, kwh100: 14.7, bateria: 65.4,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 100,
    tiempoCarga3080min: 45, maletero: 361, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Hyundai Chile', notas: '',
  },
  {
    id: 15, marca: 'BYD', modelo: 'Yuan Plus', anio: 2025,
    precio: 34990000, autonomia: 420, kwh100: 15.8, bateria: 60.5,
    tipo: 'SUV', segmento: 'C', plazas: 5, cargaAC: 11, cargaDC: 88,
    tiempoCarga3080min: 40, maletero: 430, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'BYD Chile', notas: '',
  },
  {
    id: 16, marca: 'Kia', modelo: 'EV6', anio: 2025,
    precio: 37990000, autonomia: 500, kwh100: 16.5, bateria: 77.4,
    tipo: 'Crossover', segmento: 'D', plazas: 5, cargaAC: 11, cargaDC: 220,
    tiempoCarga3080min: 18, maletero: 480, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Kia Chile', notas: '800V ultra-fast charging',
  },
  {
    id: 17, marca: 'Hyundai', modelo: 'Ioniq 5', anio: 2025,
    precio: 52890000, autonomia: 481, kwh100: 17.3, bateria: 77.4,
    tipo: 'SUV', segmento: 'D', plazas: 5, cargaAC: 11, cargaDC: 220,
    tiempoCarga3080min: 18, maletero: 527, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Hyundai Chile', notas: '800V ultra-fast charging',
  },
  {
    id: 18, marca: 'Tesla', modelo: 'Model Y', anio: 2025,
    precio: 49990000, autonomia: 533, kwh100: 16.0, bateria: 75.0,
    tipo: 'SUV', segmento: 'D', plazas: 5, cargaAC: 11, cargaDC: 250,
    tiempoCarga3080min: 25, maletero: 854, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Tesla Chile', notas: 'Supercharger network',
  },
  {
    id: 19, marca: 'BMW', modelo: 'iX3', anio: 2025,
    precio: 49990000, autonomia: 460, kwh100: 18.5, bateria: 80.0,
    tipo: 'SUV', segmento: 'D', plazas: 5, cargaAC: 11, cargaDC: 150,
    tiempoCarga3080min: 32, maletero: 510, uso: ['urbano', 'mixto', 'carretera'],
    disponibleChile: true, concesionario: 'BMW Chile', notas: 'Premium alemán',
  },
  {
    id: 20, marca: 'Maxus', modelo: 'T90 EV', anio: 2025,
    precio: 45160000, autonomia: 471, kwh100: 22.0, bateria: 88.0,
    tipo: 'Pickup', segmento: 'Pickup', plazas: 5, cargaAC: 11, cargaDC: 80,
    tiempoCarga3080min: 80, maletero: 750, uso: ['mixto', 'carretera'],
    disponibleChile: true, concesionario: 'Maxus Chile', notas: 'Única pickup eléctrica disponible',
  },
];

// ── Combustion Vehicles (Gas/Diesel) ─────────────────────────────────────────
export const GAS_DB: GasVehicle[] = [
  { marca: 'kia',        modelos: ['morning'],                                     precioNuevo: 10500000, consumoBencina: 8.5,  consumoDiesel: null },
  { marca: 'hyundai',    modelos: ['grand i10', 'i10', 'inster'],                  precioNuevo: 11000000, consumoBencina: 8.0,  consumoDiesel: null },
  { marca: 'chevrolet',  modelos: ['spark'],                                        precioNuevo: 10000000, consumoBencina: 8.5,  consumoDiesel: null },
  { marca: 'suzuki',     modelos: ['celerio'],                                      precioNuevo: 10500000, consumoBencina: 8.0,  consumoDiesel: null },
  { marca: 'kia',        modelos: ['rio', 'rio 4', 'rio 5', 'rio4', 'rio5'],       precioNuevo: 14000000, consumoBencina: 9.0,  consumoDiesel: null },
  { marca: 'kia',        modelos: ['soluto'],                                       precioNuevo: 13000000, consumoBencina: 9.0,  consumoDiesel: null },
  { marca: 'hyundai',    modelos: ['accent'],                                       precioNuevo: 13500000, consumoBencina: 9.0,  consumoDiesel: null },
  { marca: 'toyota',     modelos: ['yaris'],                                        precioNuevo: 14500000, consumoBencina: 9.5,  consumoDiesel: null },
  { marca: 'nissan',     modelos: ['versa'],                                        precioNuevo: 13000000, consumoBencina: 9.5,  consumoDiesel: null },
  { marca: 'chevrolet',  modelos: ['onix', 'sail', 'aveo'],                        precioNuevo: 12500000, consumoBencina: 9.0,  consumoDiesel: null },
  { marca: 'suzuki',     modelos: ['baleno', 'swift'],                              precioNuevo: 14000000, consumoBencina: 8.5,  consumoDiesel: null },
  { marca: 'renault',    modelos: ['kwid', 'symbol'],                               precioNuevo: 11500000, consumoBencina: 8.5,  consumoDiesel: null },
  { marca: 'chery',      modelos: ['qq', 'face'],                                   precioNuevo: 10000000, consumoBencina: 9.0,  consumoDiesel: null },
  { marca: 'toyota',     modelos: ['corolla'],                                      precioNuevo: 18500000, consumoBencina: 10.5, consumoDiesel: null },
  { marca: 'toyota',     modelos: ['corolla cross'],                                precioNuevo: 22000000, consumoBencina: 11.0, consumoDiesel: null },
  { marca: 'hyundai',    modelos: ['elantra'],                                      precioNuevo: 16000000, consumoBencina: 10.0, consumoDiesel: null },
  { marca: 'mazda',      modelos: ['mazda 3', '3'],                                 precioNuevo: 18000000, consumoBencina: 10.5, consumoDiesel: null },
  { marca: 'nissan',     modelos: ['sentra'],                                       precioNuevo: 17000000, consumoBencina: 10.0, consumoDiesel: null },
  { marca: 'volkswagen', modelos: ['vento', 'jetta'],                               precioNuevo: 16500000, consumoBencina: 10.0, consumoDiesel: null },
  { marca: 'honda',      modelos: ['civic'],                                        precioNuevo: 20000000, consumoBencina: 10.0, consumoDiesel: null },
  { marca: 'chevrolet',  modelos: ['groove'],                                       precioNuevo: 15500000, consumoBencina: 11.0, consumoDiesel: null },
  { marca: 'chevrolet',  modelos: ['tracker'],                                      precioNuevo: 18500000, consumoBencina: 11.5, consumoDiesel: null },
  { marca: 'hyundai',    modelos: ['creta', 'venue'],                               precioNuevo: 19000000, consumoBencina: 11.5, consumoDiesel: null },
  { marca: 'kia',        modelos: ['seltos', 'stonic'],                             precioNuevo: 20000000, consumoBencina: 11.5, consumoDiesel: null },
  { marca: 'mg',         modelos: ['zs', 'mg zs'],                                  precioNuevo: 16500000, consumoBencina: 11.0, consumoDiesel: null },
  { marca: 'suzuki',     modelos: ['vitara', 'grand vitara', 's-cross', 'scross'],  precioNuevo: 20500000, consumoBencina: 10.5, consumoDiesel: null },
  { marca: 'chery',      modelos: ['tiggo 2', 'tiggo2', 'tiggo 3', 'tiggo3'],      precioNuevo: 14000000, consumoBencina: 11.0, consumoDiesel: null },
  { marca: 'nissan',     modelos: ['kicks'],                                        precioNuevo: 17000000, consumoBencina: 11.0, consumoDiesel: null },
  { marca: 'renault',    modelos: ['duster', 'oroch'],                              precioNuevo: 18000000, consumoBencina: 11.5, consumoDiesel: 8.5  },
  { marca: 'volkswagen', modelos: ['t-cross', 'tcross', 'taos', 'nivus'],           precioNuevo: 20000000, consumoBencina: 11.0, consumoDiesel: null },
  { marca: 'peugeot',    modelos: ['2008'],                                          precioNuevo: 20000000, consumoBencina: 11.0, consumoDiesel: 8.5  },
  { marca: 'hyundai',    modelos: ['tucson'],                                       precioNuevo: 24000000, consumoBencina: 12.0, consumoDiesel: 8.5  },
  { marca: 'kia',        modelos: ['sportage'],                                     precioNuevo: 22000000, consumoBencina: 12.0, consumoDiesel: 8.5  },
  { marca: 'toyota',     modelos: ['rav4', 'rav 4'],                                precioNuevo: 27000000, consumoBencina: 12.5, consumoDiesel: 9.0  },
  { marca: 'mazda',      modelos: ['cx-5', 'cx5'],                                  precioNuevo: 25000000, consumoBencina: 12.0, consumoDiesel: null },
  { marca: 'nissan',     modelos: ['x-trail', 'xtrail', 'qashqai'],                 precioNuevo: 23000000, consumoBencina: 12.5, consumoDiesel: 9.0  },
  { marca: 'ford',       modelos: ['escape', 'kuga'],                               precioNuevo: 24000000, consumoBencina: 12.5, consumoDiesel: null },
  { marca: 'honda',      modelos: ['cr-v', 'crv'],                                  precioNuevo: 26000000, consumoBencina: 12.5, consumoDiesel: null },
  { marca: 'chery',      modelos: ['tiggo 5', 'tiggo5', 'tiggo 7', 'tiggo7', 'omoda'], precioNuevo: 22000000, consumoBencina: 11.5, consumoDiesel: null },
  { marca: 'ssangyong',  modelos: ['musso', 'tivoli', 'korando', 'rexton'],         precioNuevo: 22000000, consumoBencina: 10.0, consumoDiesel: 9.0  },
  { marca: 'mitsubishi', modelos: ['eclipse cross', 'asx', 'outlander'],            precioNuevo: 23000000, consumoBencina: 12.0, consumoDiesel: 8.5  },
  { marca: 'peugeot',    modelos: ['3008', '5008'],                                  precioNuevo: 26000000, consumoBencina: 11.5, consumoDiesel: 8.5  },
  { marca: 'toyota',     modelos: ['hilux'],                                        precioNuevo: 32000000, consumoBencina: null,  consumoDiesel: 11.5 },
  { marca: 'ford',       modelos: ['ranger', 'f-150', 'f150'],                      precioNuevo: 29000000, consumoBencina: null,  consumoDiesel: 11.5 },
  { marca: 'mitsubishi', modelos: ['l200', 'l 200'],                                precioNuevo: 28000000, consumoBencina: null,  consumoDiesel: 11.0 },
  { marca: 'nissan',     modelos: ['navara', 'frontier', 'np300'],                  precioNuevo: 26000000, consumoBencina: null,  consumoDiesel: 11.5 },
  { marca: 'mazda',      modelos: ['bt-50', 'bt50'],                                precioNuevo: 27000000, consumoBencina: null,  consumoDiesel: 11.5 },
  { marca: 'chevrolet',  modelos: ['d-max', 'dmax', 'colorado'],                    precioNuevo: 26000000, consumoBencina: null,  consumoDiesel: 12.0 },
];

// ── Depreciation curve ────────────────────────────────────────────────────────
const DEPRECIATION_CURVE = [1.0, 0.82, 0.72, 0.64, 0.57, 0.52, 0.47, 0.43, 0.39, 0.36, 0.33];

function normalize(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getDepreciation(anio: number): number {
  const age = 2025 - anio;
  if (age <= 0) return 1.0;
  if (age < DEPRECIATION_CURVE.length) return DEPRECIATION_CURVE[age];
  return Math.max(0.22, DEPRECIATION_CURVE[DEPRECIATION_CURVE.length - 1] * Math.pow(0.95, age - (DEPRECIATION_CURVE.length - 1)));
}

export interface GasLookupResult {
  precio: number;
  consumoRef: number | null;
}

export function lookupGasVehicle(marca: string, modelo: string, anio: number, combustible: 'bencina' | 'diesel'): GasLookupResult | null {
  const m = normalize(marca);
  const mo = normalize(modelo);

  const match = GAS_DB.find(
    r => normalize(r.marca) === m && r.modelos.some(nm => mo.includes(normalize(nm)) || normalize(nm).includes(mo))
  );

  if (!match) return null;

  const precio = Math.round((match.precioNuevo * getDepreciation(anio)) / 100000) * 100000;
  const consumoRef = combustible === 'diesel' ? match.consumoDiesel : match.consumoBencina;

  return { precio, consumoRef };
}
