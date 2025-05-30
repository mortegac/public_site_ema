import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { calendarVisitInput } from './type';


import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();


export const fetchCalendarVisitsByState = async (objFilter: calendarVisitInput) => {
  try {
    const data = await client.models.CalendarVisit.list({
      filter: {
        state: { eq: "available" },
        startDate: {
          between: [
            objFilter.startDate || "2025-05-26T00:00:00.000Z",
            objFilter.endDate || "2025-05-28T00:00:00.000Z"
          ]
        },
        userId: {
          eq: objFilter.userId
          // eq: "francisco.novoa@energica.city"
        }
      }
    });

    const sortedData = [...data.data].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      return dateA - dateB;
    });

    return { data: sortedData, nextToken: data.nextToken };
  } catch (error) {
    console.error("Error fetching calendar visits:", error);
    throw error;
  }
};
