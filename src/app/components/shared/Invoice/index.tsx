import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Image from 'next/image';

interface InvoiceProps {
  glosa: string;
  total: string;
  order: string;
  card: string;
  typePay: string;
}

const Invoice: React.FC<InvoiceProps> = ({ glosa, total, order, card, typePay }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8fafc',
        color: '#74787e',
        height: '100%',
        lineHeight: 1.4,
        width: '100%',
        wordBreak: 'keep-all',
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Image
            src="https://images.prismic.io/greta/cd66aa9d-58e6-4054-a475-3f0b164ce3db_energica.png"
            alt="Energica Logo"
            width={250}
            height={100}
            style={{ marginBottom: '3rem' }}
          />
        </Box>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            p: 4,
            maxWidth: 570,
            mx: 'auto',
          }}
        >
          <Typography
            sx={{
              color: '#37373c',
              fontSize: '14px',
              lineHeight: '24px',
              fontWeight: 300,
              textAlign: 'center',
              mb: 4,
            }}
          >
            A continuación encontrarás el detalle de tu compra:
          </Typography>

          <TableContainer>
            <Table size="small" sx={{ mb: 3 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '8px 0 0 8px',
                      color: 'rgb(33, 33, 33)',
                      width: '16%',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">Servicio:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '0 8px 8px 0',
                      color: 'rgb(33, 33, 33)',
                      width: '84%',
                      py: 1,
                      px: 2,
                    }}
                  >
                    {glosa}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table size="small" sx={{ mb: 3 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: '#44BDF2',
                      borderRadius: '8px 0 0 8px',
                      color: '#212121',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold" fontSize="1.5rem">Total</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: '#44BDF2',
                      borderRadius: '0 8px 8px 0',
                      color: '#212121',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontSize="1.5rem">$ {total}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '8px 0 0 8px',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">ORDEN</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '0 8px 8px 0',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">{order}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ py: 1, px: 2 }}>
                    <Typography fontWeight="bold">Tarjeta</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1, px: 2 }}>{card}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '8px 0 0 8px',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">Tipo de pago</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '0 8px 8px 0',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    {typePay}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Invoice; 