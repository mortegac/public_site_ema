import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { customerInput } from './type';


import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();



export const createCustomer = async (input: customerInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
            customerId,
            name,
            comune,
            address,
            phone, 
        } = input;
        
        console.log("--createCustomer--", input)
    
        // Primero verificamos si existe el customer
        let existingCustomer: any = null;
        if (customerId) {
        
            const { data: existingCustomers } = await client.models.Customer.list({ 
                filter: { customerId: { eq: customerId } } 
            });
            existingCustomer = existingCustomers?.[0];
                
        console.log("--existingCustomer--", existingCustomer)
            if (existingCustomer) {
                console.log("--createCustomer--exists", existingCustomer);
                resolve(existingCustomer);
                return;
            }
        }

        
        const formData:any = {
            customerId: customerId || existingCustomer?.customerId || crypto.randomUUID(),
            name: name || '-',
            comune: comune || '-',
            address: address || '-',
            phone: phone || '-',
            email: input.email || '-'
        };
    
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
          
      } catch (err) {
        console.log("--createCustomer--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
