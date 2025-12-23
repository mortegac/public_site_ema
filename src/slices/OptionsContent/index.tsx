// "use client";
import { FC } from "react";

import { OptionsContentProps } from "./types"
import { Default } from "./variants/Default"
import { TwoColumns } from "./variants/TwoColumns"
import {FoundingTeam } from "./variants/FoundingTeam"
import {TwoColumnsText } from "./variants/TwoColumnsText"
import {Team } from "./variants/Team"

const OptionsContent: FC<OptionsContentProps> = ({ slice, index, slices, context }) => {
  const { variation } = slice;
  
  const typeOfComponents: Record<string, FC<OptionsContentProps>> = {
    ["default"]: Default,
    ["twoColumns"]: TwoColumns,
    ["foundingTeam"]: FoundingTeam,
    ["twoColumnsText"]: TwoColumnsText,
    ["team"]: Team,
  };

  const TypeOfVariants = typeOfComponents[variation] || Default;
  
  return <TypeOfVariants slice={slice} index={index} slices={slices} context={context} />

}

export default OptionsContent;