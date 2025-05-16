import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Role = QueryFactory<"Role">({ name: "Role" });
export type RoleType = MainTypes["Role"]["type"];
