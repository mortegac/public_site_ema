"use client";
import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button, 
  styled
} from "@mui/material";


import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setStep, selectClientForms, setDataForm, setFormClient } from "@/store/ClientForms/slice";



export const PersonalInfo = (props:any) => {
  const [ typeOf, setTypeOf] = useState({
    typeOfCharger:"",
    typeOfResidence:"",
  })
  const { 
    currentStep,
    currentForm,
  } = useAppSelector(selectClientForms);
  
  const dispatch = useAppDispatch();

  
  
  function handlerNextStep(){
    
    
    const isHouse: boolean = typeOf.typeOfResidence ==="HOUSE" && true
    const isPortable: boolean = typeOf.typeOfCharger ==="PORTABLE" && true
    const isWallbox: boolean = typeOf.typeOfCharger ==="WALLBOX" && true
    
    
    
    
    
    Promise.all([
      dispatch(
        setDataForm({
          key: "isHouse",
          value: isHouse
        })
      ),
      dispatch(
        setDataForm({
          key: "isPortable",
          value: isPortable
        })
      ),
      dispatch(
        setDataForm({
          key: "isWallbox",
          value: isWallbox
        })
      ),
      
      // CREAR EL ClientForm
      
      dispatch(setStep(2))
    ]);  
    
  }

  return (  
    <>
      <Box bgcolor="#ffffff" pt={4} pb={4} width={"90%"} mt={4}
      sx={{
        boxSizing: 'border-box',
        border: '1px solid #EAEFF4',
        borderRadius: '12px',
      }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
          <Typography variant="h6" pb={2} gutterBottom>Seleccione el tipo de cargador</Typography>
          
        
        </Container>
        
      </Box>
      <Box bgcolor="#ffffff" pt={4} pb={4} width={"90%"} mt={4}
        sx={{
          boxSizing: 'border-box',
          border: '1px solid #EAEFF4',
          borderRadius: '12px',
        }}>
          <Container
            sx={{
              maxWidth: "1400px !important",
              position: "relative",
            }}
        >
            <Typography variant="h6" gutterBottom>¿En que tipo de residencia quiere hacer la instalación?
            </Typography>
           
          
        </Container>
        
      </Box>
      <Box bgcolor="#ffffff" width={"100%"} mt={1} 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{
            width: "50%",
            padding: "10px",
          }}
          disabled={!typeOf?.typeOfCharger || !typeOf?.typeOfResidence}
          onClick={() => handlerNextStep()}
        >
          Siguiente
        </Button>
        
      </Box>
    </>      
  );
};

