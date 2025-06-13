import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { supportTicketInput } from './type';


import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();



export const createTicket = async (input: supportTicketInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
          name,
          description,
          email,
          phoneNumber,
          level,
          statusTicket,
          solicitantId,
        } = input;
        
        console.log("--createTicket--", input)
    
        const formData:any = {
          supportTicketId: crypto.randomUUID(),
          name: name || '-',
          description: description || '-',
          email: email || '-',
          phoneNumber: phoneNumber || '-',
          level: level || '-',
          statusTicket: statusTicket || '-',
          solicitantId: solicitantId || '-'
      };
      
        console.log("--formData", formData)
        const { data, errors } = await client.models.SupportTicket.create(formData);
        console.log("--createTicket--data", data)
        
        if (errors) {
          console.log("--createTicket--errors", errors)
          reject({
            errorMessage: errors.map(e => e.message).join(', ')
          });
          return;
        }
        console.log("--createTicket--resolve", data)
        resolve(data);
          
      } catch (err) {
        console.log("--createTicket--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
