export type WebContactFormType = "OTHER" | "SUPPORT" | "QUOTE" | "GENERAL";

export type webContactForm = {
  __typename?: "WebContactForm";
  webContactFormId: string;
  date: string;
  type: WebContactFormType;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  message?: string | null;
  subject?: string | null;
  category?: string | null;
  companyName?: string | null;
  cantidadVehiculos?: number | null;
  customerId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export const emptyWebContactForm: webContactForm = {
  __typename: "WebContactForm",
  webContactFormId: "",
  date: new Date().toISOString(),
  type: "OTHER",
  name: null,
  email: null,
  phone: null,
  whatsapp: null,
  message: null,
  subject: null,
  category: null,
  companyName: null,
  cantidadVehiculos: null,
  customerId: null,
  createdAt: null,
  updatedAt: null,
};

export type webContactFormInput = {
  webContactFormId?: string;
  date?: string;
  type?: WebContactFormType;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  message?: string | null;
  subject?: string | null;
  category?: string | null;
  companyName?: string | null;
  cantidadVehiculos?: number | null;
  customerId?: string | null;
};
