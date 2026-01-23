"use client";
import { FC, useState } from "react";
import { Content, asText } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { useFormik } from "formik";
import * as yup from "yup";

import Link from "next/link";

import { Text } from "@/app/components/shared/text";
import {ContactFormTemplate, HTML} from "@/app/components/shared/emailsTemplate/ContactForm";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { ContactFormProps } from "../types"

// Inicializar emailjs
import emailjs, { init } from "emailjs-com";

// init("Csc41asZklkk5HTWk");

// const SERVICE = "service_1ufc0ju";
const SERVICE:string = "service_dbrrm6b";
const TEMPLATE:string = "template_ey97i29";
// const TEMPLATE = "template_ey97i29";
// const CONTENT_TITLE = "Formulario de Diagnóstico: Transición a Movilidad Eléctrica."; // contentTitle
const CONTENT_TITLE:string = "Postulación Cargadores Comunitarios"; // contentTitle
const CONTENT_WELCOME:string = "Nuestro equipo evaluará la factibilidad técnica y la coordinación con la administración o entidad responsable.💡 Este programa está orientado a comunidades, establecimientos y espacios de alto tránsito que busquen fomentar la movilidad eléctrica y compartir el beneficio entre sus residentes, huéspedes, clientes o colaboradores. Recibirás una respuesta de nuestros consultores lo antes posible."; // contentWelcomeText





interface EmailState {
  sentEmail: boolean;
  isFailure: boolean;
  title: string;
  text: string;
  response?: string;
}

