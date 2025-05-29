'use client';
import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import PricingCard from './PricingCard';
import PaymentMethods from './PaymentMethods';

const Pricing = () => {
    return (
        <>
            <Box
                sx={{
                    py: {
                        xs: 5,
                        lg: 11,
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' }, gap: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'span 7' } }}>
                            <Typography textAlign="center"
                                variant="h4" lineHeight={1.4}
                                mb={6} fontWeight={700}
                                sx={{
                                    fontSize: {
                                        lg: '40px',
                                        xs: '35px',
                                    },
                                }}
                            >
                               Nuestros Servicios & Paquetes
                            </Typography>
                            <Typography textAlign="center"
                                variant="h4" lineHeight={1.4}
                                mb={6} 
                                fontWeight={300}
                                sx={{
                                    fontSize: {
                                        lg: '18px',
                                        xs: '20px',
                                    },
                                }}
                            >
                               Obtén una instalación segura y certificada para tu cargador, con precios competitivos y total transparencia.
                            </Typography>
                        </Box>
                    </Box>

                    <PricingCard />

                    {/* <PaymentMethods /> */}
                </Container>
            </Box>
        </>
    );
};

export default Pricing;
