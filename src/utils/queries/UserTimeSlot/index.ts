import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const UserTimeSlot = QueryFactory<"UserTimeSlot">({ name: "UserTimeSlot" });
export type UserTimeSlotType = MainTypes["UserTimeSlot"]["type"];
