import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptyShoppingCart, shoppingCartInput, createShoppingCartInput, updateShoppingCartInput, ShoppingCart, CartProduct, DeleteShoppingCartInput, CartCustomer } from './type';
import { RootState } from "../store";
import { fecthShoppingCart, createShoppingCart, deleteShoppingCartDetail, updateShoppingCart } from './services';
import { getWebpayStart } from '../Webpay/slice';

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
    async (objFilter: shoppingCartInput, { dispatch }) => {
      try {
        const response:any = await fecthShoppingCart({ ...objFilter });
        if (response && response.shoppingCartId) {
          Promise.all([
            dispatch(getWebpayStart({ 
              shoppingCartId: response.shoppingCartId,
              glosa: response?.glosa || "Cargador Vehiculo Electrico", 
             }))
          ])
          // await dispatch(getShoppingCart({ shoppingCartId: response.cartId }));
        }
        
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH setShoppingCart", error)
        return Promise.reject(error);
      }
    }
);

export const addProduct = createAsyncThunk(
    "SHOPPINGCART/addProduct",
    async (product: CartProduct) => {
      try {
        // Simplemente retornamos el producto para agregarlo al estado
        return product;
      } catch (error) {
        console.log(">>>>ERROR ADD PRODUCT", error)
        return Promise.reject(error);
      }
    }
);

export const removeProductToCart = createAsyncThunk(
    "SHOPPINGCART/removeProductToCart",
    async (objFilter: DeleteShoppingCartInput) => {
      try {
        const response: any = await deleteShoppingCartDetail(objFilter.shoppingCartDetailId);
        return response;
      } catch (error) {
        console.log(">>>>ERROR REMOVE PRODUCT", error);
        return Promise.reject(error);
      }
    }
);

export const setCustomerToCart = createAsyncThunk(
    "SHOPPINGCART/setCustomerToCart",
    async (customer: CartCustomer) => {
      try {
        // Retornamos el customer para almacenarlo en el estado
        return customer;
      } catch (error) {
        console.log(">>>>ERROR SET CUSTOMER TO CART", error)
        return Promise.reject(error);
      }
    }
);

export const createShoppingCartThunk = createAsyncThunk(
    "SHOPPINGCART/createShoppingCart",
    async (objFilter: createShoppingCartInput) => {
      try {
        const response:any = await createShoppingCart({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR CREATE SHOPPING CART", error)
        return Promise.reject(error);
      }
    }
);

export const updateOrCreateShoppingCartThunk = createAsyncThunk(
    "SHOPPINGCART/updateOrCreateShoppingCart",
    async (objFilter: { shoppingCartId?: string | null } & (updateShoppingCartInput | createShoppingCartInput)) => {
      try {
        // Verificar si tiene shoppingCartId y no está vacío
        const hasShoppingCartId = objFilter.shoppingCartId && 
                                   objFilter.shoppingCartId.trim() !== '';
        
        if (hasShoppingCartId) {
          // Actualizar el carrito existente
          const { shoppingCartId, ...rest } = objFilter;
          const updateInput: updateShoppingCartInput = {
            shoppingCartId: shoppingCartId!,
            ...rest
          };
          const response:any = await updateShoppingCart(updateInput);
          return response;
        } else {
          // Crear un nuevo carrito
          const createInput: createShoppingCartInput = {
            ...objFilter
          };
          const response:any = await createShoppingCart(createInput);
          return response;
        }
      } catch (error) {
        console.log(">>>>ERROR UPDATE OR CREATE SHOPPING CART", error)
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
    removeProduct: (state, action: PayloadAction<string>) => {
      if (state.shoppingCart.products) {
        state.shoppingCart.products = state.shoppingCart.products.filter(
          (product) => product.productId !== action.payload
        );
      }
    },
    clearProducts: (state) => {
      state.shoppingCart.products = [];
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
      })
      // addProduct
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.shoppingCart.products) {
          state.shoppingCart.products = [];
        }
        // Verificar si el producto ya existe
        const existingProductIndex = state.shoppingCart.products.findIndex(
          (product) => product.productId === action.payload.productId
        );
        
        if (existingProductIndex >= 0) {
          // Si existe, actualizar la cantidad
          state.shoppingCart.products[existingProductIndex].quantity += action.payload.quantity;
        } else {
          // Si no existe, agregarlo
          state.shoppingCart.products.push(action.payload);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al agregar el producto';
      })
      
      
      // removeProductToCart
      .addCase(removeProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductToCart.fulfilled, (state, action) => {
        if (state.shoppingCart.products) {
          state.shoppingCart.products = state.shoppingCart.products.filter(
            (p) => p.productId !== action.payload.productId
          );
        }
      })
      .addCase(removeProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al remover el producto';
      })
      
      
      // setCustomerToCart
      .addCase(setCustomerToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCustomerToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingCart.customer = action.payload;
        // También actualizar customerId en el nivel superior por compatibilidad
        state.shoppingCart.customerId = action.payload.customerId;
      })
      .addCase(setCustomerToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al almacenar el customer';
      })
      // createShoppingCartThunk
      .addCase(createShoppingCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShoppingCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> createShoppingCart action.payload >>", action.payload)
        state.shoppingCart = {...state.shoppingCart, ...action.payload};
        console.log(">>> state.shoppingCart after create >>", state.shoppingCart)
      })
      .addCase(createShoppingCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear el shopping cart';
      })
      // updateOrCreateShoppingCartThunk
      .addCase(updateOrCreateShoppingCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrCreateShoppingCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> updateOrCreateShoppingCart action.payload >>", action.payload)
        state.shoppingCart = {...state.shoppingCart, ...action.payload};
        console.log(">>> state.shoppingCart after update/create >>", state.shoppingCart)
      })
      .addCase(updateOrCreateShoppingCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar o crear el shopping cart';
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

export const {
    setData,
    removeProduct,
    clearProducts
  } = shoppingCartSlice.actions;
  
export const selectShoppingCart= (state: RootState) => state.shoppingCart;

export default shoppingCartSlice.reducer;
