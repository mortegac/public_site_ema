export type calendarVisitInput = {
    startDate?: string,
    endDate?: string,
    userId?: string,
    customerId?: string,
    calendarId?: string, // Keep for backward compatibility
    installationDayId?: string,
    startTime?: string, // ISO datetime string
    duration?: number, // Duration in minutes
    address?: string,
    lat?: number,
    long?: number,
    isRemote?: boolean,
};  

export type CalendarVisit = {
  calendarId?: string,
  userId: string,
  summary?: string,
  location?: string,
  description?: string,
  startDate?: string,
  endDate?: string,
  timeZone?: string,
  duration: number,
  state: string,
  customerId: string,
};

export const emptyCalendarVisit: CalendarVisit = {
  calendarId: "",
  summary: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  timeZone: "",
  duration: 0,
  state: "",
  customerId: "",
  userId: "",
};

export interface InstallationDay {
  installationDayId: string;
  date: string;
  day: string;
  usedTime: number;
  maxTime: number;
  availableTime: number;
  userId: string;
  type?: string;
  startLocationLatitude?: string;
  startLocationLongitude?: string;
  endLocationLatitude?: string;
  endLocationLongitude?: string;
  route?: string;
  routeDistance?: number;
  routeDuration?: number;
  routeTravelTime?: number;
  routeLegs?: string;
}

export interface CalendarVisitReturnType {
  startDate?: string;
  endDate?: string;
  timeZone?: string;
}

export interface CalendarVisitGroupReturnType {
  date?: string;
  calendarVisits?: CalendarVisitReturnType[] | null;
}

export interface FetchCalendarForDateResponse {
  message: string;
  installationDays: InstallationDay[];
  calendarVisitGroups?: CalendarVisitGroupReturnType[];
}
