"use client";

// components/BookingCalendar.tsx
import React, { useState, useEffect } from 'react';
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

// Define un tipo para tus horas disponibles
interface TimeSlot {
  time: string;
  available: boolean;
}


import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setStep, selectCalendarVisits } from "@/store/CalendarVisits/slice";


const mockAvailableTimes: { [key: string]: TimeSlot[] } = {
   // Martes
  '2025-05-27': [
    { time: '11:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
  
   // Miercoles
  '2025-05-28': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
   // Jueves
  '2025-05-29': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
  
   // Viernes
  '2025-05-30': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true },
  ],
  
   // Martes
  '2025-06-03': [
    { time: '11:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
  
   // Miercoles
  '2025-06-04': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
   // Jueves
  '2025-06-05': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
  
   // Viernes
  '2025-06-06': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true },
  ],
  
   // Martes
  '2025-06-10': [
    { time: '11:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
  
   // Miercoles
  '2025-06-11': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
   // Jueves
  '2025-06-12': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true }, 
    { time: '17:00', available: true }
  ],
  
   // Viernes
  '2025-06-13': [
    { time: '10:30', available: true }, 
    { time: '12:30', available: true }, 
    { time: '15:00', available: true },
  ],
  
  
};

export default function BookingCalendar() {
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2025-06-06')); // Inicializa con una fecha de ejemplo
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().tz('America/Santiago').startOf('week'));
  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);
  const [weekAvailableTimes, setWeekAvailableTimes] = useState<{ [key: string]: TimeSlot[] }>({});

  
  // const { 
  //   setStep
  // } = useAppSelector(selectCalendarVisits);
  
  const dispatch = useAppDispatch();

  
  
  // useEffect(() => {
  //   if (selectedDate) {
  //     const formattedDate = selectedDate.format('YYYY-MM-DD');
  //     // Simula la obtención de datos de una API
  //     const times = mockAvailableTimes[formattedDate] || [];
  //     setAvailableTimes(times);
  //   } else {
  //     setAvailableTimes([]);
  //   }
  // }, [selectedDate]);
  
  useEffect(() => {
    // Calcular los 7 días de la semana a partir de selectedDate
    const startOfWeek = selectedDate.startOf('week'); // Ahora comenzará en lunes
    const daysInWeek: Dayjs[] = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(startOfWeek.add(i, 'day'));
    }
    setWeekDays(daysInWeek);

    // Obtener las horas disponibles para cada día de la semana
    const newWeekAvailableTimes: { [key: string]: TimeSlot[] } = {};
    daysInWeek.forEach(day => {
      const formattedDate = day.format('YYYY-MM-DD');
      newWeekAvailableTimes[formattedDate] = mockAvailableTimes[formattedDate] || [];
    });
    setWeekAvailableTimes(newWeekAvailableTimes);

  }, [selectedDate]); // Se recalcula la semana cuando cambia la fecha seleccionada


  // const handleDateChange = (date: Dayjs | null) => {
  //   setSelectedDate(date);
  // };

  // const handleTimeSlotClick = (timeSlot: TimeSlot) => {
  //   if (timeSlot.available) {
  //     alert(`Has seleccionado la hora: ${timeSlot.time} el día ${selectedDate?.format('DD-MM-YYYY')}`);
  //     // Aquí puedes añadir la lógica para reservar la cita
  //   } else {
  //     alert(`La hora ${timeSlot.time} no está disponible.`);
  //   }
  // };

  // // Función para deshabilitar días que no tienen horas disponibles (opcional)
  // const shouldDisableDate = (day: Dayjs) => {
  //   const formattedDay = day.format('YYYY-MM-DD');
  //   return !mockAvailableTimes[formattedDay] || mockAvailableTimes[formattedDay].length === 0;
  // };
  
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      // Aseguramos que la fecha mantenga la configuración en español
      const newDate = date.tz('America/Santiago').locale('es').startOf('week');
      setSelectedDate(newDate);
    }
  };

  const handleTimeSlotClick = (date: Dayjs, timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      // alert(`Has seleccionado la hora: ${timeSlot.time} el día ${date.format('dddd, DD [de] MMMM')}`);
      dispatch(setStep(1))
    } else {
      alert(`La hora ${timeSlot.time} no está disponible.`);
    }
  };

  // Función para deshabilitar días en el calendario si no tienen horas disponibles en mockAvailableTimes
  const shouldDisableDate = (day: Dayjs) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !mockAvailableTimes[formattedDay] || mockAvailableTimes[formattedDay].length === 0;
  };

  return (
    <Box sx={{ p: 0 }}>

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
        <Box sx={{ width: '70%', height: '100%' }}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', overflowX: 'auto' }}>
            {weekDays.map((day) => {
              const formattedDay = day.format('YYYY-MM-DD');
              const timesForDay = weekAvailableTimes[formattedDay] || [];
              const isToday = day.isSame(dayjs(), 'day');

              return (
                <Box 
                  key={formattedDay} 
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
                          key={index}
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
        
        
        
