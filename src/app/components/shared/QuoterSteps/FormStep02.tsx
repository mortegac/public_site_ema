"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import LoadingIcon from "@/app/components/shared/LoadingIcon";
import {
  Box,
  TextField,
  Typography,
  Container,
  Grid,
  Button, 
  styled
} from "@mui/material";

import { formatCurrency } from "@/utils/currency";

import {ChargerSVG} from "@/app/components/shared/icons/ChargerSVG";
import {ChargerSVGTwo} from "@/app/components/shared/icons/ChargerSVGTwo";
import {HouseSVG} from "@/app/components/shared/icons/HouseSVG";
import {BuildingSVG} from "@/app/components/shared/icons/BuildingSVG";
import {OwnchargerSVG} from "@/app/components/shared/icons/OwnchargerSVG";
import {AddChargerSVG} from "@/app/components/shared/icons/AddChargerSVG";
import {SmallSVG} from "@/app/components/shared/icons/SmallSVG";
import CustomFormLabel from '@/app/components/shared/CalendarSteps/CustomFormLabel';

// import { CustomRadio} from '@/app/components/forms/CustomRadio';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { 
  setStep, 
  setFormClient, 
  selectClientForms, 
  setDataForm, 
  setTypeOfCharger, 
  setTypeOfBuilder, 
  setToggleChargerStatus 
} from "@/store/ClientForms/slice";
// import { selectClientForms, , setDataForm, setStep } from "@/store/ClientForms/slice";
import { setEstimate, selectEstimate 
} from "@/store/Estimate/slice";



const FullWidthButtonWithIcons = styled(Button)(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  marginBottom:"12px",
  // background: '#ECF2FF',
  border: '1px solid rgb(213, 213, 213)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between', // Espacia el grupo izquierdo y el icono derecho
  alignItems: 'center',
  padding: theme.spacing(3, 4), // Ajusta el padding general
  
}));
// Estilo para el SVG pequeño de la izquierda
const SmallLeftIcon = styled(Box)(({ theme }) => ({
  width: theme.spacing(3), // Ajusta el tamaño según necesites
  height: theme.spacing(3),
  marginRight: theme.spacing(1),
}));
const BoxLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center', // Espacia el grupo izquierdo y el icono derecho
  alignItems: 'center',
}));
// Estilo para el SVG grande de la derecha
const LargeRightIcon = styled(Box)(({ theme }) => ({
  width: theme.spacing(6), // Ajusta el tamaño según necesites
  height: theme.spacing(6),
  marginLeft: theme.spacing(1),
}));
const VerticalForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
}));

