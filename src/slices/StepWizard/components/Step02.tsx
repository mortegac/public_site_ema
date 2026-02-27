// "use client";
// import { FC } from "react";

// import {
//   Box,
//   Container,
// } from "@mui/material";

// export const Step02: FC<any> = () => {
  
//     return (
//       <Box bgcolor="#ffffff" pt={4} pb={2}>
//         <Container
//           sx={{
//             maxWidth: "1200px !important",
//             position: "relative",
//             paddingBottom:'56px',
//           }}
//         >
//        <h2 style={{
//         fontSize:'32px',
//        }}>
//         Step02</h2>
//         </Container>
//       </Box>
//     );
//   }

"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configurar los plugins de dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es"); // Configurar el idioma español


import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import LoadingIcon from "@/app/components/shared/LoadingIcon";


import CustomTextField from './CustomTextField';
import CustomFormLabel from './CustomFormLabel';

import AddressInput from '@/app/components/AddressInput2';

// import { increment, setStep, decrement, selectClientForms, setDataForm, cleanData } from "@/store/ClientForms/slice";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCustomer, setCustomer, getCustomer, setCustomerData } from "@/store/Customer/slice";
import { selectCalendarVisits, setStep, setCalendarVisits, setCalendarNotPay, setLoading } from "@/store/CalendarVisits/slice";
import { setCustomerToCart, selectShoppingCart, createShoppingCartThunk, updateOrCreateShoppingCartThunk } from "@/store/ShoppingCart/slice";
import { CartCustomer } from "@/store/ShoppingCart/type";
import { formatCurrency } from "@/utils/currency";
import { setStep as setWizardStep } from "@/store/Wizard/slice";


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

