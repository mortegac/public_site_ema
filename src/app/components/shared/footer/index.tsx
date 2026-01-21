"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
      id: 1,
      children: [
          // {
          //     title: true,
          //     titleText: '',
          // },
          {
              title: false,
              titleText: 'Inicio',
              link: '/',
          },
          {
              title: false,
              titleText: 'Agenda',
              link: '/agenda',
          },
          {
              title: false,
              titleText: 'Cotizador',
              link: '/cotizador',
          },
          {
              title: false,
              titleText: 'Electrificación de flotas',
              link: '/asesoria_electrificacion_flotas',
          },
          
          {
              title: false,
              titleText: 'Instalacion de cargadores',
              link: '/instalacion_cargadores',
          },
          {
              title: false,
              titleText: 'Electrolineras en edificios',
              link: '/cargadores-en-edificios',
          },
          {
              title: false,
              titleText: 'Sobre Energica',
              link: '/que-es-energica-city',
          },
          
      ],
  },
  // {
  //     id: 2,
  //     children: [
  //         {
  //             title: true,
  //             titleText: 'Forms',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Form Layout',
  //             link: 'https://modernize-nextjs.adminmart.com/forms/form-layouts',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Form Horizontal',
  //             link: 'https://modernize-nextjs.adminmart.com/forms/form-horizontal',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Form Wizard',
  //             link: 'https://modernize-nextjs.adminmart.com/forms/form-wizard',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Form Validation',
  //             link: 'https://modernize-nextjs.adminmart.com/forms/form-validation',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Quill Editor',
  //             link: 'https://modernize-nextjs.adminmart.com/forms/quill-editor',
  //         },
  //     ],
  // },
  // {
  //     id: 3,
  //     children: [
  //         {
  //             title: true,
  //             titleText: 'Tables',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Basic Table',
  //             link: 'https://modernize-nextjs.adminmart.com/tables/basic',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Fixed Header',
  //             link: 'https://modernize-nextjs.adminmart.com/tables/fixed-header',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Pagination Table',
  //             link: 'https://modernize-nextjs.adminmart.com/tables/pagination',
  //         },
  //         {
  //             title: false,
  //             titleText: 'React Dense Table',
  //             link: 'https://modernize-nextjs.adminmart.com/react-tables/dense',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Row Selection Table',
  //             link: 'https://modernize-nextjs.adminmart.com/react-tables/row-selection',
  //         },
  //         {
  //             title: false,
  //             titleText: 'Drag n Drop Table',
  //             link: 'https://modernize-nextjs.adminmart.com/react-tables/drag-drop',
  //         },
  //     ],
  // },
];

