"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import './phone.css'


import CustomTextField from '@/app/components/shared/CustomTextField';
import CustomFormLabel from '@/app/components/shared/CustomFormLabel';



import PageContainer from '@/app/components/container/PageContainer';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import LoadingIcon from "@/app/components/shared/LoadingIcon";


import { useAppSelector, useAppDispatch } from '@/store/hooks';


// import { increment, setStep, decrement, selectClientForms, setDataForm, cleanData } from "@/store/ClientForms/slice";
import { setSupportTicket } from "@/store/SupportTicket/slice";



const validationSchema = yup.object({
  email: yup
    .string()
    .email('Ingrese un email válido')
    .required('El email es requerido')
    .max(100, 'El email no puede exceder los 100 caracteres')
    .trim(),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^\+56\s?\d{9}$/, 'El teléfono debe tener el formato +56 9XX XXX XXX')
    .trim(),
  description: yup
    .string()
    .required('La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder los 500 caracteres')
    .trim(),
});

const VerticalForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2), // Espacio entre los campos
  padding: theme.spacing(3),
  width: '100%',
  '& .MuiTextField-root': {
    width: '100%',
    maxWidth: '800px'
  }
}));

const FormSupport: React.FC<SoporteProps> = (props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: props?.email || '',
      phone: '+569',
      description: `Tuve problemas al pagarz ${props?.glosa} con el número de orden ${props?.order} por un total de ${props?.total}`,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
      
      dispatch(setSupportTicket({
        name: "Ticket creado en ema.energico.city",
        description: `${values?.description}`,
        email: `${values?.email}`,
        phoneNumber: `${values?.phone}`,
        solicitantId: `${values?.email}`,
        level: "one",
        statusTicket: "open",
      }))
      
      setIsSubmitted(true);
    },
  }); 

  if (isSubmitted) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
          ¡Gracias por contactarnos!
        </Typography>
        <Typography>
          Hemos recibido su requerimiento y le hemos enviado un email con los detalles.
        </Typography>
      </Box>
    );
  }
    
  return(
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          align="left"
          sx={{
            display: "block",
            paddingBottom: "30px",
            fontSize: "18px",
            lineHeight: "2",
            marginTop: "0",
            color: (theme) => theme.palette.text.primary
          }}
          component="span"
        >
          Complete el formulario para contactar con soporte
        </Typography>
      </Box>
      
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Box bgcolor="#ffffff" pt={2} pb={4} width={"100%"} mt={0}
          sx={{
            boxSizing: 'border-box',
            border: '1px solid #EAEFF4',
            borderRadius: '12px',
          }}>
          <Container sx={{ maxWidth: "1400px !important", position: "relative" }}>
            <Box sx={{ display: 'flex', width: '100%', height: 'auto', minHeight: '200px' }}>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <VerticalForm>
                  {/* Email */}
                  <Box sx={{ width: '100%' }}>
                    <CustomFormLabel>Email</CustomFormLabel>
                    <CustomTextField
                      fullWidth
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="email@dominio.com"
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>

                  {/* Teléfono */}
                  <Box sx={{ width: '100%' }}>
                    <CustomFormLabel>Teléfono</CustomFormLabel>
                    <PhoneInput
                      international
                      defaultCountry="CL"
                      countryCallingCodeEditable={true}
                      name="phone"
                      value={formik.values.phone}
                      onChange={(value) => {
                        const formattedValue = value || '+569';
                        formik.setFieldValue('phone', formattedValue);
                        formik.setFieldTouched('phone', true);
                      }}
                      onBlur={() => formik.setFieldTouched('phone', true)}
                      className={`w-full ${formik.touched.phone && formik.errors.phone ? 'error' : ''}`}
                      placeholder="Ingrese número de teléfono"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{
                          display: 'block',
                          marginTop: '4px',
                          marginLeft: '14px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {String(formik.errors.phone)}
                      </Typography>
                    )}
                  </Box>

                  {/* Descripción */}
                  <Box sx={{ width: '100%' }}>
                    <CustomFormLabel>Descripción</CustomFormLabel>
                    <CustomTextField
                      fullWidth
                      multiline
                      rows={4}
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Describa su consulta o problema"
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </Box>
                </VerticalForm>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box bgcolor="#ffffff" width={"100%"} mt={1} 
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            disabled={!formik.isValid || formik.isSubmitting}
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              borderRadius: '24px',
              boxShadow: theme.shadows[3],
              '&:hover': {
                boxShadow: theme.shadows[6],
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.26)',
              }
            }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
}


interface SoporteProps {
  glosa: string | null;
  total: string | null;
  order: string | null;
  email: string | null;
}

export default function Page() {
  const searchParams = useSearchParams();
  const glosa = searchParams.get('glosa') || '';
  const total = searchParams.get('total') || '';
  const order = searchParams.get('order') || '';
  const email = searchParams.get('email') || '';
  
  return (
    <PageContainer title="Retorno de Pago" description="Procesando el retorno de pago">
      <HpHeader />
      <FormSupport
        glosa={glosa}
        total={total}
        order={order}
        email={email}
      />
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
}