const validationSchema = yup.object({
  company: yup
    .string()
    .min(2, "La empresa debe tener al menos 2 caracteres")
    .required("Campo obligatorio"),
  firstname: yup
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("Campo obligatorio"),
  position: yup
    .string()
    .min(2, "El cargo debe tener al menos 2 caracteres")
    .required("Campo obligatorio"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Campo obligatorio"),
  phone: yup
    .string()
    .min(5, "El teléfono debe tener al menos 9 digitos")
    .required("Campo obligatorio"),
  typeofresidence: yup
    .string()
    .required("Campo obligatorio"),
  nameofresidence: yup
    .string()
    .min(2, "El nombre de la residencia debe tener al menos 2 caracteres")
    .required("Campo obligatorio"),
  address: yup
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .required("Campo obligatorio"),
  numberofvehicles: yup
    .string()
    .min(1, "Debe ingresar la cantidad de vehículos")
    .required("Campo obligatorio"),
  visitorparkingstatus: yup
    .string()
    .required("Campo obligatorio"),
  evusercount: yup
    .string()
    .min(1, "Debe ingresar la cantidad de usuarios EV")
    .required("Campo obligatorio"),
  message: yup
    .string()
    .min(5, "El mensaje debe tener al menos 5 caracteres")
    .required("Campo obligatorio"),
});

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "400px",
  padding: "22px 64px 0 64px",
  [theme.breakpoints.down("md")]: {
    padding: "22px 24px 0 24px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "22px 16px 0 16px",
  },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  maxWidth: "640px",
  width: "70%",
  background: "white",
  // border: "1px solid rgba(0, 17, 51, 0.15)",
  // borderRadius: "24px",
  padding: "48px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  position: "relative",
  
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "32px",
  },
  
  "& label": {
    fontSize: theme.typography.body1.fontSize || "16px",
    lineHeight: theme.typography.body1.lineHeight || "24px",
    fontWeight: theme.typography.body1.fontWeight || 400,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    marginTop: "14px",
    letterSpacing: 0,
    marginBottom: "5px",
  },
  
  "& input": {
    height: "48px",
    width: "100%",
    border: "1px solid rgba(0, 17, 51, 0.15)",
    borderRadius: "6px",
    padding: "13px",
    color: "rgba(0, 17, 51, 0.8)",
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontSize: "14px",
    transition: "all 0.4s ease",
    outline: "none",
    boxShadow: "0 0 0 0 transparent",
    "&:focus": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
    "&.error": {
      border: "1px solid #ff3355",
    },
  },
  
  "& textarea": {
    "&:focus": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
    "&.error": {
      border: "1px solid #ff3355",
    },
    height: "48px",
    width: "100%",
    border: "1px solid rgba(0, 17, 51, 0.15)",
    borderRadius: "6px",
    padding: "13px",
    color: "rgba(0, 17, 51, 0.8)",
  },
  "& input[type='submit']": {
    marginTop: "26px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    fontWeight: "bold",
    borderRadius: "24px",
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    lineHeight: "24px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    height: "48px",
    width: "100%",
    background: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "#ffffff",
    },
    appearance: "none",
  },
  "& .country-dropdown": {
    position: "relative",
    width: "100%",
    "& .error": {
      color: "#ff3355",
    },
    "& input": {
      marginTop: "5px",
    },
    "& ul": {
      top: "39px",
    },
    "& span.error": {
      fontSize: "12px",
      lineHeight: "16px",
      padding: "5px 0",
      minHeight: "22px",
    },
  },
  
  "& .dial-dropdown": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "& .dial-items": {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      "& input#phone": {
        marginLeft: "117px",
        zIndex: 2,
      },
    },
    // "& span": {
    //   color: "#ff3355",
    //   marginTop: "4px",
    //   marginBottom: "4px",
    //   fontSize: "12px",
    //   lineHeight: "16px",
    //   minHeight: "22px",
    // },
  },
  
  "& .checkbox-container": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    border: "none",
    "& input[type='checkbox']": {
      height: "24px",
      width: "24px",
      margin: 0,
      padding: "0 5px",
      "&:focus": {
        boxShadow: "0 0 0 0 transparent",
      },
    },
    // "& p": {
    //   margin: "0 0 0 10px",
    // },
    "& a": {
      textDecoration: "none",
      fontWeight: 600,
      color: theme.palette.text.primary,
      transition: "all 0.3s ease",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
  
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
  
  "@media (max-width: 400px)": {
    border: "none",
  },
  
  "@media (max-width: 768px)": {
    "& input[type='submit']": {
      marginBottom: "16px",
    },
  },
  
  "@media (max-width: 500px)": {
    "& input[type='submit']": {
      marginBottom: 0,
    },
    "& .checkbox-container p": {
      width: "300px",
    },
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& label": {
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
  },
  "& input": {
    padding: theme.spacing(1.5),
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "inherit",
    "&.error": {
      borderColor: theme.palette.error.main,
    },
  },
  "& textarea": {
    padding: theme.spacing(1.5),
    border: "none",
    boxShadow: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "inherit",
    "&.error": {
      borderColor: theme.palette.error.main,
    },
  },
  "& .error": {
    color: theme.palette.error.main,
    fontSize: "14px",
    marginTop: theme.spacing(-1.5),
    marginBottom: theme.spacing(1),
  },
  "& input[type='submit']": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: "none",
    padding: theme.spacing(1.5, 3),
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));


import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCustomer, setCustomer, setCustomerData, getCustomer } from "@/store/Customer/slice";
import { setWebContactForm } from "@/store/WebContactForm/slice";


