// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";


export type Customer = {     
  __typename: "Customer",  
  id?: string | null,
  customerId?: string | null,
  name?: string,
  comune?: string,
  address?: string,
  phone?: string,
  email?: string,
};

export const emptyCustomer: Customer = {
  __typename: "Customer",
  id: "",
  customerId: "",
  name: "",
  comune: "",
  address: "",
  phone: "",
  email: "",
};



export type customerInput = {
  id?: string | null,
  customerId?: string | null,
  name?: string,
  comune?: string,
  address?: string,
  phone?: string,
  email?: string,
};
