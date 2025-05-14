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
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";


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
  const { titleOne, titleTwo, buttonText, buttonURI, buttonTextTwo, buttonURITwo, description, imageSrc} = props;
  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const [step, setStep] = React.useState(0);

  const FormStep = typeOfForm[String(step)] || typeOfForm[0];


  return (
    <Box bgcolor="#ffffff" pt={7} pb={7}>
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
        }}
      >
        
        <Typography
            align="left"
                        sx={{
                          display: "block",
                          padding: "30px 0",
                          fontSize: "18px",
                          lineHeight: '2',
                          color: (theme) => theme.palette.text.primary
                        }}
                        component="span"
            >
              Complete el siguiente formulario para obtener un precio aproximado para la instalación eléctrica de su cargador de vehículo eléctrico. Con solo unos pocos datos, podremos ofrecerle una estimación personalizada que se ajuste a sus necesidades específicas. Todos los campos marcados con * son obligatorios para poder realizar el cálculo correctamente.
            </Typography>
        <Button
          color="primary"
          size="large"
          variant="contained"
          href={buttonURI}
          sx={{ marginRight: '16px' }}
          onClick={()=>setStep(Number(step)-1)}
        >{"<"}</Button>
        <Button
          color="primary"
          size="large"
          variant="contained"
          href={buttonURI}
          onClick={()=>setStep(Number(step)+1)}
          className="ml-4"
        >{">"}</Button>
            {step}
            
            <FormStep />
            
      </Container>
    </Box>
  );
};

export default QuoterSteps;
