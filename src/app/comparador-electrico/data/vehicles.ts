// Static vehicle database — no API calls needed

export type VehicleSegment = 'city_sedan' | 'suv' | 'pickup';

export const SEG_LABELS: Record<VehicleSegment, string> = {
  city_sedan: 'Sedan / Hatchback',
  suv: 'SUV',
  pickup: 'Pickup',
};

export interface EVehicle {
  id: number;
  imageId: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  autonomia: number;
  kwh100: number;
  bateria: number;
  tipo: string;
  seg: VehicleSegment;
  plazas: number;
  cargaAC: number;
  cargaDC: number;
  tiempoCarga3080min: number;
  maletero: number;
  uso: Array<'urbano' | 'mixto' | 'carretera'>;
  disponibleChile: boolean;
  concesionario: string;
  notas: string;
  img: string;
}

export interface GasVehicle {
  id: string;
  marca: string;
  modelo: string;
  tipo: 'GASOLINA' | 'DIESEL' | 'HIBRIDO';
  seg: VehicleSegment;
  precio: number;
  consumo: number;
  img: string;
}

// EV fleet — Chile 2025/2026
export const EV_DB: EVehicle[] = [
  { id: 1, imageId: 'AUDI-ETRO-STAN-2025', marca: 'Audi', modelo: 'E-tron gt', anio: 2025, precio: 119990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Audi Chile', notas: '', img: 'AUDI-ETRO-STAN-2025.jpg' },
  { id: 2, imageId: 'AUDI-Q4ET-45QU-2025', marca: 'Audi', modelo: 'Q4 e-tron', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Audi Chile', notas: '', img: 'AUDI-Q4ET-45QU-2025.jpg' },
  { id: 3, imageId: 'AUDI-Q8ET-PERF-2025', marca: 'Audi', modelo: 'Q8 e-tron', anio: 2025, precio: 109990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Audi Chile', notas: '', img: 'AUDI-Q8ET-PERF-2025.jpg' },
  { id: 4, imageId: 'AUDI-Q8SP-PERF-2025', marca: 'Audi', modelo: 'Q8 sportback e-tron', anio: 2025, precio: 109990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Audi Chile', notas: '', img: 'AUDI-Q8SP-PERF-2025.jpg' },
  { id: 5, imageId: 'AUDI-RSET-PERF-2025', marca: 'Audi', modelo: 'Rs e-tron gt', anio: 2025, precio: 149990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Audi Chile', notas: '', img: 'AUDI-RSET-PERF-2025.webp' },
  { id: 6, imageId: 'BMWX-I4XX-M50X-2025', marca: 'Bmw', modelo: 'I4', anio: 2025, precio: 94990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Bmw Chile', notas: '', img: 'BMWX-I4XX-M50X-2025.png' },
  { id: 7, imageId: 'BMWX-I5XX-EDRI-2025', marca: 'Bmw', modelo: 'I5', anio: 2025, precio: 99990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Bmw Chile', notas: '', img: 'BMWX-I5XX-EDRI-2025.jpg' },
  { id: 8, imageId: 'BMWX-IXXX-XDRI-2025-01', marca: 'Bmw', modelo: 'Ix', anio: 2025, precio: 119990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Bmw Chile', notas: '', img: 'BMWX-IXXX-XDRI-2025-01.jpg' },
  { id: 9, imageId: 'BMWX-IX1X-XDRI-2025', marca: 'Bmw', modelo: 'Ix1', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Bmw Chile', notas: '', img: 'BMWX-IX1X-XDRI-2025.jpg' },
  { id: 10, imageId: 'BMWX-IX3X-STAN-2025', marca: 'Bmw', modelo: 'Ix3', anio: 2025, precio: 72990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Bmw Chile', notas: '', img: 'BMWX-IX3X-STAN-2025.jpg' },
  { id: 11, imageId: 'BYDX-ATTO-STAN-2025', marca: 'Byd', modelo: 'Atto 3', anio: 2025, precio: 25990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-ATTO-STAN-2025.jpg' },
  { id: 12, imageId: 'BYDX-DOLP-EXTE-2025', marca: 'Byd', modelo: 'Dolphin', anio: 2025, precio: 21990000, autonomia: 330, kwh100: 14.5, bateria: 47.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-DOLP-EXTE-2025.jpg' },
  { id: 13, imageId: 'BYDX-HANX-LONG-2025', marca: 'Byd', modelo: 'Han', anio: 2025, precio: 44990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-HANX-LONG-2025.jpg' },
  { id: 14, imageId: 'BYDX-SEAL-STAN-2025', marca: 'Byd', modelo: 'Sea lion 6', anio: 2025, precio: 29990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-SEAL-STAN-2025.jpg' },
  { id: 15, imageId: 'BYDX-SEAL-STAN-2026', marca: 'Byd', modelo: 'Sea lion 7', anio: 2026, precio: 39990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-SEAL-STAN-2026.jpg' },
  { id: 16, imageId: 'BYDX-SEAG-STAN-2025', marca: 'Byd', modelo: 'Seagull', anio: 2025, precio: 14990000, autonomia: 250, kwh100: 14.5, bateria: 36.2, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-SEAG-STAN-2025.jpg' },
  { id: 17, imageId: 'BYDX-SEAL-PERF-2025', marca: 'Byd', modelo: 'Seal', anio: 2025, precio: 39990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-SEAL-PERF-2025.jpg' },
  { id: 18, imageId: 'BYDX-TANG-AWDX-2025', marca: 'Byd', modelo: 'Tang', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Byd Chile', notas: '', img: 'BYDX-TANG-AWDX-2025.jpg' },
  { id: 19, imageId: 'CHAN-LUMI-STAN-2025', marca: 'Changan', modelo: 'Lumin', anio: 2025, precio: 11990000, autonomia: 250, kwh100: 14.5, bateria: 36.2, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Changan Chile', notas: '', img: 'CHAN-LUMI-STAN-2025.jpg' },
  { id: 20, imageId: 'CHER-OMOD-STAN-2025', marca: 'Chery', modelo: 'Omoda e5', anio: 2025, precio: 24990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Chery Chile', notas: '', img: 'CHER-OMOD-STAN-2025.jpg' },
  { id: 21, imageId: 'CHER-TIGG-STAN-2025', marca: 'Chery', modelo: 'Tiggo 4 pro ev', anio: 2025, precio: 20990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Chery Chile', notas: '', img: 'CHER-TIGG-STAN-2025.jpg' },
  { id: 22, imageId: 'CHEV-EQUI-STAN-2025', marca: 'Chevrolet', modelo: 'Equinox ev', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Chevrolet Chile', notas: '', img: 'CHEV-EQUI-STAN-2025.jpg' },
  { id: 23, imageId: 'CITR-EC3X-STAN-2025', marca: 'Citroën', modelo: 'Ë-c3', anio: 2025, precio: 17990000, autonomia: 290, kwh100: 14.5, bateria: 42.0, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Citroën Chile', notas: '', img: 'CITR-EC3X-STAN-2025.jpg' },
  { id: 24, imageId: 'DEEP-L07X-STAN-2025', marca: 'Deepal', modelo: 'L07', anio: 2025, precio: 29990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Deepal Chile', notas: '', img: 'DEEP-L07X-STAN-2025.jpg' },
  { id: 25, imageId: 'DEEP-S07X-BEVX-2025', marca: 'Deepal', modelo: 'S07', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Deepal Chile', notas: '', img: 'DEEP-S07X-BEVX-2025.jpg' },
  { id: 26, imageId: 'DFSK-GLOR-STAN-2025', marca: 'Dfsk', modelo: 'Glory e3', anio: 2025, precio: 16990000, autonomia: 290, kwh100: 14.5, bateria: 42.0, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Dfsk Chile', notas: '', img: 'DFSK-GLOR-STAN-2025.jpg' },
  { id: 27, imageId: 'DFSK-SERE-STAN-2025', marca: 'Dfsk', modelo: 'Seres 3', anio: 2025, precio: 18990000, autonomia: 300, kwh100: 17.0, bateria: 51.0, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Dfsk Chile', notas: '', img: 'DFSK-SERE-STAN-2025.jpg' },
  { id: 28, imageId: 'DONG-NAMM-STAN-2025', marca: 'Dongfeng', modelo: 'Nammi 01', anio: 2025, precio: 16990000, autonomia: 290, kwh100: 14.5, bateria: 42.0, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Dongfeng Chile', notas: '', img: 'DONG-NAMM-STAN-2025.webp' },
  { id: 29, imageId: 'FIAT-500E-STAN-2025', marca: 'Fiat', modelo: '500e', anio: 2025, precio: 22990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Fiat Chile', notas: '', img: 'FIAT-500E-STAN-2025.jpg' },
  { id: 30, imageId: 'GACA-SPLU-STAN-2025', marca: 'Gac aion', modelo: 'S plus', anio: 2025, precio: 21990000, autonomia: 330, kwh100: 14.5, bateria: 47.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Gac aion Chile', notas: '', img: 'GACA-SPLU-STAN-2025.jpg' },
  { id: 31, imageId: 'GACA-VXXX-STAN-2025', marca: 'Gac aion', modelo: 'V', anio: 2025, precio: 28990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Gac aion Chile', notas: '', img: 'GACA-VXXX-STAN-2025.jpg' },
  { id: 32, imageId: 'GACA-YPLU-STAN-2025', marca: 'Gac aion', modelo: 'Y plus', anio: 2025, precio: 22990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Gac aion Chile', notas: '', img: 'GACA-YPLU-STAN-2025.jpg' },
  { id: 33, imageId: 'GWMX-ORA0-ESTI-2025', marca: 'Gwm', modelo: 'Ora 03', anio: 2025, precio: 21990000, autonomia: 330, kwh100: 14.5, bateria: 47.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Gwm Chile', notas: '', img: 'GWMX-ORA0-ESTI-2025.jpg' },
  { id: 34, imageId: 'GWMX-ORA0-STAN-2025', marca: 'Gwm', modelo: 'Ora 07', anio: 2025, precio: 28990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Gwm Chile', notas: '', img: 'GWMX-ORA0-STAN-2025.jpg' },
  { id: 35, imageId: 'GWMX-TANK-HI4Z-2025', marca: 'Gwm', modelo: 'Tank 700', anio: 2025, precio: 89990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Gwm Chile', notas: '', img: 'GWMX-TANK-HI4Z-2025.png' },
  { id: 36, imageId: 'HYUN-INST-STAN-2026', marca: 'Hyundai', modelo: 'Inster', anio: 2026, precio: 22990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Hyundai Chile', notas: '', img: 'HYUN-INST-STAN-2026.jpg' },
  { id: 37, imageId: 'HYUN-IONI-AWDL-2025', marca: 'Hyundai', modelo: 'Ioniq 5', anio: 2025, precio: 52990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Hyundai Chile', notas: '', img: 'HYUN-IONI-AWDL-2025.jpg' },
  { id: 38, imageId: 'HYUN-IONI-NPER-2025', marca: 'Hyundai', modelo: 'Ioniq 5 n', anio: 2025, precio: 74990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Hyundai Chile', notas: '', img: 'HYUN-IONI-NPER-2025.jpg' },
  { id: 39, imageId: 'HYUN-IONI-AWDL-2025-01', marca: 'Hyundai', modelo: 'Ioniq 6', anio: 2025, precio: 52990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Hyundai Chile', notas: '', img: 'HYUN-IONI-AWDL-2025-01.jpg' },
  { id: 40, imageId: 'HYUN-KONA-STAN-2025', marca: 'Hyundai', modelo: 'Kona ev', anio: 2025, precio: 36990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Hyundai Chile', notas: '', img: 'HYUN-KONA-STAN-2025.jpg' },
  { id: 41, imageId: 'JACX-JS4E-STAN-2025', marca: 'Jac', modelo: 'Js4 ev', anio: 2025, precio: 24990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Jac Chile', notas: '', img: 'JACX-JS4E-STAN-2025.jpg' },
  { id: 42, imageId: 'JAGU-IPAC-HSEX-2025', marca: 'Jaguar', modelo: 'I-pace', anio: 2025, precio: 94990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Jaguar Chile', notas: '', img: 'JAGU-IPAC-HSEX-2025.jpg' },
  { id: 43, imageId: 'JEEP-AVEN-STAN-2025', marca: 'Jeep', modelo: 'Avenger', anio: 2025, precio: 29990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Jeep Chile', notas: '', img: 'JEEP-AVEN-STAN-2025.jpg' },
  { id: 44, imageId: 'JETO-DASH-STAN-2025', marca: 'Jetour', modelo: 'Dashing ev', anio: 2025, precio: 24990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Jetour Chile', notas: '', img: 'JETO-DASH-STAN-2025.webp' },
  { id: 45, imageId: 'KIAX-EV3X-LONG-2025', marca: 'Kia', modelo: 'Ev3', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Kia Chile', notas: '', img: 'KIAX-EV3X-LONG-2025.jpg' },
  { id: 46, imageId: 'KIAX-EV6X-LONG-2025', marca: 'Kia', modelo: 'Ev6', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Kia Chile', notas: '', img: 'KIAX-EV6X-LONG-2025.jpg' },
  { id: 47, imageId: 'KIAX-EV9X-LONG-2025', marca: 'Kia', modelo: 'Ev9', anio: 2025, precio: 99990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Kia Chile', notas: '', img: 'KIAX-EV9X-LONG-2025.jpg' },
  { id: 48, imageId: 'LEAP-C10X-STAN-2025', marca: 'Leapmotor', modelo: 'C10', anio: 2025, precio: 29990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Leapmotor Chile', notas: '', img: 'LEAP-C10X-STAN-2025.jpg' },
  { id: 49, imageId: 'LEXU-RZ45-STAN-2025', marca: 'Lexus', modelo: 'Rz450e', anio: 2025, precio: 89990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Lexus Chile', notas: '', img: 'LEXU-RZ45-STAN-2025.jpg' },
  { id: 50, imageId: 'LIAU-L6XX-REEV-2025', marca: 'Li auto', modelo: 'L6', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Li auto Chile', notas: '', img: 'LIAU-L6XX-REEV-2025.jpg' },
  { id: 51, imageId: 'LIVA-7XXX-STAN-2025', marca: 'Livan', modelo: '7', anio: 2025, precio: 19990000, autonomia: 300, kwh100: 17.0, bateria: 51.0, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Livan Chile', notas: '', img: 'LIVA-7XXX-STAN-2025.jpg' },
  { id: 52, imageId: 'LOTU-ELET-STAN-2025', marca: 'Lotus', modelo: 'Eletre', anio: 2025, precio: 169990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Lotus Chile', notas: '', img: 'LOTU-ELET-STAN-2025.jpg' },
  { id: 53, imageId: 'LUCI-AIRX-PURE-2025', marca: 'Lucid', modelo: 'Air', anio: 2025, precio: 149990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Lucid Chile', notas: '', img: 'LUCI-AIRX-PURE-2025.jpg' },
  { id: 54, imageId: 'LYNK-ZERO-STAN-2025', marca: 'Lynk & co', modelo: 'Zero', anio: 2025, precio: 39990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Lynk & co Chile', notas: '', img: 'LYNK-ZERO-STAN-2025.jpg' },
  { id: 55, imageId: 'MAXU-MIFA-STAN-2025', marca: 'Maxus', modelo: 'Mifa 6', anio: 2025, precio: 52990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Maxus Chile', notas: '', img: 'MAXU-MIFA-STAN-2025.jpg' },
  { id: 56, imageId: 'MAXU-MIFA-STAN-2025-01', marca: 'Maxus', modelo: 'Mifa 9', anio: 2025, precio: 64990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Maxus Chile', notas: '', img: 'MAXU-MIFA-STAN-2025-01.jpg' },
  { id: 57, imageId: 'MAZD-MX30-STAN-2025', marca: 'Mazda', modelo: 'Mx-30', anio: 2025, precio: 24990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mazda Chile', notas: '', img: 'MAZD-MX30-STAN-2025.jpg' },
  { id: 58, imageId: 'MERC-EQAX-250X-2025', marca: 'Mercedes-benz', modelo: 'Eqa', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQAX-250X-2025.jpg' },
  { id: 59, imageId: 'MERC-EQBX-250X-2025', marca: 'Mercedes-benz', modelo: 'Eqb', anio: 2025, precio: 64990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQBX-250X-2025.png' },
  { id: 60, imageId: 'MERC-EQCX-4004-2025', marca: 'Mercedes-benz', modelo: 'Eqc', anio: 2025, precio: 79990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQCX-4004-2025.jpg' },
  { id: 61, imageId: 'MERC-EQEX-350X-2025', marca: 'Mercedes-benz', modelo: 'Eqe', anio: 2025, precio: 89990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQEX-350X-2025.jpg' },
  { id: 62, imageId: 'MERC-EQES-350X-2025', marca: 'Mercedes-benz', modelo: 'Eqe suv', anio: 2025, precio: 99990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQES-350X-2025.jpg' },
  { id: 63, imageId: 'MERC-EQSX-450X-2025', marca: 'Mercedes-benz', modelo: 'Eqs', anio: 2025, precio: 149990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQSX-450X-2025.png' },
  { id: 64, imageId: 'MERC-EQSS-450X-2025', marca: 'Mercedes-benz', modelo: 'Eqs suv', anio: 2025, precio: 159990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mercedes-benz Chile', notas: '', img: 'MERC-EQSS-450X-2025.jpg' },
  { id: 65, imageId: 'MGXX-25EV-LONG-2025', marca: 'Mg', modelo: '25 ev', anio: 2025, precio: 29990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mg Chile', notas: '', img: 'MGXX-25EV-LONG-2025.jpg' },
  { id: 66, imageId: 'MGXX-4XXX-STAN-2025', marca: 'Mg', modelo: '4', anio: 2025, precio: 24990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Mg Chile', notas: '', img: 'MGXX-4XXX-STAN-2025.jpg' },
  { id: 67, imageId: 'MGXX-5XXX-STAN-2025', marca: 'Mg', modelo: '5', anio: 2025, precio: 22990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Mg Chile', notas: '', img: 'MGXX-5XXX-STAN-2025.jpg' },
  { id: 68, imageId: 'MGXX-CYBE-AWDX-2025', marca: 'Mg', modelo: 'Cyberster', anio: 2025, precio: 59990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Mg Chile', notas: '', img: 'MGXX-CYBE-AWDX-2025.jpg' },
  { id: 69, imageId: 'MGXX-MARV-STAN-2025', marca: 'Mg', modelo: 'Marvel r', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mg Chile', notas: '', img: 'MGXX-MARV-STAN-2025.jpg' },
  { id: 70, imageId: 'MGXX-ZSEV-STAN-2025', marca: 'Mg', modelo: 'Zs ev', anio: 2025, precio: 21990000, autonomia: 360, kwh100: 17.0, bateria: 61.2, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mg Chile', notas: '', img: 'MGXX-ZSEV-STAN-2025.jpg' },
  { id: 71, imageId: 'MINI-ACEM-STAN-2025', marca: 'Mini', modelo: 'Aceman se', anio: 2025, precio: 47990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mini Chile', notas: '', img: 'MINI-ACEM-STAN-2025.jpg' },
  { id: 72, imageId: 'MINI-COOP-STAN-2025', marca: 'Mini', modelo: 'Cooper se', anio: 2025, precio: 34990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Mini Chile', notas: '', img: 'MINI-COOP-STAN-2025.jpg' },
  { id: 73, imageId: 'MITS-ECLI-PHEV-2025', marca: 'Mitsubishi', modelo: 'Eclipse cross', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Mitsubishi Chile', notas: '', img: 'MITS-ECLI-PHEV-2025.jpg' },
  { id: 74, imageId: 'NETA-VPRO-STAN-2025', marca: 'Neta', modelo: 'V pro', anio: 2025, precio: 19990000, autonomia: 330, kwh100: 14.5, bateria: 47.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Neta Chile', notas: '', img: 'NETA-VPRO-STAN-2025.jpg' },
  { id: 75, imageId: 'NISS-ARIY-FWDX-2025', marca: 'Nissan', modelo: 'Ariya', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Nissan Chile', notas: '', img: 'NISS-ARIY-FWDX-2025.webp' },
  { id: 76, imageId: 'NISS-LEAF-STAN-2025', marca: 'Nissan', modelo: 'Leaf', anio: 2025, precio: 24990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Nissan Chile', notas: '', img: 'NISS-LEAF-STAN-2025.jpg' },
  { id: 77, imageId: 'PEUG-E200-STAN-2025', marca: 'Peugeot', modelo: 'E-2008', anio: 2025, precio: 27990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Peugeot Chile', notas: '', img: 'PEUG-E200-STAN-2025.jpg' },
  { id: 78, imageId: 'PEUG-E208-STAN-2025', marca: 'Peugeot', modelo: 'E-208', anio: 2025, precio: 22990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Peugeot Chile', notas: '', img: 'PEUG-E208-STAN-2025.jpg' },
  { id: 79, imageId: 'PEUG-E300-STAN-2025', marca: 'Peugeot', modelo: 'E-3008', anio: 2025, precio: 44990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Peugeot Chile', notas: '', img: 'PEUG-E300-STAN-2025.jpg' },
  { id: 80, imageId: 'PEUG-E308-STAN-2025', marca: 'Peugeot', modelo: 'E-308', anio: 2025, precio: 34990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Peugeot Chile', notas: '', img: 'PEUG-E308-STAN-2025.jpg' },
  { id: 81, imageId: 'PEUG-E408-STAN-2025', marca: 'Peugeot', modelo: 'E-408', anio: 2025, precio: 39990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Peugeot Chile', notas: '', img: 'PEUG-E408-STAN-2025.jpg' },
  { id: 82, imageId: 'POLE-2XXX-STAN-2025', marca: 'Polestar', modelo: '2', anio: 2025, precio: 54990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Polestar Chile', notas: '', img: 'POLE-2XXX-STAN-2025.jpg' },
  { id: 83, imageId: 'POLE-3XXX-STAN-2025', marca: 'Polestar', modelo: '3', anio: 2025, precio: 74990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Polestar Chile', notas: '', img: 'POLE-3XXX-STAN-2025.jpg' },
  { id: 84, imageId: 'PORS-MACA-STAN-2025', marca: 'Porsche', modelo: 'Macan electric', anio: 2025, precio: 109990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Porsche Chile', notas: '', img: 'PORS-MACA-STAN-2025.jpg' },
  { id: 85, imageId: 'PORS-TAYC-CROS-2025', marca: 'Porsche', modelo: 'Taycan', anio: 2025, precio: 129990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Porsche Chile', notas: '', img: 'PORS-TAYC-CROS-2025.jpg' },
  { id: 86, imageId: 'RENA-5ETE-STAN-2025', marca: 'Renault', modelo: '5 e-tech', anio: 2025, precio: 22990000, autonomia: 380, kwh100: 14.5, bateria: 55.1, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Renault Chile', notas: '', img: 'RENA-5ETE-STAN-2025.jpg' },
  { id: 87, imageId: 'RENA-KWID-STAN-2025', marca: 'Renault', modelo: 'Kwid e-tech', anio: 2025, precio: 12990000, autonomia: 250, kwh100: 14.5, bateria: 36.2, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Renault Chile', notas: '', img: 'RENA-KWID-STAN-2025.png' },
  { id: 88, imageId: 'RENA-MEGA-STAN-2025', marca: 'Renault', modelo: 'Megane e-tech', anio: 2025, precio: 29990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Renault Chile', notas: '', img: 'RENA-MEGA-STAN-2025.jpg' },
  { id: 89, imageId: 'RENA-SCEN-STAN-2025', marca: 'Renault', modelo: 'Scenic e-tech', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Renault Chile', notas: '', img: 'RENA-SCEN-STAN-2025.jpg' },
  { id: 90, imageId: 'SMAR-1XXX-STAN-2025', marca: 'Smart', modelo: '#1', anio: 2025, precio: 37990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Smart Chile', notas: '', img: 'SMAR-1XXX-STAN-2025.jpg' },
  { id: 91, imageId: 'SMAR-3XXX-STAN-2025', marca: 'Smart', modelo: '#3', anio: 2025, precio: 42990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Smart Chile', notas: '', img: 'SMAR-3XXX-STAN-2025.jpg' },
  { id: 92, imageId: 'SUBA-SOLT-STAN-2025', marca: 'Subaru', modelo: 'Solterra', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Subaru Chile', notas: '', img: 'SUBA-SOLT-STAN-2025.jpg' },
  { id: 93, imageId: 'TESL-CYBE-STAN-2025', marca: 'Tesla', modelo: 'Cybertruck', anio: 2025, precio: 169990000, autonomia: 500, kwh100: 22.0, bateria: 110.0, tipo: 'Pickup', seg: 'pickup', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['mixto', 'carretera'], disponibleChile: true, concesionario: 'Tesla Chile', notas: '', img: 'TESL-CYBE-STAN-2025.jpg' },
  { id: 94, imageId: 'TESL-MODE-LONG-2025', marca: 'Tesla', modelo: 'Model 3', anio: 2025, precio: 54990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Tesla Chile', notas: '', img: 'TESL-MODE-LONG-2025.png' },
  { id: 95, imageId: 'TESL-MODE-PLAI-2025', marca: 'Tesla', modelo: 'Model s', anio: 2025, precio: 134990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Tesla Chile', notas: '', img: 'TESL-MODE-PLAI-2025.jpg' },
  { id: 96, imageId: 'TESL-MODE-LONG-2025-03', marca: 'Tesla', modelo: 'Model x', anio: 2025, precio: 129990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Tesla Chile', notas: '', img: 'TESL-MODE-LONG-2025-03.jpg' },
  { id: 97, imageId: 'TESL-MODE-LONG-2025-01', marca: 'Tesla', modelo: 'Model y', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Tesla Chile', notas: '', img: 'TESL-MODE-LONG-2025-01.jpg' },
  { id: 98, imageId: 'TOYO-BZ4X-AWDX-2025', marca: 'Toyota', modelo: 'Bz4x', anio: 2025, precio: 49990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Toyota Chile', notas: '', img: 'TOYO-BZ4X-AWDX-2025.jpg' },
  { id: 99, imageId: 'VOLK-IDBU-STAN-2025', marca: 'Volkswagen', modelo: 'Id. buzz', anio: 2025, precio: 59990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Volkswagen Chile', notas: '', img: 'VOLK-IDBU-STAN-2025.png' },
  { id: 100, imageId: 'VOLK-ID3X-STAN-2025', marca: 'Volkswagen', modelo: 'Id.3', anio: 2025, precio: 29990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Volkswagen Chile', notas: '', img: 'VOLK-ID3X-STAN-2025.jpg' },
  { id: 101, imageId: 'VOLK-ID4X-GTXA-2025', marca: 'Volkswagen', modelo: 'Id.4', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Volkswagen Chile', notas: '', img: 'VOLK-ID4X-GTXA-2025.png' },
  { id: 102, imageId: 'VOLK-ID7X-STAN-2025', marca: 'Volkswagen', modelo: 'Id.7', anio: 2025, precio: 64990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Volkswagen Chile', notas: '', img: 'VOLK-ID7X-STAN-2025.jpg' },
  { id: 103, imageId: 'VOLV-C40R-STAN-2025', marca: 'Volvo', modelo: 'C40 recharge', anio: 2025, precio: 64990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Volvo Chile', notas: '', img: 'VOLV-C40R-STAN-2025.jpg' },
  { id: 104, imageId: 'VOLV-EX30-EXTE-2025', marca: 'Volvo', modelo: 'Ex30', anio: 2025, precio: 34990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Volvo Chile', notas: '', img: 'VOLV-EX30-EXTE-2025.jpg' },
  { id: 105, imageId: 'VOLV-EX40-STAN-2025', marca: 'Volvo', modelo: 'Ex40', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Volvo Chile', notas: '', img: 'VOLV-EX40-STAN-2025.jpg' },
  { id: 106, imageId: 'VOLV-EX90-STAN-2025', marca: 'Volvo', modelo: 'Ex90', anio: 2025, precio: 109990000, autonomia: 620, kwh100: 17.0, bateria: 105.4, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Volvo Chile', notas: '', img: 'VOLV-EX90-STAN-2025.jpg' },
  { id: 107, imageId: 'WULI-BING-STAN-2025', marca: 'Wuling', modelo: 'Bingo', anio: 2025, precio: 17990000, autonomia: 290, kwh100: 14.5, bateria: 42.0, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Wuling Chile', notas: '', img: 'WULI-BING-STAN-2025.jpg' },
  { id: 108, imageId: 'XPEN-G6XX-STAN-2025', marca: 'Xpeng', modelo: 'G6', anio: 2025, precio: 39990000, autonomia: 490, kwh100: 17.0, bateria: 83.3, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Xpeng Chile', notas: '', img: 'XPEN-G6XX-STAN-2025.jpg' },
  { id: 109, imageId: 'XPEN-G9XX-STAN-2025', marca: 'Xpeng', modelo: 'G9', anio: 2025, precio: 54990000, autonomia: 550, kwh100: 17.0, bateria: 93.5, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Xpeng Chile', notas: '', img: 'XPEN-G9XX-STAN-2025.jpg' },
  { id: 110, imageId: 'ZEEK-001X-STAN-2025', marca: 'Zeekr', modelo: '001', anio: 2025, precio: 54990000, autonomia: 420, kwh100: 14.5, bateria: 60.9, tipo: 'Hatchback', seg: 'city_sedan', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto'], disponibleChile: true, concesionario: 'Zeekr Chile', notas: '', img: 'ZEEK-001X-STAN-2025.jpg' },
  { id: 111, imageId: 'ZEEK-XXXX-STAN-2025', marca: 'Zeekr', modelo: 'X', anio: 2025, precio: 29990000, autonomia: 430, kwh100: 17.0, bateria: 73.1, tipo: 'SUV', seg: 'suv', plazas: 5, cargaAC: 11, cargaDC: 80, tiempoCarga3080min: 40, maletero: 400, uso: ['urbano', 'mixto', 'carretera'], disponibleChile: true, concesionario: 'Zeekr Chile', notas: '', img: 'ZEEK-XXXX-STAN-2025.jpg' },
];

// Combustion fleet — Chile 2025/2026
export const GAS_DB: GasVehicle[] = [
  { id: 'ALFA-GIUL-20TV-2025', marca: 'alfa romeo', modelo: 'giulia', tipo: 'GASOLINA', seg: 'city_sedan', precio: 59990000, consumo: 9.0, img: 'ALFA-GIUL-20TV-2025.jpg' },
  { id: 'ALFA-STEL-20TV-2025', marca: 'alfa romeo', modelo: 'stelvio', tipo: 'GASOLINA', seg: 'suv', precio: 65990000, consumo: 11.0, img: 'ALFA-STEL-20TV-2025.jpg' },
  { id: 'AUDI-A4XX-35TD-2025', marca: 'audi', modelo: 'a4', tipo: 'DIESEL', seg: 'city_sedan', precio: 51990000, consumo: 7.5, img: 'AUDI-A4XX-35TD-2025.jpg' },
  { id: 'AUDI-A4XX-40TF-2025', marca: 'audi', modelo: 'a4', tipo: 'GASOLINA', seg: 'city_sedan', precio: 48990000, consumo: 9.0, img: 'AUDI-A4XX-40TF-2025.jpg' },
  { id: 'AUDI-Q2XX-35TF-2025', marca: 'audi', modelo: 'q2', tipo: 'GASOLINA', seg: 'suv', precio: 34990000, consumo: 10.0, img: 'AUDI-Q2XX-35TF-2025.jpg' },
  { id: 'AUDI-Q3XX-35TD-2025', marca: 'audi', modelo: 'q3', tipo: 'DIESEL', seg: 'suv', precio: 46990000, consumo: 8.0, img: 'AUDI-Q3XX-35TD-2025.jpg' },
  { id: 'AUDI-Q3XX-35TF-2025', marca: 'audi', modelo: 'q3', tipo: 'GASOLINA', seg: 'suv', precio: 42990000, consumo: 10.0, img: 'AUDI-Q3XX-35TF-2025.jpg' },
  { id: 'AUDI-Q3SP-35TF-2025', marca: 'audi', modelo: 'q3 sportback', tipo: 'GASOLINA', seg: 'suv', precio: 45990000, consumo: 11.5, img: 'AUDI-Q3SP-35TF-2025.jpg' },
  { id: 'AUDI-Q5XX-40TD-2025', marca: 'audi', modelo: 'q5', tipo: 'DIESEL', seg: 'suv', precio: 59990000, consumo: 9.0, img: 'AUDI-Q5XX-40TD-2025.jpg' },
  { id: 'AUDI-Q5XX-40TF-2025', marca: 'audi', modelo: 'q5', tipo: 'GASOLINA', seg: 'suv', precio: 56700000, consumo: 11.0, img: 'AUDI-Q5XX-40TF-2025.jpg' },
  { id: 'AUDI-Q7XX-45TF-2025', marca: 'audi', modelo: 'q7', tipo: 'GASOLINA', seg: 'suv', precio: 84990000, consumo: 12.0, img: 'AUDI-Q7XX-45TF-2025.jpg' },
  { id: 'BAIC-X35X-15TL-2025', marca: 'baic', modelo: 'x35', tipo: 'GASOLINA', seg: 'suv', precio: 18990000, consumo: 10.0, img: 'BAIC-X35X-15TL-2025.jpg' },
  { id: 'BAIC-X55X-15TC-2025', marca: 'baic', modelo: 'x55', tipo: 'GASOLINA', seg: 'suv', precio: 20990000, consumo: 11.0, img: 'BAIC-X55X-15TC-2025.jpg' },
  { id: 'BMWX-SERI-118I-2025', marca: 'bmw', modelo: 'serie 1', tipo: 'GASOLINA', seg: 'city_sedan', precio: 30990000, consumo: 8.5, img: 'BMWX-SERI-118I-2025.jpg' },
  { id: 'BMWX-SERI-330I-2025', marca: 'bmw', modelo: 'serie 3', tipo: 'GASOLINA', seg: 'city_sedan', precio: 52990000, consumo: 9.0, img: 'BMWX-SERI-330I-2025.jpg' },
  { id: 'BMWX-X1XX-SDRI-2025-01', marca: 'bmw', modelo: 'x1', tipo: 'GASOLINA', seg: 'suv', precio: 42990000, consumo: 10.0, img: 'BMWX-X1XX-SDRI-2025-01.jpg' },
  { id: 'BMWX-X3XX-M40I-2025', marca: 'bmw', modelo: 'x3', tipo: 'GASOLINA', seg: 'suv', precio: 72990000, consumo: 11.0, img: 'BMWX-X3XX-M40I-2025.jpg' },
  { id: 'BMWX-X5XX-XDRI-2025', marca: 'bmw', modelo: 'x5', tipo: 'GASOLINA', seg: 'suv', precio: 84990000, consumo: 12.0, img: 'BMWX-X5XX-XDRI-2025.jpg' },
  { id: 'BMWX-X5XX-XDRI-2025-01', marca: 'bmw', modelo: 'x5', tipo: 'GASOLINA', seg: 'suv', precio: 94990000, consumo: 12.0, img: 'BMWX-X5XX-XDRI-2025-01.jpg' },
  { id: 'CHAN-ALSV-14LU-2025', marca: 'changan', modelo: 'alsvin', tipo: 'GASOLINA', seg: 'city_sedan', precio: 13990000, consumo: 9.0, img: 'CHAN-ALSV-14LU-2025.jpg' },
  { id: 'CHAN-CS35-14TC-2025', marca: 'changan', modelo: 'cs35 plus', tipo: 'GASOLINA', seg: 'suv', precio: 19990000, consumo: 10.0, img: 'CHAN-CS35-14TC-2025.jpg' },
  { id: 'CHAN-CS55-15TL-2025', marca: 'changan', modelo: 'cs55 plus', tipo: 'GASOLINA', seg: 'suv', precio: 27490000, consumo: 11.0, img: 'CHAN-CS55-15TL-2025.jpg' },
  { id: 'CHAN-CS75-15TC-2025', marca: 'changan', modelo: 'cs75 plus', tipo: 'GASOLINA', seg: 'suv', precio: 28990000, consumo: 11.0, img: 'CHAN-CS75-15TC-2025.jpg' },
  { id: 'CHAN-HUNT-20TD-2025-01', marca: 'changan', modelo: 'hunter plus', tipo: 'DIESEL', seg: 'pickup', precio: 31990000, consumo: 11.5, img: 'CHAN-HUNT-20TD-2025-01.jpg' },
  { id: 'CHEV-CAPT-20TL-2025', marca: 'chevrolet', modelo: 'captiva', tipo: 'DIESEL', seg: 'suv', precio: 28990000, consumo: 9.0, img: 'CHEV-CAPT-20TL-2025.png' },
  { id: 'CHEV-EQUI-20TL-2025', marca: 'chevrolet', modelo: 'equinox', tipo: 'GASOLINA', seg: 'suv', precio: 36990000, consumo: 11.0, img: 'CHEV-EQUI-20TL-2025.jpg' },
  { id: 'CHEV-GROO-12TL-2025-01', marca: 'chevrolet', modelo: 'groove', tipo: 'GASOLINA', seg: 'suv', precio: 15490000, consumo: 10.0, img: 'CHEV-GROO-12TL-2025-01.png' },
  { id: 'CHEV-MONT-12TL-2025-01', marca: 'chevrolet', modelo: 'montana', tipo: 'GASOLINA', seg: 'pickup', precio: 19990000, consumo: 12.0, img: 'CHEV-MONT-12TL-2025-01.jpg' },
  { id: 'CHEV-ONIX-10TL-2025-01', marca: 'chevrolet', modelo: 'onix', tipo: 'GASOLINA', seg: 'city_sedan', precio: 13490000, consumo: 8.5, img: 'CHEV-ONIX-10TL-2025-01.jpg' },
  { id: 'CHEV-SILV-53LT-2025', marca: 'chevrolet', modelo: 'silverado', tipo: 'GASOLINA', seg: 'pickup', precio: 69990000, consumo: 12.0, img: 'CHEV-SILV-53LT-2025.jpg' },
  { id: 'CHEV-TRAC-10TL-2025-01', marca: 'chevrolet', modelo: 'tracker', tipo: 'GASOLINA', seg: 'suv', precio: 21990000, consumo: 10.0, img: 'CHEV-TRAC-10TL-2025-01.png' },
  { id: 'CHEV-TRAI-25LT-2025-01', marca: 'chevrolet', modelo: 'trailblazer', tipo: 'DIESEL', seg: 'suv', precio: 46990000, consumo: 9.0, img: 'CHEV-TRAI-25LT-2025-01.jpg' },
  { id: 'CITR-BERL-15BL-2025', marca: 'citroën', modelo: 'berlingo', tipo: 'DIESEL', seg: 'suv', precio: 22990000, consumo: 9.0, img: 'CITR-BERL-15BL-2025.jpg' },
  { id: 'CITR-C3XX-12PU-2025-01', marca: 'citroën', modelo: 'c3', tipo: 'GASOLINA', seg: 'city_sedan', precio: 19490000, consumo: 8.5, img: 'CITR-C3XX-12PU-2025-01.jpg' },
  { id: 'CITR-C3AI-12PU-2025-01', marca: 'citroën', modelo: 'c3 aircross', tipo: 'GASOLINA', seg: 'suv', precio: 23990000, consumo: 10.0, img: 'CITR-C3AI-12PU-2025-01.jpg' },
  { id: 'CITR-C5AI-15BL-2025', marca: 'citroën', modelo: 'c5 aircross', tipo: 'DIESEL', seg: 'suv', precio: 36990000, consumo: 9.0, img: 'CITR-C5AI-15BL-2025.jpg' },
  { id: 'CITR-C5AI-16TH-2025', marca: 'citroën', modelo: 'c5 aircross', tipo: 'GASOLINA', seg: 'suv', precio: 32990000, consumo: 11.0, img: 'CITR-C5AI-16TH-2025.jpg' },
  { id: 'DFSK-GLOR-15TL-2025', marca: 'dfsk', modelo: 'glory 580', tipo: 'GASOLINA', seg: 'suv', precio: 22490000, consumo: 12.0, img: 'DFSK-GLOR-15TL-2025.jpg' },
  { id: 'DSXX-DS4X-15BL-2025', marca: 'ds', modelo: 'ds4', tipo: 'DIESEL', seg: 'city_sedan', precio: 33390000, consumo: 7.0, img: 'DSXX-DS4X-15BL-2025.jpg' },
  { id: 'DSXX-DS4X-16TH-2025', marca: 'ds', modelo: 'ds4', tipo: 'GASOLINA', seg: 'city_sedan', precio: 37990000, consumo: 8.5, img: 'DSXX-DS4X-16TH-2025.jpg' },
  { id: 'DSXX-DS7X-15BL-2025', marca: 'ds', modelo: 'ds7', tipo: 'DIESEL', seg: 'suv', precio: 44990000, consumo: 9.0, img: 'DSXX-DS7X-15BL-2025.jpg' },
  { id: 'DSXX-DS7X-16TH-2025', marca: 'ds', modelo: 'ds7', tipo: 'GASOLINA', seg: 'suv', precio: 48990000, consumo: 11.0, img: 'DSXX-DS7X-16TH-2025.jpg' },
  { id: 'FIAT-CRON-13PR-2025', marca: 'fiat', modelo: 'cronos', tipo: 'GASOLINA', seg: 'city_sedan', precio: 17990000, consumo: 9.0, img: 'FIAT-CRON-13PR-2025.jpg' },
  { id: 'FIAT-FAST-13TI-2025', marca: 'fiat', modelo: 'fastback', tipo: 'GASOLINA', seg: 'city_sedan', precio: 26990000, consumo: 9.5, img: 'FIAT-FAST-13TI-2025.jpg' },
  { id: 'FIAT-PULS-10TI-2025', marca: 'fiat', modelo: 'pulse', tipo: 'GASOLINA', seg: 'suv', precio: 21990000, consumo: 10.0, img: 'FIAT-PULS-10TI-2025.jpg' },
  { id: 'FIAT-TORO-20TV-2025', marca: 'fiat', modelo: 'toro', tipo: 'DIESEL', seg: 'pickup', precio: 36990000, consumo: 11.5, img: 'FIAT-TORO-20TV-2025.jpg' },
  { id: 'FORD-BRON-20TB-2025-01', marca: 'ford', modelo: 'bronco sport', tipo: 'GASOLINA', seg: 'suv', precio: 44990000, consumo: 11.0, img: 'FORD-BRON-20TB-2025-01.jpg' },
  { id: 'FORD-ESCA-20TS-2025-01', marca: 'ford', modelo: 'escape', tipo: 'GASOLINA', seg: 'suv', precio: 37990000, consumo: 11.0, img: 'FORD-ESCA-20TS-2025-01.jpg' },
  { id: 'FORD-EXPL-30ST-2025', marca: 'ford', modelo: 'explorer', tipo: 'GASOLINA', seg: 'suv', precio: 74990000, consumo: 12.0, img: 'FORD-EXPL-30ST-2025.jpg' },
  { id: 'FORD-MUST-50GT-2025-01', marca: 'ford', modelo: 'mustang', tipo: 'GASOLINA', seg: 'city_sedan', precio: 63990000, consumo: 11.0, img: 'FORD-MUST-50GT-2025-01.jpg' },
  { id: 'FORD-RANG-20XL-2025-02', marca: 'ford', modelo: 'ranger', tipo: 'DIESEL', seg: 'pickup', precio: 32990000, consumo: 11.5, img: 'FORD-RANG-20XL-2025-02.jpg' },
  { id: 'FORD-TERR-15TT-2025-01', marca: 'ford', modelo: 'territory', tipo: 'GASOLINA', seg: 'suv', precio: 25990000, consumo: 11.0, img: 'FORD-TERR-15TT-2025-01.jpg' },
  { id: 'GEEL-COOL-15TL-2025', marca: 'geely', modelo: 'coolray', tipo: 'GASOLINA', seg: 'suv', precio: 20990000, consumo: 10.0, img: 'GEEL-COOL-15TL-2025.jpg' },
  { id: 'GEEL-EMGR-15LU-2025', marca: 'geely', modelo: 'emgrand', tipo: 'GASOLINA', seg: 'city_sedan', precio: 15990000, consumo: 9.0, img: 'GEEL-EMGR-15LU-2025.jpg' },
  { id: 'GEEL-OKAV-20TL-2025', marca: 'geely', modelo: 'okavango', tipo: 'GASOLINA', seg: 'suv', precio: 30990000, consumo: 12.0, img: 'GEEL-OKAV-20TL-2025.jpg' },
  { id: 'GWMX-POER-20TL-2025', marca: 'gwm', modelo: 'poer', tipo: 'DIESEL', seg: 'pickup', precio: 31990000, consumo: 11.5, img: 'GWMX-POER-20TL-2025.png' },
  { id: 'HAVA-H2XX-15TL-2025', marca: 'haval', modelo: 'h2', tipo: 'GASOLINA', seg: 'suv', precio: 23490000, consumo: 10.0, img: 'HAVA-H2XX-15TL-2025.jpg' },
  { id: 'HAVA-H6XX-15TH-2025-01', marca: 'haval', modelo: 'h6', tipo: 'GASOLINA', seg: 'suv', precio: 31990000, consumo: 11.0, img: 'HAVA-H6XX-15TH-2025-01.jpg' },
  { id: 'HAVA-JOLI-15TL-2025', marca: 'haval', modelo: 'jolion', tipo: 'GASOLINA', seg: 'suv', precio: 25990000, consumo: 10.0, img: 'HAVA-JOLI-15TL-2025.jpg' },
  { id: 'HOND-CITY-15EX-2025-01', marca: 'honda', modelo: 'city', tipo: 'GASOLINA', seg: 'city_sedan', precio: 21490000, consumo: 9.0, img: 'HOND-CITY-15EX-2025-01.jpg' },
  { id: 'HOND-CRVX-15TA-2025', marca: 'honda', modelo: 'cr-v', tipo: 'GASOLINA', seg: 'suv', precio: 34990000, consumo: 11.0, img: 'HOND-CRVX-15TA-2025.jpg' },
  { id: 'HOND-CRVX-20HE-2025', marca: 'honda', modelo: 'cr-v', tipo: 'GASOLINA', seg: 'suv', precio: 39990000, consumo: 11.0, img: 'HOND-CRVX-20HE-2025.jpg' },
  { id: 'HOND-HRVX-15TE-2025-01', marca: 'honda', modelo: 'hr-v', tipo: 'GASOLINA', seg: 'suv', precio: 30990000, consumo: 10.0, img: 'HOND-HRVX-15TE-2025-01.jpg' },
  { id: 'HOND-PILO-35V6-2025', marca: 'honda', modelo: 'pilot', tipo: 'GASOLINA', seg: 'suv', precio: 62990000, consumo: 12.0, img: 'HOND-PILO-35V6-2025.jpg' },
  { id: 'HOND-WRVX-15EX-2025', marca: 'honda', modelo: 'wr-v', tipo: 'GASOLINA', seg: 'suv', precio: 22490000, consumo: 10.0, img: 'HOND-WRVX-15EX-2025.jpg' },
  { id: 'HYUN-ACCE-14GL-2025-01', marca: 'hyundai', modelo: 'accent', tipo: 'GASOLINA', seg: 'city_sedan', precio: 15990000, consumo: 9.0, img: 'HYUN-ACCE-14GL-2025-01.jpg' },
  { id: 'HYUN-CRET-15GL-2025-01', marca: 'hyundai', modelo: 'creta', tipo: 'GASOLINA', seg: 'suv', precio: 20490000, consumo: 10.0, img: 'HYUN-CRET-15GL-2025-01.png' },
  { id: 'HYUN-ELAN-20GL-2025-01', marca: 'hyundai', modelo: 'elantra', tipo: 'GASOLINA', seg: 'city_sedan', precio: 22490000, consumo: 9.0, img: 'HYUN-ELAN-20GL-2025-01.jpg' },
  { id: 'HYUN-GRAN-10GL-2025-01', marca: 'hyundai', modelo: 'grand i10', tipo: 'GASOLINA', seg: 'city_sedan', precio: 11490000, consumo: 7.5, img: 'HYUN-GRAN-10GL-2025-01.jpg' },
  { id: 'HYUN-PALI-38GL-2025', marca: 'hyundai', modelo: 'palisade', tipo: 'GASOLINA', seg: 'suv', precio: 59990000, consumo: 12.0, img: 'HYUN-PALI-38GL-2025.jpg' },
  { id: 'HYUN-SANT-22GL-2025', marca: 'hyundai', modelo: 'santa fe', tipo: 'DIESEL', seg: 'suv', precio: 43990000, consumo: 9.0, img: 'HYUN-SANT-22GL-2025.jpg' },
  { id: 'HYUN-SANT-25GL-2025', marca: 'hyundai', modelo: 'santa fe', tipo: 'GASOLINA', seg: 'suv', precio: 38990000, consumo: 11.0, img: 'HYUN-SANT-25GL-2025.jpg' },
  { id: 'HYUN-STAR-22DI-2025', marca: 'hyundai', modelo: 'staria', tipo: 'DIESEL', seg: 'suv', precio: 55990000, consumo: 9.0, img: 'HYUN-STAR-22DI-2025.jpg' },
  { id: 'HYUN-TUCS-20GL-2025-02', marca: 'hyundai', modelo: 'tucson', tipo: 'DIESEL', seg: 'suv', precio: 29990000, consumo: 9.0, img: 'HYUN-TUCS-20GL-2025-02.jpg' },
  { id: 'HYUN-TUCS-20GL-2025-01', marca: 'hyundai', modelo: 'tucson', tipo: 'GASOLINA', seg: 'suv', precio: 27490000, consumo: 11.0, img: 'HYUN-TUCS-20GL-2025-01.jpg' },
  { id: 'ISUZ-DMAX-30LS-2025', marca: 'isuzu', modelo: 'd-max', tipo: 'DIESEL', seg: 'pickup', precio: 31990000, consumo: 11.5, img: 'ISUZ-DMAX-30LS-2025.jpg' },
  { id: 'ISUZ-MUXX-30LS-2025', marca: 'isuzu', modelo: 'mu-x', tipo: 'DIESEL', seg: 'suv', precio: 39990000, consumo: 10.0, img: 'ISUZ-MUXX-30LS-2025.jpg' },
  { id: 'JACX-T8PR-20TD-2025-01', marca: 'jac', modelo: 't8 pro', tipo: 'DIESEL', seg: 'pickup', precio: 27990000, consumo: 11.5, img: 'JACX-T8PR-20TD-2025-01.jpg' },
  { id: 'JEEP-CHER-20TL-2025-01', marca: 'jeep', modelo: 'cherokee', tipo: 'GASOLINA', seg: 'suv', precio: 47990000, consumo: 11.0, img: 'JEEP-CHER-20TL-2025-01.jpg' },
  { id: 'JEEP-COMP-13TL-2025', marca: 'jeep', modelo: 'compass', tipo: 'GASOLINA', seg: 'suv', precio: 33990000, consumo: 11.0, img: 'JEEP-COMP-13TL-2025.jpg' },
  { id: 'JEEP-GLAD-36V6-2025', marca: 'jeep', modelo: 'gladiator', tipo: 'GASOLINA', seg: 'pickup', precio: 72990000, consumo: 12.0, img: 'JEEP-GLAD-36V6-2025.jpg' },
  { id: 'JEEP-GRAN-20TL-2025-01', marca: 'jeep', modelo: 'grand cherokee', tipo: 'GASOLINA', seg: 'suv', precio: 69990000, consumo: 12.0, img: 'JEEP-GRAN-20TL-2025-01.jpg' },
  { id: 'JEEP-RENE-13TL-2025', marca: 'jeep', modelo: 'renegade', tipo: 'GASOLINA', seg: 'suv', precio: 25990000, consumo: 10.0, img: 'JEEP-RENE-13TL-2025.jpg' },
  { id: 'JEEP-WRAN-36V6-2025', marca: 'jeep', modelo: 'wrangler', tipo: 'GASOLINA', seg: 'suv', precio: 72990000, consumo: 11.0, img: 'JEEP-WRAN-36V6-2025.jpg' },
  { id: 'KIAX-CARN-22SX-2025', marca: 'kia', modelo: 'carnival', tipo: 'DIESEL', seg: 'suv', precio: 46990000, consumo: 9.0, img: 'KIAX-CARN-22SX-2025.jpg' },
  { id: 'KIAX-MORN-10EX-2025', marca: 'kia', modelo: 'morning', tipo: 'GASOLINA', seg: 'city_sedan', precio: 11490000, consumo: 7.5, img: 'KIAX-MORN-10EX-2025.jpg' },
  { id: 'KIAX-SOLU-14EX-2025', marca: 'kia', modelo: 'soluto', tipo: 'GASOLINA', seg: 'city_sedan', precio: 12490000, consumo: 9.0, img: 'KIAX-SOLU-14EX-2025.jpg' },
  { id: 'KIAX-SONE-15EX-2025', marca: 'kia', modelo: 'sonet', tipo: 'GASOLINA', seg: 'suv', precio: 16990000, consumo: 10.0, img: 'KIAX-SONE-15EX-2025.png' },
  { id: 'KIAX-SORE-22SX-2025', marca: 'kia', modelo: 'sorento', tipo: 'DIESEL', seg: 'suv', precio: 42990000, consumo: 9.0, img: 'KIAX-SORE-22SX-2025.jpg' },
  { id: 'KIAX-SPOR-20SX-2025', marca: 'kia', modelo: 'sportage', tipo: 'DIESEL', seg: 'suv', precio: 33490000, consumo: 9.0, img: 'KIAX-SPOR-20SX-2025.jpg' },
  { id: 'KIAX-SPOR-20EX-2025', marca: 'kia', modelo: 'sportage', tipo: 'GASOLINA', seg: 'suv', precio: 29990000, consumo: 11.0, img: 'KIAX-SPOR-20EX-2025.jpg' },
  { id: 'KIAX-STON-14EX-2025', marca: 'kia', modelo: 'stonic', tipo: 'GASOLINA', seg: 'suv', precio: 17490000, consumo: 10.0, img: 'KIAX-STON-14EX-2025.jpg' },
  { id: 'KIAX-TELL-38SX-2025', marca: 'kia', modelo: 'telluride', tipo: 'GASOLINA', seg: 'suv', precio: 62990000, consumo: 12.0, img: 'KIAX-TELL-38SX-2025.jpg' },
  { id: 'LAND-DEFE-30D1-2025', marca: 'land rover', modelo: 'defender', tipo: 'DIESEL', seg: 'suv', precio: 99990000, consumo: 10.0, img: 'LAND-DEFE-30D1-2025.jpg' },
  { id: 'LAND-DISC-30DM-2025', marca: 'land rover', modelo: 'discovery', tipo: 'DIESEL', seg: 'suv', precio: 95990000, consumo: 10.0, img: 'LAND-DISC-30DM-2025.jpg' },
  { id: 'LAND-RANG-30DS-2025', marca: 'land rover', modelo: 'range rover', tipo: 'DIESEL', seg: 'suv', precio: 112990000, consumo: 10.0, img: 'LAND-RANG-30DS-2025.jpg' },
  { id: 'MAZD-BT50-32XT-2025', marca: 'mazda', modelo: 'bt-50', tipo: 'DIESEL', seg: 'pickup', precio: 36990000, consumo: 11.5, img: 'MAZD-BT50-32XT-2025.jpg' },
  { id: 'MAZD-CX3X-20TO-2025', marca: 'mazda', modelo: 'cx-3', tipo: 'GASOLINA', seg: 'suv', precio: 21990000, consumo: 10.0, img: 'MAZD-CX3X-20TO-2025.jpg' },
  { id: 'MAZD-CX30-20TO-2025', marca: 'mazda', modelo: 'cx-30', tipo: 'GASOLINA', seg: 'suv', precio: 27990000, consumo: 10.0, img: 'MAZD-CX30-20TO-2025.jpg' },
  { id: 'MAZD-CX5X-22DT-2025', marca: 'mazda', modelo: 'cx-5', tipo: 'DIESEL', seg: 'suv', precio: 34990000, consumo: 9.0, img: 'MAZD-CX5X-22DT-2025.jpg' },
  { id: 'MAZD-CX5X-25TO-2025', marca: 'mazda', modelo: 'cx-5', tipo: 'GASOLINA', seg: 'suv', precio: 31990000, consumo: 11.0, img: 'MAZD-CX5X-25TO-2025.jpg' },
  { id: 'MAZD-CX60-33DE-2025', marca: 'mazda', modelo: 'cx-60', tipo: 'DIESEL', seg: 'suv', precio: 49990000, consumo: 9.0, img: 'MAZD-CX60-33DE-2025.jpg' },
  { id: 'MAZD-CX60-25TP-2025', marca: 'mazda', modelo: 'cx-60', tipo: 'GASOLINA', seg: 'suv', precio: 62990000, consumo: 11.0, img: 'MAZD-CX60-25TP-2025.jpg' },
  { id: 'MAZD-CX90-33TP-2025', marca: 'mazda', modelo: 'cx-90', tipo: 'GASOLINA', seg: 'suv', precio: 65990000, consumo: 12.0, img: 'MAZD-CX90-33TP-2025.jpg' },
  { id: 'MAZD-MAZD-20TO-2025', marca: 'mazda', modelo: 'mazda 3', tipo: 'GASOLINA', seg: 'city_sedan', precio: 23490000, consumo: 8.5, img: 'MAZD-MAZD-20TO-2025.jpg' },
  { id: 'MAZD-MX5X-20MI-2025', marca: 'mazda', modelo: 'mx-5', tipo: 'GASOLINA', seg: 'city_sedan', precio: 38990000, consumo: 11.0, img: 'MAZD-MX5X-20MI-2025.jpg' },
  { id: 'MERC-A200-13AT-2025', marca: 'mercedes-benz', modelo: 'a 200', tipo: 'GASOLINA', seg: 'city_sedan', precio: 35990000, consumo: 8.5, img: 'MERC-A200-13AT-2025.jpg' },
  { id: 'MERC-C200-20AM-2025', marca: 'mercedes-benz', modelo: 'c 200', tipo: 'GASOLINA', seg: 'city_sedan', precio: 52990000, consumo: 9.0, img: 'MERC-C200-20AM-2025.jpg' },
  { id: 'MERC-C300-20AM-2025', marca: 'mercedes-benz', modelo: 'c 300', tipo: 'GASOLINA', seg: 'city_sedan', precio: 62990000, consumo: 9.0, img: 'MERC-C300-20AM-2025.webp' },
  { id: 'MERC-GLA2-13AM-2025', marca: 'mercedes-benz', modelo: 'gla 200', tipo: 'GASOLINA', seg: 'suv', precio: 42990000, consumo: 10.0, img: 'MERC-GLA2-13AM-2025.jpg' },
  { id: 'MERC-GLA2-20AM-2025', marca: 'mercedes-benz', modelo: 'gla 200d', tipo: 'DIESEL', seg: 'suv', precio: 46990000, consumo: 8.0, img: 'MERC-GLA2-20AM-2025.jpg' },
  { id: 'MERC-GLC2-20AM-2025', marca: 'mercedes-benz', modelo: 'glc 220d', tipo: 'DIESEL', seg: 'suv', precio: 74990000, consumo: 9.0, img: 'MERC-GLC2-20AM-2025.jpg' },
  { id: 'MERC-GLC3-20AM-2025', marca: 'mercedes-benz', modelo: 'glc 300', tipo: 'GASOLINA', seg: 'suv', precio: 71250000, consumo: 11.0, img: 'MERC-GLC3-20AM-2025.jpg' },
  { id: 'MERC-GLE3-20AM-2025', marca: 'mercedes-benz', modelo: 'gle 350', tipo: 'GASOLINA', seg: 'suv', precio: 94990000, consumo: 12.0, img: 'MERC-GLE3-20AM-2025.jpg' },
  { id: 'MERC-SPRI-516C-2025', marca: 'mercedes-benz', modelo: 'sprinter', tipo: 'DIESEL', seg: 'suv', precio: 51990000, consumo: 9.0, img: 'MERC-SPRI-516C-2025.jpg' },
  { id: 'MGXX-HSXX-20TL-2025', marca: 'mg', modelo: 'hs', tipo: 'GASOLINA', seg: 'suv', precio: 29990000, consumo: 11.0, img: 'MGXX-HSXX-20TL-2025.jpg' },
  { id: 'MGXX-MG3X-15LU-2025', marca: 'mg', modelo: 'mg 3', tipo: 'GASOLINA', seg: 'city_sedan', precio: 13990000, consumo: 8.5, img: 'MGXX-MG3X-15LU-2025.jpg' },
  { id: 'MGXX-MG5X-15TC-2025', marca: 'mg', modelo: 'mg 5', tipo: 'GASOLINA', seg: 'city_sedan', precio: 17990000, consumo: 9.0, img: 'MGXX-MG5X-15TC-2025.jpg' },
  { id: 'MGXX-RX8X-20TC-2025', marca: 'mg', modelo: 'rx8', tipo: 'GASOLINA', seg: 'suv', precio: 29990000, consumo: 12.0, img: 'MGXX-RX8X-20TC-2025.jpg' },
  { id: 'MGXX-ZSXX-15TL-2025', marca: 'mg', modelo: 'zs', tipo: 'GASOLINA', seg: 'suv', precio: 21990000, consumo: 10.0, img: 'MGXX-ZSXX-15TL-2025.jpg' },
  { id: 'MINI-COOP-20S3-2025', marca: 'mini', modelo: 'cooper', tipo: 'GASOLINA', seg: 'city_sedan', precio: 35990000, consumo: 8.5, img: 'MINI-COOP-20S3-2025.jpg' },
  { id: 'MINI-COUN-20TA-2025', marca: 'mini', modelo: 'countryman', tipo: 'GASOLINA', seg: 'suv', precio: 44990000, consumo: 10.0, img: 'MINI-COUN-20TA-2025.jpg' },
  { id: 'MITS-ASXX-20GL-2025', marca: 'mitsubishi', modelo: 'asx', tipo: 'GASOLINA', seg: 'suv', precio: 22990000, consumo: 10.0, img: 'MITS-ASXX-20GL-2025.jpg' },
  { id: 'MITS-DEST-15TG-2025-01', marca: 'mitsubishi', modelo: 'destinator', tipo: 'GASOLINA', seg: 'suv', precio: 26990000, consumo: 10.0, img: 'MITS-DEST-15TG-2025-01.jpg' },
  { id: 'MITS-ECLI-15TG-2025-01', marca: 'mitsubishi', modelo: 'eclipse cross', tipo: 'GASOLINA', seg: 'suv', precio: 31490000, consumo: 10.0, img: 'MITS-ECLI-15TG-2025-01.jpg' },
  { id: 'MITS-L200-24GL-2025-01', marca: 'mitsubishi', modelo: 'l200', tipo: 'DIESEL', seg: 'pickup', precio: 30490000, consumo: 11.5, img: 'MITS-L200-24GL-2025-01.jpg' },
  { id: 'MITS-MIRA-12GL-2025-01', marca: 'mitsubishi', modelo: 'mirage g4', tipo: 'GASOLINA', seg: 'city_sedan', precio: 15490000, consumo: 9.0, img: 'MITS-MIRA-12GL-2025-01.jpg' },
  { id: 'MITS-MONT-24DG-2025-01', marca: 'mitsubishi', modelo: 'montero sport', tipo: 'DIESEL', seg: 'suv', precio: 41990000, consumo: 9.0, img: 'MITS-MONT-24DG-2025-01.jpg' },
  { id: 'MITS-OUTL-25GL-2025', marca: 'mitsubishi', modelo: 'outlander', tipo: 'GASOLINA', seg: 'suv', precio: 32990000, consumo: 11.0, img: 'MITS-OUTL-25GL-2025.jpg' },
  { id: 'MITS-OUTL-24PH-2025', marca: 'mitsubishi', modelo: 'outlander', tipo: 'GASOLINA', seg: 'suv', precio: 45990000, consumo: 11.0, img: 'MITS-OUTL-24PH-2025.jpg' },
  { id: 'NISS-FRON-25LE-2025', marca: 'nissan', modelo: 'frontier', tipo: 'DIESEL', seg: 'pickup', precio: 34990000, consumo: 11.5, img: 'NISS-FRON-25LE-2025.jpg' },
  { id: 'NISS-KICK-16AD-2025', marca: 'nissan', modelo: 'kicks', tipo: 'GASOLINA', seg: 'suv', precio: 21490000, consumo: 10.0, img: 'NISS-KICK-16AD-2025.jpg' },
  { id: 'NISS-MARC-16AD-2025', marca: 'nissan', modelo: 'march', tipo: 'GASOLINA', seg: 'city_sedan', precio: 12990000, consumo: 8.5, img: 'NISS-MARC-16AD-2025.jpg' },
  { id: 'NISS-MURA-35AD-2025', marca: 'nissan', modelo: 'murano', tipo: 'GASOLINA', seg: 'suv', precio: 54990000, consumo: 11.0, img: 'NISS-MURA-35AD-2025.jpg' },
  { id: 'NISS-NAVA-23LE-2025', marca: 'nissan', modelo: 'navara', tipo: 'DIESEL', seg: 'pickup', precio: 32990000, consumo: 11.5, img: 'NISS-NAVA-23LE-2025.jpg' },
  { id: 'NISS-PATH-35AD-2025', marca: 'nissan', modelo: 'pathfinder', tipo: 'GASOLINA', seg: 'suv', precio: 49990000, consumo: 12.0, img: 'NISS-PATH-35AD-2025.jpg' },
  { id: 'NISS-SENT-20AD-2025', marca: 'nissan', modelo: 'sentra', tipo: 'GASOLINA', seg: 'city_sedan', precio: 22490000, consumo: 9.0, img: 'NISS-SENT-20AD-2025.jpg' },
  { id: 'NISS-XTRA-25AD-2025', marca: 'nissan', modelo: 'x-trail', tipo: 'GASOLINA', seg: 'suv', precio: 33490000, consumo: 11.0, img: 'NISS-XTRA-25AD-2025.jpg' },
  { id: 'PEUG-2008-12PU-2025-01', marca: 'peugeot', modelo: '2008', tipo: 'GASOLINA', seg: 'suv', precio: 26990000, consumo: 10.0, img: 'PEUG-2008-12PU-2025-01.jpg' },
  { id: 'PEUG-208X-12PU-2025-01', marca: 'peugeot', modelo: '208', tipo: 'GASOLINA', seg: 'city_sedan', precio: 21490000, consumo: 8.5, img: 'PEUG-208X-12PU-2025-01.jpg' },
  { id: 'PEUG-3008-15BL-2025', marca: 'peugeot', modelo: '3008', tipo: 'DIESEL', seg: 'suv', precio: 33990000, consumo: 9.0, img: 'PEUG-3008-15BL-2025.jpg' },
  { id: 'PEUG-3008-16TH-2025', marca: 'peugeot', modelo: '3008', tipo: 'GASOLINA', seg: 'suv', precio: 29990000, consumo: 11.0, img: 'PEUG-3008-16TH-2025.jpg' },
  { id: 'PEUG-5008-15BL-2025', marca: 'peugeot', modelo: '5008', tipo: 'DIESEL', seg: 'suv', precio: 38990000, consumo: 10.0, img: 'PEUG-5008-15BL-2025.jpg' },
  { id: 'PEUG-5008-16TH-2025', marca: 'peugeot', modelo: '5008', tipo: 'GASOLINA', seg: 'suv', precio: 42990000, consumo: 12.0, img: 'PEUG-5008-16TH-2025.jpg' },
  { id: 'PORS-CAYE-30TS-2025', marca: 'porsche', modelo: 'cayenne', tipo: 'GASOLINA', seg: 'suv', precio: 94990000, consumo: 12.0, img: 'PORS-CAYE-30TS-2025.jpg' },
  { id: 'PORS-CAYE-30TE-2025', marca: 'porsche', modelo: 'cayenne', tipo: 'GASOLINA', seg: 'suv', precio: 109990000, consumo: 12.0, img: 'PORS-CAYE-30TE-2025.jpg' },
  { id: 'PORS-MACA-20TA-2025', marca: 'porsche', modelo: 'macan', tipo: 'GASOLINA', seg: 'suv', precio: 72990000, consumo: 11.0, img: 'PORS-MACA-20TA-2025.jpg' },
  { id: 'RAMX-1500-57TR-2025', marca: 'ram', modelo: '1500', tipo: 'GASOLINA', seg: 'pickup', precio: 89990000, consumo: 12.0, img: 'RAMX-1500-57TR-2025.jpg' },
  { id: 'RAMX-700X-20DR-2025', marca: 'ram', modelo: '700', tipo: 'DIESEL', seg: 'pickup', precio: 22990000, consumo: 11.5, img: 'RAMX-700X-20DR-2025.png' },
  { id: 'RENA-DUST-13TI-2025', marca: 'renault', modelo: 'duster', tipo: 'GASOLINA', seg: 'suv', precio: 24490000, consumo: 11.0, img: 'RENA-DUST-13TI-2025.jpg' },
  { id: 'RENA-KOLE-20DI-2025', marca: 'renault', modelo: 'koleos', tipo: 'DIESEL', seg: 'suv', precio: 36990000, consumo: 9.0, img: 'RENA-KOLE-20DI-2025.jpg' },
  { id: 'RENA-KWID-10SC-2025-01', marca: 'renault', modelo: 'kwid', tipo: 'GASOLINA', seg: 'city_sedan', precio: 11490000, consumo: 7.5, img: 'RENA-KWID-10SC-2025-01.jpg' },
  { id: 'RENA-LOGA-16IN-2025', marca: 'renault', modelo: 'logan', tipo: 'GASOLINA', seg: 'city_sedan', precio: 15490000, consumo: 9.0, img: 'RENA-LOGA-16IN-2025.jpg' },
  { id: 'RENA-OROC-13TO-2025', marca: 'renault', modelo: 'oroch', tipo: 'GASOLINA', seg: 'pickup', precio: 27990000, consumo: 12.0, img: 'RENA-OROC-13TO-2025.jpg' },
  { id: 'RENA-SAND-16ST-2025', marca: 'renault', modelo: 'sandero', tipo: 'GASOLINA', seg: 'city_sedan', precio: 14990000, consumo: 8.5, img: 'RENA-SAND-16ST-2025.jpg' },
  { id: 'SSAN-KORA-16DE-2025', marca: 'ssangyong', modelo: 'korando', tipo: 'DIESEL', seg: 'suv', precio: 27990000, consumo: 9.0, img: 'SSAN-KORA-16DE-2025.jpg' },
  { id: 'SSAN-KORA-15TG-2025', marca: 'ssangyong', modelo: 'korando', tipo: 'GASOLINA', seg: 'suv', precio: 26490000, consumo: 11.0, img: 'SSAN-KORA-15TG-2025.jpg' },
  { id: 'SSAN-MUSS-22DE-2025', marca: 'ssangyong', modelo: 'musso', tipo: 'DIESEL', seg: 'pickup', precio: 28990000, consumo: 11.5, img: 'SSAN-MUSS-22DE-2025.jpg' },
  { id: 'SSAN-REXT-22DE-2025', marca: 'ssangyong', modelo: 'rexton', tipo: 'DIESEL', seg: 'suv', precio: 42990000, consumo: 10.0, img: 'SSAN-REXT-22DE-2025.jpg' },
  { id: 'SSAN-TORR-15TG-2025-01', marca: 'ssangyong', modelo: 'torres', tipo: 'GASOLINA', seg: 'suv', precio: 28990000, consumo: 11.0, img: 'SSAN-TORR-15TG-2025-01.jpg' },
  { id: 'SUBA-FORE-25CV-2025', marca: 'subaru', modelo: 'forester', tipo: 'GASOLINA', seg: 'suv', precio: 29990000, consumo: 11.0, img: 'SUBA-FORE-25CV-2025.jpg' },
  { id: 'SUBA-FORE-20EB-2025', marca: 'subaru', modelo: 'forester', tipo: 'GASOLINA', seg: 'suv', precio: 34990000, consumo: 11.0, img: 'SUBA-FORE-20EB-2025.jpg' },
  { id: 'SUBA-IMPR-20GL-2025-01', marca: 'subaru', modelo: 'impreza', tipo: 'GASOLINA', seg: 'city_sedan', precio: 21490000, consumo: 8.5, img: 'SUBA-IMPR-20GL-2025-01.jpg' },
  { id: 'SUBA-OUTB-25CV-2025', marca: 'subaru', modelo: 'outback', tipo: 'GASOLINA', seg: 'city_sedan', precio: 38990000, consumo: 9.5, img: 'SUBA-OUTB-25CV-2025.jpg' },
  { id: 'SUBA-WRXX-24TM-2025', marca: 'subaru', modelo: 'wrx', tipo: 'GASOLINA', seg: 'city_sedan', precio: 44990000, consumo: 11.0, img: 'SUBA-WRXX-24TM-2025.jpg' },
  { id: 'SUBA-XVXX-20GX-2025', marca: 'subaru', modelo: 'xv', tipo: 'GASOLINA', seg: 'suv', precio: 27990000, consumo: 10.0, img: 'SUBA-XVXX-20GX-2025.jpg' },
  { id: 'SUZU-ALTO-10GL-2025-01', marca: 'suzuki', modelo: 'alto', tipo: 'GASOLINA', seg: 'city_sedan', precio: 10490000, consumo: 7.5, img: 'SUZU-ALTO-10GL-2025-01.jpg' },
  { id: 'SUZU-BALE-15GL-2025-01', marca: 'suzuki', modelo: 'baleno', tipo: 'GASOLINA', seg: 'city_sedan', precio: 16490000, consumo: 8.5, img: 'SUZU-BALE-15GL-2025-01.jpg' },
  { id: 'SUZU-ERTI-15GL-2025-01', marca: 'suzuki', modelo: 'ertiga', tipo: 'GASOLINA', seg: 'suv', precio: 19490000, consumo: 11.0, img: 'SUZU-ERTI-15GL-2025-01.jpg' },
  { id: 'SUZU-FRON-10TG-2025', marca: 'suzuki', modelo: 'fronx', tipo: 'GASOLINA', seg: 'suv', precio: 18990000, consumo: 10.0, img: 'SUZU-FRON-10TG-2025.jpg' },
  { id: 'SUZU-GRAN-15HE-2025-01', marca: 'suzuki', modelo: 'grand vitara', tipo: 'GASOLINA', seg: 'suv', precio: 27490000, consumo: 11.0, img: 'SUZU-GRAN-15HE-2025-01.jpg' },
  { id: 'SUZU-JIMN-15GL-2025-01', marca: 'suzuki', modelo: 'jimny sierra', tipo: 'GASOLINA', seg: 'suv', precio: 25490000, consumo: 10.0, img: 'SUZU-JIMN-15GL-2025-01.jpg' },
  { id: 'SUZU-SWIF-12GL-2025-01', marca: 'suzuki', modelo: 'swift', tipo: 'GASOLINA', seg: 'city_sedan', precio: 14490000, consumo: 8.5, img: 'SUZU-SWIF-12GL-2025-01.jpg' },
  { id: 'SUZU-VITA-14TG-2025-01', marca: 'suzuki', modelo: 'vitara', tipo: 'GASOLINA', seg: 'suv', precio: 24490000, consumo: 10.0, img: 'SUZU-VITA-14TG-2025-01.jpg' },
  { id: 'TOYO-4RUN-40TR-2025', marca: 'toyota', modelo: '4runner', tipo: 'GASOLINA', seg: 'suv', precio: 52990000, consumo: 12.0, img: 'TOYO-4RUN-40TR-2025.jpg' },
  { id: 'TOYO-CORO-20HE-2025-01', marca: 'toyota', modelo: 'corolla', tipo: 'GASOLINA', seg: 'city_sedan', precio: 26490000, consumo: 9.0, img: 'TOYO-CORO-20HE-2025-01.jpg' },
  { id: 'TOYO-CORO-20HE-2025-03', marca: 'toyota', modelo: 'corolla cross', tipo: 'GASOLINA', seg: 'suv', precio: 29990000, consumo: 10.0, img: 'TOYO-CORO-20HE-2025-03.jpg' },
  { id: 'TOYO-FORT-28GR-2025', marca: 'toyota', modelo: 'fortuner', tipo: 'DIESEL', seg: 'suv', precio: 52890000, consumo: 10.0, img: 'TOYO-FORT-28GR-2025.jpg' },
  { id: 'TOYO-HILU-28SR-2025', marca: 'toyota', modelo: 'hilux', tipo: 'DIESEL', seg: 'pickup', precio: 36990000, consumo: 11.5, img: 'TOYO-HILU-28SR-2025.jpg' },
  { id: 'TOYO-LAND-33PR-2025', marca: 'toyota', modelo: 'land cruiser', tipo: 'DIESEL', seg: 'suv', precio: 66990000, consumo: 10.0, img: 'TOYO-LAND-33PR-2025.jpg' },
  { id: 'TOYO-RAIZ-10TG-2025', marca: 'toyota', modelo: 'raize', tipo: 'GASOLINA', seg: 'suv', precio: 15490000, consumo: 10.0, img: 'TOYO-RAIZ-10TG-2025.jpg' },
  { id: 'TOYO-RAV4-25GX-2025', marca: 'toyota', modelo: 'rav4', tipo: 'GASOLINA', seg: 'suv', precio: 31490000, consumo: 11.0, img: 'TOYO-RAV4-25GX-2025.jpg' },
  { id: 'TOYO-RAV4-25HE-2025', marca: 'toyota', modelo: 'rav4', tipo: 'GASOLINA', seg: 'suv', precio: 33490000, consumo: 11.0, img: 'TOYO-RAV4-25HE-2025.jpg' },
  { id: 'TOYO-YARI-15GL-2025', marca: 'toyota', modelo: 'yaris', tipo: 'GASOLINA', seg: 'city_sedan', precio: 16490000, consumo: 9.0, img: 'TOYO-YARI-15GL-2025.jpg' },
  { id: 'TOYO-YARI-15GL-2025-01', marca: 'toyota', modelo: 'yaris cross', tipo: 'GASOLINA', seg: 'suv', precio: 21290000, consumo: 10.0, img: 'TOYO-YARI-15GL-2025-01.jpg' },
  { id: 'TOYO-YARI-15HE-2025', marca: 'toyota', modelo: 'yaris cross', tipo: 'GASOLINA', seg: 'suv', precio: 24790000, consumo: 10.0, img: 'TOYO-YARI-15HE-2025.jpg' },
  { id: 'TOYO-YARI-16TG-2025', marca: 'toyota', modelo: 'yaris gr', tipo: 'GASOLINA', seg: 'city_sedan', precio: 54990000, consumo: 11.0, img: 'TOYO-YARI-16TG-2025.jpg' },
  { id: 'VOLK-AMAR-30TD-2025-01', marca: 'volkswagen', modelo: 'amarok', tipo: 'DIESEL', seg: 'pickup', precio: 59990000, consumo: 11.5, img: 'VOLK-AMAR-30TD-2025-01.jpg' },
  { id: 'VOLK-POLO-16CO-2025', marca: 'volkswagen', modelo: 'polo', tipo: 'GASOLINA', seg: 'city_sedan', precio: 17490000, consumo: 8.5, img: 'VOLK-POLO-16CO-2025.jpg' },
  { id: 'VOLK-TCRO-10TH-2025', marca: 'volkswagen', modelo: 't-cross', tipo: 'GASOLINA', seg: 'suv', precio: 22990000, consumo: 10.0, img: 'VOLK-TCRO-10TH-2025.jpg' },
  { id: 'VOLK-TAOS-14TH-2025', marca: 'volkswagen', modelo: 'taos', tipo: 'GASOLINA', seg: 'suv', precio: 27990000, consumo: 11.0, img: 'VOLK-TAOS-14TH-2025.jpg' },
  { id: 'VOLK-TIGU-20TH-2025', marca: 'volkswagen', modelo: 'tiguan', tipo: 'GASOLINA', seg: 'suv', precio: 35990000, consumo: 11.0, img: 'VOLK-TIGU-20TH-2025.jpg' },
  { id: 'VOLK-VIRT-16HI-2025', marca: 'volkswagen', modelo: 'virtus', tipo: 'GASOLINA', seg: 'city_sedan', precio: 21490000, consumo: 9.0, img: 'VOLK-VIRT-16HI-2025.jpg' },
  { id: 'VOLV-XC40-B4PL-2025', marca: 'volvo', modelo: 'xc40', tipo: 'GASOLINA', seg: 'suv', precio: 49990000, consumo: 10.0, img: 'VOLV-XC40-B4PL-2025.jpg' },
  { id: 'VOLV-XC60-B5PL-2025', marca: 'volvo', modelo: 'xc60', tipo: 'GASOLINA', seg: 'suv', precio: 66990000, consumo: 11.0, img: 'VOLV-XC60-B5PL-2025.jpg' },
  { id: 'VOLV-XC60-T8RE-2025', marca: 'volvo', modelo: 'xc60', tipo: 'GASOLINA', seg: 'suv', precio: 74990000, consumo: 11.0, img: 'VOLV-XC60-T8RE-2025.jpg' },
  { id: 'VOLV-XC90-B6PL-2025', marca: 'volvo', modelo: 'xc90', tipo: 'GASOLINA', seg: 'suv', precio: 84990000, consumo: 12.0, img: 'VOLV-XC90-B6PL-2025.jpg' },
  { id: 'VOLV-XC90-T8RE-2025', marca: 'volvo', modelo: 'xc90', tipo: 'GASOLINA', seg: 'suv', precio: 94990000, consumo: 12.0, img: 'VOLV-XC90-T8RE-2025.jpg' },
];


function normalize(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export interface GasLookupResult {
  precio: number;
  consumoRef: number | null;
  seg: VehicleSegment;
}

export function lookupGasVehicle(
  marca: string,
  modelo: string,
  combustible: 'bencina' | 'diesel',
): GasLookupResult | null {
  const m = normalize(marca);
  const mo = normalize(modelo);

  const matches = GAS_DB.filter(r => {
    const marcaOk = normalize(r.marca) === m;
    const modeloOk = normalize(r.modelo) === mo ||
      normalize(r.modelo).includes(mo) ||
      mo.includes(normalize(r.modelo));
    const tipoOk = combustible === 'diesel'
      ? r.tipo === 'DIESEL'
      : r.tipo !== 'DIESEL';
    return marcaOk && modeloOk && tipoOk;
  });

  if (matches.length === 0) return null;
  matches.sort((a, b) => a.precio - b.precio);
  const mid = matches[Math.floor(matches.length / 2)];
  return { precio: mid.precio, consumoRef: mid.consumo, seg: mid.seg };
}

export function selectGasCars(
  seg: VehicleSegment,
  userMarca: string,
  userModelo: string,
  combustible: 'bencina' | 'diesel',
  userPrice: number,
): GasVehicle[] {
  const um = normalize(userMarca);
  const umo = normalize(userModelo);

  const seen = new Set<string>();
  const pool = GAS_DB.filter(r => {
    if (r.seg !== seg) return false;
    const sameVehicle = normalize(r.marca) === um && (
      normalize(r.modelo) === umo ||
      normalize(r.modelo).includes(umo) ||
      umo.includes(normalize(r.modelo))
    );
    if (sameVehicle) return false;
    if (combustible === 'diesel' && r.tipo !== 'DIESEL') return false;
    if (combustible === 'bencina' && r.tipo === 'DIESEL') return false;
    const key = `${normalize(r.marca)}|${normalize(r.modelo)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  pool.sort((a, b) => Math.abs(a.precio - userPrice) - Math.abs(b.precio - userPrice));
  return pool.slice(0, 2);
}

