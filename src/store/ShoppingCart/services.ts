import { generateClient, SelectionSet } from "aws-amplify/api";
import * as MAIN from "../../../amplify/data/main.schema";
import { shoppingCartInput } from './type';


import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<MAIN.MainTypes>();



export const fecthShoppingCart = async (input: shoppingCartInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
          shoppingCartId,
        } = input;
        
        console.log("--fecthShoppingCart--", input)
    
        if (shoppingCartId) {
        
            const { data: getShoppingCart, errors } = await client.models.ShoppingCart.list({ 
                filter: { shoppingCartId: { eq: shoppingCartId } } 
            });
          
            console.log("--getShoppingCart--", getShoppingCart)
            if (getShoppingCart) {
                console.log("--fecthShoppingCart--", getShoppingCart);
                resolve(getShoppingCart[0]);
                return;
            }
            
            if (errors) {
              console.log("--getShoppingCart--errors", errors)
              reject({
                errorMessage: errors.map(e => e.message).join(', ')
              });
              return;
            }
        }

      } catch (err) {
        console.log("--getShoppingCart--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
