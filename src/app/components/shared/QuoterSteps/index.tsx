"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";



import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, setStep, decrement, selectClientForms, setDataForm } from "@/store/ClientForms/slice";

  


import {FormStep01} from "./FormStep01";
import {FormStep02} from "./FormStep02";
import {FormStep03} from "./FormStep03";
import {FormStep04} from "./FormStep04";



const typeOfForm: any = {
  ["0"]: FormStep01,
  ["1"]: FormStep02,
  ["2"]: FormStep03,
  ["3"]: FormStep04,
};



const QuoterSteps = (props:any) => {
  const { 
    currentStep,
    currentForm,
  } = useAppSelector(selectClientForms);
  const dispatch = useAppDispatch();
  
  
  // const { titleOne, titleTwo, buttonText, buttonURI, buttonTextTwo, buttonURITwo, description, imageSrc} = props;
  //   sidebar
  // const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  // const [step, setStep] = React.useState(0);

  const FormStep = typeOfForm[String(currentStep)] || typeOfForm[0];

  
  const onChangeSetStore = async (e: any) => {
    let valueForm: any;
    if (e.target.type === "checkbox") {
      valueForm = Boolean(e.target.checked);
    } else if (e.target.type === "number") {
      valueForm = Number(e.target.value);
    } else {
      valueForm = String(e.target.value);
    }
    e.preventDefault();

    dispatch(
      setDataForm({
        key: e.target.name,
        value: valueForm,
      })
    );
  };

  return (
    <Box 
      bgcolor={`${currentStep === 3 && "#f8fafc"}  `}
      pt={3} 
      pb={{ xs: 4, md: 7 }}
      sx={{
        height: { xs: '100%', md: 'auto' },
        position: 'relative',
        zIndex: 1,
        marginBottom: { xs: '0px', md: '0px' },
      }}
    >
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
          height: { xs: '100%', md: 'auto' },
        }}
      >
        
        {/* <Typography
            align="left"
                        sx={{
                          display: "block",
                          paddingBottom: "30px",
                          fontSize: "18px",
                          lineHeight: "2",
                          marginTop: "0",
                          color: (theme) => theme.palette.text.primary
                        }}
                        component="span"
            >
              Complete el siguiente formulario para obtener un precio aproximado para la instalación eléctrica de su cargador de vehículo eléctrico. Con solo unos pocos datos, podremos ofrecerle una estimación personalizada que se ajuste a sus necesidades específicas. Todos los campos marcados con * son obligatorios para poder realizar el cálculo correctamente.
            </Typography> */}
      
            <FormStep 
              onChangeSetStore={onChangeSetStore}
            />
            <pre>STEP = {JSON.stringify(currentStep, null, 2)}</pre>
            <pre>{JSON.stringify(currentForm, null, 2)}</pre>
      </Container>
    </Box>
  );
};

export default QuoterSteps;
