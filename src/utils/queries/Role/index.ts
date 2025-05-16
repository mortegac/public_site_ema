import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Role = QueryFactory<"Role">({ name: "Role" });
export type RoleType = MainTypes["Role"]["type"];
