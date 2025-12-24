import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { supportTicketInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";

import emailjs, { init } from "emailjs-com";



import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

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

        sendEmail({
          to_email:email,
          phone:phoneNumber,
          description:description,
        }); 
          
      } catch (err) {
        console.log("--createTicket--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
  
  
  
export const sendEmail = async (objEmail: any) => {

    try {
  
        const SERVICE = "service_wkx5k4h";
        const TEMPLATE = "template_ocmugt4";
        init("HAIyMD2QIHEqXcHvd");
        // init("lUerPXXiKXnrvLlVw");
        await emailjs.send(SERVICE, TEMPLATE, { ...objEmail }).then(
            function (response) {
                console.log('EMail enviado', { ...objEmail })
                // LogRocket.log("-Email enviado: ",response);
                
            }
        )
        return true
  
    } catch (error) {
        console.log('Error: en el envio del Email: ', error)
        // LogRocket.captureException(error, {
          //   tags: {
          //     // additional data to be grouped as "tags"
          //     type: 'Error-envio-email',
          //     objEmail:{ objEmail }
          //   },
          //   extra: {
          //     // additional arbitrary data associated with the event
          //     pageName: 'ProfileView',
          //   },
          // });
        return false
    }
  }
