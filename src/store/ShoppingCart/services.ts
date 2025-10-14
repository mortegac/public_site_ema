import { generateClient, SelectionSet } from "aws-amplify/api";
// Importa el tipo completo de ClientSchema para acceder a los modelos
import { MainTypes } from "../../../amplify/data/main.schema"; // <--- CAMBIO AQUÍ

// import * as MAIN from "../../../amplify/data/main.schema";
import { shoppingCartInput } from './type';
import { configureAmplify } from "@/utils/amplify-config";
// import { Customer } from '../../utils/queries/Customer/index';

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

// const client = generateClient<MAIN.MainTypes>();
const client = generateClient<MainTypes>(); // <--- USA MainTypes AQUÍ



export const fecthShoppingCart = async (input: shoppingCartInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
          shoppingCartId,
        } = input;
        
        console.log("--fecthShoppingCart--", input)
    
        if (shoppingCartId) {
            
            // const { data: getShoppingCart, errors } = await client.models.ShoppingCart.list({ 
            //     filter: { shoppingCartId: { eq: shoppingCartId } } 
            // })
            const { data: getShoppingCart, errors } = await client.models.ShoppingCart.get({ 
                shoppingCartId: shoppingCartId
            });
            
            const dataCustomer = await getShoppingCart?.Customer();
            const dataShoppingCartDetails = await getShoppingCart?.ShoppingCartDetails();

          
            // console.log("--getShoppingCart--", getShoppingCart)
            // console.log("--dataCustomer--", dataCustomer)
            // console.log("--dataShoppingCartDetails--", dataShoppingCartDetails)
            
          
            if (getShoppingCart) {
                // console.log("--fecthShoppingCart--", getShoppingCart);
                resolve({
                  ...getShoppingCart,
                  addressCustomer: `
                  ${dataCustomer?.data?.address} 
                  ${dataCustomer?.data?.referenceAddress} 
                  ${dataCustomer?.data?.city} 
                  ${dataCustomer?.data?.state}`,
                  glosa: dataShoppingCartDetails?.data[0]?.glosa
                });
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
