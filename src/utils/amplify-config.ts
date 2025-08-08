import { Amplify } from "aws-amplify";

// Función para obtener la configuración de Amplify según el entorno
export const getAmplifyConfig = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'DEV';
  
  try {
    let outputs;
    
    
    if (environment === 'PROD') {
      outputs = require('../../amplify_outputs.json');
    } else {
      outputs = require('../../amplify_outputs_dev.json');
    }
    
    return outputs;
  } catch (error) {
    console.error('Error loading Amplify configuration:', error);
    // Fallback a la configuración por defecto
    return require('../../amplify_outputs.json');
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
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = () => {
  return !isProduction();
};

// Exportar la configuración para uso en otros archivos
export const amplifyConfig = configureAmplify(); 