'use client';
import React from "react";
import { Box, Grid, Typography, Link, Chip } from "@mui/material";


const FeatureTitle = () => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' }, gap: 3, justifyContent: 'center' }}>
            <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'span 6' }, textAlign: 'center' }}>
                <Typography variant="h2" fontWeight={700}>Ahorra tiempo y costos con nuestros instaladores.</Typography>
                <Typography variant="subtitle1" mt="24px">Obtén una instalación segura y certificada para tu cargador, con precios competitivos y total transparencia.</Typography>
            </Box>
        </Box>
    );
};

export default FeatureTitle;
