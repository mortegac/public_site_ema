"use client";

// components/BookingCalendar.tsx
import React, { useState, useEffect, useId, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";


type props = {
    date: string;
    format?: string;
};

import { Box, Grid, Typography, Button, Paper, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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


import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setStep, setDataForm, getInstallationDays, selectCalendarVisits, setSelectedInstallationDayId, setCalendarVisits } from "@/store/CalendarVisits/slice";
import { selectCustomer } from "@/store/Customer/slice";
import { useAnalytics } from '@/hooks/useAnalytics';
import { InstallationDay } from '@/store/CalendarVisits/type';



export const toChileTime = (props: props) => {
    const { date, format = "HH:mm" } = props;
    const dateUTC = new Date(date);
    return dayjs(dateUTC).tz('America/Santiago').format(format);
};


export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().tz('America/Santiago').startOf('week'));
  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);
  const [availableDays, setAvailableDays] = useState<{ [key: string]: InstallationDay }>({});

  const UUID = useId();
  const { 
    installationDays,
    statusCalendar,
  } = useAppSelector(selectCalendarVisits);
  
  const { customer } = useAppSelector(selectCustomer);
  
  const dispatch = useAppDispatch();
  const { trackEvent } = useAnalytics();

  // Fetch installation days when customer address is available
  useEffect(() => {
    const fetchData = async () => {
      if (!customer?.address) {
        // If no address, go back to form step
        dispatch(setStep(0));
        return;
      }

      const dateStr = selectedDate.format('YYYY-MM-DD');
      
      await dispatch(getInstallationDays({
        date: dateStr,
        address: customer.address,
        lat: customer.lat ? parseFloat(customer.lat) : undefined,
        long: customer.long ? parseFloat(customer.long) : undefined,
      }));
    };
    
    fetchData();
  }, [customer?.address, customer?.lat, customer?.long, selectedDate, dispatch]);

  // Update week days and available days mapping
  useEffect(() => {
    const startOfWeek = selectedDate.startOf('week');
    const daysInWeek: Dayjs[] = [];
    for (let i = 0; i < 5; i++) {
      daysInWeek.push(startOfWeek.add(i, 'day'));
    }
    setWeekDays(daysInWeek);

    // Map installation days by date
    const newAvailableDays: { [key: string]: InstallationDay } = {};
    
    if (Array.isArray(installationDays)) {
      installationDays.forEach((day: InstallationDay) => {
        if (day.date) {
          const dayDate = dayjs(day.date).format('YYYY-MM-DD');
          newAvailableDays[dayDate] = day;
        }
      });
    }

    setAvailableDays(newAvailableDays);
  }, [selectedDate, installationDays]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      trackEvent('seleccion_fecha', 'AGENDA_EMA', date.format('YYYY-MM-DD'));
      const newDate = date.tz('America/Santiago').locale('es').startOf('week');
      setSelectedDate(newDate);
    }
  };

  const handleDayClick = async (date: Dayjs, installationDay: InstallationDay | undefined) => {
    const dateStr = date.format('YYYY-MM-DD');
    trackEvent('seleccion_dia', 'AGENDA_EMA', dateStr);
    
    if (!customer?.address) {
      alert('Por favor, complete su dirección antes de continuar.');
      dispatch(setStep(0)); // Go back to form
      return;
    }
    
    if (installationDay && installationDay.availableTime > 0) {
      // Calculate startTime: selected day at 09:00 AM Chile time, converted to ISO datetime
      const startTime = date.tz('America/Santiago').hour(9).minute(0).second(0).millisecond(0).utc().toISOString();
      
      // Default duration: 30 minutes for technical visit
      const duration = 30;
      
      try {
        await Promise.all([
          dispatch(setSelectedInstallationDayId(installationDay.installationDayId)),
          dispatch(setDataForm({
            key: "installationDayId",
            value: installationDay.installationDayId
          })),
          dispatch(setCalendarVisits({
            customerId: customer.customerId || '',
            installationDayId: installationDay.installationDayId,
            startTime: startTime,
            duration: duration,
            address: customer.address,
            lat: customer.lat ? parseFloat(customer.lat) : undefined,
            long: customer.long ? parseFloat(customer.long) : undefined,
            isRemote: false,
          }))
        ]);
        
        // Navigate to payment step after reservation is created successfully
        dispatch(setStep(2));
      } catch (error) {
        console.error('Error creating reservation:', error);
        alert('Hubo un error al crear la reserva. Por favor, intente nuevamente.');
      }
    } else {
      trackEvent('dia_no_disponible', 'AGENDA_EMA', dateStr);
      alert(`El día ${date.format('D [de] MMMM')} no está disponible.`);
    }
  };

  
    // Funciones para cambiar de mes
  const handlePrevMonth = () => {
      trackEvent('cambio_semana_calendario', 'AGENDA_EMA', 'previous_month');
      setSelectedDate(prev => prev.subtract(1, 'week'));
    };
    const handleNextMonth = () => {
      trackEvent('cambio_semana_calendario', 'AGENDA_EMA', 'next_month');
      setSelectedDate(prev => prev.add(1, 'week'));
    };
    
  // Calcula el primer y último día de la semana seleccionada
  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = selectedDate.endOf('week');

  // Si el mes y año son iguales, muestra solo uno
  let weekLabel = startOfWeek.format('MMMM YYYY');
  if (
    startOfWeek.format('MMMM YYYY') !== endOfWeek.format('MMMM YYYY')
  ) {
    // Si el mes o año cambian, muestra ambos
    weekLabel = `${startOfWeek.format('MMMM YYYY')} - ${endOfWeek.format('MMMM YYYY')}`;
  }


  return (
    <Box sx={{ p: 0 }} key={`${UUID}-CALENDAR`}>
      {/* <pre>installerId = {JSON.stringify(lastScheduleInstallers, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(weekAvailableTimes, null, 2)}</pre> */}
      <Typography
        align="left"
        sx={{
          display: "block",
          paddingBottom: "20px",
          fontSize: "16px",
          lineHeight: "1.2",
          marginTop: "0",
          color: (theme) => theme.palette.text.primary
        }}
        component="span"
        >
          Seleccione un día disponible para continuar con el proceso de reserva de su visita técnica
      </Typography>
  

      <Box sx={{ display: 'flex', gap: 4, height: { xs: 'auto', md: '500px' }, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Calendario mensual */}
        <Box sx={{ width: { xs: '100%', md: '30%' }, height: { xs: 'auto', md: 'auto' }, display: { xs: 'none', md: 'block' } }}>
          <Paper elevation={3} sx={{ p: 2, pb:10,  height: { xs: 'auto', md: 'auto' } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                views={['month', 'day']}
                disablePast={true}
                shouldDisableDate={(date) => {
                  return date.isSame(dayjs(), 'day');
                }}
                sx={{
                  width: '100%',
                  height: { xs: 'auto', md: '100%' },
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
                    textDecoration: 'line-through',
                  },
                  '.MuiPickersDay-root.MuiPickersDay-today': {
                    border: '2px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    textDecoration: 'line-through',
                  },
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Box>

        {/* Semana con días disponibles */}
          <Box sx={{ width: { xs: '100%', md: '70%' }, height: { xs: 'auto', md: '100%' } }}>
            
            <Box sx={{ position: 'relative', top: 0, left: 0, zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: '#f5f5f5', paddingY:1, marginBottom: 1 }}>
             
             <Box sx={{ justifyContent: 'space-between' }}>
               <IconButton onClick={handlePrevMonth} size="small">
                 <ArrowBackIcon />
               </IconButton>
             </Box>
             <Typography
               variant="subtitle1"
               align="center"
               sx={{
                //  fontWeight: 'bold',
                 pb: 1,
                 textTransform: 'uppercase',
               }}
             >
               {weekLabel}
             </Typography>
             <Box sx={{  }}>
               <IconButton onClick={handleNextMonth} size="small">
                 <ArrowForwardIcon />
               </IconButton>
             </Box>
           </Box>
           
          
           {/* <pre>{JSON.stringify(weekDays, null, 2)}</pre> */}
            <Paper elevation={3} sx={{ 
                      position: 'relative', p: 2, pb:10, height: 'auto', minHeight: '230px', display: 'flex', flexDirection:'column'}}>
              
              {
                  statusCalendar === "loading" &&  <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    zIndex: 2, 
                    background: '#ffffffc2', 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 'auto', minHeight: '230px',
                     }}>
                  <LoadingIcon icon="puff" color="#E81A68" style={{width:"60px", height:"60px"}}/>
                </Box>
                }
                <Box sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', overflowX: 'auto', paddingLeft:2 }}>
              
                {weekDays.map((day, i) => {
                  const formattedDay = day.format('YYYY-MM-DD');
                  const installationDay = availableDays[formattedDay];
                  const isToday = day.isSame(dayjs(), 'day');
                  const isAvailable = installationDay && installationDay.availableTime > 0;
                  const isPast = day.isBefore(dayjs(), 'day');

                  return (
                    <Box 
                      key={`${formattedDay}-${i}`} 
                      sx={{
                        minWidth: { xs: 100, md: 150 }, 
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
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        minHeight: '100px',
                      }}>
                        {isAvailable && !isPast ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDayClick(day, installationDay)}
                            sx={{
                              minWidth: 'auto',
                              width: '100%',
                              paddingY: 2,
                            }}
                          >
                            Disponible
                          </Button>
                        ) : (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            align="center"
                            sx={{
                              padding: 2,
                            }}
                          >
                            {isPast ? 'Fecha pasada' : 'No disponible'}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
           
            
              
            </Paper>
            
          </Box>
          
        {/* )} */}
        
      </Box>
      <Typography
        align="left"
                    sx={{
                      display: "block",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      fontSize: "14px",
                      lineHeight: "1.2",
                      marginTop: "0",
                      color: (theme) => theme.palette.text.primary
                    }}
                    component="span"
        >
          VALOR VISITA TÉCNICA: $10.000
          </Typography>
      <Typography
        align="left"
                    sx={{
                      display: "block",
                      paddingTop: "2px",
                      paddingBottom: "8px",
                      fontSize: "14px",
                      lineHeight: "1.2",
                      marginTop: "0",
                      color: (theme) => theme.palette.text.primary
                    }}
                    component="span"
        >(El costo de la visita se descuenta de la instalación.)
      </Typography>
      <Typography
        align="left"
                    sx={{
                      display: "block",
                      paddingTop: "8px",
                      paddingBottom: "0",
                      fontSize: "14px",
                      lineHeight: "1.2",
                      marginTop: "0",
                      color: (theme) => theme.palette.text.primary
                    }}
                    component="span"
        >
          Servicio disponible sólo en RM y provincias específicas de V y VI Región.
      </Typography>
                <Link href={`https://energica.city/t-y-c-cotizador`}>
                      <Typography
                        sx={{
                          display: "block",
                          padding: "10px 0",
                          fontSize: "15px",
                          textAlign:"left",
                          color: (theme) => theme.palette.text.primary,
                          "&:hover": {
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                        component="span"
                      >
                        Conozca aquí nuestros términos y condiciones
                      </Typography>
                    </Link>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={
            <Box
              component="span"
              sx={{
                mr: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(232, 26, 104, 0.1)',
                color: '#E81A68',
                '&::after': {
                  content: '"\\276E"',
                  fontSize: '16px',
                  lineHeight: 1,
                },
              }}
            />
          }
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '24px',
            background: `${statusCalendar === "loading" ? "#bfbfbf" : "#FFFFFF"}`,
            color: "#E81A68",
            border: "1px solid #E81A68",
          }}
          disabled={statusCalendar === "loading"}
          onClick={() => dispatch(setStep(0))}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
}