export const FormStep02 = (props:any) => {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const hasRedirected = useRef(false);
  const hasEstimateFetched = useRef(false);
  
  const [ typeOf, setTypeOf] = useState({
    typeOfCharger:"",
    typeOfResidence:"",
  })
  
  const [isSaved, setIsSaved] = React.useState(false);
  const [showButton, setShowButton] = React.useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  
  const { 
    currentStep,
    currentForm,
    isWallbox
  } = useAppSelector(selectClientForms);
  const { 
    estimate,
    estimateData,
    status
  } = useAppSelector(selectEstimate);
  
  const dispatch = useAppDispatch();
 
  async function handlerNextStep(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>){
     
    try {
      setIsFormSubmitted(true);
      setShowButton(false);
      
      // Ejecutar setFormClient primero para obtener el formId
      await dispatch(
        setFormClient({
          isHouse: currentForm?.isHouse,
          isPortable: currentForm?.isPortable,
          isWallbox: currentForm?.isWallbox,
          numberOfChargers: currentForm?.numberOfChargers || 1,
          distance: currentForm?.distance,
          customerId: currentForm?.email,
        })
      );
      
      // El useEffect se encargará de ejecutar setEstimate cuando currentForm.formId exista
      
    } catch (error) {
      console.log('Error en handlerNextStep:', error);
      setIsFormSubmitted(false);
    }
  }

  
  
  useEffect(() => {
    // Prevenir ejecuciones múltiples
    if (hasEstimateFetched.current) {
      console.log('setEstimate ya fue ejecutado, saltando...');
      return;
    }
    
    const fetchData = async () => {
      // Solo ejecutar si el formulario fue enviado y existe formId
      if (!isFormSubmitted || !currentForm.formId) return;
      
      console.log('Ejecutando setEstimate con formId:', currentForm.formId);
      // Marcar como ejecutado ANTES de hacer la llamada
      hasEstimateFetched.current = true;
      
      try {
        await Promise.all([
          dispatch(
            setEstimate({
              formId: currentForm.formId
            })
          ),
          setIsSaved(true)
        ]);
        
        // Resetear el flag después de ejecutar
        setIsFormSubmitted(false);
      } catch (error) {
        console.log('Error en fetchData:', error);
        setIsFormSubmitted(false);
        // Si falla, permitir reintentar
        hasEstimateFetched.current = false;
      }
    };
    
    fetchData();
}, [isFormSubmitted, currentForm.formId, dispatch]);


useEffect(() => {
  console.log('=== useEffect REDIRECT ===');
  console.log('isSaved:', isSaved);
  console.log('status:', status);
  console.log('estimateData:', estimateData);
  console.log('currentForm.isWallbox:', currentForm?.isWallbox);
  
  // Condición 1: debe estar guardado y no estar cargando
  if (!isSaved || status === "loading") {
    console.log('❌ Bloqueado por: !isSaved || status === "loading"');
    return;
  }
  
  // Condición 2: validar que existan los estimateId según el tipo de cargador
  if (currentForm?.isWallbox) {
    if (!estimateData?.estimateId_35 || !estimateData?.estimateId_7) {
      console.log('❌ Bloqueado: Wallbox sin estimateId_35 o estimateId_7');
      return;
    }
  } else {
    if (!estimateData?.estimateId_22) {
      console.log('❌ Bloqueado: Portable sin estimateId_22');
      return;
    }
  }
  
  console.log('✅ Todas las condiciones pasaron, programando redirect...');
  
  const timeoutId = setTimeout(() => {
    // Preparar los datos para enviar
    const typeOfResidence:string = currentForm?.isHouse ? "Casa" : "Edificio"
    
    // ...estimateData,
    // const paymentData = {                    
    //   estimateId_22: `${estimateData?.estimateId_22}`,
    //   estimateId_35: `${estimateData?.estimateId_35}`,
    //   estimateId_7: `${estimateData?.estimateId_7}`,
      
    //   materiales_22: `${estimateData?.materiales_22}`,
    //   materiales_35: `${estimateData?.materiales_35}`,
    //   materiales_7: `${estimateData?.materiales_7}`,
      
    //   instalacion_22: `${estimateData?.instalacion_22}`,
    //   instalacion_35: `${estimateData?.instalacion_35}`,
    //   instalacion_7: `${estimateData?.instalacion_7}`,
      
    //   SEC_22: `${estimateData?.SEC_22}`,
    //   SEC_35: `${estimateData?.SEC_35}`,
    //   SEC_7: `${estimateData?.SEC_7}`,
      
    //   cargador_22: `${estimateData?.cargador_22}`,
    //   cargador_35: `${estimateData?.cargador_35}`,
    //   cargador_7: `${estimateData?.cargador_7}`,
      
    //   neto_22: `${estimateData?.neto_22}`,
    //   neto_35: `${estimateData?.neto_35}`,
    //   neto_7: `${estimateData?.neto_7}`,
      
    //   iva_22: `${estimateData?.iva_22}`,
    //   iva_35: `${estimateData?.iva_35}`,
    //   iva_7: `${estimateData?.iva_7}`,
      
    //   bruto_22: `${estimateData?.bruto_22}`,
    //   bruto_35: `${estimateData?.bruto_35}`,
    //   bruto_7: `${estimateData?.bruto_7}`,
      
    //   isWallbox:currentForm?.isWallbox,
    //   mts: `${currentForm?.distance} mts`,
    //   typeOfResidence: typeOfResidence,
    //   email: currentForm?.email,
    //   name: currentForm?.name,
    // };
    
    const paymentData = {                    
      estimateId_22: `${estimateData?.estimateId_22}`,
      estimateId_35: `${estimateData?.estimateId_35}`,
      estimateId_7: `${estimateData?.estimateId_7}`,
      
      materiales_22: `${Number(estimateData?.materiales_22) === 0 ? "n/a" : formatCurrency(Number(estimateData?.materiales_22))}`,
      materiales_35: `${Number(estimateData?.materiales_35) === 0 ? "n/a" : formatCurrency(Number(estimateData?.materiales_35))}`,
      materiales_7: `${Number(estimateData?.materiales_7) === 0 ? "n/a" : formatCurrency(Number(estimateData?.materiales_7))}`,

      instalacion_22: `${Number(estimateData?.instalacion_22) === 0 ? "n/a" : formatCurrency(Number(estimateData?.instalacion_22))}`,
      instalacion_35: `${Number(estimateData?.instalacion_35) === 0 ? "n/a" : formatCurrency(Number(estimateData?.instalacion_35))}`,
      instalacion_7: `${Number(estimateData?.instalacion_7) === 0 ? "n/a" : formatCurrency(Number(estimateData?.instalacion_7))}`,

      SEC_22: `${estimateData?.estimateId_22 === "" ? "n/a" : formatCurrency(Number(estimateData?.SEC_22))}`,
      SEC_35: `${estimateData?.estimateId_35 === "" ? "n/a" : formatCurrency(Number(estimateData?.SEC_35))}`,
      SEC_7: `${estimateData?.estimateId_7 === "" ? "n/a" : formatCurrency(Number(estimateData?.SEC_7))}`,

      cargador_22: `${Number(estimateData?.cargador_22) === 0 ? "n/a" : formatCurrency(Number(estimateData?.cargador_22))}`,
      cargador_35: `${Number(estimateData?.cargador_35) === 0 ? "n/a" : formatCurrency(Number(estimateData?.cargador_35))}`,
      cargador_7: `${Number(estimateData?.cargador_7) === 0 ? "n/a" : formatCurrency(Number(estimateData?.cargador_7))}`,

      neto_22: `${Number(estimateData?.neto_22) === 0 ? "n/a" : formatCurrency(Number(estimateData?.neto_22))}`,
      neto_35: `${Number(estimateData?.neto_35) === 0 ? "n/a" : formatCurrency(Number(estimateData?.neto_35))}`,
      neto_7: `${Number(estimateData?.neto_7) === 0 ? "n/a" : formatCurrency(Number(estimateData?.neto_7))}`,

      iva_22: `${Number(estimateData?.iva_22) === 0 ? "n/a" : formatCurrency(Number(estimateData?.iva_22))}`,
      iva_35: `${Number(estimateData?.iva_35) === 0 ? "n/a" : formatCurrency(Number(estimateData?.iva_35))}`,
      iva_7: `${Number(estimateData?.iva_7) === 0 ? "n/a" : formatCurrency(Number(estimateData?.iva_7))}`,

      bruto_22: `${Number(estimateData?.bruto_22) === 0 ? "n/a" : formatCurrency(Number(estimateData?.bruto_22))}`,
      bruto_35: `${Number(estimateData?.bruto_35) === 0 ? "n/a" : formatCurrency(Number(estimateData?.bruto_35))}`,
      bruto_7: `${Number(estimateData?.bruto_7) === 0 ? "n/a" : formatCurrency(Number(estimateData?.bruto_7))}`,
      isWallbox:currentForm?.isWallbox,
      mts: `${currentForm?.distance} mts`,
      typeOfResidence: typeOfResidence,
      email: currentForm?.email,
      name: currentForm?.name,
    };
    
    console.log("---paymentData---", paymentData)
    // Guardar en sessionStorage
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
    // Redirigir según el estado
    console.log("----REDIRECT--- /cotizador/simulacion")
    // setShowButton(false);
    router.push('/cotizador/simulacion');
   
  }, 3000);

  return () => clearTimeout(timeoutId);
  
}, [isSaved, status, estimateData, currentForm?.isWallbox, currentForm?.isHouse, currentForm?.distance, currentForm?.email, currentForm?.name, router]);


  return (  
    <>
    
    {/* <pre>isSaved = {JSON.stringify(isSaved, null, 2)}</pre>
    <pre>estimateData = {JSON.stringify(isSaved, null, 2)}</pre>
    <pre>estimateData = {JSON.stringify(estimateData, null, 2)}</pre>
    */}
    {/* <pre>currentForm = {JSON.stringify(currentForm, null, 2)}</pre> 
    */}
    {/* 
    <pre>currentForm = {JSON.stringify(currentForm, null, 2)}</pre>  */}
    {/* <pre>estimateData = {JSON.stringify(estimateData?.cargador_22, null, 2)}</pre> 
    <pre>estimateData = {Number(estimateData?.cargador_22)}</pre>  */}
    {/* Number(estimateData?.cargador_22) === 0 */}
      <Box 
        id="boxCentral" 
        bgcolor="#ffffff" 
        pt={4} 
        pb={4} 
        width={{ xs: "100%", md: "50%" }}
        mt={4}
        mx="auto"
        sx={{
          boxSizing: 'border-box',
          border: '1px solid #EAEFF4',
          borderRadius: '12px',
          maxWidth: "1400px",
        }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
          {/* <Typography variant="h6" pb={2} gutterBottom>Seleccione el tipo de cargador</Typography> */}
          <CustomFormLabel>Seleccione el tipo de cargador</CustomFormLabel>
          
          <FullWidthButtonWithIcons variant="contained" 
            sx={{ background:`${currentForm?.isPortable ? "#ECF2FF" : "#FFF"} `}}
            onClick={()=> {
              dispatch( setTypeOfCharger({ isPortable:true, isWallbox:false }))
              setTypeOf({...typeOf, typeOfCharger:"PORTABLE" })
            }}
          >
    
            <BoxLeft>
              <SmallLeftIcon>
                {Boolean(currentForm?.isPortable) && <SmallSVG />}
              </SmallLeftIcon>  
                <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                }}>Cargador portable o de viaje</Typography>
            </BoxLeft>
            
            <LargeRightIcon><ChargerSVG /></LargeRightIcon>
          </FullWidthButtonWithIcons>
          
          <FullWidthButtonWithIcons variant="contained" 
            sx={{
              background:`${currentForm?.isWallbox ? "#ECF2FF" : "#FFF"} `
            }}
            onClick={()=> {
              dispatch( setTypeOfCharger({ isPortable:false, isWallbox:true }))
              setTypeOf({...typeOf, typeOfCharger:"WALLBOX" })
            }
          }
          >
            <BoxLeft>
              <SmallLeftIcon>
                
                {currentForm?.isWallbox && <SmallSVG />}
              </SmallLeftIcon>  
              <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                }}>Cargador de pared o tipo wallbox</Typography>
            </BoxLeft>
            
            <LargeRightIcon><ChargerSVGTwo /></LargeRightIcon>
          </FullWidthButtonWithIcons>
        
        </Container>
        
        <Container
            sx={{
              maxWidth: "1400px !important",
              position: "relative",
              paddingTop: "32px",
            }}
        >
            {/* <Typography variant="h6" gutterBottom>¿En que tipo de residencia quiere hacer la instalación?
            </Typography> */}
            <CustomFormLabel>¿En que tipo de residencia quiere hacer la instalación?</CustomFormLabel>
            <FullWidthButtonWithIcons variant="contained" 
              sx={{
                // background:`${typeOf?.typeOfResidence === "HOUSE" ? "#ECF2FF" : "#FFF"} `
                background:`${currentForm?.isHouse ? "#ECF2FF" : "#FFF"} `
              }}
              // onClick={()=>setTypeOf({...typeOf, typeOfResidence:"HOUSE" })}
              onClick={()=> {
                dispatch( setTypeOfBuilder({ isHouse:true, isBuilding:false }))
                setTypeOf({...typeOf, typeOfResidence:"HOUSE" })
              }}
            >
            <BoxLeft>
              <SmallLeftIcon>
                {currentForm?.isHouse && <SmallSVG />}
              </SmallLeftIcon>  
              <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                }}>Casa</Typography>
            </BoxLeft>
            
            <LargeRightIcon><HouseSVG /></LargeRightIcon>
          </FullWidthButtonWithIcons>
          
          <FullWidthButtonWithIcons variant="contained"
           sx={{
            background:`${currentForm?.isBuilding ? "#ECF2FF" : "#FFF"} `
            }}
            onClick={()=> {
              dispatch( setTypeOfBuilder({ isHouse:false, isBuilding:true }))
              setTypeOf({...typeOf, typeOfResidence:"BUILDING" })
            }}
          >
            <BoxLeft>
              <SmallLeftIcon>
              {currentForm?.isBuilding && <SmallSVG />}
              </SmallLeftIcon>  
              <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                }}>
                    Edificio</Typography>
            </BoxLeft>
            
            <LargeRightIcon><BuildingSVG /></LargeRightIcon>
          </FullWidthButtonWithIcons>
        </Container>
        
        <Container
            sx={{
              maxWidth: "1400px !important",
              position: "relative",
              paddingTop: "32px",
            }}
        >
            {/* <CustomFormLabel>Deseas añadir el valor del cargador a la simulación:</CustomFormLabel>
            <FullWidthButtonWithIcons variant="contained" 
              sx={{
                background:`${currentForm?.hasOwnCharger ? "#ECF2FF" : "#FFF"} `
              }}
              // onClick={()=> {
              //   dispatch(setToggleChargerStatus({ hasOwnCharger:true, needsCharger:false }))
              // }}
            >
            <BoxLeft>
              <SmallLeftIcon>
                {currentForm?.hasOwnCharger && <SmallSVG />}
              </SmallLeftIcon>  
              <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                }}>Ya tengo mi cargador</Typography>
            </BoxLeft>
            
            <LargeRightIcon><OwnchargerSVG /></LargeRightIcon>
          </FullWidthButtonWithIcons> */}
          
          {/* <FullWidthButtonWithIcons variant="contained"
           sx={{
            background:`${currentForm?.needsCharger ? "#ECF2FF" : "#FFF"} `
            }}
            onClick={()=> {
              dispatch(setToggleChargerStatus({ hasOwnCharger:false, needsCharger:true }))
              // setTypeOf({...typeOf, typeOfResidence:"BUILDING" })
            }}
          >
            <BoxLeft>
              <SmallLeftIcon>
              {currentForm?.needsCharger && <SmallSVG />}
              </SmallLeftIcon>  
              <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                  textAlign:"left",
                }}>
                    Si, deseo, Agregar cargador referencial de 7kW
                    </Typography>
            </BoxLeft>
            
            <LargeRightIcon><AddChargerSVG /></LargeRightIcon>
          </FullWidthButtonWithIcons> */}
          
        </Container>
        
        <Container
            sx={{
              maxWidth: "1400px !important",
              position: "relative",
              paddingTop: "24px",
            }}
        >
            {/* <Typography variant="h6" gutterBottom>Indique la distancia existente entre su tablero eléctrico y donde quiere instalar el cargador
            </Typography> */}
            <CustomFormLabel>Indique la distancia existente entre su tablero eléctrico y donde quiere instalar el cargador</CustomFormLabel>
            <VerticalForm>
              <Typography variant="caption" gutterBottom 
                sx={{
                  width: "150px",
                  fontSize: "16px"
                }}>
                Distancia en metros
              </Typography>
              <TextField
                required
                id="distance"
                type="number"
                label=""
                value={currentForm?.distance}
                onChange={(e)=>dispatch(
                  setDataForm({
                    key: "distance",
                    value: e.target.value,
                  })
                )}
                sx={{
                  '& input[type=number]': {
                    min: 0
                  }
                }}
              />
              <Typography variant="caption" gutterBottom>
                mts
              </Typography>
              
            
            </VerticalForm>
              <Typography variant="caption" 
              
              >*Si su instalacion requiere mas de 60 metros por favor escribamos a <b>contacto@energica.city</b>
            </Typography>
            
            <FullWidthButtonWithIcons 
                  variant="contained" 
                  // color="primary"
                  // sx={{
                  //   backgroundColor: currentForm?.acceptTermAndConditions ? '#E81A68' : '#ECF2FF',
                  //   color: termsAccepted ? '#FFFFFF' : '#2A3547',
                  // }}
                  sx={{
                    marginTop: "24px",
                    background:`${currentForm?.acceptTermAndConditions ? "#ECF2FF" : "#FFF"} `
                  }}
                  onClick={()=> {
                    dispatch( setDataForm({key:"acceptTermAndConditions", value:!currentForm?.acceptTermAndConditions}))
                    // setTypeOf({...typeOf, typeOfResidence:"BUILDING" })
                  }}
                >
                  <BoxLeft>
                    <SmallLeftIcon>
                      
                      {currentForm?.acceptTermAndConditions && <SmallSVG />}
                    </SmallLeftIcon>  
                    <Typography variant="caption" gutterBottom 
                sx={{
                  fontSize: "16px",
                  color: "#2A3547",
                }}>Acepto términos y condiciones</Typography>
                  
                    {/* <Typography variant="caption"
                    
                      sx={{
                        fontSize:"18px",
                      }}
                    >
                      Acepto términos y condiciones
                    </Typography> */}
                  </BoxLeft>
            </FullWidthButtonWithIcons>
             <Typography variant="caption" sx={{
                        fontSize:"15px",
                      }}>
               Revise nuestros términos y condiciones{" "}
               <a href="https://energica.city/t-y-c-cotizador" target="_blank" rel="noopener noreferrer" style={{ color: '#2A3547', textDecoration: 'none', fontWeight: 'bold' }}>
                 aquí
               </a>
             </Typography>
        </Container>
          
      </Box>
         
      
      
      
      <Box bgcolor="#ffffff" width={"100%"} mt={1} 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
