import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { emptyWebpay, webpayInput, Webpay } from './type';
import { RootState } from "../store";
import { fetchWebpayStart, fetchWebpayCommit, fetchWebpayStatus } from './services';

interface WebpayState {
  status: "idle" | "loading" | "failed";
  webpay: Webpay;
  loading: boolean;
  error: string | null;
}

const initialState: WebpayState = {
  status: "idle",
  webpay: emptyWebpay,
  loading: false,
  error: null,
};




export const getWebpayStart = createAsyncThunk(
    "WEBPAY/start ",
    async (objFilter: webpayInput) => {
      try {
        const response:any = await fetchWebpayStart({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH getWebpayStart", error)
        return Promise.reject(error);
      }
    }
);

export const getWebpayCommit = createAsyncThunk(
    "WEBPAY/commit ",
    async (objFilter: webpayInput) => {
      try {
        const response:any = await fetchWebpayCommit({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH getWebpayComit", error)
        return Promise.reject(error);
      }
    }
);

export const getWebpayStatus = createAsyncThunk(
    "WEBPAY/status ",
    async (objFilter: webpayInput) => {
      try {
        const response:any = await fetchWebpayStatus({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH getWebpayStatus", error)
        return Promise.reject(error);
      }
    }
);


const webpaySlice = createSlice({
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
      .addCase(getWebpayStart.pending, (state) => {
        state.loading = true;
        state.status= "loading";
        state.error = null;
      })
      .addCase(getWebpayStart.fulfilled, (state, action) => {
        state.loading = false;
        state.status= "idle";
        console.log(">>> action.payload getWebpayStart >>", action.payload)
        state.webpay = {...action.payload};
      })
      .addCase(getWebpayStart.rejected, (state, action) => {
        state.loading = false;
        state.status= "failed";
        state.error = action.error.message || 'Error al actualizar el getWebpayStart';
        state.webpay={...emptyWebpay}
      })
      
    // getWebpayCommit
      .addCase(getWebpayCommit.pending, (state) => {
        state.status= "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getWebpayCommit.fulfilled, (state, action) => {
        state.loading = false;
        state.status= "idle";
        console.log(">>> action.payload getWebpayCommit >>", action.payload)
        state.webpay = {...action.payload};
      })
      .addCase(getWebpayCommit.rejected, (state, action) => {
        state.loading = false;
        state.status= "failed";
        state.error = action.error.message || 'Error al actualizar el getWebpayCommit';
        state.webpay={...emptyWebpay}
      })
      
    // getWebpayStatus
      .addCase(getWebpayStatus.pending, (state) => {
        state.loading = true;
        state.status= "loading";
        state.error = null;
      })
      .addCase(getWebpayStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status= "idle";
        console.log(">>> action.payload getWebpayStatus >>", action.payload)
        state.webpay = {...action.payload};
      })
      .addCase(getWebpayStatus.rejected, (state, action) => {
        state.loading = false;
        state.status= "failed";
        state.error = action.error.message || 'Error al actualizar el getWebpayStatus';
        state.webpay={...emptyWebpay}
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

// export const {
//     setData
//   } = WebpaySlice.actions;
  
export const selectWebpay= (state: RootState) => state.webpay;

export default webpaySlice.reducer;
