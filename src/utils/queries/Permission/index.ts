import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Permission = QueryFactory<"Permission">({ name: "Permission" });
export type PermissionType = MainTypes["Permission"]["type"];




