"use client";
import React from "react";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
// import { Chip } from "@mui/material";
import NextLink from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const NavLinks = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Electrificación de flotas",
    href: "/asesoria_electrificacion_flotas",
  },
  {
    title: "Instalación de cargadores",
    href: "/instalacion_cargadores",
  },
  {
    title: "Electrolineras en edificios",
    href: "/cargadores-en-edificios",
  },
  {
    title: "Sobre Energica",
    href: "/que-es-energica-city",
  },
  // {
  //   title: "¿Dudas?",
  //   href: "https://energica.city/faq-y-tc",
  // },
  // {
  //   title: "Agenda",
  //   href: "/agenda",
  // },
  // {
  //   title: "Cotizador",
  //   // new: true,
  //   href: "/cotizador",
  // },
  // {
  //   title: "FAQs",
  //   href: "/faqs",
  // },
  // {
  //   title: "Contact",
  //   href: "/frontend-pages/contact",
  // },
];

const NavigationsNew = () => {
  const router = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const StyledButton = styled(Button)(({ theme }) => ({
    a: {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: "14px",
    },

    "&.active": {
      backgroundColor: "rgba(93, 135, 255, 0.15)",
      a: {
        color: theme.palette.primary.main,
      },
    },
  }));

  return (
    <>
      {NavLinks.map((navlink, i) => (
        <StyledButton
          color="inherit"
          
          className={router === navlink.href ? "active" : "not-active"}
          variant="text"
          key={i}
        >
          <NextLink href={navlink.href}>
            {navlink.title}{" "}
            {/* {navlink.new ? (
              <Chip
                label="New"
                size="small"
                sx={{
                  ml: "6px",
                  borderRadius: "8px",
                  color: "primary.main",
                  backgroundColor: "rgba(93, 135, 255, 0.15)",
                }}
              />
            ) : null} */}
          </NextLink>
        </StyledButton>
      ))}
    </>
  );
};

export default NavigationsNew;
