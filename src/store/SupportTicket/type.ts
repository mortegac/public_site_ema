// import type { Customer } from "../../utils/imports/graphql/API";
// import type { Customer } from "./type";


export type SupportTicket = {     
  __typename?: "SupportTicket",  
  supportTicketId?: string | null,
  date?: string | null,
  name?: string | null,
  description?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  eveId?: string | null,
  level?: string | null,
  statusTicket?: string | null,
  lastModificationUser?: string | null,
  employeeId?: string | null,
  solicitantId?: string | null,
};

export const emptySupportTicket: SupportTicket = {
  __typename: "SupportTicket",
  supportTicketId: "",
  date: "",
  name: "",
  description: "",
  email: "",
  phoneNumber: "",
  eveId: "",
  level: "",
  statusTicket: "",
  lastModificationUser: "",
  employeeId: "",
  solicitantId: "",
};



export type supportTicketInput = {
  
  
  // supportTicketId?: string | null,
  // date?: string | null,
  name?: string | null,
  description?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  level?: string | null,
  statusTicket?: string | null,
  solicitantId?: string | null,
  
};
