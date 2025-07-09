import { generateClient } from "aws-amplify/data";
import { MainTypes } from "@types";
import { configureAmplify } from "@/utils/amplify-config";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

export const client = generateClient<MainTypes>();