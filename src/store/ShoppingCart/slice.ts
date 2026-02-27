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
        const response: any = await fecthShoppingCart({ ...objFilter });
        if (response && response.shoppingCartId) {
          const products = response.products ?? [];
          const { total: computedTotal, vat: computedVat } = computeTotalsFromProducts(products);
          const currentTotal = Number(response.total) || 0;
          const currentVat = Number(response.vat) || 0;
          if (Math.round(computedTotal) !== Math.round(currentTotal) || Math.round(computedVat) !== Math.round(currentVat)) {
            try {
              await updateShoppingCart({
                shoppingCartId: response.shoppingCartId,
                total: computedTotal,
                vat: computedVat,
              });
            } catch (updateErr) {
              console.log(">>>>WARN: could not sync cart totals before Webpay", updateErr);
            }
          }
          // Ensure cart type is "product" before WebPay when cart has product items (product purchase flow).
          // Do not override visit/virtualVisit carts (agenda flow).
          const typeOfCart = response.typeOfCart ?? null;
          const hasProductItems = products.length > 0;
          const isVisitCart = typeOfCart === "visit" || typeOfCart === "virtualVisit";
          if (hasProductItems && typeOfCart !== "product" && !isVisitCart) {
            try {
              await updateShoppingCart({
                shoppingCartId: response.shoppingCartId,
                typeOfCart: "product",
              });
              response.typeOfCart = "product";
            } catch (typeErr) {
              console.log(">>>>WARN: could not set cart type to product before Webpay", typeErr);
            }
          }
          await dispatch(getWebpayStart({
            shoppingCartId: response.shoppingCartId,
            glosa: response?.glosa || "Cargador Vehiculo Electrico",
          }));
          // Return payload with totals consistent with products (so Redux gets correct total/vat after sync)
          if (products.length > 0) {
            return { ...response, total: String(computedTotal), vat: String(computedVat) };
          }
        }
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH setShoppingCart", error);
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
    async (objFilter: DeleteShoppingCartInput, { getState }) => {
      try {
        await deleteShoppingCartDetail(objFilter.shoppingCartDetailId);
        const state = getState() as RootState;
        const cart = state.shoppingCart.shoppingCart;
        const products = cart?.products ?? [];
        const remaining = products.filter(
          (p) => p.shoppingCartDetailId !== objFilter.shoppingCartDetailId
        );
        const { total, vat } = computeTotalsFromProducts(remaining);
        const shoppingCartId = cart?.shoppingCartId;
        if (shoppingCartId && shoppingCartId.trim() !== "") {
          await updateShoppingCart({ shoppingCartId, total, vat });
        }
        const removed = products.find(
          (p) => p.shoppingCartDetailId === objFilter.shoppingCartDetailId
        );
        return {
          shoppingCartDetailId: objFilter.shoppingCartDetailId,
          productId: removed?.productId,
        };
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

/** Compute total (gross) and vat from products array (same formula as Step05). */
function computeTotalsFromProducts(products: CartProduct[]) {
  const subtotalGross = products.reduce((sum, p) => sum + p.amount * p.quantity, 0);
  const totalVat = Math.round(products.reduce((sum, p) =>
    sum + ((p.vatValue ?? p.amount - p.amount / 1.19) * p.quantity), 0));
  return { total: subtotalGross, vat: totalVat };
}

export const updateShoppingCartTotalsThunk = createAsyncThunk(
    "SHOPPINGCART/updateShoppingCartTotals",
    async (payload: { shoppingCartId: string; total: number; vat: number }) => {
      try {
        await updateShoppingCart({
          shoppingCartId: payload.shoppingCartId,
          total: payload.total,
          vat: payload.vat,
        });
        return { total: payload.total, vat: payload.vat };
      } catch (error) {
        console.log(">>>>ERROR UPDATE SHOPPING CART TOTALS", error);
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
    resetCart: (state) => {
      state.shoppingCart = { ...emptyShoppingCart };
      state.error = null;
      state.status = "idle";
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
        // Normalize total/vat from products when present so they never drift
        const products = state.shoppingCart.products ?? [];
        if (products.length > 0) {
          const { total, vat } = computeTotalsFromProducts(products);
          state.shoppingCart.total = String(total);
          state.shoppingCart.vat = String(vat);
        }
        console.log(">>> state.shoppingCart >>", state.shoppingCart)
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
        // Recalculate total and vat for Redux/persist
        const { total, vat } = computeTotalsFromProducts(state.shoppingCart.products);
        state.shoppingCart.total = String(total);
        state.shoppingCart.vat = String(vat);
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
            (p) => p.shoppingCartDetailId !== action.payload.shoppingCartDetailId
          );
        }
        const products = state.shoppingCart.products ?? [];
        const { total, vat } = computeTotalsFromProducts(products);
        state.shoppingCart.total = String(total);
        state.shoppingCart.vat = String(vat);
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
      })
      // updateShoppingCartTotalsThunk
      .addCase(updateShoppingCartTotalsThunk.pending, () => {})
      .addCase(updateShoppingCartTotalsThunk.fulfilled, (state, action) => {
        state.shoppingCart.total = String(action.payload.total);
        state.shoppingCart.vat = String(action.payload.vat);
      })
      .addCase(updateShoppingCartTotalsThunk.rejected, () => {});
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

export const {
    setData,
    removeProduct,
    clearProducts,
    resetCart,
  } = shoppingCartSlice.actions;
  
export const selectShoppingCart= (state: RootState) => state.shoppingCart;

export default shoppingCartSlice.reducer;
