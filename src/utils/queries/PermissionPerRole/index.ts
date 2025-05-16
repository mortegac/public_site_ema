import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const PermissionPerRole = QueryFactory<"PermissionPerRole">({ name: "PermissionPerRole" });
export type PermissionPerRoleType = MainTypes["PermissionPerRole"]["type"];




