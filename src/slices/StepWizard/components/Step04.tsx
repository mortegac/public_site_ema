"use client";
import { FC } from "react";

import {
  Box,
  Container,
} from "@mui/material";

export const Step04: FC<any> = () => {
  
    return (
      <Box bgcolor="#ffffff" pt={4} pb={2}>
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
            paddingBottom:'56px',
          }}
        >
       <h2 style={{
        fontSize:'32px',
       }}>
        Step04</h2>
        </Container>
        {/* <pre>{JSON.stringify(slice, null, 2 )}</pre> */}
      </Box>
    );
  }