import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyShoppingCart, shoppingCartInput, ShoppingCart } from './type';
import { RootState } from "../store";
import { fecthShoppingCart } from './services';

interface ShoppingCartState {
  status: "idle" | "loading" | "failed";
  shoppingCart: ShoppingCart;
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingCartState = {
  status: "idle",
  shoppingCart: emptyShoppingCart,
  loading: false,
  error: null,
};

export const getShoppingCart = createAsyncThunk(
    "SHOPPINGCART/get ",
    async (objFilter: shoppingCartInput) => {
      try {
        const response:any = await fecthShoppingCart({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH setShoppingCart", error)
        return Promise.reject(error);
      }
    }
);


const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
    setData: (state, action: PayloadAction<ShoppingCart>) => {
      state.shoppingCart = {...state.shoppingCart, ...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder
    // setCustomer
      .addCase(getShoppingCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> action.payload >>", action.payload)
        state.shoppingCart = {...action.payload};
        console.log(">>> state.shoppingCart >>", action.payload)
        // if (state.currentForm) {
        // }
      })
      .addCase(getShoppingCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el customer';
        state.shoppingCart={...emptyShoppingCart}
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

export const {
    setData
  } = shoppingCartSlice.actions;
  
export const selectShoppingCart= (state: RootState) => state.shoppingCart;

export default shoppingCartSlice.reducer;
