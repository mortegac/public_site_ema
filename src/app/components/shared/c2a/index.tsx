'use client';
import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Grid, Typography, Container, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';



const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Firstname is Required'),
    lastName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Lastname is Required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    changepassword: yup.string().when('password', {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
    }),
  });


const C2a = () => {

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const smUp = useMediaQuery((theme: any) => theme.breakpoints.only('sm'));

    return (
        <>
            <Container sx={{
                maxWidth: '1400px !important',
                py: {
                    xs: '20px',
                    lg: '30px',
                },
            }}>
                <Box bgcolor="primary.light" borderRadius="24px" overflow="hidden" position="relative" sx={{
                    py: {
                        xs: '40px',
                        lg: '70px'
                    }
                }}>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', lg: 'repeat(12, 1fr)' }, gap: 3, alignItems: 'center' }}>
                            <Box sx={{ gridColumn: { xs: '1 / -1', sm: 'span 8', lg: 'span 6' } }}>
                                <Typography variant="h4" mb={3} fontWeight={700} fontSize="40px" lineHeight="1.4" sx={{
                                    fontSize: {
                                        lg: '40px',
                                        xs: '30px'
                                    }
                                }}>¿Necesita su visita técnica en región?</Typography>
                                <Stack spacing={{ xs: 1, sm: 2 }} direction="row"  flexWrap="wrap" mb={3}>
                                    <Button variant="contained" size="large" href="https://api.whatsapp.com/send?phone=56967666652">Hablemos por whatsapp</Button>
                                    {/* <Button variant="outlined" size="large" href="/auth/auth1/register">Register as Member</Button> */}
                                </Stack>
                                <Typography fontSize="14px">Si prefiere también nos puede enviar un email a <Box fontWeight={600} component="span"><Box component="a" href="mailto:contacto@energica.city" sx={{ color:"#2A3547", textDecoration: 'none' }}>contacto@energica.city</Box></Box> </Typography>
                            </Box>
                        </Box>
                    </Container>

                    {lgUp ?
                        <Image src='/images/design-collection.png' alt="design" width={900} height={365} style={{
                            position: 'absolute', right: 0,
                            top: 0, width: 'auto', height: '100%',
                        }} /> : null

                    }

                    {smUp ?
                        <Image src='/images/design-collection.png' alt="design" width={900} height={365} style={{
                            position: 'absolute', right: '-200px',
                            top: 0, width: 'auto', height: '100%',
                        }} /> : null

                    }



                </Box>
            </Container>
        </>
    );
};

export default C2a;
