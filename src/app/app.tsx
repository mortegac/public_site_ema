"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useAppSelector } from '@/store/hooks';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AppState } from "@/store/store";
import "@/utils/i18n";
import "@/app/api/index";




const MyApp = ({ children }: { children: React.ReactNode; }) => {
    const theme = ThemeSettings();
    const customizer = useAppSelector((state: AppState) => state.customizer);

    return (
        <>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    {/* <RTL direction={customizer.activeDir}> */}
                    <CssBaseline />
                    {children}
                    {/* </RTL> */}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
};

export default MyApp;
