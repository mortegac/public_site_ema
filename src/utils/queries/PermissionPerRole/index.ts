import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const PermissionPerRole = QueryFactory<"PermissionPerRole">({ name: "PermissionPerRole" });
export type PermissionPerRoleType = MainTypes["PermissionPerRole"]["type"];