export const Step02 = (props:any) => {
  const router = useRouter();
  // const theme = useTheme(); // Acceder al tema para los colores
  // const { onChangeSetStore } = props;
  
  // const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [phoneInput, setPhoneInput] = useState('+569');
  const [isValid, setIsValid] = useState(false);
  const [submitButton, setSubmitButton] = useState<string>('');
  
  const {  customer, existCustomer } = useAppSelector(selectCustomer);
  const { shoppingCart, loading: cartLoading } = useAppSelector(selectShoppingCart);
  // const { installerId, calendarVisits, calendarVisit, status } = useAppSelector(selectCalendarVisits);

  // // Filtrar el calendario específico del array calendarVisits.data
  // let selectedCalendar:any = calendarVisits
  // selectedCalendar = selectedCalendar?.data?.find(
  //   (calendar: any) => calendar.calendarId === calendarVisits.calendarId
  // );
  
  const dispatch = useAppDispatch();
  const { trackEvent } = useAnalytics();

  const toChileTime = (dateSchedule: any) => {
    const { date, format = "HH:mm" } = dateSchedule;
    const dateUTC = new Date(date);
    return dayjs(dateUTC).tz("America/Santiago").format(format);
  };

  const handleContinuePurchase = () => {
    // Si existe el cliente en el carrito persistido, navegar directamente al paso 5 sin validación
    if (shoppingCart?.customer) {
      dispatch(setWizardStep(5));
    }
  };

  const handlePayShoppingCart = async () => {
    try {
      // Calcular totales del carrito
      const products = shoppingCart?.products || [];
      const subtotal = products.reduce((sum, product) => 
        sum + (product.amount * product.quantity), 0);
      const totalVat = Math.round(products.reduce((sum, product) => 
        sum + (product.vatValue * product.quantity), 0));
      
      const customerId = shoppingCart?.customer?.customerId || customer?.customerId || '';

      // Verificar si existe shoppingCartId y no está vacío
      const hasShoppingCartId = shoppingCart?.shoppingCartId && 
                                 shoppingCart.shoppingCartId.trim() !== '';

      if (hasShoppingCartId) {
        // Actualizar el carrito existente (product flow: ensure typeOfCart is product)
        await dispatch(updateOrCreateShoppingCartThunk({
          shoppingCartId: shoppingCart.shoppingCartId,
          customerId: customerId,
          total: subtotal,
          vat: totalVat,
          typeOfCart: "product",
          status: "pending",
          products: products,
        }));
      } else {
        // Crear un nuevo carrito (product flow)
        await dispatch(updateOrCreateShoppingCartThunk({
          customerId: customerId,
          total: subtotal,
          vat: totalVat,
          typeOfCart: "product",
          status: "pending",
          products: products,
        }));
      }

      // Navegar al paso 5 después de actualizar/crear
      dispatch(setWizardStep(5));
    } catch (error) {
      console.error("Error al procesar el carrito:", error);
    }
  };
  
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

    onSubmit: async (values: any) => {
      if (!values?.email?.trim()) {
        return;
      }
      if (shoppingCart?.customer) {
        await handlePayShoppingCart();
        return;
      }
      // Preparar datos del customer para el carrito
      const cartCustomer: CartCustomer = {
        customerId: values?.email || customer?.customerId || '',
        Name: values?.name || customer?.name || '',
        Email: values?.email || customer?.customerId || '',
        Phone: values?.phone || customer?.phone || '',
        Address: values?.address || customer?.address || '',
        City: customer?.city || '',
        State: customer?.state || '',
        ReferenceAddress: values?.AddressReference || customer?.referenceAddress || '',
      };

      // Calcular totales del carrito
      const customerId = values?.email || customer?.customerId || '';
      const products = shoppingCart?.products || [];
      const subtotal = products.reduce((sum, product) => 
        sum + (product.amount * product.quantity), 0);
      const totalVat = Math.round(products.reduce((sum, product) => 
        sum + (product.vatValue * product.quantity), 0));

     trackEvent('ingreso_datos_cliente', 'VENTA_CARGADORES', 'envio formulario datos cliente');
        
         const promises: any[] = [
          dispatch(setLoading()),
          dispatch(
            setCustomer({
              ...customer,
              customerId: values?.email,
              existCustomer: Boolean(existCustomer)
            })
          ),
          dispatch(setCustomerToCart(cartCustomer)),
        ];

        // Crear el shopping cart solo si no existe uno previo
        // console.log("!shoppingCart?.shoppingCartId && customerId && products.length > 0 = ", !shoppingCart?.shoppingCartId && customerId && products.length > 0)
        
        if (!shoppingCart?.shoppingCartId && customerId && products.length > 0) {
          promises.push(
            dispatch(createShoppingCartThunk({
              customerId: customerId,
              total: subtotal,
              vat: totalVat,
              typeOfCart: "product",
              status: "pending",
              products: products,
            }))
          );
        }

        promises.push(dispatch(setStep(5))); // Ir al paso de pago

        await Promise.all(promises);
      

    },
    }); 
    
    useEffect(() => {
      if (!customer?.phone) {
        formik.setFieldValue('phone', '+569');
      } else {
        // Asegurarse de que el número tenga el formato correcto
        const phoneNumber = customer.phone.startsWith('+') ? customer.phone : `+56${customer.phone}`;
        formik.setFieldValue('phone', phoneNumber);
      }
    }, [customer?.phone]);
    
    

  
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
    {/* <pre>selectedCalendar = {JSON.stringify(selectedCalendar, null, 2 )}</pre> */}
    {/* <pre>calendarVisits = {JSON.stringify(calendarVisits, null, 2 )}</pre> */}
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
            
          <Box sx={{ display: 'flex', width: '100%', height: 'auto', minHeight: '200px', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Área izquierda para el formulario */}
            <Box sx={{ flex: { xs: 1, lg: 2 }, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
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
                        sx={{
                          backgroundColor: existCustomer ? 'grey.100' : 'transparent',
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: existCustomer ? 'grey.100' : 'transparent',
                          }
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          formik.setFieldValue('email', e.target.value);
                          dispatch(setCustomerData({
                            customerId: e.target.value
                          }))
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          dispatch(getCustomer({
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
                        value={formik.values.address ?? ''}
                        onAddressChange={(value) => {
                          formik.setFieldValue('address', value);
                          formik.setFieldTouched('address', true);
                        }}
                        onSelectAddress={(addressDetails) => {
                          if (addressDetails) {
                            formik.setFieldValue('address', addressDetails.StreetAddress ?? '');
                            formik.setFieldTouched('address', true);
                            dispatch(setCustomerData({              
                                address: addressDetails?.StreetAddress || "",
                                city: addressDetails?.City || "",
                                state: addressDetails?.State || "",
                                zipCode: addressDetails?.ZipCode || "",
                                lat: String(addressDetails?.Latitude || ""),
                                long: String(addressDetails?.Longitude || ""),
                                zoomLevel: "15"
                            }));
                            
                            // Actualizar también el carrito si existe el cliente
                            if (shoppingCart?.customer) {
                              const updatedCartCustomer: CartCustomer = {
                                ...shoppingCart.customer,
                                Address: addressDetails?.StreetAddress || "",
                                City: addressDetails?.City || "",
                                State: addressDetails?.State || "",
                              };
                              dispatch(setCustomerToCart(updatedCartCustomer));
                            }
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

                  {cartLoading &&  <Box sx={{ width: { xs: '100vw', md: '50%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                    <LoadingIcon icon="puff" color="#E81A68" style={{width:"60px", height:"60px"}}/>
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
            
            {/* Área derecha para el resumen del carrito */}
            <Box sx={{ flex: { xs: 1, lg: 1 }, display: { xs: 'none', lg: 'block' } }}>
              <Card sx={{ position: 'sticky', top: 20, background:"rgb(229 234 239 / 32%)"  }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Resumen de la compra
                  </Typography>
                  
                  {/* Productos */}
                  {shoppingCart?.products && shoppingCart.products.length > 0 ? (
                    <>
                      <Box sx={{ mb: 2 }}>
                        {shoppingCart.products.map((product, index) => (
                          <Box key={product.productId || index} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {product.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                                  <Chip 
                                    label={`x${product.quantity}`} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ height: '20px', fontSize: '0.7rem' }}
                                  />
                                </Box>
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, ml: 1 }}>
                                {formatCurrency(product.amount * product.quantity)}
                              </Typography>
                            </Box>
                            {index < shoppingCart.products!.length - 1 && <Divider sx={{ mt: 1 }} />}
                          </Box>
                        ))}
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      {/* Totales */}
                      <Box>
                        {(() => {
                          const subtotal = shoppingCart.products.reduce((sum, product) => 
                            sum + (product.amount * product.quantity), 0);
                          const totalVat = shoppingCart.products.reduce((sum, product) => 
                            sum + (product.vatValue * product.quantity), 0);
                          const total = subtotal;
                          
                          return (
                            <>
                              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Subtotal:
                                </Typography>
                                <Typography variant="body2">
                                  {formatCurrency(subtotal)}
                                </Typography>
                              </Box> */}
                              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  IVA:
                                </Typography>
                                <Typography variant="body2">
                                  {formatCurrency(totalVat)}
                                </Typography>
                              </Box> */}
                              {/* <Divider sx={{ my: 1 }} /> */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  Total:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {formatCurrency(total)}
                                </Typography>
                              </Box>
                            </>
                          );
                        })()}
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                      No hay productos en el carrito
                    </Typography>
                  )}
                  
                  {/* Información del cliente si existe */}
                  {shoppingCart?.customer && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Cliente:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {shoppingCart.customer.Name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {shoppingCart.customer.Email}
                      </Typography>
                      {shoppingCart.customer.Address && (
                        <>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mt: 1 }}>
                            {shoppingCart.customer.Address}
                            {shoppingCart.customer.ReferenceAddress && `, ${shoppingCart.customer.ReferenceAddress}`}
                          </Typography>
                          {(shoppingCart.customer.City || shoppingCart.customer.State) && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              {[shoppingCart.customer.City, shoppingCart.customer.State].filter(Boolean).join(', ')}
                            </Typography>
                          )}
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
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
            background: `${cartLoading ? "#bfbfbf": "#FFFFFF"}`,
            color:"#E81A68",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={cartLoading}
          onClick={() => dispatch(setStep(0))}
        >
          Volver
        </Button>
        
        <Button
          id="PayShoppingCart"
          variant="contained"
          type="submit"
          size="large"
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
                color: '#FFFFFF',
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
            background:`${cartLoading ? "#bfbfbf": "#E81A68"}`,
            color:"#FFFFFF",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={cartLoading}
        >
          Continuar y pagar 
        </Button>
      </Box>
    </form>
        
  </Box>
      
    </>
  );
};

