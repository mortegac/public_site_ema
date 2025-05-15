"use client";
import React, {useState} from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  styled
} from "@mui/material";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, setStep, decrement, selectClientForms, setDataEnroll } from "@/store/ClientForms/slice";


const VerticalForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
}));

const FullWidthButtonWithIcons = styled(Button)(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  marginBottom:"12px",
  background: '#ECF2FF',
  border: '1px solid #E81A68',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
}));

const SmallLeftIcon = styled(Box)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  marginRight: theme.spacing(1),
}));

const BoxLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const LargeRightIcon = styled(Box)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginLeft: theme.spacing(1),
}));

const SmallSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 16.5C13.1935 16.5 14.3381 16.0259 15.182 15.182C16.0259 14.3381 16.5 13.1935 16.5 12C16.5 10.8065 16.0259 9.66193 15.182 8.81802C14.3381 7.97411 13.1935 7.5 12 7.5C10.8065 7.5 9.66193 7.97411 8.81802 8.81802C7.97411 9.66193 7.5 10.8065 7.5 12C7.5 13.1935 7.97411 14.3381 8.81802 15.182C9.66193 16.0259 10.8065 16.5 12 16.5ZM12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3ZM4.5 12C4.5 10.0109 5.29018 8.10322 6.6967 6.6967C8.10322 5.29018 10.0109 4.5 12 4.5C13.9891 4.5 15.8968 5.29018 17.3033 6.6967C18.7098 8.10322 19.5 10.0109 19.5 12C19.5 13.9891 18.7098 15.8968 17.3033 17.3033C15.8968 18.7098 13.9891 19.5 12 19.5C10.0109 19.5 8.10322 18.7098 6.6967 17.3033C5.29018 15.8968 4.5 13.9891 4.5 12Z" fill="#E81A68"/>
</svg>
);