const Footer = () => {
  return (
    <>
    <Box
      // bgcolor="#4BBFD9"
      // background: '#f0f4f6'
      sx={{
        background: '#9e9e9e'
      }}
      borderRadius={0}
      textAlign="center"
      py="14px"
      mt={5}
      position="relative"
    >
      {/* //  */}
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: "30px",
            lg: "60px",
          },
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 7 }}>
          
           {/* Social media */}
           <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 1', lg: 'span 1' }, width: { xs: '100%', sm: 'auto' } }}>
            <Typography fontSize="17px" fontWeight="600" mb="22px" textAlign={"left"}>
              Redes sociales
            </Typography>

            <Stack direction="row" gap="20px">               
              <Tooltip title="Instagram">
                <Link href="https://www.instagram.com/energicacity/">
                  <Image
                    src="/images/icons/icon-instagram.svg"
                    alt="instagram"
                    width={32}
                    height={32}
                  />
                </Link>
              </Tooltip>
              <Tooltip title="Linkedin">
                <Link href="https://www.linkedin.com/company/energicacity">
                  <Image
                    src="/images/icons/icon-linkedin.svg"
                    alt="linkedin"
                    width={32}
                    height={32}
                  />
                </Link>
              </Tooltip>
            </Stack>
            
            <Typography fontSize="17px" fontWeight="600" mb="10px" mt="26px" textAlign={"left"}>
            ¡Hablemos!
            </Typography>
            <Link href="https://api.whatsapp.com/send/?phone=56967666652&text=Quiero+informacion+desde+energica.city&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <Stack sx={{ 
                display:'flex',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'flex-start',
                textAlign: 'left',
                color: '#2A3547',
                }} mt="8px">
                +56 9 6766 6652
              </Stack>
            </Link>
            <Link href="mailto:contacto@energica.city" target="_blank" rel="noopener noreferrer">
            <Stack sx={{ 
                display:'flex',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'flex-start',
                textAlign: 'left',
                color: '#2A3547',
                }} mt="8px">
              contacto@energica.city 
              </Stack>
            </Link>
            
            
            {/* <Link href="https://maps.app.goo.gl/zWASHCe6ZahfxUACA" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'left', display: 'block' }}>
              <Stack sx={{ 
                display:'flex',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'flex-start',
                textAlign: 'left',
                color: '#2A3547',
                }} mt="8px">
              <Typography sx={{ color: '#2A3547', textAlign: 'left' }}>
                Av. Apoquindo 5950, Las Condes, Santiago.
              </Typography>
              </Stack>
            </Link>
            
            <Link href="https://maps.app.goo.gl/iPn73DCJrn2uStpL6" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'left', display: 'block' }}>
              <Stack sx={{ 
                display:'flex',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'flex-start',
                textAlign: 'left',
                color: '#2A3547',
                }} mt="8px">
              <Typography sx={{ color: '#2A3547', textAlign: 'left' }}>
                Viña del Mar, Región de Valparaíso, Chile.
              </Typography>
              </Stack>
            </Link> */}
          </Box>
          
          
          {footerLinks.map((footerlink, i) => (
            <Box key={i} sx={{ gridColumn: { xs: 'span 1', sm: 'span 1', lg: 'span 1' }, width: { xs: '100%', sm: 'auto' }, minWidth: { lg: '200px' } }}>
              {footerlink.children.map((child, i) => (
                <React.Fragment key={i}>
                  {child.title ? (
                    <Typography fontSize="17px" fontWeight="600" mb="22px">
                      {child.titleText}
                    </Typography>
                  ) : (
                    <Link href={`${child.link}`}>
                      <Typography
                        sx={{
                          display: "block",
                          padding: "10px 0",
                          fontSize: "15px",
                          textAlign:"left",
                          color: (theme) => theme.palette.text.primary,
                          whiteSpace: "nowrap",
                          "&:hover": {
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                        component="span"
                      >
                        {child.titleText}
                      </Typography>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </Box>
          ))}
          
         
          
          
        </Box>

        <Divider />

        <Box
          py="40px"
          flexWrap="wrap"
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="column" gap={1} alignItems="start">
          
            <Box sx={{
              padding: '0px',
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'start',
            }}>
                <Image
                  src="https://images.prismic.io/energica-public-site/aVRORnNYClf9otOl_logo-energica-blanco.png?auto=format,compress"
                  width={200}
                  height={32}
                  alt="logo"
                />
                 <Typography variant="body1" fontSize="15px"  sx={{ textAlign:'left', paddingTop:'6px', color:'#ffffff'}}>Te ayudamos a concretar tu proyecto de electromovilidad industrial o inmobiliario de manera rentable.</Typography>
            
            
            
                <Link href="https://maps.app.goo.gl/zWASHCe6ZahfxUACA" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'left', display: 'block' }}>
              <Stack sx={{ 
                display:'flex',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'flex-start',
                textAlign: 'left',
                color: '#2A3547',
                }} mt="22px">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#FFFFFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0901 22.5958C11.2059 22.6753 11.2981 22.7366 11.3626 22.7788L11.4687 22.8472C11.7933 23.0504 12.2061 23.0508 12.5307 22.8476L12.6375 22.7788C12.7019 22.7366 12.7941 22.6753 12.9099 22.5958C13.1415 22.4367 13.4685 22.2041 13.8591 21.9041C14.6386 21.3054 15.6801 20.4322 16.7247 19.3336C18.7857 17.1661 21 13.9725 21 10.1818C21 7.75381 20.0571 5.42084 18.3719 3.69728C16.6859 1.97296 14.3943 1 12 1C9.60571 1 7.31415 1.97296 5.62814 3.69728C3.94288 5.42084 3 7.75381 3 10.1818C3 13.9725 5.21434 17.1661 7.27531 19.3336C8.31993 20.4322 9.36136 21.3054 10.1409 21.9041C10.5315 22.2041 10.8585 22.4367 11.0901 22.5958ZM12 3C10.1508 3 8.37273 3.75107 7.05815 5.09552C5.74283 6.44073 5 8.26992 5 10.1818C5 13.2007 6.78566 15.9162 8.72469 17.9554C9.68007 18.9602 10.6386 19.7646 11.3591 20.3179C11.6046 20.5065 11.8215 20.6651 12 20.7918C12.1785 20.6651 12.3954 20.5065 12.6409 20.3179C13.3614 19.7646 14.3199 18.9602 15.2753 17.9554C17.2143 15.9162 19 13.2007 19 10.1818C19 8.26992 18.2572 6.44073 16.9418 5.09552C15.6273 3.75107 13.8492 3 12 3Z" fill="#FFFFFF"/>
                  </svg>

              <Typography sx={{ color: '#ffffff', textAlign: 'left', marginLeft: '8px' }}>
                Av. Apoquindo 5950, Las Condes, Santiago.
              </Typography>
              </Stack>
            </Link>
            
            <Link href="https://maps.app.goo.gl/iPn73DCJrn2uStpL6" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'left', display: 'block' }}>
              <Stack sx={{ 
                display:'flex',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'flex-start',
                textAlign: 'left',
                color: '#2A3547',
                }} mt="8px">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#FFFFFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0901 22.5958C11.2059 22.6753 11.2981 22.7366 11.3626 22.7788L11.4687 22.8472C11.7933 23.0504 12.2061 23.0508 12.5307 22.8476L12.6375 22.7788C12.7019 22.7366 12.7941 22.6753 12.9099 22.5958C13.1415 22.4367 13.4685 22.2041 13.8591 21.9041C14.6386 21.3054 15.6801 20.4322 16.7247 19.3336C18.7857 17.1661 21 13.9725 21 10.1818C21 7.75381 20.0571 5.42084 18.3719 3.69728C16.6859 1.97296 14.3943 1 12 1C9.60571 1 7.31415 1.97296 5.62814 3.69728C3.94288 5.42084 3 7.75381 3 10.1818C3 13.9725 5.21434 17.1661 7.27531 19.3336C8.31993 20.4322 9.36136 21.3054 10.1409 21.9041C10.5315 22.2041 10.8585 22.4367 11.0901 22.5958ZM12 3C10.1508 3 8.37273 3.75107 7.05815 5.09552C5.74283 6.44073 5 8.26992 5 10.1818C5 13.2007 6.78566 15.9162 8.72469 17.9554C9.68007 18.9602 10.6386 19.7646 11.3591 20.3179C11.6046 20.5065 11.8215 20.6651 12 20.7918C12.1785 20.6651 12.3954 20.5065 12.6409 20.3179C13.3614 19.7646 14.3199 18.9602 15.2753 17.9554C17.2143 15.9162 19 13.2007 19 10.1818C19 8.26992 18.2572 6.44073 16.9418 5.09552C15.6273 3.75107 13.8492 3 12 3Z" fill="#FFFFFF"/>
                  </svg>

              <Typography sx={{ color: '#ffffff', textAlign: 'left', marginLeft: '8px' }}>
                Viña del Mar, Región de Valparaíso, Chile.
              </Typography>
              </Stack>
            </Link>
                <Typography variant="body1" fontSize="15px" sx={{ textAlign:'left', paddingTop:'8px', color:'#ffffff'}}>Copyright © 2024</Typography>
            </Box>
            
           
          </Stack>
          
          
          <Typography variant="body1" fontSize="15px" sx={{ mt: { xs: '22px', sm: '22px', lg: '22px' } }}>
          
            <Typography component={Link} color="primary.main" href="/privacidad">
             Política de privacidad
            </Typography>
            <Typography component={Link} color="primary.main" href="/terminos-condiciones">
            {" "}|{" "}Términos y Condiciones
            </Typography>
            .
          </Typography>
        </Box>
      </Container>
      </Box>
    </>
  );
};

export default Footer;
