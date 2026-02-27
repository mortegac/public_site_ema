import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { customerInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

/** Normalize email: lowercase and trim. Used as customerId. */
export const normalizeCustomerEmail = (email: string | null | undefined): string =>
  (email ?? '').trim().toLowerCase();

export const getCustomerService = async (input: customerInput): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const customerId = normalizeCustomerEmail(input.customerId);

      if (!customerId) {
        resolve(null);
        return;
      }

      const { data: customer, errors } = await client.models.Customer.get({
        customerId,
      }, {
        selectionSet: [
          "customerId",
        ]
      });
    
      console.log("--getCustomer--", customer)
  
      if (errors) {
        console.log("--customer--errors", errors)
        reject({
          errorMessage: errors.map(e => e.message).join(', ')
        });
        return;
      }
      console.log("--getCustomer--resolve", customer)
      resolve({ customerId: customer?.customerId ?? null });
        
    } catch (err) {
      console.log("--getCustomer--err", err)
      reject({
        errorMessage: JSON.stringify(err),
      });
    }
  });
};

export const createCustomer = async (input: customerInput): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const customerId = normalizeCustomerEmail(input.customerId);

      if (!customerId) {
        reject({ errorMessage: 'Email is required' });
        return;
      }

      const {
        name,
        typeOfResidence,
        referenceAddress,
        address,
        phone,
      } = input;

      console.log("--createCustomer--", input);

      const formData: any = {
        customerId,
        name: name || '-',
        typeOfResidence: typeOfResidence || '-',
        referenceAddress: referenceAddress || '-',
        address: address || '-',
        phone: phone || '-',
        city: input.city || '-',
        state: input.state || '-',
        zipCode: input.zipCode || '-',
        lat: input.lat || '-',
        long: input.long || '-',
        zoomLevel: input.zoomLevel || "15",
      };

      const { data: createData, errors: createErrors } = await client.models.Customer.create(formData);

      if (!createErrors || createErrors.length === 0) {
        console.log("--createCustomer--resolve", createData);
        resolve(createData);
        return;
      }

      console.log("--createCustomer--errors (retrying with update)", createErrors);
      const { data: updateData, errors: updateErrors } = await client.models.Customer.update(formData);

      if (updateErrors && updateErrors.length > 0) {
        console.log("--updateCustomer--errors", updateErrors);
        reject({
          errorMessage: updateErrors.map(e => e.message).join(', '),
        });
        return;
      }
      console.log("--updateCustomer--resolve", updateData);
      resolve(updateData);
    } catch (err) {
      console.log("--createCustomer--err", err);
      reject({
        errorMessage: JSON.stringify(err),
      });
    }
  });
};

  
  
  