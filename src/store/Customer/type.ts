import type { Customer } from "../../utils/imports/graphql/API";


export const emptyCustomer: Customer = {
  __typename: "Customer",
  CalendarVisits: ModelCalendarVisitConnection | null,
  ClientForm: ModelClientFormConnection | null,
  address: "",
  comune: "",
  createdAt: "",
  customerId: "",
  email: "",
  id: "",
  name: "",
  phone: "",
  updatedAt: "",
};
