import { generateClient } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { customerInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

const ZERO_WIDTH_RE = /[\u200B-\u200D\uFEFF\u2060]/g;

/** Full normalization for email-shaped strings: ZW strip, NBSP→space, trim, NFC, lowercase. */
export const normalizeCustomerEmail = (value: string | null | undefined): string => {
  let s = String(value ?? '');
  s = s.replace(ZERO_WIDTH_RE, '');
  s = s.replace(/\u00A0/g, ' ');
  s = s.trim();
  s = s.normalize('NFC');
  return s.toLowerCase();
};

/**
 * PK/FK key for Customer (schema: customerId is the email). Uses the same canonical cleaning as
 * {@link normalizeCustomerEmail} so stored ids stay aligned with sanitized email fields.
 */
export const normalizeCustomerIdKey = (value: string | null | undefined): string =>
  normalizeCustomerEmail(value);

/** Shallow copy; only normalizes `email` when it is present. Does not touch customerId or other fields. */
export const normalizeCustomerInput = (input: customerInput): customerInput => {
  if (input.email == null) {
    return { ...input };
  }
  return { ...input, email: normalizeCustomerEmail(input.email) };
};

export const getCustomerService = async (input: customerInput): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const customerId = normalizeCustomerIdKey(input.customerId);

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
      const returnedId = customer?.customerId;
      resolve({
        customerId: returnedId != null ? normalizeCustomerIdKey(returnedId) : null,
      });
        
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
      const normalizedInput = normalizeCustomerInput(input);
      const customerId = normalizeCustomerIdKey(normalizedInput.customerId);

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
      } = normalizedInput;

      console.log("--createCustomer--", input);

      const formData: any = {
        customerId,
        name: name || '-',
        typeOfResidence: typeOfResidence || '-',
        referenceAddress: referenceAddress || '-',
        address: address || '-',
        phone: phone || '-',
        city: normalizedInput.city ?? '',
        state: normalizedInput.state ?? '',
        zipCode: normalizedInput.zipCode ?? '',
        lat: normalizedInput.lat ?? '',
        long: normalizedInput.long ?? '',
        zoomLevel: normalizedInput.zoomLevel ?? '15',
      };

      const { data: createData, errors: createErrors } = await client.models.Customer.create(formData);

      if (!createErrors || createErrors.length === 0) {
        console.log("--createCustomer--resolve", createData);
        resolve(
          createData?.customerId != null
            ? { ...createData, customerId: normalizeCustomerIdKey(createData.customerId) }
            : createData
        );
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
      resolve(
        updateData?.customerId != null
          ? { ...updateData, customerId: normalizeCustomerIdKey(updateData.customerId) }
          : updateData
      );
    } catch (err) {
      console.log("--createCustomer--err", err);
      reject({
        errorMessage: JSON.stringify(err),
      });
    }
  });
};
