// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";

export type CartProduct = {
  productId: string;
  description: string;
  netAmount: number;
  amount: number;
  vatValue: number;
  quantity: number;
  imageUrl?: string;
  priceId?: string;
  shoppingCartDetailId?: string;
};

export type DeleteShoppingCartInput = {
  // shoppingCartId: string;
  shoppingCartDetailId: string;
};

export type CartCustomer = {
  customerId: string;
  Name: string;
  Email: string;
  Phone: string;
  Address?: string;
  City?: string;
  State?: string;
  ReferenceAddress?: string;
};

export type ShoppingCart = {
  shoppingCartId?: string,
  total?: string,
  vat?: string,  // paymentMethod: a.enum(["transbank", "bank_transfer", "cash", "on_site"]), //metodo de pago
  status?: string, //: a.enum(["pending", "completed", "cancelled"]), //status
  customerId?: string,
  addressCustomer?: string,
  glosa?: string,
  typeOfCart?: "product" | "service" | "input" | "visit" | "virtualVisit" | null,
  products?: CartProduct[];
  customer?: CartCustomer;
};

export const emptyShoppingCart: ShoppingCart = {
  shoppingCartId: "",
  total: "",
  vat: "",
  status: "",
  customerId: "",
  addressCustomer: "",
  glosa: "",
  products: [],
  customer: undefined,
};


export type shoppingCartInput = {
  shoppingCartId?: string | null,
};

export type createShoppingCartInput = {
  shoppingCartId?: string | null,
  total?: number | null,
  vat?: number | null,
  typeOfCart?: "product" | "service" | "input" | "visit" | "virtualVisit" | null,
  paymentMethod?: "transbank" | "bank_transfer" | "cash" | "on_site" | null,
  status?: "pending" | "completed" | "cancelled" | "timed_out" | null,
  customerId?: string | null,
  products?: CartProduct[];
};

export type createShoppingCartDetailInput = {
  shoppingCartDetailId?: string | null,
  glosa?: string | null,
  price?: number | null,
  typeOfItem?: "product" | "service" | "input" | "visit" | "virtualVisit" | null,
  shoppingCartId: string,
  productId?: string | null,
  priceId?: string | null,
  estimateDetailId?: string | null,
  calendarId?: string | null,
};

export type updateShoppingCartInput = {
  shoppingCartId: string,
  total?: number | null,
  vat?: number | null,
  typeOfCart?: "product" | "service" | "input" | "visit" | "virtualVisit" | null,
  paymentMethod?: "transbank" | "bank_transfer" | "cash" | "on_site" | null,
  status?: "pending" | "completed" | "cancelled" | "timed_out" | null,
  customerId?: string | null,
  products?: CartProduct[];
};


