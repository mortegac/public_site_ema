import { QueryFactory } from "../QueryFactory";

export const ClientForm = QueryFactory<"ClientForm">({ name: "ClientForm" });
export { fetchClientFormAndEstimates } from "./fetchClientFormAndEstimates";