'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';

interface FloatingVisitWidgetProps {
  onClose?: () => void;
}

const FloatingVisitWidget: React.FC<FloatingVisitWidgetProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleAgendarClick = () => {
    // URL del tracking de HubSpot
    const trackingUrl = "/agenda";
    
    window.open(trackingUrl, '_parent');
  };

  const handleImageClick = () => {
    const imageTrackingUrl = "/agenda";
    
    window.open(imageTrackingUrl, '_parent');
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        left: { xs: 16, sm: 'auto' },
        width: { xs: 'calc(100% - 32px)', sm: '608px' },
        maxWidth: { xs: '100%', sm: '608px' },
        height: { xs: 'auto', sm: '295px' },
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
    >
      <Card
        sx={{
          position: 'relative',
          borderRadius: 2,
          boxShadow: 6,
          overflow: 'hidden',
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Botón de cerrar */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            padding: 0.5,
            minWidth: 'auto',
            width: 24,
            height: 24,
            color: 'black',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          }}
          aria-label="Cerrar"
        >
          <IconX size={16} />
        </IconButton>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: 'stretch',
            height: '100%',
          }}
        >
          {/* Imagen */}
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              height: { xs: '200px', sm: '100%' },
              flexShrink: 0,
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            <Box
              component="a"
              href="/agenda"
              target="_parent"
              onClick={handleImageClick}
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src="https://43818972.hs-sites.com/hs-fs/hubfs/T%C3%A9cnico-instalador-1.png?width=600&height=600&name=T%C3%A9cnico-instalador-1.png"
                alt="Técnico instalador"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
          {/* Contenido */}
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  mb: 1.5,
                  color: 'text.primary',
                  fontSize: '1.25rem',
                  fontFamily: 'sans-serif',
                }}
              >
                Agenda tu visita
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 2.5,
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  fontFamily: 'sans-serif',
                  lineHeight: 1.5,
                }}
              >
                Un técnico te visitará para cotizar la instalación de tu cargador EV.
              </Typography>
            </Box>

            <Button
              onClick={handleAgendarClick}
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#E81A68',
                color: 'white',
                fontWeight: 500,
                py: 1.5,
                px: 3,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1rem',
                fontFamily: 'sans-serif',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#000000',
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: '#505050',
                },
              }}
            >
              Agendar Visita
            </Button>
          </Box>

          
        </Stack>
      </Card>
    </Box>
  );
};

export default FloatingVisitWidget;
