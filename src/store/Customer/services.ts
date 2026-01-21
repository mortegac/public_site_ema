import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { customerInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

export const getCustomerService = async (input: customerInput): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { customerId } = input;
      
      if (!customerId) {
        resolve(null);
        return;
      }
      
      const { data: customer, errors } = await client.models.Customer.get({ 
        customerId: customerId
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
      resolve(customer);
        
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
        const {  
            customerId,
            name,
            // comune,
            typeOfResidence,
            referenceAddress,
            
            address,
            phone, 
            // email,
            // city,
            // state,
            // zipCode,
            // lat,
            // long,
            // zoomLevel,
        } = input;
        
        console.log("--createCustomer--", input)
    
        const formData:any = {
          customerId: customerId || crypto.randomUUID(),
          // customerId: customerId || existingCustomer?.customerId || crypto.randomUUID(),
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
      
        // Primero verificamos si existe el customer
        // let existingCustomer: any = null;
        if (customerId) {
        
            // const { data: existingCustomers } = await client.models.Customer.list({ 
            //     filter: { customerId: { eq: customerId } } 
            // });
            
            if (Boolean(input.existCustomer)) {
              console.log("input.existCustomer = ", input.existCustomer);
                
                const { data, errors } = await client.models.Customer.update(formData);
                if (errors) {
                  console.log("--updateCustomer--errors", errors)
                  reject({
                    errorMessage: errors.map(e => e.message).join(', ')
                  });
                  return;
                }
                console.log("--updateCustomer--resolve", data)
                resolve(data);
                return;  
            }else{
              console.log("--formData", formData)
              const { data, errors } = await client.models.Customer.create(formData);
              console.log("--createCustomer--data", data)
              
              if (errors) {
                console.log("--createCustomer--errors", errors)
                reject({
                  errorMessage: errors.map(e => e.message).join(', ')
                });
                return;
              }
              console.log("--createCustomer--resolve", data)
              resolve(data);
            }
                
        // console.log("--existingCustomer--", existingCustomer)
            // if (existingCustomer) {
            //     console.log("--createCustomer--exists", existingCustomer);
                
            //     const { data, errors } = await client.models.Customer.update(formData);
            //     if (errors) {
            //       console.log("--updateCustomer--errors", errors)
            //       reject({
            //         errorMessage: errors.map(e => e.message).join(', ')
            //       });
            //       return;
            //     }
            //     console.log("--updateCustomer--resolve", data)
            //     resolve(data);
            //     return;

            // }
        }

        
    
    
        
          
      } catch (err) {
        console.log("--createCustomer--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
