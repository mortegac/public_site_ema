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
import { setStep, setInstaller, setDataForm, getCalendarVisits, getLastScheduleInstallers, selectCalendarVisits, setLoadingCalendar } from "@/store/CalendarVisits/slice";
import { useAnalytics } from '@/hooks/useAnalytics';

interface InstallerWithCalendar {
  userId: string;
  name: string;
  startDate: string;
  calendarId: string;
  getLastScheduleInstallers: string;
}



export const toChileTime = (props: props) => {
    const { date, format = "HH:mm" } = props;
    const dateUTC = new Date(date);
    return dayjs(dateUTC).tz('America/Santiago').format(format);
};


const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'DEV';
    
      
export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().tz('America/Santiago').startOf('week'));
  const [weekDays, setWeekDays] = useState<Dayjs[]>([]);
  const [weekAvailableTimes, setWeekAvailableTimes] = useState<{ [key: string]: TimeSlot[] }>({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedInstaller, setSelectedInstaller] = useState<string>("");

  const UUID = useId();
  const { 
    calendarVisits, 
    lastScheduleInstallers,
    status,
    statusCalendar,
    installerId,    
  } = useAppSelector(selectCalendarVisits);
  
  const dispatch = useAppDispatch();
  const { trackEvent } = useAnalytics();

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
      // handleInstaller("ariel.rivera@energica.city");
      dispatch(getLastScheduleInstallers())
      setInitialLoad(false);
      trackEvent('carga_agenda', 'AGENDA_EMA');
    }
  }, [initialLoad]);

  // Nuevo efecto para manejar la selección automática de fecha
  useEffect(() => {
    if (Array.isArray(lastScheduleInstallers) && lastScheduleInstallers.length > 0) {
      const firstInstaller = lastScheduleInstallers[0];
      if (firstInstaller?.startDate && firstInstaller?.userId) {
        // Primero setear el instalador
        handleInstaller(firstInstaller.userId);
        trackEvent('seleccion_instalador', 'firstInstaller.userId', firstInstaller.userId);
        // Luego cambiar la fecha
        const installerDate = dayjs(firstInstaller.startDate);
        const weekStart = installerDate.startOf('week');
        
        // Solo cambiar la fecha si es diferente a la actual
        if (!selectedDate.isSame(weekStart, 'week')) {
          handleDateChange(installerDate);
        }
      }
    }
  }, [lastScheduleInstallers]);

  // Efecto para actualizar la vista semanal
  useEffect(() => {
    // Calcular los 7 días de la semana a partir de selectedDate
    const startOfWeek = selectedDate.startOf('week');
    const daysInWeek: Dayjs[] = [];
    for (let i = 0; i < 5; i++) {
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
        // time: dayjs(visit.startDate).format('HH:mm'),
        time: toChileTime({date:visit?.startDate}),
        available: visit.state === 'available' && !visit.customerId,
        calendarId: visit.calendarId
      }));
    });

    setWeekAvailableTimes(newWeekAvailableTimes);
  }, [selectedDate, calendarVisits]);

  const handleInstaller = async (installerId: string) => {
    // trackEvent('seleccion_instalador', 'AGENDA_EMA', `installer_${installerId}`);
    trackEvent('seleccion_instalador', 'AGENDA_EMA', installerId);
    setSelectedInstaller(installerId);
    await dispatch(setInstaller(installerId));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      trackEvent('seleccion_fecha', 'AGENDA_EMA', date.format('YYYY-MM-DD'));
      const newDate = date.tz('America/Santiago').locale('es').startOf('week');
      setSelectedDate(newDate);
    }
  };

  const handleTimeSlotClick = async (date: Dayjs, timeSlot: TimeSlot) => {
    trackEvent('seleccion_fecha_hora', 'AGENDA_EMA', `${date.format('YYYY-MM-DD')}_${timeSlot.time}`);
    
    if (timeSlot.available) {
      Promise.all([
        await dispatch(setDataForm({
          key:"calendarId", value:timeSlot?.calendarId
        })),
        dispatch(setStep(1))
      ])
    } else {
      trackEvent('no_disponible_fecha_hora_seleccionada', 'AGENDA_EMA', `${date.format('YYYY-MM-DD')}_${timeSlot.time}`);
      alert(`La hora ${timeSlot.time} no está disponible.`);
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

  const handleInstallerDateClick = (installer: InstallerWithCalendar) => {
    if (!installer?.startDate) return;
    
    trackEvent('seleccion_proxima_fecha_instalador', 'AGENDA_EMA', `${installer.userId}_${installer.startDate}`);
    
    const day = dayjs(installer.startDate);
    const slot: TimeSlot = {
      time: toChileTime({ date: installer.startDate }),
      available: true,
      calendarId: installer.calendarId
    };
    
    handleTimeSlotClick(day, slot);
  };

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
          Seleccione una hora para continuar con el proceso de reserva de su visita técnica
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

        {/* Semana con horas disponibles */}
          <Box sx={{ width: { xs: '100%', md: '70%' }, height: { xs: 'auto', md: '100%' } }}>
            <Box sx={{ 
              marginBottom: 4,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: 2,
              flexWrap: 'wrap',
              height: '120px', overflowX: 'auto'
            }}>
              
              {
              status === "loading" &&  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                <LoadingIcon icon="puff" color="#E81A68" style={{width:"60px", height:"60px"}}/>
              </Box>
              }
              
              
              { Array.isArray(lastScheduleInstallers) && 
                lastScheduleInstallers.map((installer: InstallerWithCalendar, index:number) => (
                <Box
                key={installer?.userId}
                sx={{
                      minWidth: 160, 
                      mr: 2, 
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: { xs: 'row', md: 'column' },
                      alignItems: { xs: 'center', md: 'center' },
                      justifyContent: { xs: 'flex-start', md: 'center' },
                      gap: { xs: 2, md: 0.5 }
                    }}
                >
                 {/* <pre>{JSON.stringify(installer.calendarId, null, 2)}</pre> */}
                  <Button 
                    key={installer.userId}
                    id={installer.userId}
                    sx={{ 
                      backgroundColor: selectedInstaller === installer.userId ? 'black' : '#f5f5f5',
                      color: selectedInstaller === installer.userId ? 'white' : 'inherit',
                      border: '1px solid',
                      borderColor: selectedInstaller === installer.userId ? 'black' : '#e8e4e4',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: { xs: '120px', md: '160px' },
                      '&:hover': {
                        backgroundColor: selectedInstaller === installer.userId ? 'black' : '#e0e0e0',
                        borderColor: selectedInstaller === installer.userId ? 'black' : '#e8e4e4',
                      }
                    }}
                    onClick={() => handleInstaller(installer.userId)}
                  >
                    {/* {`Instalador ${++index}`}   {installer?.userId ? installer.userId.split('.')[0][0].toUpperCase() : ''} */}
                    {/* {`Instalador ${++index}`} */}
                    
                    {environment === 'PROD' && `Instalador ${++index}` }
                    
                    <p>{installer?.userId.split('@')[0].toUpperCase()}</p>
                    
                    {/* {environment !== 'PROD' && installer.userId.split('@')[0] || installer.userId } */}
                       {/* {installer?.userId ? installer.userId.split('.')[0][0].toUpperCase() : ''} */}
                    {/* <Typography sx={{ display: 'block', mt: 0.5, fontSize:"0.6rem" }}>
                      {installer?.userId?.split('.')[0] || installer?.userId}
                    </Typography> */}
                  </Button>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: { xs: 0, md: 0.5 }, 
                      textAlign: { xs: 'left', md: 'center' },
                      fontSize: { xs: '0.7rem', md: 'inherit' },
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                    onClick={() => handleInstallerDateClick(installer)}
                  >
                    Reserve aquí <b> <br/>{dayjs(installer?.startDate).format('D [de] MMMM')} - {toChileTime({date:installer?.startDate})}</b>
                  </Typography>
                </Box>
              ))}
            </Box>
            
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
                  const timesForDay = weekAvailableTimes[formattedDay] || [];
                  const isToday = day.isSame(dayjs(), 'day');

                  return (
                    <Box 
                      key={`${formattedDay}-${i}`} 
                      sx={{
                        minWidth: { xs: 40, md: 100 }, 
                        mr: 2, 
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                      }}
                    >        
                    {/* <pre>{JSON.stringify(weekAvailableTimes, null, 2)}</pre> */}
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
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            align="center"
                            sx={{
                              display: { xs: 'none', md: 'block' } // Visible en móviles, oculto en desktop
                            }}
                          >
                            Sin <br/> fechas
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
    </Box>
  );
}