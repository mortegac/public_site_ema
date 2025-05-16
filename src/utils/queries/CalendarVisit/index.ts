import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const CalendarVisit = QueryFactory<"CalendarVisit">({ name: "CalendarVisit" });
export type CalendarVisitType = MainTypes["CalendarVisit"]["type"];

