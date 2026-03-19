import { generateClient } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { webContactFormInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";
import { getCustomerService, createCustomer } from '../Customer/services';

// Re-export for consumers that import from WebContactForm
export { getCustomerService, createCustomer };

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

const CREATE_WEB_CONTACT_FORM = /* GraphQL */ `
  mutation CreateWebContactForm($input: CreateWebContactFormInput!) {
    createWebContactForm(input: $input) {
      webContactFormId
      date
      type
      name
      email
      phone
      whatsapp
      message
      subject
      category
      companyName
      cantidadVehiculos
      customerId
      createdAt
      updatedAt
    }
  }
`;

export const createWebContactForm = async (input: webContactFormInput): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData: any = {
        webContactFormId: input.webContactFormId || crypto.randomUUID(),
        date: input.date || new Date().toISOString(),
        type: input.type || "OTHER",
        name: input.name || "",
        email: input.email || "",
        phone: input.phone || "",
        whatsapp: input.whatsapp || "",
        message: input.message || "",
        subject: input.subject || "",
        category: input.category || "",
        companyName: input.companyName || "",
        cantidadVehiculos: input.cantidadVehiculos ?? 0,
        customerId: input.customerId || "",
      };

      console.log("--createWebContactForm--formData", formData);

      const response: any = await client.graphql({
        query: CREATE_WEB_CONTACT_FORM,
        variables: { input: formData },
      });

      console.log("--createWebContactForm--response", response);

      if (response.errors?.length) {
        console.log("--createWebContactForm--errors", response.errors);
        reject({
          errorMessage: response.errors.map((e: { message: string }) => e.message).join(', ')
        });
        return;
      }

      const data = response.data?.createWebContactForm;
      console.log("--createWebContactForm--resolve", data);
      resolve(data);
    } catch (err) {
      console.log("--createWebContactForm--err", err);
      reject({
        errorMessage: JSON.stringify(err),
      });
    }
  });
};
