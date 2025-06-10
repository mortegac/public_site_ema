"use client";

// components/BookingCalendar.tsx
import React, { useState, useEffect, useId, useMemo } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Configura dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.locale('es'); // Establece el idioma español
dayjs.tz.setDefault('America/Santiago'); // Establece la zona horaria de Santiago

// Configura la semana para que comience en lunes y personaliza el idioma español
dayjs.updateLocale('es', {
  weekStart: 1,
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthsShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  weekdays: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
  }
});

import LoadingIcon from "@/app/components/shared/LoadingIcon";

// Define un tipo para tus horas disponibles
interface TimeSlot {
  time: string;
  available: boolean;
  calendarId: string;
}

interface CalendarVisit {
  calendarId: string;
  summary: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  timeZone: string;
  duration: number;
  state: string;
  customerId: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CalendarVisitsResponse {
  data: CalendarVisit[];
  nextToken?: string;
}

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setStep, setDataForm, getCalendarVisits, selectCalendarVisits } from "@/store/CalendarVisits/slice";
import { setInstaller } from "@/store/CalendarVisits/slice";

export default function BookingCalendar() {
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().tz('America/Santiago').startOf('week'));
  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);
  const [weekAvailableTimes, setWeekAvailableTimes] = useState<{ [key: string]: TimeSlot[] }>({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedInstaller, setSelectedInstaller] = useState<string>("");

  const UUID = useId();
  const { 
    calendarVisits, 
    status,
    installerId
  } = useAppSelector(selectCalendarVisits);
  
  const dispatch = useAppDispatch();

  // Memoizamos las fechas de inicio y fin de semana
  const weekDates = useMemo(() => {
    const startOfWeek = selectedDate.startOf('week');
    const endOfWeek = selectedDate.endOf('week');
    return {
      startDate: startOfWeek.utc().format('YYYY-MM-DD[T]00:00:00.000[Z]'),
      endDate: endOfWeek.utc().format('YYYY-MM-DD[T]00:00:00.000[Z]')
    };
  }, [selectedDate]);

  // Efecto para cargar las visitas iniciales y cuando cambia el instalador
  useEffect(() => {
    const fetchData = async () => {
      if (!installerId) return;
      
      await dispatch(getCalendarVisits({
        startDate: weekDates.startDate,
        endDate: weekDates.endDate,
        userId: installerId
      }));
    };
    
    fetchData();
  }, [installerId, weekDates.startDate, weekDates.endDate, dispatch]);

  // Efecto para la carga inicial
  useEffect(() => {
    if (initialLoad) {
      handleInstaller("ariel.rivera@energica.city");
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Efecto para actualizar la vista semanal
  useEffect(() => {
    // Calcular los 7 días de la semana a partir de selectedDate
    const startOfWeek = selectedDate.startOf('week');
    const daysInWeek: Dayjs[] = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(startOfWeek.add(i, 'day'));
    }
    setWeekDays(daysInWeek);

    // Obtener las horas disponibles para cada día de la semana
    const newWeekAvailableTimes: { [key: string]: TimeSlot[] } = {};
    
    daysInWeek.forEach(day => {
      const formattedDate = day.format('YYYY-MM-DD');
      const visitsForDay = (calendarVisits as unknown as CalendarVisitsResponse)?.data?.filter((visit: CalendarVisit) => {
        const visitDate = dayjs(visit.startDate).format('YYYY-MM-DD');
        return visitDate === formattedDate;
      }) || [];

      newWeekAvailableTimes[formattedDate] = visitsForDay.map((visit: CalendarVisit) => ({
        time: dayjs(visit.startDate).format('HH:mm'),
        available: visit.state === 'available' && !visit.customerId,
        calendarId: visit.calendarId
      }));
    });

    setWeekAvailableTimes(newWeekAvailableTimes);
  }, [selectedDate, calendarVisits]);

  const handleInstaller = async (installerId: string) => {
    setSelectedInstaller(installerId);
    await dispatch(setInstaller(installerId));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const newDate = date.tz('America/Santiago').locale('es').startOf('week');
      setSelectedDate(newDate);
    }
  };

  const handleTimeSlotClick = async (date: Dayjs, timeSlot: TimeSlot) => {
    
    console.log("--timeSlot--", timeSlot)
    
    if (timeSlot.available) {
      // alert(`Has seleccionado la hora: ${timeSlot.time} el día ${date.format('dddd, DD [de] MMMM')} con ID: ${timeSlot.calendarId}`);
      Promise.all([
        await dispatch(setDataForm({
          key:"calendarId", value:timeSlot?.calendarId
        })),
        dispatch(setStep(1))
      ])
      // userId: "",
    } else {
      alert(`La hora ${timeSlot.time} no está disponible.`);
    }
  };

  return (
    <Box sx={{ p: 0 }} key={`${UUID}-CALENDAR`}>
      {/* <pre>installerId = {JSON.stringify(installerId, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(weekAvailableTimes, null, 2)}</pre> */}
      <Typography
        align="left"
                    sx={{
                      display: "block",
                      paddingBottom: "30px",
                      fontSize: "18px",
                      lineHeight: "2",
                      marginTop: "0",
                      color: (theme) => theme.palette.text.primary
                    }}
                    component="span"
        >
          Seleccione una hora para continuar con el proceso de reserva de su visita técnica
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, height: '350px' }}>
        {/* Calendario mensual */}
        <Box sx={{ width: '30%', height: '100%' }}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">



              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                views={['month', 'day']}
                disablePast={true}
                sx={{
                  width: '100%',
                  height: '100%',
                  '.MuiPickersDay-root': {
                    borderRadius: '8px',
                    margin: '2px',
                    width: '36px',
                    height: '36px',
                  },
                  '.MuiPickersDay-root.Mui-selected': {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                  },
                  '.MuiPickersCalendarHeader-label': {
                    textTransform: 'capitalize',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  },
                  '.MuiPickersDay-root .MuiPickersDay-label': {
                    textTransform: 'capitalize',
                  },
                  '.MuiPickersCalendarHeader-switchHeader': {
                    textTransform: 'capitalize',
                  },
                  '.MuiPickersCalendarHeader-switchViewButton': {
                    color: (theme) => theme.palette.primary.main,
                  },
                  '.MuiPickersDay-root.Mui-disabled': {
                    color: (theme) => theme.palette.text.disabled,
                  },
                  '.MuiPickersDay-root.MuiPickersDay-today': {
                    border: '2px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Box>

        {/* Semana con horas disponibles */}
        {status === "loading" ? (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
            <LoadingIcon icon="puff" color="rgb(86, 193, 0)" className="m-8 h-20"/>
          </Box>
        ) : (
          <Box sx={{ width: '70%', height: '100%' }}>
            <Box sx={{ marginBottom: 4 }}>
              <Button 
                sx={{ 
                  marginRight: 5,
                  backgroundColor: selectedInstaller === "ariel.rivera@energica.city" ? 'black' : '#f5f5f5',
                  color: selectedInstaller === "ariel.rivera@energica.city" ? 'white' : 'inherit',
                  border: '1px solid',
                  borderColor: selectedInstaller === "ariel.rivera@energica.city" ? 'black' : '#e8e4e4',
                  '&:hover': {
                    backgroundColor: selectedInstaller === "ariel.rivera@energica.city" ? 'black' : '#e0e0e0',
                    borderColor: selectedInstaller === "ariel.rivera@energica.city" ? 'black' : '#e8e4e4',
                  }
                }}
                onClick={() => handleInstaller("ariel.rivera@energica.city")}
              >
                Instalador 1
              </Button>
              <Button
                sx={{ 
                  marginRight: 5,
                  backgroundColor: selectedInstaller === "matias.vera@energica.city" ? 'black' : '#f5f5f5',
                  color: selectedInstaller === "matias.vera@energica.city" ? 'white' : 'inherit',
                  border: '1px solid',
                  borderColor: selectedInstaller === "matias.vera@energica.city" ? 'black' : '#e8e4e4',
                  '&:hover': {
                    backgroundColor: selectedInstaller === "matias.vera@energica.city" ? 'black' : '#e0e0e0',
                    borderColor: selectedInstaller === "matias.vera@energica.city" ? 'black' : '#e8e4e4',
                  }
                }}
                onClick={() => handleInstaller("matias.vera@energica.city")}
              >
                Instalador 2
              </Button>
              <Button
                sx={{ 
                  backgroundColor: selectedInstaller === "fj.novoap@gmail.com" ? 'black' : '#f5f5f5',
                  color: selectedInstaller === "fj.novoap@gmail.com" ? 'white' : 'inherit',
                  border: '1px solid',
                  borderColor: selectedInstaller === "fj.novoap@gmail.com" ? 'black' : '#e8e4e4',
                  '&:hover': {
                    backgroundColor: selectedInstaller === "fj.novoap@gmail.com" ? 'black' : '#e0e0e0',
                    borderColor: selectedInstaller === "fj.novoap@gmail.com" ? 'black' : '#e8e4e4',
                  }
                }}
                onClick={() => handleInstaller("fj.novoap@gmail.com")}
              >
                Instalador 3
              </Button>
            </Box>
            <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', overflowX: 'auto' }}>
              {/* <pre>{JSON.stringify(weekDays, null, 2 )}</pre> */}
              {weekDays.map((day, i) => {
                const formattedDay = day.format('YYYY-MM-DD');
                const timesForDay = weekAvailableTimes[formattedDay] || [];
                const isToday = day.isSame(dayjs(), 'day');

                return (
                  <Box 
                    key={`${formattedDay}-${i}`} 
                    sx={{
                      minWidth: 150, 
                      mr: 2, 
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      align="center"
                      sx={{
                        fontWeight: isToday ? 'bold' : 'normal',
                        color: isToday ? (theme) => theme.palette.primary.main : 'inherit',
                        pb: 1,
                        textTransform: 'capitalize',
                      }}
                    >
                      {day.format('dddd').slice(0, 3).toUpperCase()}
                      <br />
                      <Typography variant="h6" component="span">
                        {day.format('D')}
                      </Typography>
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 1,
                      overflowY: 'auto',
                      flex: 1,
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                        '&:hover': {
                          background: '#555',
                        },
                      },
                    }}>
                      {timesForDay.length > 0 ? (
                        timesForDay.map((slot, index) => (
                          <Button
                            key={`${formattedDay}-${slot.time}-${index}`}
                            variant={slot.available ? 'outlined' : 'text'}
                            disabled={!slot.available || day.isBefore(dayjs(), 'day')}
                            onClick={() => handleTimeSlotClick(day, slot)}
                            sx={{
                              minWidth: 'auto',
                              width: '100%',
                              border: slot.available ? '1px solid' : 'none',
                              borderColor: (theme) => theme.palette.primary.main,
                              color: slot.available ? (theme) => theme.palette.primary.main : (theme) => theme.palette.text.disabled,
                              '&.Mui-disabled': {
                                borderColor: (theme) => theme.palette.action.disabledBackground,
                                color: (theme) => theme.palette.text.disabled,
                              },
                            }}
                          >
                            {slot.time}
                          </Button>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary" align="center">
                          No hay horas disponibles
                        </Typography>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Paper>
          </Box>
        )}
        
      </Box>
    </Box>
  );
}


 {/* Sección de las franjas horarias */}
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, minWidth: "100%" }}>
            {selectedDate ? (
              <>
                <Typography variant="h6">
                  Horas disponibles para el {selectedDate.format('dddd, DD [de] MMMM')}
                </Typography>
                {availableTimes.length > 0 ? (
                  <Grid container spacing={1}>
                    {availableTimes.map((slot, index) => (
                      <Grid item key={index}>
              <Button
                          variant={slot.available ? 'outlined' : 'text'}
                          disabled={!slot.available}
                          onClick={() => handleTimeSlotClick(slot)}
                          sx={{
                            minWidth: 100, // Ajusta el ancho de los botones
                            border: slot.available ? '1px solid' : 'none',
                            borderColor: (theme) => theme.palette.primary.main,
                            color: slot.available ? (theme) => theme.palette.primary.main : (theme) => theme.palette.text.disabled,
                            '&.Mui-disabled': {
                              borderColor: (theme) => theme.palette.action.disabledBackground,
                              color: (theme) => theme.palette.text.disabled,
                            },
                          }}
                        >
                          {slot.time}
              </Button>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1">No hay horas disponibles para este día.</Typography>
                )}
              </>
            ) : (
              <Typography variant="body1">Selecciona una fecha para ver las horas disponibles.</Typography>
            )}
          </Paper>
        </Grid> */}
        
        
        
