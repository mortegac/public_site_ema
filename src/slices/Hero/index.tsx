"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Box bgcolor="#ffffff" pt={7} pb={7}
      // data-slice-type={slice.slice_type}
      //   data-slice-variation={slice.variation}
    >
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h1"
              fontWeight={700}
              lineHeight="1.2"
              sx={{
                fontSize: {
                  xs: "40px",
                  sm: "56px",
                },
              }}
            >
             {/* Instalación de {" "} */}
             {"titleOne"} {" "} <br/>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "40px",
                    sm: "56px",
                  },
                }}
                align="left"
                fontWeight={700}
                component="span"
                color="primary.main"
              >
                  {"titleTwo"} {" "} <br/>
              </Typography>{" "}
            </Typography>
            <Typography
            align="left"
                        sx={{
                          display: "block",
                          padding: "30px 0",
                          fontSize: "18px",
                          color: "text.primary"
                        }}
                        component="span"
            >
              {"description"}
            </Typography>
            <Stack
              my={3}
              direction={{ xs: "column", sm: "row" }}
              spacing="20px"
              alignItems="center"
              justifyContent="left"
            >
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="left"
              spacing={3}
              mb={4}
              justifyContent="left"
            >
              
             {/* { buttonText && <Button
                color="primary"
                size="large"
                variant="contained"
                href={buttonURI}
              >
                {buttonText}
              </Button>}
              
              {buttonTextTwo && <Button
                color="primary"
                size="large"
                variant="outlined"
                href={buttonURITwo}
              >
                 {buttonTextTwo}
              </Button>} */}
            
            </Stack>
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              spacing={3}
              mb={8}
              justifyContent="center"
            >
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                position: 'relative',
                '& img': {
                  width: '100%',
                  height: 'auto',
                }
              }}
            >
              <Image
                src={"/images/headers/contacto-energica.png"}
                alt="Cargador eléctrico"
                width={500}
                height={300}
                priority
                unoptimized
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
  // <section
  //     data-slice-type={slice.slice_type}
  //     data-slice-variation={slice.variation}
  //   >
  //     Placeholder component for hero (variation: {slice.variation}) slices.
  //     <br />
  //     <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use Prismic MCP with your code editor
       *
       * Get AI-powered help to build your slice components — based on your actual model.
       *
       * ▶️ Setup:
       * 1. Add a new MCP Server in your code editor:
       *
       * {
       *   "mcpServers": {
       *     "Prismic MCP": {
       *       "command": "npx",
       *       "args": ["-y", "@prismicio/mcp-server@latest"]
       *     }
       *   }
       * }
       *
       * 2. Select a model optimized for coding (e.g. Claude 3.7 Sonnet or similar)
       *
       * ✅ Then open your slice file and ask your code editor:
       *    "Code this slice"
       *
       * Your code editor reads your slice model and helps you code faster ⚡
       * 🎙️ Give your feedback: https://community.prismic.io/t/help-us-shape-the-future-of-slice-creation/19505
       * 📚 Documentation: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    {/* </section> */}