// "use client";
import { FC } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { StepWizardProps } from "./types"
import { Default } from "./variants/Default"


const StepWizard: FC<StepWizardProps> = ({ slice, index, slices, context }) => {
  const { variation } = slice;
  
  const typeOfComponents: Record<string, FC<StepWizardProps>> = {
    ["default"]: Default,
  };

  const TypeOfVariants = typeOfComponents[variation] || Default;
  
  return <TypeOfVariants slice={slice} index={index} slices={slices} context={context} />

}

export default StepWizard;