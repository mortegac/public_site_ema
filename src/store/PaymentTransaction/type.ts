// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";




export type PaymentTransaction = {       
  paymentTransactionId: string,
  status: string,
  amount: string,
  glosa: string,
  usersPaymentTransactionsId: string,
  shoppingCartId: string,
};

export const emptyPaymentTransaction: PaymentTransaction = {
  paymentTransactionId: "",
  status: "",
  amount: "",
  glosa: "",
  usersPaymentTransactionsId: "",
  shoppingCartId: "",
};


export type paymentTransactionInput = {
  token?: string | null,
};


