import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const SupportTicket = QueryFactory<"SupportTicket">({ name: "SupportTicket" });
export type SupportTicketType = MainTypes["SupportTicket"]["type"];