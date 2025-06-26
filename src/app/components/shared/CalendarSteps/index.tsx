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

  

import Calendar from "@/app/components/calendar";

import {FormStep01} from "./FormStep01";
import FormStep02 from "./FormStep02";
import { selectCustomer } from "@/store/Customer/slice";
// import {PersonalInfo} from "./PersonalInfo";
// import {FormStep03} from "./FormStep03";
// import {FormStep04} from "./FormStep04";
// import { Button } from '@mui/material';



const typeOfForm: any = {
  ["0"]: Calendar,
  ["1"]: FormStep01,
  ["2"]: FormStep02,
  // ["3"]: FormStep04,
};



const QuoterSteps = (props:any) => {
  const { 
    currentStep,
    calendarVisits,
  } = useAppSelector(selectCalendarVisits);
  const { 
    customer
  } = useAppSelector(selectCustomer);
  const dispatch = useAppDispatch();
  

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
      bgcolor="#ffffff" 
      pt={7} 
      pb={{ xs: 12, md: 7 }}
      sx={{
        minHeight: { xs: '100vh', md: 'auto' },
        height: { xs: '100%', md: 'auto' },
        position: 'relative',
        zIndex: 1,
        marginBottom: { xs: '96px', md: '0px' },
      }}
    >
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
          height: { xs: '100%', md: 'auto' },
          minHeight: { xs: 'calc(100vh - 140px)', md: 'auto' }, // 140px para padding top/bottom
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

export default QuoterSteps;
