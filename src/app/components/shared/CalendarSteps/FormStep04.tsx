"use client";

// components/OrderConfirmation.tsx
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español

import LoadingIcon from "@/app/components/shared/LoadingIcon";
import PageContainer from "@/app/components/container/PageContainer";
import HpHeader from "@/app/components/shared/header/HpHeader";
import Footer from "@/app/components/shared/footer";
import ScrollToTop from "@/app/components/shared/scroll-to-top";

import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  useTheme,
} from "@mui/material";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCustomer } from "@/store/Customer/slice";
import { selectCalendarVisits, setStep } from "@/store/CalendarVisits/slice";
import {
  selectShoppingCart,
  getShoppingCart,
} from "@/store/ShoppingCart/slice";
import { selectWebpay } from "@/store/Webpay/slice";

import { useAnalytics } from "@/hooks/useAnalytics";

import { formatCurrency } from "@/utils/currency";

export const SvgSuccess = (props: any) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <svg
        width="143"
        height="143"
        viewBox="0 0 143 143"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="71.4987" cy="71.4987" r="65.5417" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.2097 26.2096C37.796 14.6234 53.8152 7.44922 71.5013 7.44922C89.1874 7.44922 105.207 14.6234 116.793 26.2096L113.633 29.3695L116.793 26.2096C128.379 37.796 135.553 53.8152 135.553 71.5013C135.553 89.1874 128.379 105.207 116.793 116.793C105.207 128.379 89.1874 135.553 71.5013 135.553C53.8152 135.553 37.796 128.379 26.2096 116.793L29.3695 113.633L26.2096 116.793C14.6234 105.207 7.44922 89.1874 7.44922 71.5013C7.44922 53.8152 14.6234 37.796 26.2096 26.2097L26.2097 26.2096ZM71.5013 16.3867C56.2807 16.3867 42.5082 22.5507 32.5294 32.5294C22.5507 42.5083 16.3867 56.2807 16.3867 71.5013C16.3867 86.7219 22.5507 100.494 32.5294 110.473C42.5082 120.452 56.2808 126.616 71.5013 126.616C86.7218 126.616 100.494 120.452 110.473 110.473C120.452 100.494 126.616 86.7218 126.616 71.5013C126.616 56.2808 120.452 42.5082 110.473 32.5294C100.494 22.5507 86.7219 16.3867 71.5013 16.3867Z"
          fill="#21D47B"
          fillOpacity="0.7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.453 50.4651C106.198 52.2103 106.198 55.0397 104.453 56.7849L68.7029 92.5349C66.9577 94.28 64.1282 94.28 62.3831 92.5349L44.5081 74.6599C42.7629 72.9147 42.7629 70.0853 44.5081 68.3401C46.2532 66.595 49.0827 66.595 50.8279 68.3401L65.543 83.0552L98.1331 50.4651C99.8782 48.72 102.708 48.72 104.453 50.4651Z"
          fill="#21D57B"
        />
      </svg>
      <h2 className="text-4xl mt-8">Listo! Tú visita fue agendada</h2>
      {/* <span className="text-lg mt-4">Envíaremos el comprobante al email <b>{`${props?.email || "ingresado"}`}</b></span> */}
    </div>
  );
};

