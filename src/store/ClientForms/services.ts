import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { clientFormInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";



// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

export const createClientForm = async (input: clientFormInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
            // name,
            // email,
            // phone,
            isHouse,
            isPortable,
            isWallbox,
            numberOfChargers,
            distance,
            customerId,
            ...rest 
        } = input;
        
        console.log("--createClientForm--", input)
        const formData = {
            formId: crypto.randomUUID(), // Genera un ID único
            customerId: customerId,
            isWallbox: isWallbox || false,
            isPortable: isPortable || false,
            isHouse: isHouse || false,
            distance: distance || 0,
            numberOfChargers: numberOfChargers || 1,
            // name: name || '',
            // email: email || '',
            // phone: phone || '',
            // ...rest
        };
    
        const data = await client.models.ClientForm.create(formData);
        // const { data, errors } = await client.models.ClientForm.create(formData);
        
        // if (errors) {
        // console.log("--createClientForm--errors", errors)
            
        //   reject({
        //     errorMessage: errors.map(e => e.message).join(', ')
        //   });
        //   return;
        // }
        console.log("--createClientForm--resolve", data)
        resolve(data);
          
      } catch (err) {
        console.log("--createClientForm--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
