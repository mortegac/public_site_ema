import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { emptyPaymentTransaction, paymentTransactionInput, PaymentTransaction } from './type';
import { RootState } from "../store";
import { fetchPaymentTransaction } from './services';

interface PaymentTransactionState {
  status: "idle" | "loading" | "failed";
  paymentTransaction: PaymentTransaction;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentTransactionState = {
  status: "idle",
  paymentTransaction: emptyPaymentTransaction,
  loading: false,
  error: null,
};




export const getPaymentTransaction = createAsyncThunk(
    "PAYMENTRANSACTION/start ",
    async (objFilter: paymentTransactionInput) => {
      try {
        const response:any = await fetchPaymentTransaction({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH getWebpayStart", error)
        return Promise.reject(error);
      }
    }
);

const paymentTransactionSlice = createSlice({
  name: 'webpay',
  initialState,
  reducers: {
    // setData: (state, action: PayloadAction<ShoppingCart>) => {
    //   state.shoppingCart = {...state.shoppingCart, ...action.payload};
    // },
  },
  extraReducers: (builder) => {
    builder
    // getWebpayStart
      .addCase(getPaymentTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentTransaction.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> action.payload paymentTransaction >>", action.payload)
        state.paymentTransaction = {...action.payload};
      })
      .addCase(getPaymentTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el paymentTransaction';
        state.paymentTransaction={...emptyPaymentTransaction}
      })
      
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

// export const {
//     setData
//   } = WebpaySlice.actions;
  
export const selectPaymentTransaction= (state: RootState) => state.paymentTransaction;

export default paymentTransactionSlice.reducer;
