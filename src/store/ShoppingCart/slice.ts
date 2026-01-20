import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyShoppingCart, shoppingCartInput, ShoppingCart, CartProduct } from './type';
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
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      if (!state.shoppingCart.productos) {
        state.shoppingCart.productos = [];
      }
      
      // Verificar si el producto ya existe en el carrito
      const existingProductIndex = state.shoppingCart.productos.findIndex(
        (product) => product.productId === action.payload.productId
      );
      
      if (existingProductIndex >= 0) {
        // Si existe, incrementar la cantidad
        state.shoppingCart.productos[existingProductIndex].cantidad += action.payload.cantidad;
      } else {
        // Si no existe, agregar el nuevo producto
        state.shoppingCart.productos.push(action.payload);
      }
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
    setData,
    addProduct
  } = shoppingCartSlice.actions;
  
export const selectShoppingCart= (state: RootState) => state.shoppingCart;

export default shoppingCartSlice.reducer;
