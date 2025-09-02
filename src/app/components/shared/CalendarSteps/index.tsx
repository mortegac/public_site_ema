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
import { increment, setStep, decrement, selectCalendarVisits, setDataForm } from "@/store/CalendarVisits/slice";
import { useAnalytics } from '@/hooks/useAnalytics';

  

import Calendar from "@/app/components/calendar";

import {FormStep01} from "./FormStep01";
import FormStep02 from "./FormStep02";
import { selectCustomer } from "@/store/Customer/slice";
// import {PersonalInfo} from "./PersonalInfo";
// import {FormStep03} from "./FormStep03";
import FormResumeVirtual from "./FormStep04";
// import { Button } from '@mui/material';



const typeOfForm: any = {
  ["0"]: Calendar,
  ["1"]: FormStep01,
  ["2"]: FormStep02,
  ["3"]: FormResumeVirtual, // Resumen agenda virtual
};



const CalendarSteps = (props:any) => {
  const { 
    currentStep,
    calendarVisits,
  } = useAppSelector(selectCalendarVisits);
  const { 
    customer
  } = useAppSelector(selectCustomer);
  const dispatch = useAppDispatch();
  const { trackEvent } = useAnalytics();
  

  // const FormStep = typeOfForm[3];
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

    // Track form field changes
    trackEvent('formulario_ingreso_dato', 'form_interaction', e.target.name);

    dispatch(
      setDataForm({
        key: e.target.name,
        value: valueForm,
      })
    );
  };

  // Track step changes
  // React.useEffect(() => {
  //   // separar pasos 
  //   trackEvent('step_change', 'navigation', `step_${currentStep}`);
  // }, [currentStep, trackEvent]);

  return (
    <Box 
      bgcolor={`${currentStep === 3 && "#f8fafc"}  `}
      pt={3} 
      pb={{ xs: 4, md: 7 }}
      sx={{
        // minHeight: { xs: '100vh', md: 'auto' },
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
          // minHeight: { xs: 'calc(100vh - 140px)', md: 'auto' }, // 140px para padding top/bottom
        }}
      >
        <FormStep 
              onChangeSetStore={onChangeSetStore}
            />
       

            
            {/* <FormStep01/> */}
      </Container>
    </Box>
  );
};

export default CalendarSteps;
