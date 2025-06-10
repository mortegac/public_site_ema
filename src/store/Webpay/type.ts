// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";


export type Webpay = {     
  order?: string,
  token?: string,
  url?: string,
  message?: string,
  buy_order?: string,
  email?: string,
};

export const emptyWebpay: Webpay = {
  order: "",
  token: "",
  url: "",
  message: "",
  buy_order: "",
  email: "",
};


export type webpayInput = {
  token?: string | null,
  shoppingCartId?: string | null,
  glosa?: string | null,
};


