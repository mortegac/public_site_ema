"use client";
import { FC } from "react";

import { ContactFormProps } from "./types"
import { Default } from "./variants/Default"
import { GretaContactForm } from "./variants/GretaContactForm"
import { PostulacionElectrolineras } from "./variants/PostulacionElectrolineras"


const ContactFormOptions: FC<ContactFormProps> = ({ slice, index, slices, context }) => {
  const { variation } = slice;
  
  const typeOfComponents: Record<string, FC<ContactFormProps>> = {
    ["default"]: Default,
    ["gretaContactForm"]: GretaContactForm,
    ["postulacionElectrolineras"]: PostulacionElectrolineras,
  };

  const TypeOfVariants = typeOfComponents[variation] || Default;
  
  return <TypeOfVariants slice={slice} index={index} slices={slices} context={context} />

}

export default ContactFormOptions;



//        * 💡 Use Prismic MCP with your code editor
//        *
//        * Get AI-powered help to build your slice components — based on your actual model.
//        *
//        * ▶️ Setup:
//        * 1. Add a new MCP Server in your code editor:
//        *
//        * {
//        *   "mcpServers": {
//        *     "Prismic MCP": {
//        *       "command": "npx",
//        *       "args": ["-y", "@prismicio/mcp-server@latest"]
//        *     }
//        *   }
//        * }
//        *
//        * 2. Select a model optimized for coding (e.g. Claude 3.7 Sonnet or similar)
//        *
//        * ✅ Then open your slice file and ask your code editor:
//        *    "Code this slice"
//        *
//        * Your code editor reads your slice model and helps you code faster ⚡
//        * 🎙️ Give your feedback: https://community.prismic.io/t/help-us-shape-the-future-of-slice-creation/19505
//        * 📚 Documentation: https://prismic.io/docs/ai#code-with-prismics-mcp-server
//        */}

