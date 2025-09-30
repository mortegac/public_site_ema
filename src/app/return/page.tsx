'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PageContainer from '@/app/components/container/PageContainer';
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import LoadingIcon from "@/app/components/shared/LoadingIcon";
import { Box, Grid, Typography, Button, Paper } from '@mui/material';

// import {SvgFailed} from "./components/SvgFailed";
// import {SvgSuccess} from "./components/SvgSuccess";
// import {SentEmail} from "./components/SentEmail";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
// import { selectCustomer } from "@/store/Customer/slice";
// import { selectCalendarVisits } from "@/store/CalendarVisits/slice";
// import { selectShoppingCart, getShoppingCart} from "@/store/ShoppingCart/slice";
import { selectPaymentTransaction, getPaymentTransaction} from "@/store/PaymentTransaction/slice";
import { selectWebpay, getWebpayStart} from "@/store/Webpay/slice";

import { fetchWebpayCommit, fetchWebpayStatus, sendEmail} from "@/store/Webpay/services";
  

import Invoice from './components/Invoice';
import RetryTransaction from './components/RetryTransaction';





const ReturnPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isFirstRender = useRef(true);
  
  const searchParams = useSearchParams();
  const [resTransaction, setResTransaction] = useState(
    {
        step: 0,
        token_ws: '',
        tbk_token: '',
        status: '',
        apiError: false,
        msg: '',
        total: '',
        order: '',
        card: '',
        typePay: '',
        to_email: '',
        glosa: '',
        shoppingCartId: '',
    }
    );
    const { paymentTransaction, status } = useAppSelector(selectPaymentTransaction);
    
    
    
    // Función alternativa usando sessionStorage
    const redirectToInvoice = useCallback((data: any) => {
      // Guardar datos en sessionStorage
      sessionStorage.setItem('invoiceData', JSON.stringify(data));
      // Redirigir a la página de invoice
      router.push('/return/invoice');
    }, [router]);

    const validation = async (obj:any) => {
      //Flujos:
      //1. Flujo normal (OK): solo llega token_ws
      //2. Timeout (más de 10 minutos en el formulario de Transbank): llegan TBK_ID_SESION y TBK_ORDEN_COMPRA
      //3. Pago abortado (con botón anular compra en el formulario de Webpay): llegan TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
      //4. Caso atipico: llega todos token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
      
          const { token, tbkToken, tbkOrdenCompra, tbkIdSesion } = obj;
          
          console.log(`
              token = ${token}
              tbkToken = ${tbkToken}
              tbkOrdenCompra = ${tbkOrdenCompra}
              tbkIdSesion = ${tbkIdSesion}
          `)
          try {
              // Flujo 1: Confirmar Transacción
              if (token && !tbkToken) {
                  setResTransaction(prev => ({
                      ...prev,
                      step: 1,
                      token_ws: token,
                      msg: "La transaccion confirmada",
                      apiError: false,
                      tbk_token: tbkToken
                  }));
                  
                  
    
                  const commitResponse = await fetchWebpayCommit({ token:token });
                  console.log("---commitResponse---", commitResponse)
                  if (!commitResponse) {
                      throw new Error('Error en getWPCommit');
                  }
                  
                  /* TODO: @francisco deve devolver el status
                  */
                  if (commitResponse?.status !== "AUTHORIZED" ) {
                      setResTransaction(prev => ({
                          ...prev,
                          step: 1,
                          token_ws: token,
                          msg: "Error al confirmar la transaccion",
                          apiError: true,
                          tbk_token: tbkToken
                      }));
                      // throw new Error('Error en getWPCommit');
                  }
    
                  
                  
                  
                  const statusResponse = await fetchWebpayStatus({ token:token });
                  console.log("---statusResponse-fetchWebpayStatus--", statusResponse)
                  if (!statusResponse || !statusResponse.status) {
                      throw new Error('Error en getWPStatus o respuesta inválida');
                  }
    
                  setResTransaction(prev => ({
                      ...prev,
                      status: statusResponse?.status,
                      glosa: statusResponse?.glosa,
                      total: statusResponse?.amount,
                      order: statusResponse?.buy_order,
                      card: statusResponse?.card_number,
                      typePay: statusResponse?.payment_type_code,
                      to_email: statusResponse?.email,
                  }));
                  
                  if (commitResponse?.status === "AUTHORIZED" ) {
                      const objEmail = {
                          "glosa": statusResponse?.glosa,
                          "total": statusResponse?.amount,
                          "order": statusResponse?.buy_order,
                          "card": statusResponse?.card_number,
                          "typePay": statusResponse?.payment_type_code,
                          "to_email": statusResponse?.email,
                      }
      
                      await sendEmail({ ...objEmail })
                  }                
                  return true;
              }
              
              // Flujo 2: Transacción Anulada por tiempo de espera |   tbkOrdenCompra y tbkIdSesion
              else if (!token && !tbkToken && tbkIdSesion && tbkOrdenCompra) {
                  setResTransaction(prev => ({
                      ...prev,
                      token_ws: token,
                      step: 3,
                      msg: "La transaccion fue Anulada por tiempo de espera",
                      apiError: false,
                      tbk_token: "",
                      status:""
                  }));
    
                  const statusResponse = await fetchWebpayStatus({ token:tbkToken });
                  if (statusResponse?.status) {
                      setResTransaction(prev => ({
                          ...prev,
                          status: statusResponse.status
                      }));
                  }
                  
    
                  return true;
              }
              
              // Flujo 3: Pago anulado por usuario
              else if (!token && tbkToken) {
                  setResTransaction(prev => ({
                      ...prev,
                      token_ws: "",
                      step: 4,
                      msg: "El pago fue anulado por el usuario",
                      apiError: false,
                      tbk_token: tbkToken
                  }));
    
                  // const statusResponse = await getWPStatus(tbkToken);
                  // getWebpayStart
                  
                  const statusResponse = await fetchWebpayStatus({ token:tbkToken });
                  // const statusResponse = await fetchWPStatus(tbkToken);
                  if (statusResponse?.status) {
                    //   setResTransaction(prev => ({
                    //       ...prev,
                    //       status: statusResponse.status
                    //   }));
                    setResTransaction(prev => ({
                        ...prev,
                        status: statusResponse.status,
                        glosa: statusResponse?.glosa,
                        total: statusResponse?.amount,
                        order: statusResponse?.buy_order,
                        card: statusResponse?.card_number,
                        typePay: statusResponse?.payment_type_code,
                        to_email: statusResponse?.email,
                    }));
                  }
    
                  return true;
              }
              
              // Flujo 4: Pago inválido
              else if (token && tbkToken) {
                  setResTransaction(prev => ({
                      ...prev,
                      token_ws: token,
                      step: 5,
                      msg: "El pago es inválido, contactese con su banco",
                      apiError: false,
                      tbk_token: tbkToken
                  }));
    
                  // const statusResponse = await getWPStatus(token);
                  const statusResponse = await fetchWebpayStatus({ token:tbkToken });
                  if (statusResponse?.status) {
                      setResTransaction(prev => ({
                          ...prev,
                          status: statusResponse.status
                      }));
                  }
    
                  return true;
              }
    
              return false;
          } catch (error) {
              console.log('Error en la validación:', error);
              setResTransaction(prev => ({
                  ...prev,
                  apiError: true,
                  msg: "Error en la validación del pago",
                  status: "ERROR"  // Agregamos un status de error
              }));
              const statusResponse = await fetchWebpayStatus({ token:tbkToken });
              if (statusResponse?.status) {
                  setResTransaction(prev => ({
                      ...prev,
                      status: statusResponse.status
                  }));
              }
              return false;
          }
      };

      
    const handleValidation = useCallback(async () => {
        try {
          const token = searchParams.get("token_ws") || "";
          const tbkToken = searchParams.get("TBK_TOKEN") || "";
          const tbkOrdenCompra = searchParams.get("TBK_ORDEN_COMPRA") || "";
          const tbkIdSesion = searchParams.get("TBK_ID_SESION") || "";


          await validation({
              token: token, 
              tbkToken: tbkToken, 
              tbkOrdenCompra: tbkOrdenCompra, 
              tbkIdSesion: tbkIdSesion
          });
          
        } catch (error) {
            console.log('Error en el proceso de validación:', error);
            setResTransaction(prev => ({
                ...prev,
                apiError: true,
                msg: "Error inesperado en el proceso de pago",
                status: "ERROR"
            }));
        } 
        
    }, []);
    
    
    const getTransaction = async () => await dispatch(getPaymentTransaction({ token: String(resTransaction?.tbk_token)}));
    // const getTransaction = async () => await dispatch(getPaymentTransaction({ token: String(resTransaction?.token_ws)}));
    
    // const getRetry = async () => await dispatch(getWebpayStart({ 
    //     shoppingCartId: String(paymentTransaction?.shoppingCartId),
    //     glosa: String(paymentTransaction?.glosa),
    // }));
    
    useEffect(() => {
        if (!isFirstRender.current) return;
        isFirstRender.current = false;
        
        handleValidation();
        
 }, [handleValidation]); 
 
 
    useEffect(() => {
        // resTransaction?.tbk_token && 
        // resTransaction?.token_ws && 
        // resTransaction?.token_ws !== "" && 
        resTransaction?.tbk_token && getTransaction()
        resTransaction?.token_ws && getTransaction()
        
 }, [resTransaction]); 
 
    // Nuevo useEffect para manejar la redirección
    useEffect(() => {
        if (resTransaction?.status === "AUTHORIZED" && status === "idle") {
            const invoiceData = {
                glosa: resTransaction?.glosa,
                total: resTransaction?.total,
                order: resTransaction?.order,
                card: `xxxx xxxx xxxx ${resTransaction?.card}`,
                typePay: resTransaction?.typePay,
                email: resTransaction?.to_email
            };
            
            // Redirigir con datos POST
            redirectToInvoice(invoiceData);
        }
    }, [resTransaction?.status, status, redirectToInvoice]);

    
    // Nuevo useEffect para manejar el timeout de 30 segundos y redirección sin parámetros
    useEffect(() => {
        // Verificar si no hay parámetros en la URL
        const token = searchParams.get("token_ws") || "";
        const tbkToken = searchParams.get("TBK_TOKEN") || "";
        const tbkOrdenCompra = searchParams.get("TBK_ORDEN_COMPRA") || "";
        const tbkIdSesion = searchParams.get("TBK_ID_SESION") || "";
        
        const hasNoParams = !token && !tbkToken && !tbkOrdenCompra && !tbkIdSesion;
        
        // Redirigir inmediatamente si no hay parámetros en la URL
        if (hasNoParams) {
            router.push('/return/invoice');
            return;
        }
        
        // Solo activar el timeout si estamos en estado de loading (status vacío) y hay parámetros
        if (resTransaction?.status === "") {
            const timeoutId = setTimeout(() => {
                // Después de 30 segundos, redirigir a invoice
                router.push('/return/invoice');
            }, 30000); // 30 segundos

            // Cleanup del timeout si el componente se desmonta o cambia el estado
            return () => clearTimeout(timeoutId);
        }
    }, [resTransaction?.status, router, searchParams]);

    
    
    /** TODO:  CASO BORDE 
     * El tiempo maximo es de 20 minutos para reintentar la transaccion 
     * Despues de los 20 minutos la fecha es LIBERADA y el carro de comprar queda en estado "time_out"
     * Se DEBE traer info del carro y validar
    */
  
  return (
    <PageContainer title="Retorno de Pago" description="Procesando el retorno de pago">
      <HpHeader />
      {/* <pre>paymentTransaction = {JSON.stringify(paymentTransaction, null, 2 )}</pre>
      <pre>resTransaction = {JSON.stringify(resTransaction, null, 2 )}</pre> */}
      <div 
        style={{ 
            // minHeight: '80vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: '#f8fafc'
        }}
      >
          {/* <pre>{JSON.stringify(resTransaction, null, 2 )}</pre> */}
        {resTransaction?.status === "" &&
          <Box id="box-loading" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
            <LoadingIcon icon="puff" color="#E81A68" style={{width:"60px", height:"60px"}}/>
          </Box>
        }
       
       <Box id="returnPage" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {/* Removido el renderizado condicional del Invoice ya que ahora se redirige */}
          
            { resTransaction?.status !== "AUTHORIZED" 
                && resTransaction?.status !== "" 
                && status === "idle" 
                && <>
                    <RetryTransaction 
                     glosa={resTransaction?.glosa}
                     total={resTransaction?.total}
                     order={resTransaction?.order}
                     email={resTransaction?.to_email}
                     shoppingCartId={paymentTransaction?.shoppingCartId || null}
                    /> 
                </>
            }
       </Box>
        
             
             
      </div>
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default ReturnPage; 