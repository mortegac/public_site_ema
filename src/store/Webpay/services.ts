import { generateClient, SelectionSet } from "aws-amplify/api";
import { GraphQLResult } from '@aws-amplify/api';

import * as MAIN from "../../../amplify/data/main.schema";
import { webpayInput } from './type';

import emailjs, { init } from "emailjs-com";
init("lUerPXXiKXnrvLlVw");

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { configureAmplify } from "@/utils/amplify-config";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

const client = generateClient<MAIN.MainTypes>();

// , ,  

  export interface WebpayStartResponse {
    WebpayStart: {
      order: string;
      token: string;
      url: string;
      message: string;
      buy_order: string;
      email: string;
    };
  }
  interface WebpayCommitResponse {
    WebpayCommit: {
      message: string;
      buy_order: string;
      email: string;
      status: string;
    };
  }
  interface WebpayStatusResponse {
    WebpayStatus: {
      message: string;
      buy_order: string;
      email: string;
      status: string;
      amount: string;
      card_number: string;
      payment_type_code: string;
      paymentTransactionId: string;
      glosa: string;
      
    };
  }


export const fetchWebpayStart = async (objFilter: webpayInput) => {
  try {
    const response = await client.graphql<WebpayStartResponse>({
      query: `
        mutation webpayStart($shoppingCartId: ID!, $glosa: String!) {
          WebpayStart(
            shoppingCartId: $shoppingCartId,
            glosa: $glosa
          ) {
            order
            token
            url
            message
            buy_order
            email
          }
        }
      `,
      variables: {
        shoppingCartId: objFilter.shoppingCartId,
        glosa: objFilter.glosa,
      }
    }) as GraphQLResult<WebpayStartResponse>;
    
    console.log("response.data", response.data)

    return response.data?.WebpayStart;
    
  } catch (error) {
    console.log("Error fetching calendar visits:", error);
    throw error;
  }
};




export const fetchWebpayCommit = async (objFilter: webpayInput) => {
  try {
    const response = await client.graphql<WebpayCommitResponse>({
      query: `
        mutation webpayCommit($token: String!) {
          WebpayCommit(
            token: $token,
          ) {
            message
            buy_order
            email
            status
          }
        }
      `,
      variables: {
        token: objFilter.token
      }
    }) as GraphQLResult<WebpayCommitResponse>;
    
    console.log("response.data", response.data)

    return response.data?.WebpayCommit;
    
  } catch (error) {
    console.log("Error fetching WebpayCommit", error);
    throw error;
  }
};




export const fetchWebpayStatus= async (objFilter: webpayInput) => {
  try {
    const response = await client.graphql<WebpayStatusResponse>({
      query: `
        mutation webpayStatus($token: String!) {
          WebpayStatus(
            token: $token
          ) {
              message
              buy_order
              email
              amount
              card_number
              payment_type_code
              paymentTransactionId
              glosa
              status
          }
        }
      `,
      variables: {
        token: objFilter.token,
      }
    }) as GraphQLResult<WebpayStatusResponse>;
    
    console.log("response.data", response.data)

    return response.data?.WebpayStatus;
    
  } catch (error) {
    console.log("Error fetching WebpayStatus", error);
    throw error;
  }
};



export const sendEmail = async (objEmail: any, type="eve") => {

  try {

      const SERVICE = "service_56ebg58";
      const TEMPLATE = type==="eve" ? "template_o36lzyb": "";
      init("lUerPXXiKXnrvLlVw");
      
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