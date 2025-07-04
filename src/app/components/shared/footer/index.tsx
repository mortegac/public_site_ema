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
          // {
          //     title: false,
          //     titleText: 'Cotizador',
          //     link: '/cotizador',
          // },
          // {
          //     title: false,
          //     titleText: 'FAQs',
          //     link: '/faqs',
          // },
          // {
          //     title: false,
          //     titleText: 'Contactanos',
          //     link: '/contactanos',
          // }
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
      sx={{
        background: '#f0f4f6'
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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }, gap: 3, mb: 7 }}>
          {footerLinks.map((footerlink, i) => (
            <Box key={i} sx={{ gridColumn: { xs: 'span 1', sm: 'span 1', lg: 'span 1' } }}>
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
          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 2', lg: 'span 1' } }}>
            <Typography fontSize="17px" fontWeight="600" mb="22px" textAlign={"left"}>
              Redes sociales
            </Typography>

            <Stack direction="row" gap="20px">
              {/* <Tooltip title="Facebook">
                <Link href="#">
                  <Image
                    src="/images/icons/icon-linkedin.svg"
                    alt="facebook"
                    width={22}
                    height={22}
                  />
                </Link>
              </Tooltip> */}
               
              <Tooltip title="Instagram">
                <Link href="https://www.instagram.com/energicacity/">
                  <Image
                    src="/images/icons/icon-instagram.svg"
                    alt="instagram"
                    width={22}
                    height={22}
                  />
                </Link>
              </Tooltip>
            </Stack>
          </Box>
        </Box>

        <Divider />

        <Box
          py="40px"
          flexWrap="wrap"
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Image
              src="/images/logos/energica.png"
              width={20}
              height={20}
              alt="logo"
            />
            <Typography variant="body1" fontSize="15px">
            {" "} Copyright © 2024
            </Typography>
          </Stack>
          <Typography variant="body1" fontSize="15px">
          
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
