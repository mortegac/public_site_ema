import React from "react";
import {
    PrismicRichText as BasePrismicRichText,
    type PrismicRichTextProps,
    type JSXMapSerializer,
  } from "@prismicio/react";
  import { PrismicNextLink } from "@prismicio/next";
  
  import {
    Typography,
  } from "@mui/material";
//   import { Heading } from "./Heading";
  


const createComponents = (textColor?: string, fontSize?: string): JSXMapSerializer => ({
    heading1: ({ children }) => (
      <Typography
        id="title-options"
        variant="h1"
        fontWeight={400}
        lineHeight="1.2"
        sx={{
          fontSize: {
            xs: "26px",
            sm: "30px",
            md: "34px",
            lg: "38px",
          },
          color: textColor || 'inherit',
          padding: "0 0 8px 0",
        }}
      >
    {children}
    </Typography>
    ),
    heading2: ({ children }) => (
      <Typography
      id="title-options"
      variant="h2"
      fontWeight={400}
      lineHeight="1.2"
      sx={{
        fontSize: {
          xs: "22px",
          sm: "26px",
          md: "30px",
          lg: "34px",
        },
        padding: "0 0 6px 0",
        color: textColor || 'inherit',
      }}
    >
  {children}
  </Typography>
    ),
    heading3: ({ children }) => (
      <Typography
      id="title-options"
      variant="h3"
      fontWeight={400}
      lineHeight="1.2"
      sx={{
        fontSize: {
          xs: "20px",
          sm: "22px",
          md: "26px",
          lg: "30px",
        },
        padding: "0 0 4px 0",
        color: textColor || 'inherit',
      }}
    >
  {children}
  </Typography>
    ),
    heading4: ({ children }) => (
      <Typography
      id="title-options"
      variant="h4"
      fontWeight={400}
      lineHeight="1.2"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          md: "22px",
          lg: "26px",
        },
        padding: "0 0 4px 0",
        color: textColor || 'inherit',
      }}
    >
  {children}
  </Typography>
    ),
    heading5: ({ children }) => (
      <Typography
      id="title-options"
      variant="h5"
      fontWeight={400}
      lineHeight="1.2"
      sx={{
        fontSize: {
          xs: "16px",
          sm: "18px",
          md: "20px",
          lg: "22px",
        },
        padding: "0 0 4px 0",
        color: textColor || 'inherit',
      }}
    >
  {children}
  </Typography>
    ),
    heading6: ({ children }) => (
      <Typography
      id="title-options"
      variant="h6"
      fontWeight={300}
      lineHeight="1.2"
      sx={{
        fontSize: {
          xs: "16px",
          sm: "16px",
          md: "18px",
          lg: "18px",
        },
        padding: "0 0 4px 0",
        color: textColor || 'inherit',
      }}
    >
  {children}
  </Typography>
    ),
    paragraph: ({ children }) => (
      // fontSize: {
      //   xs: "16px",
      //   sm: "17px",
      //   md: "18px",
      //   lg: "18px",
      // },
      <Typography
        component="p"
        sx={{
          fontSize: fontSize || "18px",
          lineHeight: 1.6,
          padding: "0 0 4px 0",
          color: textColor || 'inherit',
          fontStyle: "normal",
          fontWeight: 400,
          textDecoration: "none",
        }}
      >
        {children}
      </Typography>
    ),
    em: ({ children }) => (
      <em style={{ 
        color: '#E81A68',
        fontStyle:'normal',
      }}>{children}</em>
    ),
    oList: ({ children }) => (
      <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
    ),
    oListItem: ({ children }) => (
      <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
    ),
    list: ({ children }) => (
      <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
    ),
    listItem: ({ children }) => (
      <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
    ),
    preformatted: ({ children }) => (
      <pre className="mb-7 rounded-sm bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
        <code>{children}</code>
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    hyperlink: ({ children, node }) => (
      <PrismicNextLink
        field={node.data}
        className="underline decoration-1 underline-offset-2"
      >
        {children}
      </PrismicNextLink>
    ),
});

export const defaultComponents = createComponents();

export interface PrismicRichTextCustomProps extends PrismicRichTextProps {
  color?: string;
  fontSize?: string;
}

export function PrismicRichText({
  components,
  color,
  fontSize,
  ...props
}: PrismicRichTextCustomProps) {
  const customComponents = (color || fontSize) ? createComponents(color, fontSize) : defaultComponents;
  
  return (
    <BasePrismicRichText
      components={{ ...customComponents, ...components }}
      {...props}
    />
  );
}
  