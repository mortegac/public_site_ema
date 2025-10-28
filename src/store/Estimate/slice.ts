import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyEstimate, estimateInput, Estimate, EstimateData, EstimateDataArray, EstimateDataSingleOrArray, emptyEstimateData  } from './type';
import { RootState } from "../store";
import { createEstimate } from './services';


interface EstimateState {
  status: "idle" | "loading" | "failed";
  estimate: Estimate;
  estimateData: Estimate;
  loading: boolean;
  error: string | null;
}

const initialState: EstimateState = {
  status: "idle",
  estimate: emptyEstimate,
  estimateData: emptyEstimate,
  loading: false,
  error: null,
};

export const setEstimate = createAsyncThunk(
    "ESTIMATE/createEstimate ",
    async (objFilter: estimateInput) => {
      try {
        const response:any = await createEstimate({ ...objFilter });
        return response;
      } catch (error) {
        console.error(">>>>ERROR FETCH setEstimate", error)
        return Promise.reject(error);
      }
    }
  );


// export const updateDistance = createAsyncThunk(
//   'clientForms/updateDistance',
//   async (distance: number) => {
//     // Aquí puedes agregar lógica asíncrona si es necesario
//     return distance;
//   }
// );

const estimateSlice = createSlice({
  name: 'estimate',
  initialState,
  reducers: {
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
    // setEstimate
      .addCase(setEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(setEstimate.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> action.payload >>", action.payload)
        
        // Convertir a array si no lo es
        const estimates = Array.isArray(action.payload) ? action.payload : [action.payload];
        
        // Procesar cada estimate y crear objeto con todas las potencias
        const processedData: Estimate = {
          estimateId: "",
          materiales_22: "0",
          materiales_35: "0",
          materiales_7: "0",
          instalacion_22: "0",
          instalacion_35: "0",
          instalacion_7: "0",
          SEC_22: "0",
          SEC_35: "0",
          SEC_7: "0",
          cargador_22: "0",
          cargador_35: "0",
          cargador_7: "0",
          neto_22: "0",
          neto_35: "0",
          neto_7: "0",
          iva_22: "0",
          iva_35: "0",
          iva_7: "0",
          bruto_22: "0",
          bruto_35: "0",
          bruto_7: "0",
          mts: "",
          typeOfResidence: "",
          formId: "",
        };
        
         // Mapear cada estimate del array y procesar según chargerPotence
        const result = estimates.map((estimate: any) => {
          const { estimateId,chargerPotence, materialsCost, installationCost, SECCost, referenceChargerPrice, netPrice, VAT, grossPrice } = estimate;
          
          // Validar que exista chargerPotence
          if (!chargerPotence) return null;
          
          // Mapear valores según chargerPotence (3.5, 7, 22, 35)
          const chargerKey = chargerPotence?.toString().includes("3.5") ? "35" 
                            : chargerPotence?.toString().includes("35") ? "35"
                            : chargerPotence?.toString().includes("7") ? "7"
                            : chargerPotence?.toString().includes("22") ? "22"
                            : chargerPotence?.toString().includes("2.2") ? "22"
                            : chargerPotence?.toString();
          
          // Retornar objeto con las propiedades mapeadas
          return {
            [`estimateId_${chargerKey}`]: estimateId || "",
            [`materiales_${chargerKey}`]: materialsCost || "0",
            [`instalacion_${chargerKey}`]: installationCost || "0",
            [`SEC_${chargerKey}`]: SECCost || "0",
            [`cargador_${chargerKey}`]: referenceChargerPrice || "0",
            [`neto_${chargerKey}`]: netPrice || "0",
            [`iva_${chargerKey}`]: VAT || "0",
            [`bruto_${chargerKey}`]: grossPrice || "0",
          };
        }).filter(Boolean); // Filtrar valores null
        
        // Consolidar todos los resultados en processedData
        result.forEach((item: any) => {
          if (item) {
            Object.keys(item).forEach(key => {
              (processedData as any)[key] = item[key];
            });
          }
        });
        
        
        // Guardar el objeto procesado en estimateData
        state.estimateData = processedData;
        
        state.status = "idle";
      })
      .addCase(setEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la distancia';
        state.status = "failed";
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

// export const {
//     setStep,
//     decrement,
//     increment,
//     setDataForm,
//     cleanData,
//   } = clientFormsSlice.actions;
  
export const selectEstimate = (state: RootState) => state.estimate;

export default estimateSlice.reducer;