<<<<<<< HEAD
        
        {status !== "loading" && showButton &&  
         <Button 
         id="btn"
           type="submit" 
           variant="contained" 
           color="primary"
           sx={{
             width: { xs: "90%", md: "50%" },
             padding: "10px",
             marginTop:"24px",
           }}
           disabled={
             // Validación del tipo de cargador (debe ser uno u otro, no ambos)
             !((currentForm?.isPortable && !currentForm?.isWallbox) || (!currentForm?.isPortable && currentForm?.isWallbox)) ||
             
             // Validación del tipo de residencia (debe ser uno u otro, no ambos)
             !((currentForm?.isHouse && !currentForm?.isBuilding) || (!currentForm?.isHouse && currentForm?.isBuilding)) ||
             
             // Validación del estado del cargador (debe ser uno u otro, no ambos)
             !((currentForm?.hasOwnCharger && !currentForm?.needsCharger) || (!currentForm?.hasOwnCharger && currentForm?.needsCharger)) ||
             
             // Validación de la distancia
             !currentForm?.distance || Number(currentForm?.distance) <= 0 ||
             
             // Validación de términos y condiciones
             !currentForm?.acceptTermAndConditions  
           }
           onClick={(e) => handlerNextStep(e)}
         >
           Siguiente
           
         </Button>
        }
        
        {
               !showButton &&  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                 <LoadingIcon icon="puff" color="#E81A68" style={{width:"60px", height:"60px"}}/>
               </Box>
        }
        {/* <pre>showButton = {JSON.stringify(showButton, null, 2)}</pre>  */}
        
       { showButton && isSaved &&
       <Typography sx={{
                  fontSize: "18px",
                  color: "#2A3547",
                }}
      >Generando su Simulación ...</Typography>}
