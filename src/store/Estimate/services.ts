import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { estimateInput } from './type';


import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();



export const createEstimate = async (input: estimateInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { formId } = input;
        
        console.log("--createEstimate--", input)

        const processResult:any = await client.graphql({
          query: `
            mutation ProcessEstimate($formId: String!) {
              ProcessEstimate(formId: $formId)
            }
          `,
          variables: { formId }
        });
        
        
        console.log("--processResult--", processResult)
        console.log("--processResult-data-", processResult?.data?.ProcessEstimate)
        
        if ('data' in processResult && processResult.data?.ProcessEstimate) {
          const { data: estimate } = await client.models.Estimate.get({ 
            estimateId: processResult.data.ProcessEstimate 
          });
          
          if (estimate) {
            resolve(estimate);
          } else {
            reject({
              errorMessage: "No se pudo obtener los datos del estimate"
            });
          }
        } else {
          reject({
            errorMessage: "No se pudo procesar el estimate"
          });
        }
          
      } catch (err) {
        console.log("--createEstimate--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
