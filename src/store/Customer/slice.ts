import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyCustomer, customerInput, Customer } from './type';
import { RootState } from "../store";
import { createCustomer } from './services';
interface CustomerState {
  status: "idle" | "loading" | "failed";
  customer: Customer;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  status: "idle",
  customer: emptyCustomer,
  loading: false,
  error: null,
};

export const setCustomer = createAsyncThunk(
    "CUSTOMER/createCustomer ",
    async (objFilter: customerInput) => {
      try {
        const response:any = await createCustomer({ ...objFilter });
        return response;
      } catch (error) {
        console.error(">>>>ERROR FETCH setCustomer", error)
        return Promise.reject(error);
      }
    }
);


const customerSlice = createSlice({
  name: 'customer',
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
    // setCustomer
      .addCase(setCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCustomer.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> action.payload >>", action.payload)
        state.customer = {...action.payload};
        // if (state.currentForm) {
        // }
      })
      .addCase(setCustomer.rejected, (state, action) => {
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
  
export const selectCustomer = (state: RootState) => state.customer;

export default customerSlice.reducer;
