"use client";


import React, { useState, useEffect } from 'react';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { Box, Grid, Typography, Button, Paper, Divider } from '@mui/material';
import { format, parseISO, startOfWeek, endOfWeek, addDays, isSameDay, isBefore, isWithinInterval } from 'date-fns';
import { AdapterDateFns as AdapterDateFnsV2 } from '@mui/x-date-pickers/AdapterDateFnsV2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import es from 'date-fns/locale/es';

// Define un tipo para tus horas disponibles
interface TimeSlot {
  time: string;
  available: boolean;
}

// Datos de ejemplo de horas disponibles (simularía una API)
const mockAvailableTimes: { [key: string]: TimeSlot[] } = {
  // Asegúrate de que los años sean correctos, basándonos en la fecha actual (2025)
  '2025-05-26': [{ time: '09:00', available: true }, { time: '11:00', available: true }], // Lunes
  '2025-05-27': [{ time: '10:00', available: true }, { time: '14:00', available: true }], // Martes
  '2025-05-28': [{ time: '09:30', available: true }, { time: '13:00', available: true }, { time: '16:00', available: false }], // Miércoles
  '2025-05-29': [], // Jueves sin horas
  '2025-05-30': [
    { time: '10:30', available: true },
    { time: '12:30', available: true },
    { time: '15:00', available: true },
    { time: '17:00', available: false },
  ], // Viernes
  '2025-05-31': [{ time: '09:00', available: false }], // Sábado (no disponible)
  '2025-06-01': [], // Domingo sin horas
  '2025-06-02': [{ time: '11:00', available: true }, { time: '15:00', available: true }], // Lunes siguiente
  '2025-06-03': [
    { time: '11:30', available: true },
    { time: '15:00', available: true },
    { time: '17:00', available: true },
  ], // Martes siguiente
  '2025-06-04': [
    { time: '10:30', available: true },
    { time: '12:30', available: true },
    { time: '15:00', available: true },
    { time: '17:00', available: true },
  ], // Miércoles siguiente
  '2025-06-05': [{ time: '10:00', available: true }],
};

