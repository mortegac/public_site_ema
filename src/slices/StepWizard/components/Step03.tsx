"use client";
import { FC } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Button,
} from "@mui/material";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectShoppingCart } from "@/store/ShoppingCart/slice";
import { setStep } from "@/store/Wizard/slice";
import { formatCurrency } from "@/utils/currency";

export const Step03: FC<any> = () => {
  const dispatch = useAppDispatch();
  const { shoppingCart, loading } = useAppSelector(selectShoppingCart);
  
  // Calcular totales
  const subtotal = shoppingCart?.products?.reduce((sum, product) => 
    sum + (product.amount * product.quantity), 0) || 0;
  const totalVat = shoppingCart?.products?.reduce((sum, product) => 
    sum + (product.vatValue * product.quantity), 0) || 0;
  const total = subtotal;

  const handleContinuePurchase = () => {
    // Si existe el cliente, navegar directamente al paso 5 sin validación
    if (shoppingCart?.customer) {
      dispatch(setStep(5));
    }
  };
  
  return (
    <Box bgcolor="#ffffff" pt={4} pb={2}>
      <Container
        sx={{
          maxWidth: "1200px !important",
          position: "relative",
          paddingBottom:'56px',
        }}
      >
        <Typography variant="h3" sx={{ mb: 4, fontSize: '32px' }}>
          Resumen del Carrito
        </Typography>

        {loading && (
          <Typography>Cargando carrito...</Typography>
        )}

        {!loading && shoppingCart && (
          <>
            {/* Información del Cliente */}
            {shoppingCart.customer && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Información del Cliente
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nombre
                      </Typography>
                      <Typography variant="body1">
                        {shoppingCart.customer.Name}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {shoppingCart.customer.Email}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Teléfono
                      </Typography>
                      <Typography variant="body1">
                        {shoppingCart.customer.Phone}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        ID Cliente
                      </Typography>
                      <Typography variant="body1">
                        {shoppingCart.customer.customerId}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            {/* Productos */}
            {shoppingCart.products && shoppingCart.products.length > 0 && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Productos ({shoppingCart.products.length})
                  </Typography>
                  {shoppingCart.products.map((product, index) => (
                    <Box key={product.productId || index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6">
                            {product.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {product.productId}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip 
                              label={`Cantidad: ${product.quantity}`} 
                              size="small" 
                              variant="outlined" 
                            />
                            <Chip 
                              label={`Neto: ${formatCurrency(product.netAmount)}`} 
                              size="small" 
                              variant="outlined" 
                            />
                            <Chip 
                              label={`IVA: ${formatCurrency(product.vatValue)}`} 
                              size="small" 
                              variant="outlined" 
                            />
                          </Box>
                        </Box>
                        <Typography variant="h6" sx={{ ml: 2 }}>
                          {formatCurrency(product.amount * product.quantity)}
                        </Typography>
                      </Box>
                      {index < shoppingCart.products!.length - 1 && <Divider />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Resumen de Totales */}
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Resumen
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">{formatCurrency(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">IVA:</Typography>
                  <Typography variant="body1">{formatCurrency(totalVat)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">{formatCurrency(total)}</Typography>
                </Box>
                {shoppingCart.shoppingCartId && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      ID Carrito: {shoppingCart.shoppingCartId}
                    </Typography>
                  </Box>
                )}
                {shoppingCart.status && (
                  <Box sx={{ mt: 1 }}>
                    <Chip 
                      label={`Estado: ${shoppingCart.status}`} 
                      color={shoppingCart.status === 'completed' ? 'success' : 'default'}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Botón Continuar y pagar - Solo si existe el cliente */}
            {shoppingCart.customer && (
              <Box 
                sx={{ 
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleContinuePurchase}
                  endIcon={
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        color: '#fff',
                        '&::after': {
                          content: '"\\276F"',
                          fontSize: '16px',
                          lineHeight: 1,
                        },
                      }}
                    />
                  }
                  sx={{
                    paddingX: 4,
                    paddingY: 1.5,
                    borderRadius: '24px',
                    bgcolor: "#E81A68",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#C7155A",
                    },
                  }}
                >
                  Continuar y pagar la visita física
                </Button>
              </Box>
            )}
          </>
        )}

        {!loading && (!shoppingCart || (!shoppingCart.products?.length && !shoppingCart.customer)) && (
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary" align="center">
                El carrito está vacío
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}