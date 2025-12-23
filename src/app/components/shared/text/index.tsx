// import { Card } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { AppState } from '@/store/store';

import { PrismicRichText } from "@/app/components/PrismicRichText";
import type * as prismic from "@prismicio/client";

import {
  Typography,
} from "@mui/material";


type Props = {
  textObject?: prismic.RichTextField | null | undefined;
  color?: string;
  fontSize?: string;
  children?: React.ReactNode | React.ReactNode[];
  text?: string | null | undefined;
};

export const Text = ({ textObject, color, fontSize }: Props) => 
  <PrismicRichText
    field={textObject} 
    color={color}
    fontSize={fontSize}
    />           


export const H1 = ({ children, color }: Props) => 
  <Typography
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
      color: color || 'inherit',
    }}
  >
    {children}
  </Typography>

export const H2 = ({ children, color }: Props) => 
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
      color: color || 'inherit',
    }}
  >
    {children}
  </Typography>

export const H3 = ({ children, color }: Props) => 
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
      color: color || 'inherit',
    }}
  >
    {children}
  </Typography>

export const H4 = ({ children, color }: Props) => 
  <Typography
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
      color: color || 'inherit',
    }}
  >
    {children}
  </Typography>

export const H5 = ({ children, color }: Props) => 
  <Typography
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
      color: color || 'inherit',
    }}
  >
    {children}
  </Typography>

export const H6 = ({ children, color }: Props) => 
  <Typography
    variant="h6"
    fontWeight={400}
    lineHeight="1.2"
    sx={{
      fontSize: {
        xs: "16px",
        sm: "16px",
        md: "18px",
        lg: "20px",
      },
      color: color || 'inherit',
    }}
  >
    {children}
  </Typography>

export const Paragraph = ({ children, color }: Props) => 
  <Typography
    component="p"
    sx={{
      fontSize: {
        xs: "16px",
        sm: "17px",
        md: "18px",
        lg: "18px",
      },
      lineHeight: 1.6,
      color: color || 'inherit',
      fontStyle: "normal",
      fontWeight: 400,
      textDecoration: "none",
      padding: "12px 0",
    }}
  >
    {children}
  </Typography>

// const createComponents = (textColor?: string): JSXMapSerializer => ({
//   heading1: ({ children }) => (
//     <Typography
//       id="title-options"
//       variant="h1"
//       fontWeight={400}
//       lineHeight="1.2"
//       sx={{
//         fontSize: {
//           xs: "26px",
//           sm: "30px",
//           md: "34px",
//           lg: "38px",
//         },
//         color: textColor || 'inherit',
//       }}
//     >
//   {children}
//   </Typography>
//   ),
//   heading2: ({ children }) => (
//     <Typography
//     id="title-options"
//     variant="h2"
//     fontWeight={400}
//     lineHeight="1.2"
//     sx={{
//       fontSize: {
//         xs: "22px",
//         sm: "26px",
//         md: "30px",
//         lg: "34px",
//       },
//       color: textColor || 'inherit',
//     }}
//   >
// {children}
// </Typography>
//   ),
//   heading3: ({ children }) => (
//     <Typography
//     id="title-options"
//     variant="h3"
//     fontWeight={400}
//     lineHeight="1.2"
//     sx={{
//       fontSize: {
//         xs: "20px",
//         sm: "22px",
//         md: "26px",
//         lg: "30px",
//       },
//       color: textColor || 'inherit',
//     }}
//   >
// {children}
// </Typography>
//   ),
//   heading4: ({ children }) => (
//     <Typography
//     id="title-options"
//     variant="h4"
//     fontWeight={400}
//     lineHeight="1.2"
//     sx={{
//       fontSize: {
//         xs: "18px",
//         sm: "20px",
//         md: "22px",
//         lg: "26px",
//       },
//       color: textColor || 'inherit',
//     }}
//   >
// {children}
// </Typography>
//   ),
//   heading5: ({ children }) => (
//     <Typography
//     id="title-options"
//     variant="h5"
//     fontWeight={400}
//     lineHeight="1.2"
//     sx={{
//       fontSize: {
//         xs: "16px",
//         sm: "18px",
//         md: "20px",
//         lg: "22px",
//       },
//       color: textColor || 'inherit',
//     }}
//   >
// {children}
// </Typography>
//   ),
//   paragraph: ({ children }) => (
//     <Typography
//       component="p"
//       sx={{
//         fontSize: {
//           xs: "16px",
//           sm: "17px",
//           md: "18px",
//           lg: "18px",
//         },
//         lineHeight: 1.6,
//         color: textColor || 'inherit',
//         fontStyle: "normal",
//         fontWeight: 400,
//         textDecoration: "none",
//       }}
//     >
//       {children}
//     </Typography>
//   ),
//   em: ({ children }) => (
//     <em style={{ 
//       color: '#E81A68',
//       fontStyle:'normal',
//     }}>{children}</em>
//   ),
//   oList: ({ children }) => (
//     <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
//   ),
//   oListItem: ({ children }) => (
//     <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
//   ),
//   list: ({ children }) => (
//     <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
//   ),
//   listItem: ({ children }) => (
//     <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
//   ),
//   preformatted: ({ children }) => (
//     <pre className="mb-7 rounded-sm bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
//       <code>{children}</code>
//     </pre>
//   ),
//   strong: ({ children }) => (
//     <strong className="font-semibold">{children}</strong>
//   ),
//   hyperlink: ({ children, node }) => (
//     <PrismicNextLink
//       field={node.data}
//       className="underline decoration-1 underline-offset-2"
//     >
//       {children}
//     </PrismicNextLink>
//   ),
// });



// export default Text;
