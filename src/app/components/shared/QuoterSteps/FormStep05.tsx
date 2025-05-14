"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";


export const FormStep05 = (props:any) => {


  return (
    <Box bgcolor="#ffffff" pt={7} pb={7}>
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
        }}
      >
        
        <Typography
            align="left"
                        sx={{
                          display: "block",
                          padding: "30px 0",
                          fontSize: "18px",
                          color: (theme) => theme.palette.text.primary
                        }}
                        component="span"
            >
              {"STEP FIVE"}
            </Typography>
            
      </Container>
    </Box>
  );
};

