"use client";
import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Link,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconX } from "@tabler/icons-react";

const NotificationBg = styled(Box)(() => ({
  position: "absolute",
  right: "20%",
  top: 0,
}));

const NotificationBg2 = styled(Box)(() => ({
  position: "absolute",
  right: 0,
  top: 0,
}));

const NotificationBg3 = styled(Box)(() => ({
  position: "absolute",
  left: 0,
  bottom: "-5px",
}));

const HeaderAlert = () => {
  // State to track if the div should be shown or hidden
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  // Function to toggle the visibility
  const handleAlert = () => {
    setIsAlertVisible(false); // Hides the div when the button is clicked
  };

  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <>
      {isAlertVisible ? (
        <Box
          bgcolor="primary.main"
          borderRadius={0}
          textAlign="center"
          py="11px"
          position="relative"
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing="16px"
            justifyContent="center"
            alignItems="center"
          >

            <Typography
              variant="body1"
              color="white"
              fontWeight={500}
              sx={{
                opacity: "0.8",
              }}
              fontSize="16px"
            >
             Estás en Ambiente de 
            </Typography>
            <Chip
                label="DESARROLLO"
                size="medium"
                sx={{
                  backgroundColor: "rgba(255,255,255,1)",
                  color: "#E81A68",
                  borderRadius: "8px",
                }}
              />
          </Stack>
          <>
            
          </>
        </Box>
      ) : null}
    </>
  );
};

export default HeaderAlert;
