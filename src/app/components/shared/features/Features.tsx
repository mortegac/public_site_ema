'use client';
import React from "react";
import { Box, Stack, Typography, Grid, Container, Divider } from "@mui/material";
import Image from "next/image";
import FeatureTitle from "./FeatureTitle";

const Features = () => {

    return (
        <Box pt={10} pb={10}>
            <Container maxWidth="lg">
                <FeatureTitle />

                <Grid container spacing={3} mt={3}>
                    <Grid item xs sm={6} lg>
                        <Box mb={3} bgcolor="warning.light" borderRadius="24px">
                            <Box px={4} py="65px">
                                <Stack direction="column" spacing={2} textAlign="center">
                                    {/* <Box textAlign="center">
                                        <Image src="/images/svgs/icon-briefcase.svg" alt="icon1" width={40} height={40} />
                                    </Box> */}
                                    <Typography variant="h2" fontWeight={700}>5+</Typography>
                                    <Typography variant="body1">Años de experiencia en proyectos de electromovilidad</Typography>
                                </Stack>
                            </Box>
                        </Box>
                        <Box textAlign="center" mb={3} bgcolor="secondary.light" borderRadius="24px" sx={{
                            backgroundImage: 'url("/images/backgrounds/bg-features-01.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minHeight:"267px",
                        }}>
                            <Box px={4} py="50px">
                                <Stack direction="column" spacing={2} textAlign="center">
{/* IMAGEN */}
                                    {/* <Typography variant="h6" fontWeight={700}>12+ Ready to Use Application Designs</Typography>
                                    <Typography variant="body1"> Instantly deployable designs for your applications.</Typography> */}

                                </Stack>
                            </Box>
                            <Box height="70px">
                                <Image src="/images/frontend-pages/homepage/feature-apps.png" alt="icon1" width={250} height={70} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{
                        order: {
                            xs: 3, lg: 2
                        }
                    }}>
                        <Box textAlign="center" mb={3} bgcolor="primary.light" borderRadius="24px"
                        sx={{
                            minHeight:"515px",
                        }}
                        >
                            <Box pt="65px" pb="40px" px={5}>
                                <Typography variant="h2" fontWeight="700" mt={4} sx={{
                                    fontSize: {
                                        lg: '40px',
                                        xs: '35px'
                                    }
                                }}>100%</Typography>
                                <Typography variant="body1" mt={2}>De nuestros instaladores son certificados por la SEC
                                    {/* <Typography component="span" fontWeight={600}>Dark and Right-to-Left.</Typography> */}
                                </Typography>
                                <Typography variant="body1" mt={10}>Obtén una instalación segura y certificada para tu cargador, con precios
                                competitivos y total transparencia.
                                </Typography>
                                
                                {/* <Box mt={5} mb={2}>
                                    <Image src="/images/frontend-pages/homepage/screen1.png" alt="icon1" width={405} height={245} style={{ width: '100%', height: 'auto' }} />
                                </Box> */}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs sm={6} lg sx={{
                        order: {
                            xs: 2, lg: 3
                        }
                    }}>
                        {/* <Box textAlign="center" mb={3} bgcolor="success.light" borderRadius="24px"> */}
                        <Box textAlign="center" mb={3} bgcolor="secondary.light" borderRadius="24px" sx={{
                            backgroundImage: 'url("/images/backgrounds/bg-features-02.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minHeight:"267px",
                        }}>
                            <Box px={4} py="65px">
                                <Stack direction="column" spacing={2} textAlign="center">
{/* IMAGEN */}

                                    {/* <Box textAlign="center">
                                    </Box>
                                    <Typography variant="h6" fontWeight={700}>Code Improvements</Typography>
                                    <Typography variant="body1"> Benefit from continuous improvements and optimizations.</Typography> */}
                                </Stack>
                            </Box>
                        </Box>
                        <Box textAlign="center" mb={3} bgcolor="error.light" borderRadius="24px"
                         sx={{
                            minHeight:"225px",
                        }}
                        >
                            <Box px={4} py="65px">
                                <Stack direction="column" spacing={2} textAlign="center">
                                    {/* <Box textAlign="center">
                                        <Image src="/images/svgs/icon-favorites.svg" alt="icon1" width={40} height={40} />
                                    </Box> */}
                                    <Typography variant="h2" fontWeight={700}>50+</Typography>
                                    <Typography variant="body1">Cargadores instalados a la fecha</Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;
