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
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "800px",
  "& h2": {
    marginBottom: theme.spacing(2),
  },
  "& p": {
    marginBottom: theme.spacing(3),
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
          <Typography variant="h2" component="h2">
            {isSentEmail.title}
          </Typography>
          <Typography variant="body1" component="p">
            {isSentEmail.text}
          </Typography>
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
          <Typography variant="h2" component="h2" gutterBottom>
            {title && title.length > 0 ? (
              asText(title)
            ) : (
              "Contáctanos"
            )}
          </Typography>

          {subtitle && subtitle.length > 0 && (
            <Typography variant="body1" component="p" sx={{ mb: 3 }}>
              {asText(subtitle)}
            </Typography>
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