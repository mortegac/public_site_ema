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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'



import CustomTextField from './CustomTextField';
import CustomFormLabel from './CustomFormLabel';

import AddressInput from '@/app/components/AddressInput2';

// import { increment, setStep, decrement, selectClientForms, setDataForm, cleanData } from "@/store/ClientForms/slice";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCustomer, setCustomer, setCustomerData } from "@/store/Customer/slice";
import { selectCalendarVisits, setStep, setCalendarVisits, setCalendarNotPay, setLoading } from "@/store/CalendarVisits/slice";


import 'react-phone-number-input/style.css'
import './phone.css'
import { useAnalytics } from '@/hooks/useAnalytics';
      

// interface ClientForm {
//   name: string;
//   email: string;
//   address: string;
//   phone: string;
// }

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


const validationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres')
    .trim(),
  email: yup
    .string()
    .email('Ingrese un email válido')
    .required('El email es requerido')
    .max(100, 'El email no puede exceder los 100 caracteres')
    .trim(),
  address: yup
    .string()
    .required('La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede exceder los 200 caracteres')
    .trim(),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^\+56\s?\d{9}$/, 'El teléfono debe tener el formato +56 9XX XXX XXX')
    .trim(),
  residenceType: yup
    .string()
    .required('Debe seleccionar un tipo de residencia')
});

