import { QueryFactory } from "../QueryFactory";

export const CalendarVisit = QueryFactory<"CalendarVisit">({ name: "CalendarVisit" });

export { fetchCalendarVisitByState } from "./fetchCalendarVisitByState"