const LargeSVG = () => (
  <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40.0552 9.24594V41.2616C40.0552 45.8448 36.3397 49.5603 31.7565 49.5603H9.24546C4.66228 49.5603 0.946777 45.8448 0.946777 41.2616V9.24594C0.946777 4.66276 4.66228 0.947266 9.24546 0.947266H31.7565C36.3397 0.947266 40.0552 4.66276 40.0552 9.24594Z" fill="#FEFDFE"/>
  <path opacity="0.12" d="M40.054 9.24852V11.1051H19.4055C14.8211 11.1051 11.1081 14.8274 11.1081 19.4118V49.5607H9.24218C4.65779 49.5607 0.944824 45.8477 0.944824 41.2633V9.24852C0.944824 4.66414 4.65779 0.951172 9.24218 0.951172H31.7566C36.3411 0.951172 40.054 4.66414 40.054 9.24852Z" fill="#E81A68"/>
  <path d="M48.9707 26.9013V31.683C48.9707 34.7433 51.4515 37.2241 54.5117 37.2241C57.572 37.2241 60.0527 34.7433 60.0527 31.683V26.9013C60.0527 26.1943 59.4796 25.6211 58.7725 25.6211H50.2509C49.5439 25.6211 48.9707 26.1943 48.9707 26.9013Z" fill="#F2D2DE"/>
  <path d="M50.8584 21.0706V25.6215H58.1656V21.0706C58.1656 20.0705 57.3548 19.2598 56.3548 19.2598H52.6693C51.6692 19.2598 50.8584 20.0705 50.8584 21.0706Z" fill="#FEFDFE"/>
  <path d="M11.6343 10.7268C11.6343 11.9 10.6838 12.8505 9.51052 12.8505C8.32987 12.8505 7.37939 11.9 7.37939 10.7268C7.37939 9.55355 8.32987 8.5957 9.51052 8.5957C10.6838 8.5957 11.6343 9.55367 11.6343 10.7268Z" fill="#F2D2DE"/>
  <path d="M19.894 10.7268C19.894 11.9 18.9436 12.8505 17.7703 12.8505C16.5896 12.8505 15.6392 11.9 15.6392 10.7268C15.6392 9.55355 16.5896 8.5957 17.7703 8.5957C18.9436 8.5957 19.894 9.55367 19.894 10.7268Z" fill="#F2D2DE"/>
  <path d="M20.0888 20.0311L13.8496 30.4707C13.0154 31.8664 14.0209 33.6388 15.647 33.6388H19.3494L18.2843 41.243C18.0941 42.601 19.902 43.2442 20.6121 42.0711L27.1461 31.2784C27.991 29.8829 26.9862 28.1 25.3549 28.1H22.0034L22.4304 20.7512C22.5068 19.4343 20.7655 18.8987 20.0888 20.0311Z" fill="#F2D2DE"/>
  <path d="M31.7565 50.5068C36.8551 50.5068 41.0026 46.3592 41.0026 41.2617V9.24614C41.0026 4.14759 36.8551 0 31.7565 0H9.24517C4.14759 0 0 4.14759 0 9.24614V41.2617C0 46.3592 4.14759 50.5068 9.24517 50.5068H31.7565ZM1.89432 41.2617V9.24614C1.89432 5.19197 5.19185 1.89432 9.24517 1.89432H31.7565C35.8107 1.89432 39.1083 5.19185 39.1083 9.24614V41.2617C39.1083 45.315 35.8108 48.6125 31.7565 48.6125H9.24517C5.19197 48.6124 1.89432 45.3149 1.89432 41.2617Z" fill="#E81A68"/>
  <path d="M59.1128 24.7089V21.0708C59.1128 19.5501 57.8752 18.3125 56.3546 18.3125H52.6695C51.1488 18.3125 49.9112 19.5501 49.9112 21.0708V24.7089C48.8446 24.8739 48.0233 25.7898 48.0233 26.9019V31.6832C48.0233 34.9371 50.4337 37.6317 53.5612 38.0942V49.5603C53.5612 54.6152 49.4525 58.7287 44.4019 58.7287H41.9202C38.15 58.7287 34.8107 56.4681 33.4131 52.9688C33.2189 52.4813 32.6666 52.2473 32.182 52.4407C31.6964 52.6349 31.4596 53.1862 31.6538 53.6718C33.341 57.8943 37.3702 60.623 41.9202 60.623H44.4019C50.4966 60.623 55.4555 55.6605 55.4555 49.5602V38.0951C58.5865 37.6358 60.9999 34.9396 60.9999 31.6829V26.9017C60.9998 25.7901 60.1789 24.8741 59.1128 24.7089ZM51.8054 21.0708C51.8054 20.5944 52.193 20.2068 52.6694 20.2068H53.5648V21.0329C53.5648 21.5564 53.9884 21.9801 54.512 21.9801C55.0356 21.9801 55.4592 21.5564 55.4592 21.0329V20.2068H56.3547C56.8311 20.2068 57.2186 20.5944 57.2186 21.0708V24.6745H51.8057V21.0708H51.8054ZM59.1053 31.6831C59.1053 34.2166 57.0445 36.2775 54.5119 36.2775C51.9784 36.2775 49.9175 34.2166 49.9175 31.6831V26.9018C49.9175 26.7178 50.0664 26.5688 50.2505 26.5688H58.7723C58.9564 26.5688 59.1053 26.7178 59.1053 26.9018V31.6831Z" fill="#E81A68"/>
  <path d="M12.5815 10.7268C12.5815 9.02944 11.2042 7.64844 9.51047 7.64844C7.81313 7.64844 6.43213 9.02944 6.43213 10.7268C6.43213 12.4204 7.81313 13.7978 9.51047 13.7978C11.2041 13.7976 12.5815 12.4204 12.5815 10.7268ZM8.32645 10.7268C8.32645 10.0737 8.85739 9.54276 9.51047 9.54276C10.1589 9.54276 10.687 10.0737 10.687 10.7268C10.687 11.3752 10.1589 11.9033 9.51047 11.9033C8.85739 11.9033 8.32645 11.3752 8.32645 10.7268Z" fill="#E81A68"/>
  <path d="M17.7698 13.7978C19.4634 13.7978 20.8407 12.4205 20.8407 10.7268C20.8407 9.02944 19.4635 7.64844 17.7698 7.64844C16.0724 7.64844 14.6914 9.02944 14.6914 10.7268C14.6914 12.4205 16.0724 13.7978 17.7698 13.7978ZM17.7698 9.54288C18.4181 9.54288 18.9463 10.0738 18.9463 10.7269C18.9463 11.3753 18.4181 11.9034 17.7698 11.9034C17.1167 11.9034 16.5857 11.3753 16.5857 10.7269C16.5857 10.0738 17.1167 9.54288 17.7698 9.54288Z" fill="#E81A68"/>
  <path d="M15.6471 34.5868H18.2611L17.3464 41.1126C17.0154 43.4823 20.1737 44.6226 21.4227 42.562L27.9569 31.7693C29.1819 29.7458 27.7296 27.1536 25.3549 27.1536H23.0072L23.3763 20.8063C23.5107 18.4934 20.4562 17.5704 19.2759 19.5465L13.0369 29.9859C11.8251 32.0132 13.2833 34.5868 15.6471 34.5868ZM14.6629 30.9571L20.9019 20.5178C21.0745 20.23 21.5039 20.3635 21.4856 20.6972L21.0582 28.0463C21.0254 28.5883 21.4584 29.048 22.0035 29.048H25.3548C26.2497 29.048 26.7979 30.0238 26.3362 30.7888L19.802 41.5816C19.6264 41.8781 19.1747 41.7206 19.2221 41.3753L20.2877 33.771C20.3256 33.5 20.2443 33.2252 20.0648 33.0181C19.8845 32.8109 19.6235 32.6925 19.3498 32.6925H15.6471C14.7537 32.6925 14.2076 31.7206 14.6629 30.9571Z" fill="#E81A68"/>
  </svg>  
);

