"use client";

import { useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as yup from "yup";
import emailjs from "emailjs-com";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

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
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import HpHeaderNew from "@/app/components/shared/header/HpHeaderNew";
import AddressInput from "@/app/components/AddressInput2";

// ─── EmailJS config ──────────────────────────────────────────────────────────
const SERVICE = "service_dbrrm6b";
const TEMPLATE = "template_ey97i29";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Charger {
  marca: string;
  modelo: string;
  origen: string;
  fabricante: string;
  cableOSocket: string;
  potencia: string;
  tipoCorriente: string;
  appUsuario: string;
  ocpp: string;
  precioMarketplace: string;
  precioEnergicaCity: string;
}

const emptyCharger = (): Charger => ({
  marca: "",
  modelo: "",
  origen: "",
  fabricante: "",
  cableOSocket: "",
  potencia: "",
  tipoCorriente: "",
  appUsuario: "",
  ocpp: "",
  precioMarketplace: "",
  precioEnergicaCity: "",
});

// ─── Validation ──────────────────────────────────────────────────────────────
const chargerSchema = yup.object({
  marca: yup.string().required("Obligatorio"),
  modelo: yup.string().required("Obligatorio"),
  origen: yup.string().required("Obligatorio"),
  fabricante: yup.string().required("Obligatorio"),
  cableOSocket: yup.string().required("Obligatorio"),
  potencia: yup.string().required("Obligatorio"),
  tipoCorriente: yup.string().required("Obligatorio"),
  appUsuario: yup.string().required("Obligatorio"),
  ocpp: yup.string().required("Obligatorio"),
  precioMarketplace: yup.string().required("Obligatorio"),
  precioEnergicaCity: yup.string().required("Obligatorio"),
});

const validationSchema = yup.object({
  empresa: yup.string().min(2, "Mínimo 2 caracteres").required("Obligatorio"),
  rut: yup
    .string()
    .matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, "Formato: 12.345.678-9")
    .required("Obligatorio"),
  direccionEmpresa: yup.string().min(5, "Mínimo 5 caracteres").required("Obligatorio"),
  representanteLegal: yup.string().min(2, "Mínimo 2 caracteres").required("Obligatorio"),
  nombreContacto: yup.string().min(2, "Mínimo 2 caracteres").required("Obligatorio"),
  telefonoContacto: yup
    .string()
    .required("Obligatorio")
    .test("phone", "Formato inválido (ej: +56 9 1234 5678)", (v) => {
      if (!v) return false;
      try { return isValidPhoneNumber(v); } catch { return false; }
    }),
  emailContacto: yup.string().email("Email inválido").required("Obligatorio"),
  cargadores: yup.array().of(chargerSchema).min(1, "Agrega al menos un cargador"),
  nombreSoporte: yup.string().min(2, "Mínimo 2 caracteres").required("Obligatorio"),
  telefonoSoporte: yup
    .string()
    .required("Obligatorio")
    .test("phone2", "Formato inválido (ej: +56 9 1234 5678)", (v) => {
      if (!v) return false;
      try { return isValidPhoneNumber(v); } catch { return false; }
    }),
  emailSoporte: yup.string().email("Email inválido").required("Obligatorio"),
  direccionSoporte: yup.string().min(5, "Mínimo 5 caracteres").required("Obligatorio"),
  horarioAtencion: yup.string().required("Obligatorio"),
  garantiaPlazo: yup.string().required("Obligatorio"),
  exclusiones: yup.string(),
});

// ─── Styled components (mismo patrón que PostulacionElectrolineras) ───────────
const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "100vh",
  padding: "22px 64px 64px",
  [theme.breakpoints.down("md")]: { padding: "22px 24px 48px" },
  [theme.breakpoints.down("sm")]: { padding: "22px 16px 32px" },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  maxWidth: "720px",
  margin: "0 auto",
  background: "white",
  padding: "40px 48px",
  borderRadius: "12px",
  border: "1px solid rgba(0,17,51,0.1)",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: { padding: "28px 24px" },
  [theme.breakpoints.down("sm")]: { padding: "20px 16px" },
}));

const FieldLabel = styled("label")(({ theme }) => ({
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: "6px",
  marginTop: "16px",
}));

