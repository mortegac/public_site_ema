import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Company = QueryFactory<"Company">({ name: "Company" });
export type CompanyType = MainTypes["Company"]["type"];
