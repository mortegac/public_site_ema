"use client";


import React, { useState, useEffect } from 'react';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { Box, Grid, Typography, Button, Paper, Divider } from '@mui/material';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español para dayjs
import weekday from 'dayjs/plugin/weekday'; // Plugin para obtener el día de la semana
import isBetween from 'dayjs/plugin/isBetween'; // Plugin para verificar si una fecha está entre otras

// Extiende dayjs con los plugins ANTES de usar dayjs en tu componente
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.locale('es'); // Establece el idioma globalmente para dayjs

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
  const [calendarSelectedDay, setCalendarSelectedDay] = useState<Dayjs | null>(dayjs());

  // Este es el día que define la semana que se muestra a la derecha
  const [weekDisplayStartDay, setWeekDisplayStartDay] = useState<Dayjs>(dayjs().startOf('week'));

  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);
  const [weekAvailableTimes, setWeekAvailableTimes] = useState<{ [key: string]: TimeSlot[] }>({});

  useEffect(() => {
    if (!calendarSelectedDay) return;

    // La semana a mostrar a la derecha se basa en el día seleccionado
    const startOfWeek = calendarSelectedDay.startOf('week');
    setWeekDisplayStartDay(startOfWeek); // Actualiza el estado de la semana que se está mostrando

    const daysInWeek: Dayjs[] = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(startOfWeek.add(i, 'day'));
    }
    setWeekDays(daysInWeek);

    const newWeekAvailableTimes: { [key: string]: TimeSlot[] } = {};
    daysInWeek.forEach(day => {
      const formattedDate = day.format('YYYY-MM-DD');
      newWeekAvailableTimes[formattedDate] = mockAvailableTimes[formattedDate] || [];
    });
    setWeekAvailableTimes(newWeekAvailableTimes);

  }, [calendarSelectedDay]); // Se recalcula la semana cuando cambia el día seleccionado en el calendario

  const handleDateChange = (date: Dayjs | null) => {
    // Cuando el usuario selecciona un día en el calendario, actualizamos calendarSelectedDay
    setCalendarSelectedDay(date);
  };

  const handleTimeSlotClick = (date: Dayjs, timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      alert(`Has seleccionado la hora: ${timeSlot.time} el día ${date.format('dddd, DD [de] MMMM')}`);
      // Aquí puedes añadir la lógica para reservar la cita
    } else {
      alert(`La hora ${timeSlot.time} no está disponible.`);
    }
  };

  const shouldDisableDate = (day: Dayjs) => {
    const formattedDay = day.format('YYYY-MM-DD');
    // Deshabilitar días pasados
    if (day.isBefore(dayjs(), 'day')) {
      return true;
    }
    // Deshabilitar días sin horas disponibles
    return !mockAvailableTimes[formattedDay] || mockAvailableTimes[formattedDay].length === 0;
  };

  return (
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
              onChange={handleDateChange}
              views={['month', 'day']}
              disablePast={false} // Permitir seleccionar días pasados en el calendario si se desea verlos
              shouldDisableDate={shouldDisableDate} // Esta función seguirá deshabilitando días sin citas o pasados
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
                  const day = dayjs(props.day);
                  const startOfDisplayWeek = weekDisplayStartDay.startOf('week');
                  const endOfDisplayWeek = weekDisplayStartDay.endOf('week');
                  const isWithinSelectedWeek = day.isBetween(startOfDisplayWeek, endOfDisplayWeek, null, '[]');

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
              const formattedDay = day.format('YYYY-MM-DD');
              const timesForDay = weekAvailableTimes[formattedDay] || [];
              const isToday = day.isSame(dayjs(), 'day');
              // Resaltar el día seleccionado en el calendario también en la vista de la semana
              const isSelectedDayInWeekView = calendarSelectedDay?.isSame(day, 'day');


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
                    {day.format('ddd').toUpperCase()}{' '}
                    <br />
                    <Typography variant="h6" component="span">
                      {day.format('D')}
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
  );
}