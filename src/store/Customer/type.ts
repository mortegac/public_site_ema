// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";


export type Customer = {     
  __typename: "Customer",  
  id?: string | null,
  customerId?: string | null,
  name?: string,
  comune?: string,
  phone?: string,
  email?: string,
  address?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  lat?: string,
  long?: string,
  zoomLevel?: string,
};

export const emptyCustomer: Customer = {
  __typename: "Customer",
  id: "",
  customerId: "",
  name: "",
  comune: "",
  phone: "",
  email: "",
  address:"",
  city:"",
  state:"",
  zipCode:"",
  lat:"",
  long:"",
  zoomLevel:"",
};



export type customerInput = {
  id?: string | null,
  customerId?: string | null,
  name?: string,
  comune?: string,
  address?: string,
  phone?: string,
  email?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  lat?: string,
  long?: string,
  zoomLevel?: string,
};
