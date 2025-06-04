import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { calendarVisitInput } from './type';
import { GraphQLResult } from '@aws-amplify/api';

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { fetchCalendarVisitByState } from '../../../../ema-back/amplify/util/queries/CalendarVisit/fetchCalendarVisitByState';
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();

interface CalendarVisitsResponse {
  CalendarVisitsByState: {
    items: Array<{
      calendarId: string;
      state: string;
      startDate: string;
      userId: string;
    }>;
  };
}

export const fetchCalendarVisitsByState = async (objFilter: calendarVisitInput) => {
  try {
    
    
    // query listCalendarVisits($state: String!, $startDate: AWSDateTime!, $endDate: AWSDateTime!, $userId: String!) {
    //   CalendarVisitsByState(
    //     state: $state,
    //     startDate: {
    //       between: [$startDate, $endDate]
    //     }
    //     sortDirection: ASC
    //     filter: {
    //       userId: {
    //         eq: $userId
    //       }
    //     }
    //   ){
    //     items {
    //       calendarId
    //       startDate
    //       endDate
    //       summary
    //       location
    //       description
    //       timeZone
    //       duration
    //       state
    //       customerId
    //       userId
    //     }
    //   }
    // }
    
    
    const response = await client.graphql<CalendarVisitsResponse>({
      query: `
        query listCalendarVisits {
          CalendarVisitsByState(
            state: available,
            startDate: {
              between: [
                "2025-06-01T00:00:00.000Z",
                "2025-06-28T00:00:00.000Z",
              ]
            }
            sortDirection: ASC
            filter: {
              userId: {
                eq: "matias.vera@energica.city"
              }
            }
          ){
            items {
              calendarId
              startDate
              endDate
              summary
              location
              description
              timeZone
              duration
              state
              customerId
              userId
            }
          }
        }
      `,
      variables: {
        state: "available",
        startDate: objFilter.startDate || "2025-05-26T00:00:00.000Z",
        endDate: objFilter.endDate || "2025-05-28T00:00:00.000Z",
        userId: objFilter.userId
      }
    }) as GraphQLResult<CalendarVisitsResponse>;
    
    console.log("response.data", response.data)

    return { data: response.data?.CalendarVisitsByState?.items || [], nextToken: null };
  } catch (error) {
    console.log("Error fetching calendar visits:", error);
    throw error;
  }
};
