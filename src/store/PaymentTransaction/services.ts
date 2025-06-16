import { generateClient, SelectionSet } from "aws-amplify/api";
import { GraphQLResult } from '@aws-amplify/api';

import * as MAIN from "../../../amplify/data/main.schema";
import { paymentTransactionInput } from './type';


import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();

// , ,  

  interface PaymentTransactionResponse {
    listPaymentTransactionByToken: {
      items: Array<{
        paymentTransactionId: string;
        status: string;
        amount: number;
        glosa: string;
        usersPaymentTransactionsId: string;
        shoppingCartId: string;
      }>;
    };
  }
  


export const fetchPaymentTransaction = async (objFilter: paymentTransactionInput) => {
  try {
    const response = await client.graphql<PaymentTransactionResponse>({
      query: `
        query LISTPaymentTransactionByToken($token: ID!) {
          listPaymentTransactionByToken(
            token: $token
          ) {
           items {
            paymentTransactionId
            status
            amount
            glosa
            usersPaymentTransactionsId
            shoppingCartId
          }
          }
        }
      `,
      variables: {
        token: objFilter.token,
      }
    }) as GraphQLResult<PaymentTransactionResponse>;
    
    console.log("response.data", response.data)

    return response.data?.listPaymentTransactionByToken?.items[0];
    
  } catch (error) {
    console.log("Error fetching PaymentTransaction:", error);
    throw error;
  }
};