const StyledInput = styled("input")(({ theme }) => ({
  height: "48px",
  width: "100%",
  border: "1px solid rgba(0,17,51,0.15)",
  borderRadius: "6px",
  padding: "0 13px",
  color: "rgba(0,17,51,0.8)",
  fontFamily: theme.typography.fontFamily,
  fontSize: "14px",
  outline: "none",
  transition: "box-shadow 0.2s",
  boxSizing: "border-box",
  "&:focus": { boxShadow: `0 0 0 2px ${theme.palette.primary.main}` },
  "&.error": { border: "1px solid #ff3355" },
}));

const StyledTextarea = styled("textarea")(({ theme }) => ({
  width: "100%",
  border: "1px solid rgba(0,17,51,0.15)",
  borderRadius: "6px",
  padding: "12px 13px",
  color: "rgba(0,17,51,0.8)",
  fontFamily: theme.typography.fontFamily,
  fontSize: "14px",
  outline: "none",
  resize: "vertical",
  minHeight: "100px",
  transition: "box-shadow 0.2s",
  boxSizing: "border-box",
  "&:focus": { boxShadow: `0 0 0 2px ${theme.palette.primary.main}` },
}));

const ErrorText = styled("span")({
  color: "#ff3355",
  fontSize: "12px",
  marginTop: "4px",
  display: "block",
  minHeight: "18px",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const ChargerCard = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,17,51,0.12)",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "16px",
  background: "#fafafa",
  [theme.breakpoints.down("sm")]: { padding: "16px" },
}));

