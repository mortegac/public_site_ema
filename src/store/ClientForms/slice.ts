import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyClientForm, clientFormInput, ClientForm } from './type';
import { RootState } from "../store";
import { createClientForm } from './services';
interface ClientFormsState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  currentForm: ClientForm;
  loading: boolean;
  error: string | null;
}

const initialState: ClientFormsState = {
  currentStep: 0,
  status: "idle",
  currentForm: emptyClientForm,
  loading: false,
  error: null,
};

export const setFormClient = createAsyncThunk(
    "FORMCLIENT/createFormClient ",
    async (objFilter: clientFormInput) => {
      try {
        const response:any = await createClientForm({ ...objFilter });
        return response;
      } catch (error) {
        console.error(">>>>ERROR FETCH setFormClient", error)
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

const clientFormsSlice = createSlice({
  name: 'clientForms',
  initialState,
  reducers: {
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
    setStep: (state, action: PayloadAction<{}>) => {
        const objAction: any = action.payload;
        state.currentStep = objAction;
      },
      increment: (state) => {
        state.status = "loading";
        // if (state.currentStep <= 2) 
          state.currentStep += 1;
        state.status = "idle";
      },
      decrement: (state) => {
        state.status = "loading";
        if (state.currentStep >= 2) state.currentStep -= 1;
        state.status = "idle";
      },
      setDataForm: (state, action: PayloadAction<{}>) => {
        const objAction: any = action.payload;
        // console.log(">> objAction >>", objAction)
        state.currentForm = {
          ...state.currentForm,
          [objAction.key]: objAction.value,
        };
      },
      cleanData: (state) => {
        state.currentForm = {
          ...emptyClientForm
        }
      },
  },
  extraReducers: (builder) => {
    builder
    // setFormClient
      .addCase(setFormClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setFormClient.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> setFormClient >> action.payload >>", action.payload.data)
        state.currentForm.formId = action?.payload?.data?.formId;
        state.currentForm.customerId = action?.payload?.data?.customerId;
        
        
        if (action?.payload?.data?.formId) {
          
        }
      })
      .addCase(setFormClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la distancia';
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

export const {
    setStep,
    decrement,
    increment,
    setDataForm,
    cleanData,
  } = clientFormsSlice.actions;
  
export const selectClientForms = (state: RootState) => state.clientForms;

export default clientFormsSlice.reducer;
