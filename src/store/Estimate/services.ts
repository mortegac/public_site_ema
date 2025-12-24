import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { estimateInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";

import emailjs, { init } from "emailjs-com";


// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

export const createEstimate = async (input: estimateInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { formId } = input;
        
        console.log("--createEstimate--", input)

        const processResult:any = await client.graphql({
          query: `
            mutation ProcessEstimate($formId: String!) {
              ProcessEstimate(formId: $formId) {
               message
              estimates {
                estimateId
                materialsCost
                installationCost
                SECCost
                referenceChargerPrice
                netPrice
                VAT
                grossPrice
                chargerPotence
              }

              }
            }
          `,
          variables: { formId }
        });
        
        
        console.log("--processResult--", processResult)
        console.log("--processResult-data-", processResult?.data?.ProcessEstimate)
       
        
        // const estimate = processResult?.data?.ProcessEstimate?.estimates[0]
        resolve(processResult?.data?.ProcessEstimate?.estimates || [])
        
        // if ('data' in processResult && processResult.data?.ProcessEstimate) {
        //   const { data: estimate } = await client.models.Estimate.get({ 
        //     estimateId: processResult.data.ProcessEstimate.estimateId 
        //   });
          
        //   if (estimate) {
        //     resolve(estimate);
        //   } else {
        //     reject({
        //       errorMessage: "No se pudo obtener los datos del estimate"
        //     });
        //   }
        // } else {
        //   reject({
        //     errorMessage: "No se pudo procesar el estimate"
        //   });
        // }
          
      } catch (err) {
        console.log("--createEstimate--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };

  
  export const sendEmail = async (objEmail: any, type="eve") => {

    try {
  
        const SERVICE = "service_dbrrm6b"; // Gmail-ema.energica@gmail.com
        const TEMPLATE = "template_eysyecb";
        init("UYcrSeCqLGW8xqT4S");
        
        
        await emailjs.send(SERVICE, TEMPLATE, { ...objEmail }).then(
            function (response) {
                console.log('EMail enviado', { ...objEmail })
                // LogRocket.log("-Email enviado: ",response);
                return true
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