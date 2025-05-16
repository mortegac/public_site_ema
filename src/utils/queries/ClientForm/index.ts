import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const ClientForm = QueryFactory<"ClientForm">({ name: "ClientForm" });
export type ClientFormType = MainTypes["ClientForm"]["type"];
