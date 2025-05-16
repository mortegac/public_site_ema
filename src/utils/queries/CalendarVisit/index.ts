import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const CalendarVisit = QueryFactory<"CalendarVisit">({ name: "CalendarVisit" });
export type CalendarVisitType = MainTypes["CalendarVisit"]["type"];
