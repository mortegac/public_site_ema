import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  ComparadorState,
  ComparadorStep,
  CurrentVehicleState,
  UsageProfileState,
} from './type';
import { EV_DB, lookupGasVehicle, selectGasCars } from '@/app/comparador-electrico/data/vehicles';
import { selectBestEVs } from '@/app/comparador-electrico/utils/tco';

const initialState: ComparadorState = {
  step: 0,
  currentVehicle: {
    marca: '',
    modelo: '',
    combustible: 'bencina',
    precioListaCLP: 0,
    kmMensuales: 1000,
    consumoL100km: 10,
    precioCombustibleCLP: 1545,
  },
  usageProfile: {
    tipoUso: 'mixed',
    lugarCarga: 'home',
    presupuestoCLP: 25000000,
    years: 4,
  },
  selectedEVId: null,
  evRecommendations: [],
  gasRecommendations: [],
  segmento: '',
};

const comparadorSlice = createSlice({
  name: 'comparador',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<ComparadorStep>) {
      state.step = action.payload;
    },

    nextStep(state) {
      if (state.step < 3) {
        state.step = (state.step + 1) as ComparadorStep;
      }
    },

    prevStep(state) {
      if (state.step > 0) {
        state.step = (state.step - 1) as ComparadorStep;
      }
    },

    setCurrentVehicle(state, action: PayloadAction<Partial<CurrentVehicleState>>) {
      state.currentVehicle = { ...state.currentVehicle, ...action.payload };
    },

    setUsageProfile(state, action: PayloadAction<Partial<UsageProfileState>>) {
      state.usageProfile = { ...state.usageProfile, ...action.payload };
    },

    setSelectedEV(state, action: PayloadAction<number | null>) {
      state.selectedEVId = action.payload;
    },

    computeRecommendations(state) {
      const { tipoUso, presupuestoCLP } = state.usageProfile;
      const { marca, modelo, combustible, precioListaCLP } = state.currentVehicle;

      const lookup = lookupGasVehicle(marca, modelo, combustible);
      const seg = lookup?.seg ?? 'suv';
      state.segmento = seg;

      const evRecs = selectBestEVs(EV_DB, presupuestoCLP, tipoUso, seg, 2);
      state.evRecommendations = evRecs;

      const gasRecs = selectGasCars(seg, marca, modelo, combustible, precioListaCLP);
      state.gasRecommendations = gasRecs;

      const isCurrentInList = evRecs.some(ev => ev.id === state.selectedEVId);
      if (!isCurrentInList && evRecs.length > 0) {
        state.selectedEVId = evRecs[0].id;
      }
    },

    resetComparador() {
      return initialState;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setCurrentVehicle,
  setUsageProfile,
  setSelectedEV,
  computeRecommendations,
  resetComparador,
} = comparadorSlice.actions;

export const selectComparador = (state: RootState) => state.comparador;

export default comparadorSlice.reducer;
