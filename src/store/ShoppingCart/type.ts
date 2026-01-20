// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";

export interface CartProduct {
  productId: string;
  valor: number;
  cantidad: number;
  descripcionProducto?: string;
  imagenProducto?: string;
}

export type ShoppingCart = {     
  shoppingCartId?: string,
  customerId?: string,
  productos?: CartProduct[],
  total?: string,
  vat?: string,  // paymentMethod: a.enum(["transbank", "bank_transfer", "cash", "on_site"]), //metodo de pago
  status?: string, //: a.enum(["pending", "completed", "cancelled"]), //status
  addressCustomer?: string,
  glosa?: string,
  
};

export const emptyShoppingCart: ShoppingCart = {
  shoppingCartId: "",
  customerId: "",
  productos: [],
  total: "",
  vat: "",
  status: "",
  addressCustomer: "",
  glosa: "",
};


export type shoppingCartInput = {
  shoppingCartId?: string | null,
};


