import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Users = QueryFactory<"User">({ name: "User" });
export type UsersType = MainTypes["User"]["type"];
