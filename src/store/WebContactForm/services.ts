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

export const createWebContactForm = async (input: webContactFormInput): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        webContactFormId,
        date,
        type,
        name,
        email,
        phone,
        whatsapp,
        message,
        subject,
        category,
        companyName,
        cantidadVehiculos,
        customerId,
      } = input;

      console.log("--createWebContactForm--", input);

      const formData: any = {
        webContactFormId: webContactFormId || crypto.randomUUID(),
        date: date || new Date().toISOString(),
        type: type || "OTHER",
        name: name || null,
        email: email || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        message: message || null,
        subject: subject || null,
        category: category || null,
        companyName: companyName || null,
        cantidadVehiculos: cantidadVehiculos || null,
        customerId: customerId || null,
      };

      console.log("--formData", formData);
      
      // @ts-ignore - WebContactForm model will be available once schema is updated
      const { data, errors } = await client.models.WebContactForm.create(formData);
      console.log("--createWebContactForm--data", data);

      if (errors) {
        console.log("--createWebContactForm--errors", errors);
        reject({
          errorMessage: errors.map((e: { message: string }) => e.message).join(', ')
        });
        return;
      }

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
