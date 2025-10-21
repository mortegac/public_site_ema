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
import { setStep, setFormClient, selectClientForms, setDataForm, setTypeOfCharger, setTypeOfBuilder, setToggleChargerStatus } from "@/store/ClientForms/slice";
// import { selectClientForms, , setDataForm, setStep } from "@/store/ClientForms/slice";
import { setEstimate, selectEstimate } from "@/store/Estimate/slice";



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
  
  const [ typeOf, setTypeOf] = useState({
    typeOfCharger:"",
    typeOfResidence:"",
  })
  
  const [isSaved, setIsSaved] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  
  const { 
    currentStep,
    currentForm,
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
        
    const fetchData = async () => {
      // Solo ejecutar si el formulario fue enviado y existe formId
      if (!isFormSubmitted || !currentForm.formId) return;
      
      try {
        await Promise.all([
          dispatch(
            setEstimate({
              formId: currentForm.formId
            })
          ),
          // dispatch(setStep(3))
          setIsSaved(true)
        ]);
        
        // Resetear el flag después de ejecutar
        setIsFormSubmitted(false);
      } catch (error) {
        console.log('Error en fetchData:', error);
        setIsFormSubmitted(false);
      }
    };
    
    fetchData();
    
    
    
}, [currentForm.formId, isFormSubmitted, dispatch]);


useEffect(() => {
   
  if (!isSaved || !estimateData?.estimateId) return;
  
  const timeoutId = setTimeout(() => {
    // Preparar los datos para enviar
    const typeOfResidence:string = currentForm?.isHouse ? "Casa" : "Edificio"
    
    const paymentData = {                    
      materiales_35: estimateData?.materialsCost?.toLocaleString(),
      materiales_7: estimateData?.materialsCost?.toLocaleString(),
      instalacion_35: estimateData?.installationCost?.toLocaleString(),
      instalacion_7: estimateData?.installationCost?.toLocaleString(),
      SEC_35: estimateData?.SECCost?.toLocaleString(),
      SEC_7: estimateData?.SECCost?.toLocaleString(),
      cargador_35: 0,
      cargador_7: 0,
      neto_35: `$ ${estimateData?.netPrice?.toLocaleString()}`,
      neto_7: `$ ${estimateData?.netPrice?.toLocaleString()}`,
      iva_35: `$ ${estimateData?.VAT?.toLocaleString()}`,
      iva_7: `$ ${estimateData?.VAT?.toLocaleString()}`,
      bruto_35: `$ ${estimateData?.grossPrice?.toLocaleString()}`,
      bruto_7: `$ ${estimateData?.grossPrice?.toLocaleString()}`,
      mts: `${currentForm?.distance} mts`,
      typeOfResidence: typeOfResidence,
      email: currentForm?.email,
      name: currentForm?.email,
    };
    
    console.log("---paymentData---", paymentData)
    // Guardar en sessionStorage
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
    
    // Redirigir según el estado
    console.log("----REDIRECT--- /cotizador/simulacion")
        
    router.push('/cotizador/simulacion');
        
   
  }, 3000);

  return () => clearTimeout(timeoutId);
  
}, [isSaved, estimateData?.estimateId]);


  return (  
    <>
    {/* <pre>isSaved = {JSON.stringify(isSaved, null, 2)}</pre>
    <pre>estimateData = {JSON.stringify(isSaved, null, 2)}</pre>
    <pre>estimateData = {JSON.stringify(estimateData, null, 2)}</pre>
    <pre>currentForm = {JSON.stringify(currentForm, null, 2)}</pre> */}
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
            <CustomFormLabel>Deseas añadir el valor del cargador a la simulación:</CustomFormLabel>
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
          </FullWidthButtonWithIcons>
          
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
        </Container>
          
      </Box>
         
      
      
      
      <Box bgcolor="#ffffff" width={"100%"} mt={1} 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
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
        
      </Box>
      {/* <pre>{JSON.stringify(currentForm, null, 2 )}</pre> */}
    </>      
  );
};

