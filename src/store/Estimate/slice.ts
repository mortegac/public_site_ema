import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyEstimate, estimateInput, Estimate, EstimateData, emptyEstimateData  } from './type';
import { RootState } from "../store";
import { createEstimate } from './services';


interface EstimateState {
  status: "idle" | "loading" | "failed";
  estimate: Estimate;
  estimateData: EstimateData;
  loading: boolean;
  error: string | null;
}

const initialState: EstimateState = {
  status: "idle",
  estimate: emptyEstimate,
  estimateData: emptyEstimateData,
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
      })
      .addCase(setEstimate.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> action.payload >>", action.payload)
        state.estimateData = {...action.payload};
      })
      .addCase(setEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la distancia';
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
