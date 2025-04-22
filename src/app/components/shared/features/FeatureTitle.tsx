'use client';
import React from "react";
import { Box, Grid, Typography, Link, Chip } from "@mui/material";


const FeatureTitle = () => {
    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={6} textAlign="center">
                <Typography variant="h2" fontWeight={700}>Ahorra tiempo y costos con nuestros instaladores.</Typography>
                <Typography variant="subtitle1" mt="24px">Obtén una instalación segura y certificada para tu cargador, con precios competitivos y total transparencia.</Typography>
            </Grid>
        </Grid>
    );
};

export default FeatureTitle;