=======
        <Button 
        id="btn"
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{
            width: { xs: "90%", md: "50%" },
            padding: "10px",
            marginTop:"24px",
          }}
          disabled={
            // Validación del tipo de cargador (debe ser uno u otro, no ambos)
            !((currentForm?.isPortable && !currentForm?.isWallbox) || (!currentForm?.isPortable && currentForm?.isWallbox)) ||
            
            // Validación del tipo de residencia (debe ser uno u otro, no ambos)
            !((currentForm?.isHouse && !currentForm?.isBuilding) || (!currentForm?.isHouse && currentForm?.isBuilding)) ||
            
            // Validación del estado del cargador (debe ser uno u otro, no ambos)
            !((currentForm?.hasOwnCharger && !currentForm?.needsCharger) || (!currentForm?.hasOwnCharger && currentForm?.needsCharger)) ||
            
            // Validación de la distancia
            !currentForm?.distance || Number(currentForm?.distance) <= 0 ||
            
            // Validación de términos y condiciones
            !currentForm?.acceptTermAndConditions  
            // ||
            
            // status !== "idle"
          }
          onClick={(e) => handlerNextStep(e)}
        >
          Siguiente
          {
              status === "loading" &&  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                <LoadingIcon icon="puff" color="#E81A68" style={{width:"60px", height:"60px"}}/>
              </Box>
          }
        </Button>
>>>>>>> 5161ec2 (fix loading data)
        
      </Box>
      
      {/* <pre>isSaved = {JSON.stringify(isSaved, null, 2 )}</pre>
      <pre>showButton = {JSON.stringify(showButton, null, 2 )}</pre>
      <pre>status = {JSON.stringify(status, null, 2 )}</pre> */}
      
    </>      
  );
};

