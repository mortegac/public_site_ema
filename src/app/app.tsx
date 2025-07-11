"use client";
import React from "react";
import Script from 'next/script';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // O AdapterDateFns

import { ThemeSettings } from "@/utils/theme/Theme";
import { useAppSelector } from '@/store/hooks';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AppState } from "@/store/store";
import "@/utils/i18n";

const KEY = "AIzaSyBdAjJeBoZ8ehrL0byX2ZBHHtQSI6pfIvQ"


const MyApp = ({ children }: { children: React.ReactNode; }) => {
    const theme = ThemeSettings();
    const customizer = useAppSelector((state: AppState) => state.customizer);

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&loading=async`}
                strategy="afterInteractive"
                onLoad={() => {
                    console.log('Google Maps script loaded');
                }}
                onError={(e) => {
                    console.error('Error loading Google Maps script:', e);
                }}
            />
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    {/* <RTL direction={customizer.activeDir}> */}
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {children}
                    </LocalizationProvider>
                    {/* </RTL> */}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
};

export default MyApp;