export const FormStep03 = (props:any) => {
  const { 
    currentStep,
    // currentForm,
  } = useAppSelector(selectClientForms);
  const dispatch = useAppDispatch();
  
  const [distance, setDistance] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!termsAccepted) {
    //   alert('Por favor acepte los términos y condiciones');
    //   return;
    // }
    // const distanceNumber = parseFloat(distance);
    // if (!isNaN(distanceNumber)) {
    //   try {
    //     await dispatch(updateDistance(distanceNumber)).unwrap();
    //     setDistance(''); // Limpiar el campo después de enviar
    //     // Aquí puedes agregar la lógica para avanzar al siguiente paso
    //   } catch (error) {
    //     alert('Error al guardar la distancia');
    //   }
    // } else {
    //   alert('Por favor ingrese una distancia válida');
    // }
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDistance(value);
    }
  };

  return (
    <>
      <Box bgcolor="#ffffff" pt={4} pb={4} width={"90%"} mt={4}
      sx={{
        boxSizing: 'border-box',
        border: '1px solid #EAEFF4',
        borderRadius: '12px',
      }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Indique la distancia existente entre su tablero eléctrico y donde quiere instalar el cargador
            </Typography>
            
            <VerticalForm>
              <Typography variant="caption" gutterBottom 
                sx={{
                  width: "150px",
                  fontSize: "16px"
                }}>
                Distancia en metros
              </Typography>
              <TextField
                required
                id="distance"
                type="text"
                label=""
                value={distance}
                onChange={handleDistanceChange}
                inputProps={{ min: 0 }}
              />
              <Typography variant="caption" gutterBottom>
                mts
              </Typography>
            </VerticalForm>

            <Box bgcolor="#ffffff" pt={4} pb={4} width={"90%"} mt={4}
            sx={{
              boxSizing: 'border-box',
              border: '1px solid #EAEFF4',
              borderRadius: '12px',
            }}>
              <Container
                sx={{
                  maxWidth: "1400px !important",
                  position: "relative",
                }}
              >
                <FullWidthButtonWithIcons 
                  variant="contained" 
                  color="primary"
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  sx={{
                    backgroundColor: termsAccepted ? '#E81A68' : '#ECF2FF',
                    color: termsAccepted ? '#FFFFFF' : '#2A3547',
                  }}
                >
                  <BoxLeft>
                    <SmallLeftIcon>
                      <SmallSVG />
                    </SmallLeftIcon>  
                    <Typography variant="caption"
                      sx={{
                        fontSize:"18px",
                      }}
                    >
                      Acepto términos y condiciones
                    </Typography>
                  </BoxLeft>
                </FullWidthButtonWithIcons>
              </Container>
            </Box>

            <Box bgcolor="#ffffff" width={"100%"} mt={1} 
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{
                  width: "50%",
                  padding: "10px",
                }}
                onClick={ () => dispatch(setStep(3)) }
              >
                Generar Presupuesto
              </Button>
            </Box>
          </form>
        </Container>      
      </Box>
    </>  
  );
};

