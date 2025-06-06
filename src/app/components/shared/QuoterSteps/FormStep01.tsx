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
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';



import CustomTextField from './CustomTextField';
import CustomFormLabel from './CustomFormLabel';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, setStep, decrement, selectClientForms, setDataForm, cleanData } from "@/store/ClientForms/slice";
import { setCustomer } from "@/store/Customer/slice";


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
    .min(2, 'Debe ingresar minimo 4 caracteres')
    .max(50, 'Too Long!')
    .required('El nombre is Requerido'),
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'El email debe tener el formato: email@dominio.com'
    )
    .test('email-format', 'El email debe tener el formato: email@dominio.com', function(value) {
      // console.log('Validando email:', value);
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || "");
    })
    .required('Email es requerido'),
  phone: yup.string().required('El teléfono es Requerido'),
});

export const FormStep01 = (props:any) => {
  const { onChangeSetStore } = props;
  
  const { 
    currentStep,
    // currentForm,
    currentForm
  } = useAppSelector(selectClientForms);
  
  const dispatch = useAppDispatch();
  
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');

  // const handleSubmit = (event:any) => {
  //   event.preventDefault();
    // console.log('Formulario enviado:', { name, email, phone });
    // setName('');
    // setEmail('');
    // setPhone('');
  // };
  
  const MiSVG = () => (
    <svg width="123" height="123" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M81.7971 28.5695V109.518C81.7971 115.474 76.9688 120.302 71.0127 120.302H27.6086C21.6525 120.302 16.8242 115.474 16.8242 109.518V28.5695C16.8242 22.6134 21.6525 17.7852 27.6086 17.7852H71.0127C76.9688 17.7852 81.7971 22.6134 81.7971 28.5695Z" fill="#FEFDFE"/>
<path opacity="0.12" d="M81.8032 28.5749V33.8725H43.7018C37.7442 33.8725 32.9179 38.6989 32.9179 44.6564V120.294H27.6013C21.6439 120.294 16.8174 115.468 16.8174 109.51V28.5749C16.8174 22.6173 21.6437 17.791 27.6013 17.791H71.0193C76.9769 17.791 81.8032 22.6173 81.8032 28.5749Z" fill="#E81A68"/>
<path d="M60.5782 17.7846V9.97102C60.5782 6.34973 57.6425 3.41406 54.0212 3.41406H44.6009C40.9796 3.41406 38.0439 6.34973 38.0439 9.97102V17.7844L60.5782 17.7846Z" fill="#F2D2DE"/>
<path d="M69.9873 95.2989C69.9873 99.1941 66.8296 102.352 62.9345 102.352H35.6866C31.7914 102.352 28.6338 99.1941 28.6338 95.2989C28.6338 91.4037 31.7914 88.2461 35.6866 88.2461H62.9347C66.8296 88.2463 69.9873 91.404 69.9873 95.2989Z" fill="#F2D2DE"/>
<path d="M69.9873 69.043C69.9873 72.9382 66.8296 76.0958 62.9345 76.0958H35.6866C31.7914 76.0958 28.6338 72.9382 28.6338 69.043C28.6338 65.1479 31.7914 61.9902 35.6866 61.9902H62.9347C66.8296 61.9902 69.9873 65.1479 69.9873 69.043Z" fill="#F2D2DE"/>
<path d="M69.9873 42.7872C69.9873 46.6823 66.8296 49.84 62.9345 49.84H35.6866C31.7914 49.84 28.6338 46.6823 28.6338 42.7872C28.6338 38.892 31.7914 35.7344 35.6866 35.7344H62.9347C66.8296 35.7344 69.9873 38.892 69.9873 42.7872Z" fill="#F2D2DE"/>
<path d="M89.6692 35.733C98.7901 35.733 106.184 28.339 106.184 19.218C106.184 10.0971 98.7901 2.70312 89.6692 2.70312C80.5483 2.70312 73.1543 10.0971 73.1543 19.218C73.1543 28.339 80.5483 35.733 89.6692 35.733Z" fill="#F2D2DE"/>
<path d="M27.6016 122.18H71.0184C78.0054 122.18 83.6889 116.497 83.6889 109.51V41.9413C83.6889 40.8991 82.8456 40.0559 81.8035 40.0559C80.7614 40.0559 79.9182 40.8991 79.9182 41.9413V109.51C79.9182 114.416 75.9247 118.41 71.0182 118.41H27.6016C22.6951 118.41 18.7016 114.416 18.7016 109.51V28.5749C18.7016 23.6683 22.6951 19.6768 27.6016 19.6768H65.6646C66.7067 19.6768 67.5499 18.8336 67.5499 17.7915C67.5499 16.7493 66.7067 15.9061 65.6646 15.9061H62.463V9.97065C62.463 5.31635 58.6759 1.5293 54.0216 1.5293H44.6008C39.9465 1.5293 36.1595 5.31635 36.1595 9.97065V15.9064H27.6021C20.6151 15.9064 14.9316 21.5898 14.9316 28.5749V109.51C14.9312 116.497 20.6146 122.18 27.6016 122.18ZM39.9295 9.97065C39.9295 7.39486 42.0246 5.29978 44.6003 5.29978H54.0211C56.5969 5.29978 58.692 7.39486 58.692 9.97065V15.8989H39.9295V9.97065Z" fill="#E81A68"/>
<path d="M62.9341 86.3613H35.6877C30.759 86.3613 26.749 90.3713 26.749 95.3C26.749 100.229 30.759 104.239 35.6877 104.239H62.9341C67.8627 104.239 71.8727 100.229 71.8727 95.3C71.8727 90.3713 67.8627 86.3613 62.9341 86.3613ZM62.9341 100.468H35.6877C32.8378 100.468 30.5197 98.1499 30.5197 95.3C30.5197 92.4501 32.8378 90.1321 35.6877 90.1321H62.9341C65.784 90.1321 68.102 92.4501 68.102 95.3C68.102 98.1499 65.7842 100.468 62.9341 100.468Z" fill="#E81A68"/>
<path d="M62.9341 60.1055H35.6877C30.759 60.1055 26.749 64.1135 26.749 69.0422C26.749 73.9708 30.759 77.9808 35.6877 77.9808H62.9341C67.8627 77.9808 71.8727 73.9708 71.8727 69.0422C71.8727 64.1135 67.8627 60.1055 62.9341 60.1055ZM62.9341 74.2101H35.6877C32.8378 74.2101 30.5197 71.8921 30.5197 69.0422C30.5197 66.194 32.8378 63.8762 35.6877 63.8762H62.9341C65.784 63.8762 68.102 66.1942 68.102 69.0422C68.102 71.8921 65.7842 74.2101 62.9341 74.2101Z" fill="#E81A68"/>
<path d="M62.9341 33.8477H35.6877C30.759 33.8477 26.749 37.8577 26.749 42.7863C26.749 47.7149 30.759 51.7249 35.6877 51.7249H62.9341C67.8627 51.7249 71.8727 47.7149 71.8727 42.7863C71.8727 37.8577 67.8627 33.8477 62.9341 33.8477ZM62.9341 47.9542H35.6877C32.8378 47.9542 30.5197 45.6362 30.5197 42.7863C30.5197 39.9364 32.8378 37.6184 35.6877 37.6184H62.9341C65.784 37.6184 68.102 39.9364 68.102 42.7863C68.102 45.6362 65.7842 47.9542 62.9341 47.9542Z" fill="#E81A68"/>
<path d="M108.069 19.2184C108.069 9.07209 99.8149 0.818359 89.6686 0.818359C79.5223 0.818359 71.2686 9.07209 71.2686 19.2184C71.2686 29.3647 79.5223 37.6184 89.6686 37.6184C99.8149 37.6184 108.069 29.3647 108.069 19.2184ZM89.6686 33.8477C81.6027 33.8477 75.0393 27.2843 75.0393 19.2184C75.0393 11.1525 81.6027 4.58908 89.6686 4.58908C97.7345 4.58908 104.298 11.1525 104.298 19.2184C104.298 27.2843 97.7345 33.8477 89.6686 33.8477Z" fill="#E81A68"/>
<path d="M94.5718 13.5503L87.2315 20.8889L84.7681 18.4256C84.0318 17.6893 82.8385 17.6893 82.1022 18.4256C81.3657 19.1621 81.3657 20.3551 82.1022 21.0915L85.8986 24.8879C86.2669 25.2562 86.7493 25.4402 87.2317 25.4402C87.7141 25.4402 88.1965 25.2562 88.5648 24.8879L97.2382 16.2164C97.9748 15.4801 97.9748 14.2868 97.2382 13.5505C96.5014 12.8139 95.3084 12.8139 94.5718 13.5503Z" fill="#E81A68"/>
</svg>

  );

  
     const formik = useFormik({
      initialValues: {
        name: currentForm?.name || '',
        email: currentForm?.email || '',
        phone: currentForm?.phone || '',
      },
      validationSchema: validationSchema,
      enableReinitialize: true, 
      // onChange: (e) => {
      //   const { name, value } = e.target;
      //   // Primero actualizar formik
      //   formik.handleChange(e);
      //   // Luego sincronizar con Redux
      //   dispatch(setDataForm({ key: name, value }));
      // },
      onSubmit: (values) => {
        Promise.all([
          dispatch(
            setCustomer({
              customerId: values?.email,
              name: values?.name,
              comune: "",
              address: "",
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
              key: "phone",
              value: values?.phone,
            })
          ),
          dispatch(setStep(1)),
        ]);
        // dispatch(setStep(1));
        
      },
    });
    
  // Sincronización de cada campo con Redux cuando cambian los valores
  // useEffect(() => {
  //   if (formik.values.name !== currentForm?.name) {
  //     dispatch(setDataForm({ key: 'name', value: formik.values.name }));
  //   }
  // }, [formik.values.name, currentForm?.name, dispatch]);

  // useEffect(() => {
  //   if (formik.values.email !== currentForm?.email) {
  //     dispatch(setDataForm({ key: 'email', value: formik.values.email }));
  //   }
  // }, [formik.values.email, currentForm?.email, dispatch]);

  // useEffect(() => {
  //   if (formik.values.phone !== currentForm?.phone) {
  //     dispatch(setDataForm({ key: 'phone', value: formik.values.phone }));
  //   }
  // }, [formik.values.phone, currentForm?.phone, dispatch]);

  const handleReset = () => {
    dispatch(cleanData());
    formik.resetForm();
  };
  
  return (
    <>
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <Box bgcolor="#ffffff" pt={4} pb={4} width={"90%"} mt={4}
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
          <Box sx={{ display: 'flex', width: '100%', height: 'auto', minHeight: '400px' }}>
            {/* Área izquierda para el formulario */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <form onSubmit={handleSubmit} style={{ width: '80%' }}> */}
              
                <VerticalForm>
                  <Typography variant="h6" gutterBottom>
                    Información de contacto
                  </Typography>
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
                  <CustomFormLabel>Teléfono</CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="+56 9 99 22 999"
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </VerticalForm>
            </Box>
            
            {/* Área derecha para el SVG */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CenteredSVGContainer>
                <MiSVG />
              </CenteredSVGContainer>
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
            type="button"
            onClick={handleReset}
            sx={{
              width: "10%",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            Limpiar
        </Button>
        <Button type="submit" variant="contained" color="primary"
          sx={{
            width: "50%",
            padding: "10px",
          }}
        >
          Siguiente
        </Button>
      </Box>
       </form>
      
    </>
  );
};


