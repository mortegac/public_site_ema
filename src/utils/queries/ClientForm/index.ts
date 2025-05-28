import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const ClientForm = QueryFactory<"ClientForm">({ name: "ClientForm" });
export type ClientFormType = MainTypes["ClientForm"]["type"];
export { fetchClientFormAndEstimates } from "./fetchClientFormAndEstimates";