import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyCustomer, customerInput, Customer } from './type';
import { RootState } from "../store";
import { createCustomer, getCustomerService } from './services';
interface CustomerState {
  status: "idle" | "loading" | "failed";
  customer: Customer;
  existCustomer: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  status: "idle",
  customer: emptyCustomer,
  existCustomer: false,
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
        console.log(">>>>ERROR FETCH setCustomer", error)
        return Promise.reject(error);
      }
    }
);
export const getCustomer = createAsyncThunk(
    "CUSTOMER/getCustomer ",
    async (objFilter: customerInput) => {
      try {
        const response:any = await getCustomerService({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH getCustomer", error)
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
    setCustomerData: (state, action: PayloadAction<Customer>) => {
      state.customer = {...state.customer, ...action.payload};
    },
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
        if (action.payload) {
          state.customer = { ...state.customer, ...action.payload };
        }
      })
      .addCase(setCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el customer';
        // Do not overwrite state.customer so we keep the last attempted payload (and addresses)
      })
      
    // getCustomer
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.existCustomer = Boolean(action.payload?.customerId && action.payload.customerId.trim() !== '');
        if (action.payload) {
          state.customer = { ...state.customer, ...action.payload };
        }
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el customer';
        state.customer={...emptyCustomer}
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

export const {
    setCustomerData
  } = customerSlice.actions;
  
export const selectCustomer = (state: RootState) => state.customer;

export default customerSlice.reducer;
