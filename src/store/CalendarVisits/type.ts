export type calendarVisitInput = {
    startDate?: string,
    endDate?: string,
    userId: string,
};  

export type CalendarVisit = {
  calendarId?: string,
  summary?: string,
  location?: string,
  description?: string,
  startDate?: string,
  endDate?: string,
  timeZone?: string,
  duration: number,
  state: string,
  customerId: string,
  userId: string,
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
