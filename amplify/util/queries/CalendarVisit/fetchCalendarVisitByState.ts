import { MainTypes } from "@types";
import type { SelectionSet, } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<MainTypes>();

const selectionSet = [
    "calendarId",
    "summary",
    "location",
    "description",
    "startDate",
    "endDate",
    "timeZone",
    "duration",
    "state",
    "customerId",
    "Customer.*",
    "userId",
    "User.*",
] as const;

export type FetchedCalendarVisit = SelectionSet<
    MainTypes["CalendarVisit"]["type"],
    typeof selectionSet
>;

export const fetchCalendarVisitByState = async (
    props: {
        state: MainTypes["CalendarVisit"]["nestedTypes"]["state"]["type"],
        startDate: string,
        endDate: string;
        sortDirection: "DESC" | "ASC";
    }): Promise<FetchedCalendarVisit[]> => {

    const { state,
        startDate,
        endDate,
        sortDirection } = props;

    const { data, errors } = await client.models.CalendarVisit.CalendarVisitsByState
        ({
            state,
            startDate: {
                between: [
                    startDate, endDate
                ]
            },
        }, {
            sortDirection,
            selectionSet
        });

    if (data === null) throw throwError(`CalendarVisit were not found`);


    if (errors !== undefined) throw throwError(`Error fetching CalendarVisit: ${JSON.stringify(errors)}`);

    return data;
};