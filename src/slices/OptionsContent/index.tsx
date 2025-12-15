// "use client";
import { FC } from "react";

import { OptionsContentProps } from "./types"
import { Default } from "./variants/Default"
import { TwoColumns } from "./variants/TwoColumns"

const OptionsContent: FC<OptionsContentProps> = ({ slice, index, slices, context }) => {
  const { variation } = slice;
  
  const typeOfComponents = {
    ["default"]: Default,
    ["twoColumns"]: TwoColumns,
  };

  const TypeOfVariants = typeOfComponents[variation] || Default;
  
  return <TypeOfVariants slice={slice} index={index} slices={slices} context={context} />

}

export default OptionsContent;