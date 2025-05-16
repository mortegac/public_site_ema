import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Company = QueryFactory<"Company">({ name: "Company" });
export type CompanyType = MainTypes["Company"]["type"];
