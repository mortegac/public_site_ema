"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";

const TEAL = "#0898b9";
const PINK = "#e81a68";
const PINK_DARK = "#c01556";

export default function CotizadorBanner() {
  return (
    <Box
      sx={{
        background: `linear-gradient(358deg, ${TEAL} 0%, #4dbfd9 100%)`,
        py: { xs: 4, md: 3.5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 3, sm: 4 },
          }}
        >
          {/* Icon + Text */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flexGrow: 1 }}>
            <Typography
              component="span"
              sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1, flexShrink: 0 }}
              aria-hidden="true"
            >
              ⚡
            </Typography>
            <Box>
              <Typography
                variant="h2"
                component="p"
                sx={{
                  fontSize: { xs: "1.15rem", md: "1.3rem" },
                  fontWeight: 800,
                  color: "#000000",
                  lineHeight: 1.25,
                  mb: 0.5,
                }}
              >
                ¿Tienes un auto eléctrico?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  fontSize: { xs: "0.875rem", md: "0.95rem" },
                  lineHeight: 1.5,
                  maxWidth: 600,
                }}
              >
                Cotiza tu cargador en minutos — casa o edificio, con precio exacto incluido instalación y certificado SEC.
              </Typography>
            </Box>
          </Box>

          {/* CTA Button */}
          <Box sx={{ flexShrink: 0, alignSelf: { xs: "stretch", sm: "center" } }}>
            <Box
              component={Link}
              href="/cotizador"
              sx={{
                display: "inline-block",
                bgcolor: PINK,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1rem",
                px: 4,
                py: 1.75,
                borderRadius: 2,
                textDecoration: "none",
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: PINK_DARK,
                },
                textAlign: "center",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Cotizar ahora
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
