import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Users = QueryFactory<"User">({ name: "User" });
export type UsersType = MainTypes["User"]["type"];
