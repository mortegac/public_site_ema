import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const TicketComment = QueryFactory<"TicketComment">({ name: "TicketComment" });
export type TicketCommentType = MainTypes["TicketComment"]["type"];