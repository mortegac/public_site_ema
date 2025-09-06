"use client";
import { FC } from "react";
import { ContentWithImageProps } from "./types"
import { Default } from "./variants/Default"
import { WithIcons } from "./variants/WithIcons"

const ContentWithImage: FC<ContentWithImageProps> = ({ slice, index, slices, context }) => {
  const { variation } = slice;
  
  const typeOfComponents = {
    ["default"]: Default,
    ["withIcons"]: WithIcons,
  };

  const TypeOfVariants = typeOfComponents[variation] || Default;
  
  return <TypeOfVariants slice={slice} index={index} slices={slices} context={context} />

}

export default ContentWithImage;
