// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";


export type ShoppingCart = {     
  
  shoppingCartId?: string,
  total?: string,
  vat?: string,  // paymentMethod: a.enum(["transbank", "bank_transfer", "cash", "on_site"]), //metodo de pago
  status?: string, //: a.enum(["pending", "completed", "cancelled"]), //status
  customerId?: string,
  addressCustomer?: string,
  glosa?: string,
  
};

export const emptyShoppingCart: ShoppingCart = {
  shoppingCartId: "",
  total: "",
  vat: "",
  status: "",
  customerId: "",
  addressCustomer: "",
  glosa: "",
};


export type shoppingCartInput = {
  shoppingCartId?: string | null,
};


