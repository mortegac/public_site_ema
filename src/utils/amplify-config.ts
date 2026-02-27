import { Amplify } from "aws-amplify";

// Función para obtener la configuración de Amplify según el entorno
// Si NEXT_PUBLIC_ENVIRONMENT no está definido o está vacío, usa DEV
export const getAmplifyConfig = () => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT?.trim();
  const useProd = env === 'PROD';

  console.log("USANDO AMBIENTE ", env )
  try {
    let outputs;
    if (useProd) {
      outputs = require('../../amplify_outputs.json');
    } else {
      outputs = require('../../amplify_outputs_dev.json');
    }
    return outputs;
  } catch (error) {
    console.error('Error loading Amplify configuration:', error);
    // Fallback: intentar el otro archivo (dev por defecto si el principal falló)
    return useProd
      ? require('../../amplify_outputs_dev.json')
      : require('../../amplify_outputs.json');
  }
};

// Configurar Amplify con la configuración correspondiente
export const configureAmplify = () => {
  const config = getAmplifyConfig();
  Amplify.configure(config);
  return config;
};

// Función para verificar si estamos en producción
export const isProduction = () => {
  return process.env.NEXT_PUBLIC_ENVIRONMENT?.trim() === 'PROD';
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = () => {
  return !isProduction();
};

// Exportar la configuración para uso en otros archivos
export const amplifyConfig = configureAmplify(); 