export const FormStep01 = (props:any) => {
  const theme = useTheme(); // Acceder al tema para los colores
  // const { onChangeSetStore } = props;
  
  const [error, setError] = useState<any>(null);
  const [phoneInput, setPhoneInput] = useState('+569');
  const [isValid, setIsValid] = useState(false);
  const [submitButton, setSubmitButton] = useState<string>('');
  
  const {  customer } = useAppSelector(selectCustomer);
  const { installerId, calendarVisits, status } = useAppSelector(selectCalendarVisits);
  
  const dispatch = useAppDispatch();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!customer?.phone) {
      formik.setFieldValue('phone', '+569');
    } else {
      // Asegurarse de que el número tenga el formato correcto
      const phoneNumber = customer.phone.startsWith('+') ? customer.phone : `+56${customer.phone}`;
      formik.setFieldValue('phone', phoneNumber);
    }
  }, [customer?.phone]);

  const formik = useFormik({
    initialValues: {
      name: customer?.name || '',
      email: customer?.customerId || '',
      address: customer?.address,
      phone: customer?.phone ? (customer.phone.startsWith('+') ? customer.phone : `+56${customer.phone}`) : '+569',
      residenceType: customer?.residenceType || '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true, 

    onSubmit: async (values:any) => {
      console.log('Botón presionado:', submitButton);
      
      if (submitButton === 'schedule') {
        // alert("schedule")
        trackEvent('ingreso_datos_cliente', 'AGENDA_EMA', 'envio formulario visita virtual');
        
         Promise.all([
          await dispatch(setLoading()),
          await dispatch(
            setCustomer({
              ...customer,
              customerId: values?.email,
            })
          ),
          customer?.customerId && 
          calendarVisits?.calendarId && 
            await dispatch(setCalendarVisits({
              customerId: customer?.customerId,
              calendarId: calendarVisits?.calendarId,
            })),
          
          dispatch(setStep(2)), // Ir al paso de pago
        ]);
      
        
      
      } else if (submitButton === 'scheduleNotPay') {
        // alert("scheduleNotPay")
        trackEvent('agendar_visita_virtual', 'AGENDA_EMA', 'envio formulario visita fisica');
        
        Promise.all([
          await dispatch(setLoading()),
          await dispatch(
            setCustomer({
              ...customer,
              customerId: values?.email,
            })
          ),
          customer?.customerId && 
          calendarVisits?.calendarId && 
          await dispatch(setCalendarNotPay({
              customerId: customer?.customerId,
              calendarId: calendarVisits?.calendarId,
          })),
          
          dispatch(setStep(3)), // Ir al paso de visita virtual
        ]);
        
        
       }
    },
    }); 
    
    
    

  
  const validatePhoneNumber = (value:any) => {
    setPhoneInput(value);
    
    if (!value) {
      setError('El número de teléfono es Required');
      setIsValid(false);
      return;
    }

    try {
      if (isValidPhoneNumber(value)) {
        setError('');
        setIsValid(true);
        dispatch(setCustomerData({
          phone: value
      }))
        
      } else {
        setError('Número de teléfono inválido');
        setIsValid(false);
      }
    } catch (err) {
      setError('Error al validar el número');
      setIsValid(false);
    }
  };
  
  // Track form field interactions
  // const handleFieldInteraction = (fieldName: string, action: string) => {
  //   trackEvent('form_field_interaction', 'form_interaction', `${fieldName}_${action}`);
  // };
  
  return (
    <>
    {/* <pre>{JSON.stringify(customer, null, 2 )}</pre> */}
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography
          align="left"
          sx={{
            display: "block",
            // paddingBottom: "30px",
            fontSize: "18px",
            lineHeight: "2",
            marginTop: "0",
            color: (theme) => theme.palette.text.primary
          }}
          component="span"
        >
          Ingrese su información de contacto, incluyendo la dirección en donde se realizara la visita técnica
        </Typography>
      </Box>
        
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <Box bgcolor="#ffffff" pt={2}  width={"100%"} mt={0}
      sx={{
        boxSizing: 'border-box',
        border: '1px solid #EAEFF4',
        borderRadius: '12px',
      }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
            padding: { xs: 0 },
            // padding: { xs: 0, md: '24px' },
          }}
        >
            
          <Box sx={{ display: 'flex', width: '100%', height: 'auto', minHeight: '200px' }}>
            {/* Área izquierda para el formulario */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <form onSubmit={handleSubmit} style={{ width: '80%' }}> */}
              
                <VerticalForm>
                  
                  {/* Nombre y Email en una línea */}
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    
                    {/* Nombre*/}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CustomFormLabel>Nombre</CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          formik.handleBlur;
                          dispatch(setCustomerData({
                            name: e.target.value
                          }))
                        }}
                        placeholder="Vicente Perez"
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Box>
                     {/* Email*/}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CustomFormLabel>Email</CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          formik.setFieldValue('email', e.target.value);
                          dispatch(setCustomerData({
                            customerId: e.target.value
                          }))
                        }}
                        placeholder="email@dominio.com"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Box>
                    
                  </Box>
                  
                  
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>

                    
                      {/* Teléfono */}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CustomFormLabel>Teléfono</CustomFormLabel>
                      <PhoneInput
                        international
                        defaultCountry="CL"
                        id="phone"
                        countryCallingCodeEditable={true}
                        name="phone"
                        tabIndex={4} 
                        value={formik.values.phone}
                        onChange={(value) => {
                          const formattedValue = value || '+569';
                          formik.setFieldValue('phone', formattedValue);
                          formik.setFieldTouched('phone', true);
                          validatePhoneNumber(formattedValue);
                        }}
                        onBlur={() => {
                          formik.setFieldTouched('phone', true);
                        }}
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
                    
                    
                     {/* Direccion */}
                     <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CustomFormLabel>Dirección</CustomFormLabel>
                      <AddressInput 
                        onSelectAddress={(addressDetails) => {
                          if (addressDetails) {
                            formik.setFieldValue('address', addressDetails.StreetAddress);
                            formik.setFieldTouched('address', true);
                            dispatch(setCustomerData({              
                                address: addressDetails?.StreetAddress || "",
                                city: addressDetails?.City || "",
                                state: addressDetails?.State || "",
                                zipCode: addressDetails?.ZipCode || "",
                                lat: String(addressDetails?.Latitude || ""),
                                long: String(addressDetails?.Longitude || ""),
                                zoomLevel: "15"
                            }))
                          }
                        }}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address ? String(formik.errors.address) : undefined}
                      />
                    </Box>
                  </Box>
                  
                  
                    
  
  
                  
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* AddressReference */}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CustomFormLabel>Referencias</CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="AddressReference"
                        AddressReference="AddressReference"
                        value={formik.values.AddressReference}
                        onChange={formik.handleChange}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          formik.handleBlur;
                          dispatch(setCustomerData({
                            referenceAddress: e.target.value
                          }))
                        }}
                        placeholder="Depto 524"
                        // error={formik.touched.AddressReference && Boolean(formik.errors.AddressReference)}
                        // helperText={formik.touched.AddressReference && formik.errors.AddressReference}
                      />
                    </Box>
                    
                     {/* Tipo de residencia */}
                     <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CustomFormLabel>Tipo de residencia</CustomFormLabel>
                      <RadioGroup
                        id="residenceType"
                        name="residenceType"
                        value={formik.values.residenceType}
                        onChange={(e) => {
                          formik.setFieldValue('residenceType', e.target.value);
                          dispatch(setCustomerData({
                            typeOfResidence: e.target.value
                          }));
                        }}
                        row
                      >
                        <FormControlLabel value="house" control={<Radio />} label="casa" />
                        <FormControlLabel value="appartment" control={<Radio />} label="edificio" />
                      </RadioGroup>
                      {formik.touched.residenceType && formik.errors.residenceType && (
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
                          {String(formik.errors.residenceType)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  {/* typeOfResidence */}
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>

                  
                            
                  { customer?.typeOfResidence === "house" &&
                     <Box id="boxHouse" sx={{ 
                       width: { xs: '100vw', md: '50%' }, 
                       bgcolor:"#ECF2FF", 
                       display:"flex", 
                       paddingX:"10px", 
                       paddingY:"20px", 
                       flexDirection:"column", 
                       justifyContent:"center", 
                       alignItems:"center",
                       marginLeft: { xs: 'calc(-50vw + 50%)', md: 0 },
                       marginRight: { xs: 'calc(-50vw + 50%)', md: 0 },
                       position: { xs: 'relative', md: 'static' }
                     }}>
                      
                                             <Box id="box-tittle" sx={{ width: "100%", bgcolor:"#ECF2FF", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingX:"14px" }}>
                         <Box sx={{ width: { xs: "0%", md: "20%" }, display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }}>
                           <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M2.68126 4.18359C1.20654 4.18359 0 5.39025 0 6.86497V37.7001L31.8407 40.3814L30.5 4.18359H2.68126Z" fill="#461E7D" fill-opacity="0.06"/>
                             <path d="M61 5.86485C61 4.39013 59.7935 3.18359 58.3187 3.18359H30.5V38.0407L61 36.7V5.86485Z" fill="#F2D2DE"/>
                             <path d="M37.2035 56.8089V43.4023H23.7969V56.8089" fill="#461E7D"/>
                             <path d="M45.7503 26.4648C41.5781 26.4648 38.0085 29.0358 36.5332 32.679H54.9672C53.492 29.0359 49.9225 26.4648 45.7503 26.4648Z" fill="#E4769A"/>
                             <path d="M45.7497 22.4408C49.0816 22.4408 51.7826 19.7398 51.7826 16.4079C51.7826 13.076 49.0816 10.375 45.7497 10.375C42.4178 10.375 39.7168 13.076 39.7168 16.4079C39.7168 19.7398 42.4178 22.4408 45.7497 22.4408Z" fill="#E4769A"/>
                             <path d="M15.2503 26.4648C11.0781 26.4648 7.50852 29.0358 6.0332 32.679H24.4672C22.992 29.0359 19.4225 26.4648 15.2503 26.4648Z" fill="#461E7D"/>
                             <path d="M15.2497 22.4408C18.5816 22.4408 21.2826 19.7398 21.2826 16.4079C21.2826 13.076 18.5816 10.375 15.2497 10.375C11.9178 10.375 9.2168 13.076 9.2168 16.4079C9.2168 19.7398 11.9178 22.4408 15.2497 22.4408Z" fill="#461E7D"/>
                             <path d="M0 36.6992V42.0619C0 43.5366 1.20654 44.7431 2.68126 44.7431H58.3186C59.7933 44.7431 60.9999 43.5366 60.9999 42.0619V36.6992H0Z" fill="#461E7D" fill-opacity="0.33"/>
                             <path d="M49.6041 57.8158H11.3952C10.8398 57.8158 10.3896 57.3657 10.3896 56.8102C10.3896 56.2548 10.8398 55.8047 11.3952 55.8047H49.604C50.1594 55.8047 50.6095 56.2548 50.6095 56.8102C50.6095 57.3657 50.1595 57.8158 49.6041 57.8158Z" fill="#461E7D" fill-opacity="0.33"/>
                             <path d="M30.4997 41.7298C31.055 41.7298 31.5052 41.2796 31.5052 40.7243C31.5052 40.1689 31.055 39.7188 30.4997 39.7188C29.9443 39.7188 29.4941 40.1689 29.4941 40.7243C29.4941 41.2796 29.9443 41.7298 30.4997 41.7298Z" fill="#086063"/>
                           </svg>
                         </Box>
                         <Box sx={{ width: { xs: "100%", md: "80%" }, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <Typography
                              variant="h3"
                              color="textPrimary"
                              sx={{
                                display: 'block',
                                fontSize: '1.3rem'
                              }}
                            >Puedes hacer la visita técnica de forma virtual sin costo
                            </Typography>
                          </Box>
                        </Box>
                       
                       <Box id="box-tittle" sx={{ width: "100%", bgcolor:"#ECF2FF", display:"flex", marginTop:"36px", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingX:"20px" }}>
                         <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                           <Typography
                             variant="h5"
                             color="textPrimary"
                             sx={{
                               display: 'block',
                              //  fontSize: '1.1rem'
                             }}
                           >Requisitos:
                           </Typography>
                         </Box>
                       </Box>
                       
                                               <Box id="box-check01" sx={{ width: "100%", bgcolor:"#ECF2FF", display:"flex", marginTop:"14px", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingX:"20px" }}>
                          <Box sx={{ width: { xs: "15%", md: "10%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                           <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }}>
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2721 1.33161C20.8497 1.90918 20.8497 2.8456 20.2721 3.42317L8.44054 15.2548C7.86297 15.8323 6.92655 15.8323 6.34898 15.2548L0.433175 9.33897C-0.144392 8.76141 -0.144392 7.82499 0.433175 7.24742C1.01074 6.66985 1.94716 6.66985 2.52473 7.24742L7.39476 12.1174L18.1806 1.33161C18.7582 0.754046 19.6946 0.754046 20.2721 1.33161Z" fill="#21D57B"/>
                           </svg>

                          </Box>
                          <Box sx={{ width: { xs: "85%", md: "90%" }, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <Typography
                              variant="caption"
                              color="textPrimary"
                              sx={{
                                display: 'block',
                                fontSize: '1rem'
                              }}
                            >Deben existir paredes o muros disponibles 
                            </Typography>
                          </Box>
                        </Box>
                                               <Box id="box-check02" sx={{ width: "100%", bgcolor:"#ECF2FF", display:"flex" , marginTop:"14px", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingX:"20px" }}>
                          <Box sx={{ width: { xs: "15%", md: "10%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                           <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }}>
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2721 1.33161C20.8497 1.90918 20.8497 2.8456 20.2721 3.42317L8.44054 15.2548C7.86297 15.8323 6.92655 15.8323 6.34898 15.2548L0.433175 9.33897C-0.144392 8.76141 -0.144392 7.82499 0.433175 7.24742C1.01074 6.66985 1.94716 6.66985 2.52473 7.24742L7.39476 12.1174L18.1806 1.33161C18.7582 0.754046 19.6946 0.754046 20.2721 1.33161Z" fill="#21D57B"/>
                           </svg>

                          </Box>
                          <Box sx={{ width: { xs: "85%", md: "90%" }, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <Typography
                              variant="caption"
                              color="textPrimary"
                              sx={{
                                display: 'block',
                                fontSize: '1rem'
                              }}
                            >El cableado será sobrepuesto
                            </Typography>
                          </Box>
                        </Box>
                      
                       <Box sx={{ width: "100%", bgcolor:"#ECF2FF", display:"flex" , marginTop:"32px", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingX:"20px" }}>
                         <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                         
                          <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            size="large"
                            id="schedule"
                            onClick={() => setSubmitButton('scheduleNotPay')}
                            // disabled={!formik.isValid || formik.isSubmitting}
                            endIcon={
                            <Box
                              component="span"
                              sx={{
                                ml: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                color: '#fff',
                                '&::after': {
                                content: '"\\276F"',
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
                              boxShadow: theme.shadows[3],
                              '&:hover': {
                              boxShadow: theme.shadows[6],
                              },
                              '&.Mui-disabled': {
                              backgroundColor: `${status === "loading" ? "#bfbfbf": "rgba(0, 0, 0, 0.12)"}`,
                              // backgroundColor: 'rgba(0, 0, 0, 0.12)',
                              color: 'rgba(0, 0, 0, 0.26)',
                              }
                              }}
                              disabled={status === "loading"}
                            >
                            Continuar con  visita virtual sin costo
                          </Button>
                         </Box>
                         
                       </Box>
{/* 
                      <pre>{JSON.stringify(customer?.typeOfResidence,null, 2 )}</pre> */}
                      
                    </Box>
                  }
                    
                  </Box>
                  
                  {/* <pre>{JSON.stringify(customer, null, 2)}</pre> */}
                  {/* <pre>
                    InstallerId = {JSON.stringify(installerId, null, 2)}
                    <br/>calendarId = {JSON.stringify(calendarVisits?.calendarId, null, 2)}
                    <br/>customerId = {JSON.stringify(customer?.customerId, null, 2)}
                  </pre> */}
                  

                  
                </VerticalForm>
            </Box>
            
          </Box>
        </Container>
      </Box>
             <Box id="buttons" bgcolor="#ffffff" width={"100%"} mt={1} 
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 0 },
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
            background: `${status === "loading" ? "#bfbfbf": "#FFFFFF"}`,
            color:"#E81A68",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={status === "loading"}
          onClick={() => dispatch(setStep(0))}
        >
          Volver
        </Button>
        
        <Button
          id="scheduleNotPay"
          variant="contained"
          type="submit"
          size="large"
          onClick={() => setSubmitButton('schedule')}
          // disabled={!formik.isValid || formik.isSubmitting}
          endIcon={
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
                // backgroundColor: 'rgba(232, 26, 104, 0.1)',
                color: '#E81A68',
                '&::after': {
                  content: '"\\276F"', // Carácter de flecha izquierda
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
            background:`${status === "loading" ? "#bfbfbf": "#FFFFFF"}`,
            color:"#E81A68",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={status === "loading"}
        >
          Continuar y pagar la visita física
        </Button>
      </Box>
    </form>
        
  </Box>
      
    </>
  );
};


