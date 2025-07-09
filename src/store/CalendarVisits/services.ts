import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { calendarVisitInput } from './type';
import { GraphQLResult } from '@aws-amplify/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { configureAmplify } from "@/utils/amplify-config";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

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

interface InstallerWithCalendar {
  userId: string;
  name: string;
  CalendarVisits: {
    items: Array<{
      startDate: string;
      state: string;
    }>;
  };
}

interface ListUsersResponse {
  listUsers: {
    items: InstallerWithCalendar[];
  };
}

interface ScheduleOneInstallerResponse {
  CalendarVisitsByState: {
    items: Array<{
      calendarId: string;
      startDate: string;
      state: string;
      userId: string;
    }>;
  };
}
export const fetchLastScheduleOneInstaller = async (userId: string) => {
  try {
    
    const startDate = dayjs().utc().startOf('day').format('YYYY-MM-DD[T]00:00:00.000[Z]');
    const endDate = dayjs().utc().add(60, 'days').endOf('day').format('YYYY-MM-DD[T]00:00:00.000[Z]');

    
    const response = await client.graphql<ScheduleOneInstallerResponse>({
      query: `
        query getLatestCalendarVisit($userId: ID!, $startDate: String!, $endDate: String!) {
          CalendarVisitsByState(
            state: available
            startDate: {
              between: [$startDate, $endDate]
            }
            filter: {
              userId: {eq: $userId}
            }
            sortDirection: ASC
          ) {
            items {
              calendarId
              startDate
              state
              userId
            }
          }
        }
      `,
      variables: {
        userId: userId,
        startDate: startDate || "",
        endDate: endDate || "",
      }
    }) as GraphQLResult<ScheduleOneInstallerResponse>;
    
    // console.log("response.data", response.data?.CalendarVisitsByState?.items)

    return response.data?.CalendarVisitsByState?.items || [];
  } catch (error) {
    console.log("Error fetching calendar visits:", error);
    throw error;
  }
};

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
    
    // console.log("response.data", response.data)

    return { data: response.data?.CalendarVisitsByState?.items || [], nextToken: null };
  } catch (error) {
    console.log("Error fetching calendar visits:", error);
    throw error;
  }
};

export const fetchLastScheduleInstallers = async () => {
  try {
    const startDate = dayjs().utc().startOf('day').format('YYYY-MM-DD[T]00:00:00.000[Z]');
    const endDate = dayjs().utc().add(30, 'days').endOf('day').format('YYYY-MM-DD[T]00:00:00.000[Z]');

    const response = await client.graphql<ListUsersResponse>({
      query: `
        query LIST_USERS($startDate: String!, $endDate: String!) {
          listUsers(
            filter: {
              roleId: {eq: "installer"}
            }
          ) {
            items {
              userId
              name
              CalendarVisits(
                filter: {
                  startDate: {
                    between: [$startDate, $endDate]
                  },
                  state: {eq: available}
                }
                sortDirection: ASC
                limit: 1
              ) {
                items {
                calendarId
                  startDate
                  state
                }
              }
            }
          }
        }
      `,
      variables: {
        startDate: startDate,
        endDate: endDate
      }
    }) as GraphQLResult<ListUsersResponse>;
    
    // console.log("response.data", response.data)

    return response.data?.listUsers?.items || [];
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
    
    // console.log("response.data", response.data)

    return response.data?.MakeReservationAndCart;
    
  } catch (error) {
    console.log("Error fetching calendar visits:", error);
    throw error;
  }
};