export default function BookingCalendar() {
  // Este es el día que el usuario seleccionó en el calendario de la izquierda
  const [calendarSelectedDay, setCalendarSelectedDay] = useState<Date | null>(new Date());

  // Este es el día que define la semana que se muestra a la derecha
  const [weekDisplayStartDay, setWeekDisplayStartDay] = useState<Date>(startOfWeek(new Date()));

  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [weekAvailableTimes, setWeekAvailableTimes] = useState<{ [key: string]: TimeSlot[] }>({});

  useEffect(() => {
    if (!calendarSelectedDay) return;

    // La semana a mostrar a la derecha se basa en el día seleccionado
    const start = startOfWeek(calendarSelectedDay);
    setWeekDisplayStartDay(start); // Actualiza el estado de la semana que se está mostrando

    const daysInWeek: Date[] = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(addDays(start, i));
    }
    setWeekDays(daysInWeek);

    const newWeekAvailableTimes: { [key: string]: TimeSlot[] } = {};
    daysInWeek.forEach(day => {
      const formattedDate = format(day, 'yyyy-MM-dd');
      newWeekAvailableTimes[formattedDate] = mockAvailableTimes[formattedDate] || [];
    });
    setWeekAvailableTimes(newWeekAvailableTimes);

  }, [calendarSelectedDay]); // Se recalcula la semana cuando cambia el día seleccionado en el calendario

  const handleDateChange = (date: Date | null) => {
    // Cuando el usuario selecciona un día en el calendario, actualizamos calendarSelectedDay
    setCalendarSelectedDay(date);
  };

  const handleTimeSlotClick = (date: Date, timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      alert(`Has seleccionado la hora: ${timeSlot.time} el día ${format(date, "EEEE, dd 'de' MMMM", { locale: es })}`);
      // Aquí puedes añadir la lógica para reservar la cita
    } else {
      alert(`La hora ${timeSlot.time} no está disponible.`);
    }
  };

  const shouldDisableDate = (day: Date) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    // Deshabilitar días pasados
    if (isBefore(day, new Date())) {
      return true;
    }
    // Deshabilitar días sin horas disponibles
    return !mockAvailableTimes[formattedDay] || mockAvailableTimes[formattedDay].length === 0;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsV2} adapterLocale={es}>
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Selecciona un horario para la cita
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        (GMT-04:00) Hora de Chile
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, gap: 4 }}>
        {/* Sección del calendario */}
        <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 3' } }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <DateCalendar
              // Ahora el DateCalendar usa calendarSelectedDay, que es el día exacto clicado
              value={calendarSelectedDay}
              onChange={(date) => handleDateChange(date as Date | null)}
              views={['month', 'day']}
              disablePast={false} // Permitir seleccionar días pasados en el calendario si se desea verlos
              shouldDisableDate={(day) => shouldDisableDate(day as Date)} // Esta función seguirá deshabilitando días sin citas o pasados
              sx={{
                width: '100%',
                '.MuiPickersDay-root': {
                  borderRadius: '8px',
                },
                '.MuiPickersDay-root.Mui-selected': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                  },
                },
              }}
              slots={{
                // Usamos renderDay para estilizar los días que pertenecen a la semana visible a la derecha
                day: (props) => {
                  const dayDate = props.day as Date;
                  const startOfDisplayWeek = startOfWeek(weekDisplayStartDay);
                  const endOfDisplayWeek = endOfWeek(weekDisplayStartDay);
                  const isWithinSelectedWeek = isWithinInterval(dayDate, { start: startOfDisplayWeek, end: endOfDisplayWeek });

                  return (
                    <PickersDay
                      {...props}
                      sx={{
                        backgroundColor: isWithinSelectedWeek ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                        borderRadius: '8px',
                        ...(props.selected && {
                          backgroundColor: 'transparent',
                        }),
                      }}
                    />
                  );
                },
              }}
            />
          </Paper>
        </Box>

        {/* Sección de las franjas horarias por día de la semana */}
        <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 9' } }}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', overflowX: 'auto' }}>
            {weekDays.map((day) => {
              const formattedDay = format(day, 'yyyy-MM-dd');
              const timesForDay = weekAvailableTimes[formattedDay] || [];
              const isToday = isSameDay(day, new Date());
              // Resaltar el día seleccionado en el calendario también en la vista de la semana
              const isSelectedDayInWeekView = calendarSelectedDay ? isSameDay(calendarSelectedDay, day) : false;


              return (
                <Box
                  key={formattedDay}
                  sx={{
                    minWidth: 150,
                    mr: 2,
                    flexShrink: 0,
                    // Estilo para resaltar el día seleccionado en la vista de la semana
                    border: isSelectedDayInWeekView ? '2px solid' : 'none',
                    borderColor: isSelectedDayInWeekView ? (theme) => theme.palette.primary.main : 'transparent',
                    borderRadius: '8px',
                    p: 1, // Añade un poco de padding para que el borde no quede pegado
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{
                      fontWeight: isToday ? 'bold' : 'normal',
                      color: isToday ? (theme) => theme.palette.primary.main : 'inherit',
                      pb: 1,
                    }}
                  >
                    {format(day, 'EEE', { locale: es }).toUpperCase()}{' '}
                    <br />
                    <Typography variant="h6" component="span">
                      {format(day, 'd')}
                    </Typography>
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {timesForDay.length > 0 ? (
                      timesForDay.map((slot, index) => (
                        <Button
                          key={index}
                          variant={slot.available ? 'outlined' : 'text'}
                          // Deshabilita si la hora no está disponible o el día es pasado
                          disabled={!slot.available || isBefore(day, new Date())}
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
                        No hay horas
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
    </LocalizationProvider>
  );
}