export default function FormResumeVirtual() {
  const theme = useTheme(); // Acceder al tema para los colores
  const { trackEvent } = useAnalytics();

  const dispatch = useAppDispatch();

  const { customer } = useAppSelector(selectCustomer);
  const { calendarVisits } = useAppSelector(selectCalendarVisits);
  const { shoppingCart } = useAppSelector(selectShoppingCart);
  const { webpay, status } = useAppSelector(selectWebpay);

  const [calendarData, setCalendarData] = useState<any | null>(null);

  const PRODUCT_NAME = "Visita Técnica ";

  const toChileTime = (dateSchedule: any) => {
    const { date, format = "HH:mm" } = dateSchedule;
    const dateUTC = new Date(date);
    return dayjs(dateUTC)
      .tz("America/Santiago")
      .format(format);
  };

  useEffect(() => {
    const dataCalendar: any = calendarVisits;

    const fetchData = async () => {
      if (!dataCalendar?.calendarId || !dataCalendar?.data) return;

      // Filtrar el array dataCalendar.data para obtener el item que coincida con calendarId
      const filteredItem = dataCalendar.data.filter(
        (item: any) => item.calendarId === dataCalendar.calendarId
      );

      console.log("--filteredItem--", filteredItem);
      // const formattedDay = calendarData?.startDate.format('YYYY-MM-DD');
      // const timesForDay = weekAvailableTimes[formattedDay] || [];

      if (filteredItem.length > 0) {
        // Almacenar el item filtrado en setCalendarData
        setCalendarData({
          ...filteredItem[0],
          // date: formattedDay,
          // date2: toChileTime(calendarData?.startDate),
        });
      } else {
        // Si no se encuentra, usar solo el calendarId
        setCalendarData({
          calendarId: dataCalendar.calendarId,
        });
      }
    };

    fetchData();
  }, [calendarVisits?.calendarId]);

  return (
    <>
      <PageContainer
        title="Retorno de Pago"
        description="Procesando el retorno de pago"
      >
        {/* <HpHeader /> */}
        {/* <pre>calendarData = {JSON.stringify(calendarData, null, 2)}</pre> */}
        {/* <pre>customer = {JSON.stringify(customer, null, 2 )}</pre> */}
        {/* <pre>calendarVisits = {JSON.stringify(calendarVisits, null, 2)}</pre> */}

        <Box
          sx={{
            // minHeight: '80vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            backgroundColor: "#f8fafc",
            width: { xs: "100vw", md: "100%" },
            marginLeft: { xs: "calc(-50vw + 50%)", md: 0 },
            marginRight: { xs: "calc(-50vw + 50%)", md: 0 },
            position: { xs: "relative", md: "static" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f8fafc",
                color: "#74787e",
                height: "100%",
                lineHeight: 1.4,
                width: "100%",
                wordBreak: "keep-all",
                p: 0,
              }}
            >
              <Container
                maxWidth="md"
                sx={{
                  p: { xs: 0, md: 4 }, // 0 en móviles, 4 en desktop
                }}
              >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <SvgSuccess email={"email"} />
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    // bgcolor:"#ECF2FF",
                    display: "flex",
                    paddingX: "10px",
                    paddingY: "20px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { xs: "100vw", md: "100%" },
                    marginLeft: { xs: "calc(-50vw + 50%)", md: 0 },
                    marginRight: { xs: "calc(-50vw + 50%)", md: 0 },
                    position: { xs: "relative", md: "static" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Box id="boxHouse">
                      {/* Name */}
                      <Box
                        id="box-date"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "40px", md: "120px" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Fecha:
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            id="text-date"
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {/* {calendarData?.startDate} */}
                            {dayjs(calendarData?.startDate).format(
                              "D [de] MMMM"
                            )}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Hora */}
                      <Box
                        id="box-date"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "40px", md: "120px" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Hora:
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            id="text-date"
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {toChileTime({ date: calendarData?.startDate })} hrs
                          </Typography>
                        </Box>
                      </Box>

                      {/* EMail */}
                      <Box
                        id="box-date"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "40px", md: "120px" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Email:
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            id="text-date"
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {customer?.customerId || ""}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Direccion */}
                      <Box
                        id="box-date"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "40px", md: "120px" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Dirección:
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            id="text-date"
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            {`${customer?.address}, ${customer?.city}` || ""}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Telefono */}
                      <Box
                        id="box-date"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "40px", md: "120px" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Teléfono:
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            id="text-date"
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            {`${customer?.phone}` || ""}
                          </Typography>
                        </Box>
                      </Box>

                      <hr />
                      <Box
                        id="box-tittle"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginY: "36px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              //  fontSize: '1.1rem'
                            }}
                          >
                            Te contactaremos vía Whatsapp al momento de la
                            videollamada
                          </Typography>
                        </Box>
                      </Box>

                      <hr />
                      <Box
                        id="box-tittle"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "36px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              //  fontSize: '1.1rem'
                            }}
                          >
                            Al momento de la llamada debes:
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        id="box-check01"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "15%", md: "10%" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="21"
                            height="16"
                            viewBox="0 0 21 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "10px" }}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M20.2721 1.33161C20.8497 1.90918 20.8497 2.8456 20.2721 3.42317L8.44054 15.2548C7.86297 15.8323 6.92655 15.8323 6.34898 15.2548L0.433175 9.33897C-0.144392 8.76141 -0.144392 7.82499 0.433175 7.24742C1.01074 6.66985 1.94716 6.66985 2.52473 7.24742L7.39476 12.1174L18.1806 1.33161C18.7582 0.754046 19.6946 0.754046 20.2721 1.33161Z"
                              fill="#21D57B"
                            />
                          </svg>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Tener acceso al tablero eléctrico
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        id="box-check02"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "15%", md: "10%" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="21"
                            height="16"
                            viewBox="0 0 21 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "10px" }}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M20.2721 1.33161C20.8497 1.90918 20.8497 2.8456 20.2721 3.42317L8.44054 15.2548C7.86297 15.8323 6.92655 15.8323 6.34898 15.2548L0.433175 9.33897C-0.144392 8.76141 -0.144392 7.82499 0.433175 7.24742C1.01074 6.66985 1.94716 6.66985 2.52473 7.24742L7.39476 12.1174L18.1806 1.33161C18.7582 0.754046 19.6946 0.754046 20.2721 1.33161Z"
                              fill="#21D57B"
                            />
                          </svg>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Tener acceso al medidor eléctrico
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        id="box-check02"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "15%", md: "10%" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="21"
                            height="16"
                            viewBox="0 0 21 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "10px" }}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M20.2721 1.33161C20.8497 1.90918 20.8497 2.8456 20.2721 3.42317L8.44054 15.2548C7.86297 15.8323 6.92655 15.8323 6.34898 15.2548L0.433175 9.33897C-0.144392 8.76141 -0.144392 7.82499 0.433175 7.24742C1.01074 6.66985 1.94716 6.66985 2.52473 7.24742L7.39476 12.1174L18.1806 1.33161C18.7582 0.754046 19.6946 0.754046 20.2721 1.33161Z"
                              fill="#21D57B"
                            />
                          </svg>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Acceso al lugar donde deseas instalar el cargador
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        id="box-check02"
                        sx={{
                          width: "100%",
                          display: "flex",
                          marginTop: "14px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "15%", md: "10%" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="21"
                            height="16"
                            viewBox="0 0 21 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "10px" }}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M20.2721 1.33161C20.8497 1.90918 20.8497 2.8456 20.2721 3.42317L8.44054 15.2548C7.86297 15.8323 6.92655 15.8323 6.34898 15.2548L0.433175 9.33897C-0.144392 8.76141 -0.144392 7.82499 0.433175 7.24742C1.01074 6.66985 1.94716 6.66985 2.52473 7.24742L7.39476 12.1174L18.1806 1.33161C18.7582 0.754046 19.6946 0.754046 20.2721 1.33161Z"
                              fill="#21D57B"
                            />
                          </svg>
                        </Box>
                        <Box
                          sx={{
                            width: { xs: "85%", md: "90%" },
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            sx={{
                              display: "block",
                              fontSize: "1rem",
                            }}
                          >
                            Tener Muy Buena señal Wifi o Celular para el momento
                            de la llamada
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                 
                </Paper>

                <Box
                  bgcolor="#f8fafc"
                  width={"100%"}
                  mt={10}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 2, md: 0 },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      paddingX: 4,
                      paddingY: 1.5,
                      borderRadius: "24px",
                      background: "#FFFFFF",
                      color: "#E81A68",
                      border: "1px solid #E81A68",
                      width: { xs: "100%", md: "auto" },
                    }}
                    href="/agenda"
                    //   onClick={() => dispatch(setStep(0))}
                  >
                    Agendar otra visita
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                    sx={{
                      paddingX: 4,
                      paddingY: 1.5,
                      borderRadius: "24px",
                      boxShadow: theme.shadows[3],
                      "&:hover": {
                        boxShadow: theme.shadows[6],
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                        color: "rgba(0, 0, 0, 0.26)",
                      },
                      width: { xs: "100%", md: "auto" },
                    }}
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfMaGlC8UlSWZxTZgpTmD1sCftJJFv2EvAD_v5W0eIWzgwrkQ/viewform"
                    target="_blank"
                  >
                    Simular costo de instalación
                  </Button>
                </Box>
              </Container>
            </Box>
          </Box>
        </Box>
        {/* <Footer /> */}
        {/* <ScrollToTop /> */}
      </PageContainer>
    </>
  );
}
