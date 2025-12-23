"use client";
import { FC, useState } from "react";
import { Content, asText } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { useFormik } from "formik";
import * as yup from "yup";
import emailjs, { init } from "emailjs-com";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Text, H2, H3, Paragraph } from "@/app/components/shared/text";

// Inicializar emailjs
init("Csc41asZklkk5HTWk");

const SERVICE = "service_1ufc0ju";
const TEMPLATE = "template_vk47fc7";

interface EmailState {
  sentEmail: boolean;
  isFailure: boolean;
  title: string;
  text: string;
  response?: string;
}

const validationSchema = yup.object({
  firstname: yup
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("Campo obligatorio"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Campo obligatorio"),
  message: yup
    .string()
    .min(5, "El mensaje debe tener al menos 5 caracteres")
    .required("Campo obligatorio"),
});

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "400px",
  padding: "64px",
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  maxWidth: "640px",
  width: "100%",
  background: "white",
  border: "1px solid rgba(0, 17, 51, 0.15)",
  borderRadius: "24px",
  padding: "48px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  position: "relative",
  
  "& h2": {
    fontSize: "32px",
    lineHeight: "28px",
    fontWeight: 500,
    color: "rgba(0, 17, 51, 0.8)",
    textAlign: "left",
    margin: 0,
    letterSpacing: 0,
    marginBottom: "12px",
  },
  
  "& p": {
    fontSize: theme.typography.body1.fontSize || "16px",
    lineHeight: theme.typography.body1.lineHeight || "24px",
    fontWeight: theme.typography.body1.fontWeight || 400,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    marginTop: "14px",
    marginBottom: "32px",
    letterSpacing: 0,
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
    minHeight: "48px",
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
  
  "& span": {
    fontFamily: theme.typography.fontFamily,
    color: "#ff3355",
    marginTop: "4px",
    marginBottom: "4px",
    fontSize: "12px",
    lineHeight: "16px",
    minHeight: "22px",
    "&.last": {
      minHeight: "unset",
    },
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
  
  "& .dateText": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    "& span": {
      width: "100%",
      marginLeft: "22px",
      marginTop: "14px",
      letterSpacing: 0,
      marginBottom: "5px",
      fontSize: theme.typography.body1.fontSize || "16px",
      lineHeight: theme.typography.body1.lineHeight || "24px",
      fontWeight: theme.typography.body1.fontWeight || 400,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily,
    },
    "& .tui-datepicker-input > input": {
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
    "& span": {
      color: "#ff3355",
      marginTop: "4px",
      marginBottom: "4px",
      fontSize: "12px",
      lineHeight: "16px",
      minHeight: "22px",
    },
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
    "& p": {
      margin: "0 0 0 10px",
    },
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
  "& input, & textarea": {
    padding: theme.spacing(1.5),
    border: "1px solid #e0e0e0",
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

export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

const ContactForm: FC<ContactFormProps> = ({ slice }) => {
  const { title, subtitle, email, message, name } = slice.primary;

  const [isSentEmail, setIsSentEmail] = useState<EmailState>({
    sentEmail: false,
    isFailure: false,
    title: "Página no encontrada 😭",
    text: "No encontramos la página solicitada",
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSentEmail({
        sentEmail: true,
        isFailure: false,
        title: "Espere un momento ⌛",
        text: "Estamos procesando su inscripción",
      });

      const templateParams = {
        from_name: values.firstname,
        to_email: values.email,
        to_name: values.firstname,
        message: values.message,
        reply_to: values.email,
      };

      try {
        const response = await emailjs.send(SERVICE, TEMPLATE, templateParams);
        setIsSentEmail({
          sentEmail: true,
          isFailure: false,
          title: "Registro ingresado 🎉",
          text: "Te enviamos un email, responde y adjunta tu comprobante de pago para finalizar el proceso",
          response: JSON.stringify(response),
        });
      } catch (error) {
        console.log("FAILED...", error);
        setIsSentEmail({
          sentEmail: true,
          isFailure: true,
          title: "Error al enviar 😭",
          text: "Hubo un problema al enviar el formulario. Por favor, intente nuevamente.",
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
          {/* <Typography variant="h2" component="h2">
            {isSentEmail.title}
          </Typography> */}
          
          {/* <Text textObject={isSentEmail?.title} />  */}
          <H2 text={isSentEmail?.title}/>
          
          {/* <Typography variant="body1" component="p">
            {isSentEmail.text}
          </Typography> */}
           
           <Paragraph text={isSentEmail?.text}/>
           
          {isSentEmail.isFailure && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Por favor, intente nuevamente o contacte a soporte.
            </Alert>
          )}
          <Link href="/" prefetch>
            <ButtonContainer variant="contained" fullWidth>
              Ir al home
            </ButtonContainer>
          </Link>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SectionContainer>
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* <Typography variant="h2" component="h2" gutterBottom>
            {title && title.length > 0 ? (
              asText(title)
            ) : (
              "Contáctanos"
            )}
          </Typography> */}
          
          {/* <H2 text={title && title.length > 0 ? (
              asText(title)
            ) : (
              "Contáctanos"
            )}/> */}

          {title && title.length > 0 && (
            // <Typography variant="body1" component="p" sx={{ mb: 3 }}>
            //   {asText(subtitle)}
            // </Typography>
            <H2>
              {asText(title)}
            </H2>
          )}
          {subtitle && subtitle.length > 0 && (
            // <Typography variant="body1" component="p" sx={{ mb: 3 }}>
            //   {asText(subtitle)}
            // </Typography>
            <Paragraph>
              {asText(subtitle)}
            </Paragraph>
          )}

          <FormContainer>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            <Box>
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
              />
            </Box>

            <Button type="submit" variant="contained" size="large">
              Enviar email
            </Button>
          </FormContainer>
        </form>
      </SectionContainer>
    </PageContainer>
  );
};

export default ContactForm;