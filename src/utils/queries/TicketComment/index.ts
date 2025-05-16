import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const TicketComment = QueryFactory<"TicketComment">({ name: "TicketComment" });
export type TicketCommentType = MainTypes["TicketComment"]["type"];