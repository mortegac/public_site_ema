import { useState, useEffect, useCallback, useRef } from "react";

import emailjs, { init } from "emailjs-com";
const SERVICE = "service_ucb8wga";  // 
const TEMPLATE = "template_rbmzu0w"; // Comprobante WP


export const SentEmail = (props:any) =>{
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const isFirstRender = useRef(true);
    const {data} = props;
    
    const onSendEmail = async () => {
        setIsSaved(true)
        
        const dataEmail ={
            glosa:data?.glosa,
            total:data?.amount,
            order:data?.buy_order,
            card:data?.card_number,
            typePay:data?.payment_type_code,
            reply_to:data?.usersPaymentTransactionsId,
            to_client_email:data?.usersPaymentTransactionsId,
        }
        init("UYcrSeCqLGW8xqT4S");
        emailjs.send(SERVICE, TEMPLATE, dataEmail).then(
          function (response) {
            // console.log("ENVIADO...", response);

          },
          function (error) {
            
            console.log("FAILED...", error);
          }
        ).catch(err => {
         
          console.log("err ", err)
        }

        );
        
        setIsSaved(false)

    }
    
    useEffect(() => {
        if (!isFirstRender.current) return;
        isFirstRender.current = false;
        onSendEmail();
        
 }, [onSendEmail]); 
 
 
    return(
        <>
        {isSaved && <span>Su comprobante fue enviado al email ingresado.</span>}
        </>
    )
}