import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { calendarVisitInput } from './type';
import { GraphQLResult } from '@aws-amplify/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();

interface MakeReservationResponse {
  MakeReservationAndCart: {
    message: string;
    cartId: string;
  };
}

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
    const response = await client.graphql<CalendarVisitsResponse>({
      query: `
        query listCalendarVisits($startDate: String!, $endDate: String!, $userId: ID!) {
          CalendarVisitsByState(
            state: available,
            startDate: {
              between: [$startDate, $endDate]
            }
            sortDirection: ASC
            filter: {
              userId: {
                eq: $userId
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
        // startDate: objFilter.startDate || dayjs().utc().startOf('day').format('YYYY-MM-DD[T]00:00:00.000[Z]'),
        // endDate: objFilter.endDate || dayjs().utc().endOf('day').format('YYYY-MM-DD[T]00:00:00.000[Z]'),
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



export const makeReservation = async (objFilter: calendarVisitInput) => {
  try {
    const response = await client.graphql<MakeReservationResponse>({
      query: `
        mutation MakeReservationAndCart($customerId: String!, $calendarId: String!) {
          MakeReservationAndCart(
            customerId: $customerId,
            calendarId: $calendarId
          ) {
            message
            cartId
          }
        }
      `,
      variables: {
        customerId: objFilter.customerId,
        calendarId: objFilter.calendarId,
      }
    }) as GraphQLResult<MakeReservationResponse>;
    
    console.log("response.data", response.data)

    return response.data?.MakeReservationAndCart;
    
  } catch (error) {
    console.log("Error fetching calendar visits:", error);
    throw error;
  }
};