export const PostulacionElectrolineras: FC<ContactFormProps> = ({ slice }) => {
  const { title, subtitle, email, message, name } = slice.primary;
  const primaryDefault = slice.primary as any;
  const company = primaryDefault?.company;
  const phone = primaryDefault?.phone;
  const position = primaryDefault?.position;
  const typeofresidence = primaryDefault?.typeofresidence;
  const nameofresidence = primaryDefault?.nameofresidence;
  const address = primaryDefault?.address;
  const numberofvehicles = primaryDefault?.numberofvehicles;
  const visitorparkingstatus = primaryDefault?.visitorparkingstatus;
  const evusercount = primaryDefault?.evusercount;
  const dispatch = useAppDispatch();
  const {  customer, existCustomer } = useAppSelector(selectCustomer); 
  
  const [isSentEmail, setIsSentEmail] = useState<EmailState>({
    sentEmail: false,
    isFailure: false,
    title: "Página no encontrada 😭",
    text: "No encontramos la página solicitada",
  });

  const formik = useFormik({
    initialValues: {
      company: "",
      firstname: "",
      position: "",
      email: "",
      phone: "",
      typeofresidence: "",
      nameofresidence: "",
      address: "",
      numberofvehicles: "",
      visitorparkingstatus: "",
      evusercount: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      
      await Promise.all([
        dispatch(
          setCustomer({
            customerId: values?.email,
            existCustomer: Boolean(existCustomer),
            name: values?.firstname,
            email: values?.email,
            phone: values?.phone,
            typeOfResidence: values?.typeofresidence || "other",
            address: values?.address,
          })
        ),
        dispatch(
          setWebContactForm({
            webContactFormId: crypto.randomUUID(),
            date: new Date().toISOString(),
            type: "OTHER",
            name: values?.firstname,
            email: values?.email,
            phone: values?.phone,
            whatsapp: values?.phone,
            message: values?.message,
            subject: `Formulario de Postulación Electrolineras - ${values?.company}`,
            category: "ELECTROLINERAS",
            companyName: values?.company,
            cantidadVehiculos: parseInt(values?.numberofvehicles) || 0,
            customerId: values?.email,
          })
        ),
      ]);
      
      setIsSentEmail({
        sentEmail: true,
        isFailure: false,
        title: "Espere un momento ⌛",
        text: "Estamos procesando su inscripción",
      });

  

      const HTML = ()=> `
<div style="line-height:1.3;margin:0;min-width:100%;padding:0;text-align:left;width:100% !important">

    <table style="border-collapse:collapse;border-spacing:0;height:100%;margin:0;padding:0;vertical-align:top;width:100%">
        <tbody>
            <tr style="padding:0;text-align:left;vertical-align:top" align="left">
                <td align="center" valign="top" style="border-collapse:collapse!important;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                    <center>
                        <table>
                            <tbody>
                                <tr style="padding:0;text-align:left;vertical-align:top" align="left">
                                    <td style="word-wrap:break-word" align="left" valign="top">
    <table style="display:none">
    </table>


<table align="center" style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%">
    <tbody>
        <tr style="padding:0;text-align:left;vertical-align:top" align="left">
            <td align="left" valign="top">
                
                
                <table style="border-collapse:collapse;border-spacing:0;font-family:Verdana,Geneva,sans-serif;height:auto;max-width:580px;padding:0;text-align:left;vertical-align:top;width:100%">
                    <tbody>
                        <tr align="left">
                            <td  align="left" valign="top">

                                <hr/>
                                
                                <p >
                                    Nombre de la empresa: <b>${values?.company ? values.company:""}</b></p>
                                
                                <p >
                                    Nombre completo del solicitante: <b>${values?.firstname ? values.firstname:""}</b></p>
                                
                                <p >
                                    Cargo/Rol: <b>${values?.position ? values.position:""}</b></p>
                                
                                <p >
                                    Correo electrónico: <b>${values?.email ? values.email:""}</b></p>
                                
                                <p >
                                   Teléfono de contacto: <b>${values?.phone ? values.phone:""}</b></p>
                                
                                <p >
                                    Tipo de establecimiento: <b>${values?.typeofresidence ? values.typeofresidence:""}</b></p>
                                
                                <p >
                                    Nombre del establecimiento / comunidad: <b>${values?.nameofresidence ? values.nameofresidence:""}</b></p>
                                
                                <p >
                                    Dirección completa: <b>${values?.address ? values.address:""}</b></p>
                                
                                <p >
                                  Cantidad de vehículos: <b>${values?.numberofvehicles ? values.numberofvehicles:""}</b>
                                </p>
                                
                                <p >
                                  ¿Tiene estacionamientos de visita?: <b>${values?.visitorparkingstatus ? values.visitorparkingstatus:""}</b>
                                </p>
                                
                                <p >
                                  ¿Cantidad de usuarios con auto eléctrico?: <b>${values?.evusercount ? values.evusercount:""}</b>
                                </p>
                                
                                <p >
                                  Mensaje: <b>${values?.message ? values.message:""}</b>
                                </p>
                               
                            </td>
                        </tr>
                    </tbody>
                </table>

                
                <table >
                    <tbody>
                        <tr align="left">
                            <td  align="left" valign="top">
                                <hr/>
                                
                                <p></p>
                                    
                                    <p>Si tienes alguna otra pregunta o necesitas un contacto más directo, <a href="https://api.whatsapp.com/send/?phone=56967666652&amp;text=Contacto+desde+el+formulario+energica.cl&amp;type=phone_number&amp;app_absent=0" style="color:#7e4996;font-family:Verdana,Geneva,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://api.whatsapp.com/send/?phone%3D56967666652%26text%3DContacto%2Bdesde%2Bel%2Bformulario%energica.cl%26type%3Dphone_number%26app_absent%3D0&amp;source=gmail&amp;ust=1766675954764000&amp;usg=AOvVaw3MBemm1LbQ-IfSg1XK-eIc">
                                     no dudes en escribirnos por WhatsApp.
                                    </a> Simplemente haz clic en el siguiente enlace:
                                    </p>
                                    
                                    <br>
                                    <a href="https://api.whatsapp.com/send/?phone=56967666652&amp;text=Contacto+desde+el+formulario+energica.cl&amp;type=phone_number&amp;app_absent=0" style="color:#7e4996;font-family:Verdana,Geneva,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://api.whatsapp.com/send/?phone%3D56967666652%26text%3DContacto%2Bdesde%2Bel%2Bformulario%energica.cl%26type%3Dphone_number%26app_absent%3D0&amp;source=gmail&amp;ust=1766675954764000&amp;usg=AOvVaw3MBemm1LbQ-IfSg1XK-eIc">
                                     Hablemos por WhatsApp aquí
                                   </a>
  
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

          
      </td></tr></tbody></table>
    
           
            </td>
        </tr>
        
        </tbody>
    </table>
    
    
    
                            
            </center>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
`

      try {
        init("UYcrSeCqLGW8xqT4S");
        const CONTENT_HTML =HTML() // contentHTML
        const templateParams = {
          from_name: values.firstname,
          to_email: values.email,
          to_name: values.firstname,
          reply_to: values.email,
          message: values.message,
          contentTitle: CONTENT_TITLE,
          contentWelcomeText: CONTENT_WELCOME,
          contentHTML: CONTENT_HTML,
        };
        
        const response = await emailjs.send(
          // SERVICE,  // 1. Service ID
          // TEMPLATE, // 2. Template ID
          "service_dbrrm6b",
          "template_ey97i29",
          templateParams);
        setIsSentEmail({
          sentEmail: true,
          isFailure: false,
          title: "¡Gracias por dar el primer paso hacia la electromovilidad! 🎉",
          text: "Hemos recibido tu consulta y pronto un miembro de nuestro equipo de expertos en electromovilidad se pondrá en contacto contigo. Nos especializamos en proyectos de transporte sostenible para personas y empresas, y estamos listos para ayudarte a concretar el tuyo de manera eficiente y rentable.",
          response: JSON.stringify(response),
        });
      } catch (error) {
        console.log("FAILED...", error);
        setIsSentEmail({
          sentEmail: true,
          isFailure: true,
          title: "Error al enviar 😭",
          text: "Hubo un problema al enviar el formulario. Por favor, intente nuevamente o contactenos vía whatsapp al +(56) 96766 6652",
        });
      }
    },
  });

  if (isSentEmail.sentEmail) {
    return (
      <PageContainer
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <SectionContainer>
       
       
        
                {/* isSentEmail.title
                isSentEmail.text */}

           
          {/* {isSentEmail.isFailure && ( */}
          { isSentEmail.sentEmail ? (
            <Box sx={{ 
              minWidth:'668px',
              minHeigh:'360px',
              marginTop: '22px',
              border: "1px solid rgba(0, 17, 51, 0.15)",
              borderRadius: "24px",
              padding: "48px",
              fontSize: '24px',
              lineHeight: '2rem',
              "@media (max-width: 960px)": {
                minWidth: "auto",
                width: "100%",
                padding: "32px",
              },
              "@media (max-width: 600px)": {
                padding: "24px",
                fontSize: '20px',
              },
            }}>
              {/* <p style={{ fontSize: '32px', textAlign:'center' }}>😱</p> */}
              <p style={{ fontSize: '32px', textAlign:'center' }}>{isSentEmail.title}</p>
              <p style={{ fontSize: '18px', textAlign:'center' }}>{isSentEmail.text}</p>
              {/* <p>Por favor, intente nuevamente o contacte a soporte.</p> */}
              
              <Link href="/" prefetch>
                <ButtonContainer variant="outlined" fullWidth>
                  Ir al inicio
                </ButtonContainer>
              </Link>
              
            </Box>
          ):
            null
          }
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
       
       {/* <Text textObject={title}/>
        <Text text={isSentEmail?.text}/> */}
          
      <SectionContainer>
        <form onSubmit={formik.handleSubmit} noValidate>
          {title && title.length > 0 && (
            <Text textObject={title}/>
          )}
          {subtitle && subtitle.length > 0 && (
           <Box sx={{marginTop: '22px',}}>
              <Text textObject={subtitle}/>
           </Box>
          )}

          <FormContainer sx={{
            border: "1px solid rgba(0, 17, 51, 0.15)",
            borderRadius: "24px",
            marginTop: '22px',
            padding: "48px",
            "@media (max-width: 960px)": {
              padding: "32px",
            },
            "@media (max-width: 600px)": {
              padding: "24px",
            },
          }}>
            <Box>
              <Typography
                component="label"
                htmlFor="company"
                sx={{ display: "block", mb: 0.5 }}
              >
                {name && Array.isArray(company) && company.length > 0
                  ? asText(company as any)
                  : typeof company === "string"
                  ? company
                  : "Empresa"}
              </Typography>
              <TextField
                fullWidth
                id="company"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.company && Boolean(formik.errors.company)
                }
                helperText={
                  formik.touched.company && formik.errors.company
                }
              />
            </Box>
            <Box>
              <Typography
                component="label"
                htmlFor="firstname"
                sx={{ display: "block", mb: 0.5 }}
              >
                {name && Array.isArray(name) && name.length > 0
                  ? asText(name as any)
                  : typeof name === "string"
                  ? name
                  : "Nombre"}
              </Typography>
              <TextField
                fullWidth
                id="firstname"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={
                  formik.touched.firstname && formik.errors.firstname
                }
              />
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="position"
                sx={{ display: "block", mb: 0.5 }}
              >
                {position && Array.isArray(position) && position.length > 0
                  ? asText(position as any)
                  : typeof position === "string"
                  ? position
                  : "Cargo"}
              </Typography>
              <TextField
                fullWidth
                id="position"
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={
                  formik.touched.position && formik.errors.position
                }
              />
            </Box>

            <Box>
              <Typography
                component="label"
                htmlFor="email"
                sx={{ display: "block", mb: 0.5 }}
              >
                {email && Array.isArray(email) && email.length > 0
                  ? asText(email as any)
                  : typeof email === "string"
                  ? email
                  : "Email"}
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                placeholder="email@dominio.com"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                // onBlur={formik.handleBlur}
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
              />
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="phone"
                sx={{ display: "block", mb: 0.5 }}
              >
                {phone && Array.isArray(phone) && phone.length > 0
                  ? asText(phone as any)
                  : typeof phone === "string"
                  ? phone
                  : "Teléfono"}
              </Typography>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                type="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="typeofresidence"
                sx={{ display: "block", mb: 0.5 }}
              >
                {typeofresidence && Array.isArray(typeofresidence) && typeofresidence.length > 0
                  ? asText(typeofresidence as any)
                  : typeof typeofresidence === "string"
                  ? typeofresidence
                  : "Tipo de residencia"}
              </Typography>
              <FormControl 
                fullWidth 
                error={formik.touched.typeofresidence && Boolean(formik.errors.typeofresidence)}
              >
                <Select
                  id="typeofresidence"
                  name="typeofresidence"
                  value={formik.values.typeofresidence}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  displayEmpty
                  sx={{
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.typeofresidence && Boolean(formik.errors.typeofresidence)
                        ? "1px solid #ff3355"
                        : "1px solid rgba(0, 17, 51, 0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.typeofresidence && Boolean(formik.errors.typeofresidence)
                        ? "1px solid #ff3355"
                        : "1px solid rgba(0, 17, 51, 0.15)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.typeofresidence && Boolean(formik.errors.typeofresidence)
                        ? "1px solid #ff3355"
                        : `2px solid ${formik.touched.typeofresidence && Boolean(formik.errors.typeofresidence) ? "#ff3355" : "rgba(0, 17, 51, 0.15)"}`,
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  <MenuItem value="Edificio residencial (departamentos)">Edificio residencial (departamentos)</MenuItem>
                  <MenuItem value="Condominio residencial (casas)">Condominio residencial (casas)</MenuItem>
                  <MenuItem value="Edificio de oficinas">Edificio de oficinas</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
                {formik.touched.typeofresidence && formik.errors.typeofresidence && (
                  <FormHelperText>{formik.errors.typeofresidence}</FormHelperText>
                )}
              </FormControl>
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="nameofresidence"
                sx={{ display: "block", mb: 0.5 }}
              >
                {nameofresidence && Array.isArray(nameofresidence) && nameofresidence.length > 0
                  ? asText(nameofresidence as any)
                  : typeof nameofresidence === "string"
                  ? nameofresidence
                  : "Nombre de la residencia"}
              </Typography>
              <TextField
                fullWidth
                id="nameofresidence"
                name="nameofresidence"
                value={formik.values.nameofresidence}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nameofresidence && Boolean(formik.errors.nameofresidence)}
                helperText={formik.touched.nameofresidence && formik.errors.nameofresidence}
              />
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="address"
                sx={{ display: "block", mb: 0.5 }}
              >
                {address && Array.isArray(address) && address.length > 0
                  ? asText(address as any)
                  : typeof address === "string"
                  ? address
                  : "Dirección"}
              </Typography>
              <TextField
                fullWidth
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="numberofvehicles"
                sx={{ display: "block", mb: 0.5 }}
              >
                {numberofvehicles && Array.isArray(numberofvehicles) && numberofvehicles.length > 0
                  ? asText(numberofvehicles as any)
                  : typeof numberofvehicles === "string"
                  ? numberofvehicles
                  : "Cantidad de vehículos"}
              </Typography>
              <TextField
                fullWidth
                id="numberofvehicles"
                name="numberofvehicles"
                type="number"
                value={formik.values.numberofvehicles}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.numberofvehicles && Boolean(formik.errors.numberofvehicles)}
                helperText={formik.touched.numberofvehicles && formik.errors.numberofvehicles}
              />
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="visitorparkingstatus"
                sx={{ display: "block", mb: 0.5 }}
              >
                {visitorparkingstatus && Array.isArray(visitorparkingstatus) && visitorparkingstatus.length > 0
                  ? asText(visitorparkingstatus as any)
                  : typeof visitorparkingstatus === "string"
                  ? visitorparkingstatus
                  : "Estado de estacionamiento para visitantes"}
              </Typography>
              <FormControl 
                fullWidth 
                error={formik.touched.visitorparkingstatus && Boolean(formik.errors.visitorparkingstatus)}
              >
                <Select
                  id="visitorparkingstatus"
                  name="visitorparkingstatus"
                  value={formik.values.visitorparkingstatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  displayEmpty
                  sx={{
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.visitorparkingstatus && Boolean(formik.errors.visitorparkingstatus)
                        ? "1px solid #ff3355"
                        : "1px solid rgba(0, 17, 51, 0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.visitorparkingstatus && Boolean(formik.errors.visitorparkingstatus)
                        ? "1px solid #ff3355"
                        : "1px solid rgba(0, 17, 51, 0.15)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.visitorparkingstatus && Boolean(formik.errors.visitorparkingstatus)
                        ? "1px solid #ff3355"
                        : `2px solid ${formik.touched.visitorparkingstatus && Boolean(formik.errors.visitorparkingstatus) ? "#ff3355" : "rgba(0, 17, 51, 0.15)"}`,
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  <MenuItem value="No tiene">No tiene</MenuItem>
                  <MenuItem value="Si tiene">Si tiene</MenuItem>
                </Select>
                {formik.touched.visitorparkingstatus && formik.errors.visitorparkingstatus && (
                  <FormHelperText>{formik.errors.visitorparkingstatus}</FormHelperText>
                )}
              </FormControl>
            </Box>
            
            <Box>
              <Typography
                component="label"
                htmlFor="evusercount"
                sx={{ display: "block", mb: 0.5 }}
              >
                {evusercount && Array.isArray(evusercount) && evusercount.length > 0
                  ? asText(evusercount as any)
                  : typeof evusercount === "string"
                  ? evusercount
                  : "Cantidad de usuarios EV"}
              </Typography>
              <FormControl 
                fullWidth 
                error={formik.touched.evusercount && Boolean(formik.errors.evusercount)}
              >
                <Select
                  id="evusercount"
                  name="evusercount"
                  value={formik.values.evusercount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  displayEmpty
                  sx={{
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.evusercount && Boolean(formik.errors.evusercount)
                        ? "1px solid #ff3355"
                        : "1px solid rgba(0, 17, 51, 0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.evusercount && Boolean(formik.errors.evusercount)
                        ? "1px solid #ff3355"
                        : "1px solid rgba(0, 17, 51, 0.15)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: formik.touched.evusercount && Boolean(formik.errors.evusercount)
                        ? "1px solid #ff3355"
                        : `2px solid ${formik.touched.evusercount && Boolean(formik.errors.evusercount) ? "#ff3355" : "rgba(0, 17, 51, 0.15)"}`,
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  <MenuItem value="No lo sé">No lo sé</MenuItem>
                  <MenuItem value="Si hay, pero no se cuantos">Si hay, pero no se cuantos</MenuItem>
                  <MenuItem value="Si hay, 2 o menos">Si hay, 2 o menos</MenuItem>
                  <MenuItem value="Si hay, más de 2">Si hay, más de 2</MenuItem>
                  <MenuItem value="No hay">No hay</MenuItem>
                </Select>
                {formik.touched.evusercount && formik.errors.evusercount && (
                  <FormHelperText>{formik.errors.evusercount}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={{
              padding: '0px',
              margin: '0px',
            }}>
              <Typography
                component="label"
                htmlFor="message"
                sx={{ display: "block", mb: 0.5 }}
              >
                {message && Array.isArray(message) && message.length > 0
                  ? asText(message as any)
                  : typeof message === "string"
                  ? message
                  : "Mensaje"}
              </Typography>
              <TextField
                fullWidth
                id="message"
                name="message"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.message && Boolean(formik.errors.message)
                }
                helperText={formik.touched.message && formik.errors.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                  },
                  "& .MuiInputBase-input": {
                    border: "none",
                    boxShadow: "none",
                  },
                }}
              />
            </Box>

            <Button type="submit" variant="contained" size="large">
              Enviar email
            </Button>
          </FormContainer>
        </form>
        {/* <pre>{JSON.stringify(slice.primary, null, 2)}</pre> */}
      </SectionContainer>
    </PageContainer>
  );
};