// ─── Helper: build email body ─────────────────────────────────────────────────
function buildEmailBody(values: any): string {
  const chargerLines = values.cargadores
    .map((c: Charger, i: number) =>
      `--- CARGADOR ${i + 1} ---
Marca: ${c.marca}
Modelo: ${c.modelo}
Origen: ${c.origen}
Fabricante: ${c.fabricante}
Cable o Socket: ${c.cableOSocket}
Potencia: ${c.potencia} Kw
Tipo de corriente: ${c.tipoCorriente}
APP Usuario: ${c.appUsuario}
OCPP: ${c.ocpp}
Precio Marketplace EMA: $${c.precioMarketplace} CLP neto
Precio Enérgica City: $${c.precioEnergicaCity} CLP neto`
    )
    .join("\n\n");

  return `FICHA TÉCNICA PARA CARGADORES
MARKETPLACE EMA / ENÉRGICA CITY

━━━ DATOS DE LA EMPRESA ━━━
Empresa: ${values.empresa}
RUT: ${values.rut}
Dirección: ${values.direccionEmpresa}
Representante legal: ${values.representanteLegal}

━━━ CONTACTO ━━━
Nombre: ${values.nombreContacto}
Teléfono: ${values.telefonoContacto}
Email: ${values.emailContacto}

━━━ DESCRIPCIÓN DE CARGADORES ━━━
${chargerLines}

━━━ SOPORTE TÉCNICO / POSTVENTA ━━━
Nombre: ${values.nombreSoporte}
Teléfono: ${values.telefonoSoporte}
Email: ${values.emailSoporte}
Dirección: ${values.direccionSoporte}
Horario de atención: ${values.horarioAtencion}

━━━ GARANTÍA ━━━
Plazo: ${values.garantiaPlazo}

━━━ EXCLUSIONES ━━━
${values.exclusiones || "Sin exclusiones indicadas"}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FichaTecnicaClient() {
  const [submitState, setSubmitState] = useState<{
    sent: boolean;
    error: boolean;
    message: string;
  }>({ sent: false, error: false, message: "" });

  const formik = useFormik({
    initialValues: {
      empresa: "",
      rut: "",
      direccionEmpresa: "",
      representanteLegal: "",
      nombreContacto: "",
      telefonoContacto: "",
      emailContacto: "",
      cargadores: [emptyCharger()],
      nombreSoporte: "",
      telefonoSoporte: "",
      emailSoporte: "",
      direccionSoporte: "",
      horarioAtencion: "",
      garantiaPlazo: "",
      exclusiones: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await emailjs.send(SERVICE, TEMPLATE, {
          from_name: values.nombreContacto,
          from_email: values.emailContacto,
          subject: `Ficha Técnica Cargadores — ${values.empresa}`,
          message: buildEmailBody(values),
          to_email: "contacto@energica.city",
        });
        setSubmitState({ sent: true, error: false, message: "¡Ficha enviada correctamente! Te contactaremos pronto." });
        resetForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setSubmitState({ sent: false, error: true, message: "Ocurrió un error al enviar. Por favor intenta nuevamente." });
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting } = formik;

  const getChargerError = (i: number, field: keyof Charger) => {
    const arr = errors.cargadores as any;
    const t = touched.cargadores as any;
    return arr?.[i]?.[field] && t?.[i]?.[field] ? arr[i][field] : "";
  };

  return (
    <>
      <HpHeaderNew />
      <PageWrapper>
        <Container maxWidth="md" disableGutters>

          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 5, mt: 2 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, fontWeight: 700, mb: 1 }}>
              Ficha Técnica para Cargadores
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Marketplace EMA · Enérgica City
            </Typography>
          </Box>

          {submitState.sent && (
            <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
              {submitState.message}
            </Alert>
          )}
          {submitState.error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {submitState.message}
            </Alert>
          )}

          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} noValidate>

              {/* ── 1. Datos de la Empresa ── */}
              <SectionContainer>
                <SectionTitle>1. Datos de la Empresa</SectionTitle>
                <Divider sx={{ mb: 2 }} />

                <FieldLabel htmlFor="empresa">Nombre de la empresa *</FieldLabel>
                <StyledInput
                  id="empresa"
                  name="empresa"
                  value={values.empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.empresa && errors.empresa ? "error" : ""}
                  placeholder="KPN Energy"
                />
                <ErrorText>{touched.empresa && errors.empresa}</ErrorText>

                <FieldLabel htmlFor="rut">RUT *</FieldLabel>
                <StyledInput
                  id="rut"
                  name="rut"
                  value={values.rut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.rut && errors.rut ? "error" : ""}
                  placeholder="12.345.678-9"
                />
                <ErrorText>{touched.rut && errors.rut}</ErrorText>

                <FieldLabel>Dirección *</FieldLabel>
                <AddressInput
                  value={values.direccionEmpresa}
                  onAddressChange={(v) => setFieldValue("direccionEmpresa", v)}
                  onSelectAddress={(place) => {
                    if (place) {
                      const parts = [place.StreetAddress, place.City, place.State].filter(Boolean);
                      setFieldValue("direccionEmpresa", parts.join(", "));
                    } else {
                      setFieldValue("direccionEmpresa", "");
                    }
                  }}
                  error={!!(touched.direccionEmpresa && errors.direccionEmpresa)}
                  helperText={touched.direccionEmpresa && errors.direccionEmpresa ? errors.direccionEmpresa : ""}
                />
                <ErrorText>{touched.direccionEmpresa && errors.direccionEmpresa}</ErrorText>

                <FieldLabel htmlFor="representanteLegal">Representante legal *</FieldLabel>
                <StyledInput
                  id="representanteLegal"
                  name="representanteLegal"
                  value={values.representanteLegal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.representanteLegal && errors.representanteLegal ? "error" : ""}
                  placeholder="Nombre completo"
                />
                <ErrorText>{touched.representanteLegal && errors.representanteLegal}</ErrorText>
              </SectionContainer>

              {/* ── 2. Contacto ── */}
              <SectionContainer>
                <SectionTitle>2. Contacto</SectionTitle>
                <Divider sx={{ mb: 2 }} />

                <FieldLabel htmlFor="nombreContacto">Nombre *</FieldLabel>
                <StyledInput
                  id="nombreContacto"
                  name="nombreContacto"
                  value={values.nombreContacto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.nombreContacto && errors.nombreContacto ? "error" : ""}
                  placeholder="Juan Pérez"
                />
                <ErrorText>{touched.nombreContacto && errors.nombreContacto}</ErrorText>

                <FieldLabel>Teléfono *</FieldLabel>
                <Box sx={{
                  "& .PhoneInput": { display: "flex", gap: "8px" },
                  "& .PhoneInputInput": {
                    height: "48px",
                    flex: 1,
                    border: "1px solid rgba(0,17,51,0.15)",
                    borderRadius: "6px",
                    padding: "0 13px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    ...(touched.telefonoContacto && errors.telefonoContacto ? { border: "1px solid #ff3355" } : {}),
                  },
                }}>
                  <PhoneInput
                    defaultCountry="CL"
                    value={values.telefonoContacto}
                    onChange={(v) => setFieldValue("telefonoContacto", v ?? "")}
                    onBlur={() => formik.setFieldTouched("telefonoContacto", true)}
                    placeholder="+56 9 1234 5678"
                  />
                </Box>
                <ErrorText>{touched.telefonoContacto && errors.telefonoContacto}</ErrorText>

                <FieldLabel htmlFor="emailContacto">Email *</FieldLabel>
                <StyledInput
                  id="emailContacto"
                  name="emailContacto"
                  type="email"
                  value={values.emailContacto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.emailContacto && errors.emailContacto ? "error" : ""}
                  placeholder="contacto@empresa.cl"
                />
                <ErrorText>{touched.emailContacto && errors.emailContacto}</ErrorText>
              </SectionContainer>

              {/* ── 3. Descripción de Cargadores ── */}
              <SectionContainer>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                  <SectionTitle sx={{ mb: 0 }}>3. Descripción de Cargadores</SectionTitle>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <FieldArray name="cargadores">
                  {({ push, remove }) => (
                    <>
                      {values.cargadores.map((charger, i) => (
                        <ChargerCard key={i}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                            <Typography fontWeight={700} fontSize="15px">
                              Cargador {i + 1}
                            </Typography>
                            {values.cargadores.length > 1 && (
                              <IconButton
                                size="small"
                                onClick={() => remove(i)}
                                sx={{ color: "error.main" }}
                                aria-label="Eliminar cargador"
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>

                          {/* Grid 2 cols en md+ */}
                          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: "0 24px" }}>

                            <Box>
                              <FieldLabel>Marca *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].marca`}
                                value={charger.marca}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "marca") ? "error" : ""}
                                placeholder="KPN"
                              />
                              <ErrorText>{getChargerError(i, "marca")}</ErrorText>
                            </Box>

                            <Box>
                              <FieldLabel>Modelo *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].modelo`}
                                value={charger.modelo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "modelo") ? "error" : ""}
                                placeholder="Kbox"
                              />
                              <ErrorText>{getChargerError(i, "modelo")}</ErrorText>
                            </Box>

                            <Box>
                              <FieldLabel>País de origen *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].origen`}
                                value={charger.origen}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "origen") ? "error" : ""}
                                placeholder="China"
                              />
                              <ErrorText>{getChargerError(i, "origen")}</ErrorText>
                            </Box>

                            <Box>
                              <FieldLabel>Fabricante *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].fabricante`}
                                value={charger.fabricante}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "fabricante") ? "error" : ""}
                                placeholder="KPN"
                              />
                              <ErrorText>{getChargerError(i, "fabricante")}</ErrorText>
                            </Box>

                            <Box>
                              <FieldLabel>Cable o Socket *</FieldLabel>
                              <FormControl fullWidth error={!!getChargerError(i, "cableOSocket")}>
                                <Select
                                  name={`cargadores[${i}].cableOSocket`}
                                  value={charger.cableOSocket}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  displayEmpty
                                  sx={{ height: "48px", fontSize: "14px" }}
                                >
                                  <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                  <MenuItem value="Cable">Cable</MenuItem>
                                  <MenuItem value="Socket">Socket</MenuItem>
                                  <MenuItem value="Cable y Socket">Cable y Socket</MenuItem>
                                </Select>
                                {getChargerError(i, "cableOSocket") && (
                                  <FormHelperText>{getChargerError(i, "cableOSocket")}</FormHelperText>
                                )}
                              </FormControl>
                            </Box>

                            <Box>
                              <FieldLabel>Potencia (Kw) *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].potencia`}
                                type="number"
                                value={charger.potencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "potencia") ? "error" : ""}
                                placeholder="7"
                              />
                              <ErrorText>{getChargerError(i, "potencia")}</ErrorText>
                            </Box>

                            <Box>
                              <FieldLabel>Tipo de corriente *</FieldLabel>
                              <FormControl fullWidth error={!!getChargerError(i, "tipoCorriente")}>
                                <Select
                                  name={`cargadores[${i}].tipoCorriente`}
                                  value={charger.tipoCorriente}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  displayEmpty
                                  sx={{ height: "48px", fontSize: "14px" }}
                                >
                                  <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                  <MenuItem value="AC">AC</MenuItem>
                                  <MenuItem value="DC">DC</MenuItem>
                                  <MenuItem value="AC/DC">AC/DC</MenuItem>
                                </Select>
                                {getChargerError(i, "tipoCorriente") && (
                                  <FormHelperText>{getChargerError(i, "tipoCorriente")}</FormHelperText>
                                )}
                              </FormControl>
                            </Box>

                            <Box>
                              <FieldLabel>APP Usuario *</FieldLabel>
                              <FormControl fullWidth error={!!getChargerError(i, "appUsuario")}>
                                <Select
                                  name={`cargadores[${i}].appUsuario`}
                                  value={charger.appUsuario}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  displayEmpty
                                  sx={{ height: "48px", fontSize: "14px" }}
                                >
                                  <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                  <MenuItem value="SI">Sí</MenuItem>
                                  <MenuItem value="NO">No</MenuItem>
                                </Select>
                                {getChargerError(i, "appUsuario") && (
                                  <FormHelperText>{getChargerError(i, "appUsuario")}</FormHelperText>
                                )}
                              </FormControl>
                            </Box>

                            <Box>
                              <FieldLabel>OCPP *</FieldLabel>
                              <FormControl fullWidth error={!!getChargerError(i, "ocpp")}>
                                <Select
                                  name={`cargadores[${i}].ocpp`}
                                  value={charger.ocpp}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  displayEmpty
                                  sx={{ height: "48px", fontSize: "14px" }}
                                >
                                  <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                  <MenuItem value="SI">Sí</MenuItem>
                                  <MenuItem value="NO">No</MenuItem>
                                </Select>
                                {getChargerError(i, "ocpp") && (
                                  <FormHelperText>{getChargerError(i, "ocpp")}</FormHelperText>
                                )}
                              </FormControl>
                            </Box>

                            <Box>
                              <FieldLabel>Precio Marketplace EMA (CLP neto) *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].precioMarketplace`}
                                type="number"
                                value={charger.precioMarketplace}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "precioMarketplace") ? "error" : ""}
                                placeholder="510000"
                              />
                              <ErrorText>{getChargerError(i, "precioMarketplace")}</ErrorText>
                            </Box>

                            <Box>
                              <FieldLabel>Precio Enérgica City (CLP neto) *</FieldLabel>
                              <StyledInput
                                name={`cargadores[${i}].precioEnergicaCity`}
                                type="number"
                                value={charger.precioEnergicaCity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getChargerError(i, "precioEnergicaCity") ? "error" : ""}
                                placeholder="380000"
                              />
                              <ErrorText>{getChargerError(i, "precioEnergicaCity")}</ErrorText>
                            </Box>

                          </Box>
                        </ChargerCard>
                      ))}

                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => push(emptyCharger())}
                        sx={{ mt: 1, borderRadius: "8px" }}
                      >
                        Agregar otro cargador
                      </Button>
                    </>
                  )}
                </FieldArray>
              </SectionContainer>

              {/* ── 4. Soporte Técnico / Postventa ── */}
              <SectionContainer>
                <SectionTitle>4. Soporte Técnico / Postventa</SectionTitle>
                <Divider sx={{ mb: 2 }} />

                <FieldLabel htmlFor="nombreSoporte">Nombre *</FieldLabel>
                <StyledInput
                  id="nombreSoporte"
                  name="nombreSoporte"
                  value={values.nombreSoporte}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.nombreSoporte && errors.nombreSoporte ? "error" : ""}
                  placeholder="Juan Pérez"
                />
                <ErrorText>{touched.nombreSoporte && errors.nombreSoporte}</ErrorText>

                <FieldLabel>Número de teléfono *</FieldLabel>
                <Box sx={{
                  "& .PhoneInput": { display: "flex", gap: "8px" },
                  "& .PhoneInputInput": {
                    height: "48px",
                    flex: 1,
                    border: "1px solid rgba(0,17,51,0.15)",
                    borderRadius: "6px",
                    padding: "0 13px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    ...(touched.telefonoSoporte && errors.telefonoSoporte ? { border: "1px solid #ff3355" } : {}),
                  },
                }}>
                  <PhoneInput
                    defaultCountry="CL"
                    value={values.telefonoSoporte}
                    onChange={(v) => setFieldValue("telefonoSoporte", v ?? "")}
                    onBlur={() => formik.setFieldTouched("telefonoSoporte", true)}
                    placeholder="+56 9 1234 5678"
                  />
                </Box>
                <ErrorText>{touched.telefonoSoporte && errors.telefonoSoporte}</ErrorText>

                <FieldLabel htmlFor="emailSoporte">Email *</FieldLabel>
                <StyledInput
                  id="emailSoporte"
                  name="emailSoporte"
                  type="email"
                  value={values.emailSoporte}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.emailSoporte && errors.emailSoporte ? "error" : ""}
                  placeholder="soporte@empresa.cl"
                />
                <ErrorText>{touched.emailSoporte && errors.emailSoporte}</ErrorText>

                <FieldLabel>Dirección *</FieldLabel>
                <AddressInput
                  value={values.direccionSoporte}
                  onAddressChange={(v) => setFieldValue("direccionSoporte", v)}
                  onSelectAddress={(place) => {
                    if (place) {
                      const parts = [place.StreetAddress, place.City, place.State].filter(Boolean);
                      setFieldValue("direccionSoporte", parts.join(", "));
                    } else {
                      setFieldValue("direccionSoporte", "");
                    }
                  }}
                  error={!!(touched.direccionSoporte && errors.direccionSoporte)}
                  helperText={touched.direccionSoporte && errors.direccionSoporte ? errors.direccionSoporte : ""}
                />
                <ErrorText>{touched.direccionSoporte && errors.direccionSoporte}</ErrorText>

                <FieldLabel htmlFor="horarioAtencion">Horario de atención *</FieldLabel>
                <StyledInput
                  id="horarioAtencion"
                  name="horarioAtencion"
                  value={values.horarioAtencion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.horarioAtencion && errors.horarioAtencion ? "error" : ""}
                  placeholder="Lun - Vie (9:00 a 18:00)"
                />
                <ErrorText>{touched.horarioAtencion && errors.horarioAtencion}</ErrorText>
              </SectionContainer>

              {/* ── 5. Garantía ── */}
              <SectionContainer>
                <SectionTitle>5. Garantía</SectionTitle>
                <Divider sx={{ mb: 2 }} />

                <FieldLabel htmlFor="garantiaPlazo">Plazo *</FieldLabel>
                <StyledInput
                  id="garantiaPlazo"
                  name="garantiaPlazo"
                  value={values.garantiaPlazo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.garantiaPlazo && errors.garantiaPlazo ? "error" : ""}
                  placeholder="1 año"
                />
                <ErrorText>{touched.garantiaPlazo && errors.garantiaPlazo}</ErrorText>
              </SectionContainer>

              {/* ── 6. Exclusiones ── */}
              <SectionContainer>
                <SectionTitle>6. Exclusiones</SectionTitle>
                <Divider sx={{ mb: 2 }} />

                <FieldLabel htmlFor="exclusiones">Exclusiones de garantía u otras consideraciones</FieldLabel>
                <StyledTextarea
                  id="exclusiones"
                  name="exclusiones"
                  value={values.exclusiones}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describa las exclusiones o condiciones especiales..."
                  rows={4}
                />
                <ErrorText>{touched.exclusiones && errors.exclusiones}</ErrorText>
              </SectionContainer>

              {/* ── Submit ── */}
              <Box sx={{ maxWidth: "720px", margin: "0 auto" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    height: "52px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: 0.3,
                  }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Ficha Técnica"}
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 1.5 }}>
                  Al enviar confirmas que la información proporcionada es correcta.
                </Typography>
              </Box>

            </form>
          </FormikProvider>
        </Container>
      </PageWrapper>
    </>
  );
}
