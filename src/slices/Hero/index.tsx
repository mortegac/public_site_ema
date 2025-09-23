// "use client";
import { FC } from "react";

import { HeroProps } from "./types"
import { Default } from "./variants/Default"
import { BlogHero } from "./variants/BlogHero"
import { BgPrimary } from "./variants/BgPrimary"

const Hero: FC<HeroProps> = ({ slice, index, slices, context }) => {
  const { variation } = slice;
  
  const typeOfComponents = {
    ["default"]: Default,
    ["bgPrimary"]: BgPrimary,
    ["blogHero"]: BlogHero, // o el componente que corresponda
  };

  const TypeOfVariants = typeOfComponents[variation] || Default;
  
  return <TypeOfVariants slice={slice} index={index} slices={slices} context={context} />

}

export default Hero;