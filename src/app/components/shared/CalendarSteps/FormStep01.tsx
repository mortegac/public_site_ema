"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';



import CustomTextField from './CustomTextField';
import CustomFormLabel from './CustomFormLabel';

import AddressInput from '@/app/components/AddressInput2';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, setStep, decrement, selectClientForms, setDataForm, cleanData } from "@/store/ClientForms/slice";
import { setCustomer } from "@/store/Customer/slice";

interface ClientForm {
  name: string;
  email: string;
  address: string;
  phone: string;
}

// Componente para el formulario vertical
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

// Componente para el SVG centrado
const CenteredSVGContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Asegura que ocupe toda la altura del contenedor padre
}));


const validationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: yup
    .string()
    .email('Ingrese un email válido')
    .required('El email es requerido'),
  address: yup
    .string()
    .required('La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^\+56\s?\d{9}$/, 'El teléfono debe tener el formato +56 9XXXXXXXX')
});

export const FormStep01 = (props:any) => {
  const theme = useTheme(); // Acceder al tema para los colores
  const { onChangeSetStore } = props;
  
  const { 
    currentStep,
    // currentForm,
    currentForm
  } = useAppSelector(selectClientForms);
  
  const dispatch = useAppDispatch();



  
     const formik = useFormik({
      initialValues: {
        name: currentForm?.name || '',
        email: currentForm?.email || '',
        address: '',
        // address: currentForm?.address || '',
        phone: currentForm?.phone || '',
      },
      validationSchema: validationSchema,
      enableReinitialize: true, 
  
      onSubmit: (values) => {
        Promise.all([
          dispatch(
            setCustomer({
              customerId: values?.email,
              name: values?.name,
              comune: "",
              address: values?.address,
              phone: values?.phone,
            })
          ),
          dispatch(
            setDataForm({
              key: "name",
              value: values?.name,
            })
          ),
          dispatch(
            setDataForm({
              key: "email",
              value: values?.email,
            })
          ),
          dispatch(
            setDataForm({
              key: "address",
              value: values?.address,
            })
          ),
          dispatch(
            setDataForm({
              key: "phone",
              value: values?.phone,
            })
          ),
          dispatch(setStep(1)),
        ]);
        // dispatch(setStep(1));
        
      },
    });
    
  const handleReset = () => {
    dispatch(cleanData());
    formik.resetForm();
  };
  
  return (
    <>
    <Box sx={{ p: 2 }}>
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
          Ingrese su información de contacto, incluyendo la dirección en donde se realizara la visita técnica
        </Typography>
        
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <Box bgcolor="#ffffff" pt={2} pb={4} width={"100%"} mt={0}
      sx={{
        boxSizing: 'border-box',
        border: '1px solid #EAEFF4',
        borderRadius: '12px',
      }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
            
          <Box sx={{ display: 'flex', width: '100%', height: 'auto', minHeight: '200px' }}>
            {/* Área izquierda para el formulario */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <form onSubmit={handleSubmit} style={{ width: '80%' }}> */}
              
                <VerticalForm>
                  
                  {/* Nombre y Email en una línea */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ width: '50%' }}>
                      <CustomFormLabel>Nombre</CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Juanin Jan Jarri"
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
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
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Dirección */}
                    <Box sx={{ width: '50%' }}>
                      <CustomFormLabel>Dirección</CustomFormLabel>
                      <AddressInput 
                        onSelectAddress={(addressDetails) => {
                          if (addressDetails) {
                            formik.setFieldValue('address', addressDetails.StreetAddress);
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ width: '50%' }}>
                      {/* Teléfono */}
                      <CustomFormLabel>Teléfono</CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="+56 9XXXXXXXX"
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Box>
                  </Box>
                  {/* <CustomTextField
                    fullWidth
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ingrese su dirección completa"
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    multiline
                    rows={2}
                  /> */}

                  
                </VerticalForm>
            </Box>
            
          </Box>
        </Container>
      </Box>
      <Box bgcolor="#ffffff" width={"100%"} mt={1} 
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            // marginTop:"48px"
          }}>
        <Button
          variant="contained"
          size="large"
          startIcon={
            <Box
              component="span"
              sx={{
                mr: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(232, 26, 104, 0.1)',
                color: '#E81A68',
                '&::after': {
                  content: '"\\276E"', // Carácter de flecha izquierda
                  fontSize: '16px',
                  lineHeight: 1,
                },
              }}
            />
          }
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '24px',
            background:"#FFFFFF",
            color:"#E81A68",
            border: "1px solid #E81A68",
          }}
          onClick={() => dispatch(setStep(0))}
        >
          Volver
        </Button>
        
        <Button
          variant="contained"
          type="submit"
          color="primary"
          size="large"
          endIcon={
            <Box
              component="span"
              sx={{
                ml: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Estilo para la flecha, puedes usar un icono de MUI si lo prefieres
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                '&::after': {
                  content: '"\\276F"', // Carácter de flecha derecha
                  fontSize: '16px',
                  lineHeight: 1,
                },
              }}
            />
          }
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '24px', // Ya definido en el tema, pero se puede sobrescribir aquí
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[6],
            },
          }}
          onClick={() => dispatch(setStep(2))}
        >
          Continuar
        </Button>
            
            
        {/* <Button type="submit" variant="contained" color="primary"
          sx={{
            width: "50%",
            padding: "10px",
          }}
        >
          Siguiente
        </Button> */}
      </Box>
    </form>
        
  </Box>
      
    </>
  );
};


