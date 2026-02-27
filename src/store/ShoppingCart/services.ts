import { generateClient } from "aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api";
import { MainTypes } from "../../../amplify/data/main.schema";
import { shoppingCartInput, createShoppingCartInput, createShoppingCartDetailInput, updateShoppingCartInput, CartProduct, CartCustomer } from './type';
import { configureAmplify } from "@/utils/amplify-config";

configureAmplify();

const client = generateClient<MainTypes>();

/** Respuesta de la query getShoppingCart con detalles y customer anidados */
interface GetShoppingCartGraphQLResponse {
  getShoppingCart: {
    shoppingCartId: string;
    customerId?: string | null;
    typeOfCart?: string | null;
    paymentMethod?: string | null;
    total?: number | null;
    vat?: number | null;
    status?: string | null;
    estimateId?: string | null;
    paymentTransactionId?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    ShoppingCartDetails?: {
      items: Array<{
        shoppingCartDetailId: string;
        price?: number | null;
        glosa?: string | null;
        priceId?: string | null;
      }>;
    } | null;
    Customer?: {
      customerId: string;
      name?: string | null;
      phone?: string | null;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      referenceAddress?: string | null;
    } | null;
  } | null;
}



export const fecthShoppingCart = async (input: shoppingCartInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
          shoppingCartId,
        } = input;
        
        console.log("--fecthShoppingCart--", input)
    
        if (shoppingCartId) {
            const response = await client.graphql<GetShoppingCartGraphQLResponse>({
              query: `
                query GETShoppingCartDetail($shoppingCartId: ID!) {
                  getShoppingCart(shoppingCartId: $shoppingCartId) {
                    shoppingCartId
                    customerId
                    typeOfCart
                    paymentMethod
                    total
                    vat
                    status
                    estimateId
                    paymentTransactionId
                    createdAt
                    updatedAt
                    ShoppingCartDetails {
                      items {
                        shoppingCartDetailId
                        price
                        glosa
                        priceId
                      }
                    }
                    Customer {
                      customerId
                      name
                      phone
                      address
                      city
                      state
                      referenceAddress
                    }
                  }
                }
              `,
              variables: { shoppingCartId },
            }) as GraphQLResult<GetShoppingCartGraphQLResponse>;

            const { data, errors } = response;

            if (errors?.length) {
              console.log("--getShoppingCart--errors", errors);
              reject({
                errorMessage: errors.map((e: { message?: string }) => e?.message ?? String(e)).join(", "),
              });
              return;
            }

            const getShoppingCart = data?.getShoppingCart ?? null;
            const dataCustomer = getShoppingCart?.Customer ? { data: getShoppingCart.Customer } : undefined;
            const detailsItems = getShoppingCart?.ShoppingCartDetails?.items ?? [];
            const dataShoppingCartDetails = { data: detailsItems };

            if (getShoppingCart) {
                // Transformar ShoppingCartDetails a products
                const productsPromises = (dataShoppingCartDetails?.data || []).map(async (detail: any) => {
                  // price está en pesos (misma unidad que total)
                  const amount = detail.price ?? 0;
                  // Calcular netAmount y vatValue (asumiendo 19% IVA)
                  const netAmount = amount / 1.19;
                  const vatValue = amount - netAmount;
                  
                  // Intentar obtener información del Price si está disponible
                  let productId = detail.shoppingCartDetailId || '';
                  let imageUrl = '';
                  
                  if (detail.priceId) {
                    try {
                      const priceData = await client.models.Price.get({ priceId: detail.priceId });
                      if (priceData?.data?.productId) {
                        productId = priceData.data.productId;
                        
                        // Intentar obtener información del Product
                        try {
                          const productData = await client.models.Product.get({ productId: priceData.data.productId });
                          // Aquí podrías obtener más información del producto si está disponible
                          // Por ahora solo usamos el productId
                        } catch (productError) {
                          console.log("--Error obteniendo Product--", productError);
                        }
                      }
                    } catch (priceError) {
                      console.log("--Error obteniendo Price--", priceError);
                    }
                  }
                  
                  return {
                    productId: productId,
                    description: detail.glosa || '',
                    netAmount: Math.round(netAmount * 100) / 100, // Redondear a 2 decimales
                    amount: amount,
                    vatValue: Math.round(vatValue * 100) / 100, // Redondear a 2 decimales
                    quantity: 1, // Por defecto 1, ajustar según tu lógica
                    imageUrl: imageUrl, // Se puede obtener del Product si está disponible
                    shoppingCartDetailId: detail.shoppingCartDetailId, // Incluir el ID del detalle
                    priceId: detail.priceId ?? undefined,
                  };
                });
                
                const products = await Promise.all(productsPromises);

                // Transformar Customer a CartCustomer
                let customer: CartCustomer | undefined = undefined;
                if (dataCustomer?.data) {
                  customer = {
                    customerId: dataCustomer.data.customerId || '',
                    Name: dataCustomer.data.name || '',
                    Email: dataCustomer.data.customerId || '',
                    Phone: dataCustomer.data.phone || '',
                    Address: dataCustomer.data.address || '',
                    City: dataCustomer.data.city || '',
                    State: dataCustomer.data.state || '',
                    ReferenceAddress: dataCustomer.data.referenceAddress || '',
                  };
                }

                // Construir addressCustomer
                const addressCustomer = dataCustomer?.data ? `
                  ${dataCustomer.data.address || ''} 
                  ${dataCustomer.data.referenceAddress || ''} 
                  ${dataCustomer.data.city || ''} 
                  ${dataCustomer.data.state || ''}`.trim() : '';

                // Construir la respuesta con la estructura esperada
                const response = {
                  shoppingCartId: getShoppingCart.shoppingCartId,
                  total: getShoppingCart.total || 0,
                  vat: getShoppingCart.vat || 0,
                  status: getShoppingCart.status || 'pending',
                  customerId: getShoppingCart.customerId || '',
                  typeOfCart: getShoppingCart.typeOfCart || null,
                  addressCustomer: addressCustomer,
                  glosa: dataShoppingCartDetails?.data?.[0]?.glosa || '',
                  products: products,
                  customer: customer,
                  paymentMethod: getShoppingCart.paymentMethod || null,
                  estimateId: getShoppingCart.estimateId || null,
                  paymentTransactionId: getShoppingCart.paymentTransactionId || null,
                  createdAt: getShoppingCart.createdAt || null,
                  updatedAt: getShoppingCart.updatedAt || null,
                  ShoppingCartDetails: dataShoppingCartDetails?.data || [],
                };

                console.log("--fecthShoppingCart--response", response);
                resolve(response);
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

export const createShoppingCartDetail = async (input: createShoppingCartDetailInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
            shoppingCartDetailId,
            glosa,
            price,
            typeOfItem,
            shoppingCartId,
            productId,
            priceId,
            estimateDetailId,
            calendarId,
        } = input;
        
        console.log("--createShoppingCartDetail--", input)
    
        const formData:any = {
          shoppingCartDetailId: shoppingCartDetailId || crypto.randomUUID(),
          glosa: glosa || null,
          price: price || 0,
          typeOfItem: typeOfItem || "product",
          shoppingCartId: shoppingCartId
        };
        
        // Solo incluir estos campos si tienen valores (no null/undefined)
        // Esto evita errores con índices GSI que requieren valores no nulos
        if (productId) {
          formData.productId = productId;
        }
        if (priceId) {
          formData.priceId = priceId;
        }
        if (estimateDetailId) {
          formData.estimateDetailId = estimateDetailId;
        }
        if (calendarId) {
          formData.calendarId = calendarId;
        }
        
        console.log("--formData ShoppingCartDetail--", formData)
        
        const { data, errors } = await client.models.ShoppingCartDetail.create(formData);
        console.log("--createShoppingCartDetail--data", data)
        
        if (errors) {
          console.log("--createShoppingCartDetail--errors", errors)
          reject({
            errorMessage: errors.map(e => e.message).join(', ')
          });
          return;
        }
        
        console.log("--createShoppingCartDetail--resolve", data)
        resolve(data);
          
      } catch (err) {
        console.log("--createShoppingCartDetail--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };

export const createShoppingCart = async (input: createShoppingCartInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
            shoppingCartId,
            total,
            vat,
            typeOfCart,
            paymentMethod,
            status,
            customerId,
            products,
        } = input;
        
        console.log("--createShoppingCart--", input)
    
        const formData:any = {
          shoppingCartId: shoppingCartId || crypto.randomUUID(),
          total: total || 0,
          vat: vat || 0,
          typeOfCart: typeOfCart || "product",
          paymentMethod: paymentMethod || null,
          status: status || "pending",
          customerId: customerId || null,
        };
        
        console.log("--formData ShoppingCart--", formData)
        
        const { data: shoppingCartData, errors } = await client.models.ShoppingCart.create(formData);
        console.log("--createShoppingCart--data", shoppingCartData)
        
        if (errors) {
          console.log("--createShoppingCart--errors", errors)
          reject({
            errorMessage: errors.map(e => e.message).join(', ')
          });
          return;
        }

        // Crear los detalles del carrito si hay productos
        const createdDetails: any[] = [];
        if (products && products.length > 0 && shoppingCartData?.shoppingCartId) {
          console.log("--Creando detalles del carrito--", products)
          
          for (const product of products) {
            try {
              const detailInput: createShoppingCartDetailInput = {
                shoppingCartId: shoppingCartData.shoppingCartId,
                glosa: product.description,
                price: Math.round(product.amount), // product.amount ya viene en el formato correcto
                typeOfItem: "product",
                productId: product.productId || undefined,
                priceId: product.priceId || undefined,
              };
              
              const detailData = await createShoppingCartDetail(detailInput);
              createdDetails.push(detailData);
              console.log("--Detail creado--", detailData)
            } catch (detailError) {
              console.log("--Error creando detail--", detailError)
              // Continuar con los siguientes productos aunque uno falle
            }
          }
        }
        
        // Devolver el shopping cart con los detalles creados
        const response = {
          ...shoppingCartData,
          ShoppingCartDetails: createdDetails,
        };
        
        console.log("--createShoppingCart--resolve", response)
        resolve(response);
          
      } catch (err) {
        console.log("--createShoppingCart--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };

export const deleteShoppingCartDetail = async (shoppingCartDetailId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("--deleteShoppingCartDetail--", shoppingCartDetailId)
    
        const { data, errors } = await client.models.ShoppingCartDetail.delete({
          shoppingCartDetailId: shoppingCartDetailId
        });
        console.log("--deleteShoppingCartDetail--data", data)
        
        if (errors) {
          console.log("--deleteShoppingCartDetail--errors", errors)
          reject({
            errorMessage: errors.map(e => e.message).join(', ')
          });
          return;
        }
        
        console.log("--deleteShoppingCartDetail--resolve", data)
        resolve(data);
          
      } catch (err) {
        console.log("--deleteShoppingCartDetail--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };

export const updateShoppingCart = async (input: updateShoppingCartInput): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {  
            shoppingCartId,
            total,
            vat,
            typeOfCart,
            paymentMethod,
            status,
            customerId,
            products,
        } = input;
        
        console.log("--updateShoppingCart--", input)
    
        const formData:any = {
          total: total !== undefined ? total : undefined,
          vat: vat !== undefined ? vat : undefined,
          typeOfCart: typeOfCart !== undefined ? typeOfCart : undefined,
          paymentMethod: paymentMethod !== undefined ? paymentMethod : undefined,
          status: status !== undefined ? status : undefined,
          customerId: customerId !== undefined ? customerId : undefined,
        };
        
        // Eliminar campos undefined
        Object.keys(formData).forEach(key => {
          if (formData[key] === undefined) {
            delete formData[key];
          }
        });
        
        console.log("--formData ShoppingCart Update--", formData)
        
        // Amplify expects a single input object with identifier + fields to update
        const { data: shoppingCartData, errors } = await client.models.ShoppingCart.update({
          shoppingCartId,
          ...formData,
        });
        console.log("--updateShoppingCart--data", shoppingCartData)
        
        if (errors) {
          console.log("--updateShoppingCart--errors", errors)
          reject({
            errorMessage: errors.map(e => e.message).join(', ')
          });
          return;
        }

        // When products is not provided, only update the cart header (total/vat) and return
        if (products === undefined) {
          console.log("--updateShoppingCart--resolve (header only)")
          resolve(shoppingCartData);
          return;
        }

        // Obtener los detalles existentes del carrito
        const existingDetails = await shoppingCartData?.ShoppingCartDetails();
        
        // Eliminar los detalles existentes
        if (existingDetails?.data && existingDetails.data.length > 0) {
          console.log("--Eliminando detalles existentes--", existingDetails.data)
          for (const detail of existingDetails.data) {
            try {
              await client.models.ShoppingCartDetail.delete({
                shoppingCartDetailId: detail.shoppingCartDetailId
              });
            } catch (deleteError) {
              console.log("--Error eliminando detail--", deleteError)
            }
          }
        }

        // Crear los nuevos detalles del carrito si hay productos
        const createdDetails: any[] = [];
        if (products && products.length > 0 && shoppingCartData?.shoppingCartId) {
          console.log("--Creando nuevos detalles del carrito--", products)
          
          for (const product of products) {
            try {
              const detailInput: createShoppingCartDetailInput = {
                shoppingCartId: shoppingCartData.shoppingCartId,
                glosa: product.description,
                price: Math.round(product.amount), // mismo formato que total (pesos)
                typeOfItem: "product",
                productId: product.productId || undefined,
                priceId: product.priceId || undefined,
              };
              
              const detailData = await createShoppingCartDetail(detailInput);
              createdDetails.push(detailData);
              console.log("--Detail creado--", detailData)
            } catch (detailError) {
              console.log("--Error creando detail--", detailError)
              // Continuar con los siguientes productos aunque uno falle
            }
          }
        }
        
        // Devolver el shopping cart actualizado con los detalles creados
        const response = {
          ...shoppingCartData,
          ShoppingCartDetails: createdDetails,
        };
        
        console.log("--updateShoppingCart--resolve", response)
        resolve(response);
          
      } catch (err) {
        console.log("--updateShoppingCart--err", err)
        reject({
          errorMessage: JSON.stringify(err),
        });
      }
    });
  };
