"use client";
import { FC, useEffect } from "react";
import Image from "next/image";
import LoadingIcon from "@/app/components/shared/LoadingIcon";

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Link,
  Divider,
  Chip,
} from "@mui/material";

const IVA:number = 0.19;

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectShoppingCart, removeProductToCart, getShoppingCart } from "@/store/ShoppingCart/slice";
import { selectWebpay} from "@/store/Webpay/slice";
import { formatCurrency } from "@/utils/currency";

export const Step05: FC<any> = () => {
  const dispatch = useAppDispatch();
  const { shoppingCart, loading } = useAppSelector(selectShoppingCart);
  const { webpay, status } = useAppSelector(selectWebpay);
  
  // Obtener el carrito desde la API cuando el componente se monte
  useEffect(() => {
    if (shoppingCart?.shoppingCartId && shoppingCart.shoppingCartId.trim() !== '') {
      dispatch(getShoppingCart({ shoppingCartId: shoppingCart.shoppingCartId }));
    }
  }, []); // Solo se ejecuta al montar el componente

  const handleRemoveItem = (productId: string) => {
    dispatch(removeProductToCart({shoppingCartDetailId : productId}));
    dispatch(getShoppingCart({ shoppingCartId: shoppingCart.shoppingCartId }));
  };

  const handleContinuePurchase = () => {
    // Implementar lógica para continuar con la compra
    console.log("Continuar compra", shoppingCart);
  };

  // Calcular valores desde los productos del carrito persistido
  const products = shoppingCart?.products || [];
  const subtotal = products.reduce((sum, product) => 
    sum + (product.amount * product.quantity), 0);
  // const totalVat = products.reduce((sum, product) => 
  //   sum + (product.vatValue * product.quantity), 0);
  const shipping = 0; // Valor fijo según la imagen, ajustar según tu lógica
  const totalNeto = subtotal + shipping;
  
  
  // 2. Calculamos el 19%
  const totalVat = subtotal * IVA;  
  const totalAPagar = totalNeto * (1 + IVA / 100);
  // const totalAPagar = 0
  
  const itemCount = products.reduce((sum, product) => sum + product.quantity, 0);

  if (loading) {
    return (
      <Box bgcolor="#f5f5f5" pt={4} pb={4}>
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
            paddingBottom: "56px",
          }}
        >
          <Typography>Cargando carrito...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box bgcolor="#f5f5f5" pt={4} pb={4} sx={{ width: '100%', overflowX: 'hidden' }}>
      <Container
        sx={{
          maxWidth: "1200px !important",
          position: "relative",
          paddingBottom: "56px",
          width: '100%',
          px: { xs: 2, md: 3 },
        }}
      >
        {products.length === 0 ? (
          <Card
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              p: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center" color="text.secondary">
                El carrito está vacío
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box
            id="productsContainer"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: { xs: 2, md: 3 },
              width: '100%',
              maxWidth: '100%',
              mx: 'auto',
              boxSizing: 'border-box',
            }}
          >
            {/* Columna Izquierda - Artículos del Carrito */}
            <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
              <Card
                id="cardProducts"
                sx={{
                  bgcolor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  p: { xs: 2, md: 3 },
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {products.map((product, index) => (
                    <Box
                      key={product.productId || index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: { xs: 2, md: 3 },
                        pb: { xs: 2, md: 3 },
                        borderBottom: index !== products.length - 1 ? "1px solid #EAEFF4" : "none",
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        maxWidth: '100%',
                      }}
                    >
                      {/* Imagen del producto */}
                      {product.imageUrl ? (
                        <Box
                          sx={{
                            width: { xs: '100%', sm: 120 },
                            height: { xs: 200, sm: 120 },
                            borderRadius: "8px",
                            mr: { xs: 0, sm: 2 },
                            mb: { xs: 2, sm: 0 },
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            bgcolor: "#f5f5f5",
                          }}
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.description}
                            fill
                            style={{
                              objectFit: "contain",
                            }}
                            unoptimized
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: { xs: '100%', sm: 120 },
                            height: { xs: 200, sm: 120 },
                            borderRadius: "8px",
                            bgcolor: "#f5f5f5",
                            mr: { xs: 0, sm: 2 },
                            mb: { xs: 2, sm: 0 },
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Sin imagen
                          </Typography>
                        </Box>
                      )}

                      {/* Información del producto */}
                      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#333333",
                            mb: 1,
                          }}
                        >
                          {product.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={`Cantidad: ${product.quantity}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ height: '24px', fontSize: '0.75rem' }}
                          />
                          {/* <Chip 
                            label={`Neto: ${formatCurrency(product.netAmount)}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ height: '24px', fontSize: '0.75rem' }}
                          />
                          <Chip 
                            label={`IVA: ${formatCurrency(product.vatValue)}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ height: '24px', fontSize: '0.75rem' }}
                          /> */}
                        </Box>
                        {/* <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "#666666",
                            mb: 1,
                          }}
                        >
                          ID: {product.productId}
                        </Typography> */}
                        <Link
                          component="button"
                          onClick={() => handleRemoveItem(product.productId)}
                          sx={{
                            fontSize: "14px",
                            color: "#4A90E2",
                            textDecoration: "none",
                            cursor: "pointer",
                            alignSelf: "flex-start",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Eliminar
                        </Link>
                      </Box>

                      {/* Precio total del producto */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#333333",
                          ml: { xs: 0, sm: 2 },
                          mt: { xs: 2, sm: 0 },
                          alignSelf: { xs: 'flex-start', sm: 'flex-start' },
                          width: { xs: '100%', sm: 'auto' },
                          textAlign: { xs: 'left', sm: 'right' },
                        }}
                      >
                        {formatCurrency(product.amount * product.quantity)}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>

          {/* Columna Derecha - Resumen de Compra */}
          <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <form className="form flex flex-wrap w-full"
            action={webpay?.url || ""}
            method="POST"
        >
          <input id="token_ws" type="hidden" name="token_ws" value={webpay?.token || ""} />
        
        
        
            <Card
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                p: { xs: 2, md: 3 },
                position: { xs: 'relative', md: 'sticky' },
                top: { md: 20 },
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#333333",
                    mb: 3,
                  }}
                >
                  Resumen de compra
                </Typography>

                {/* Subtotal */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    Neto ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#333333" }}>
                    {formatCurrency(subtotal)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    Envíos
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#333333" }}>
                    {formatCurrency(0)}
                  </Typography>
                </Box>



            {/* IVA */}
                {totalVat > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                      borderTop: "1px solid #EAEFF4",
                      mt: 4,
                      pt: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#666666" }}>
                      IVA (19%)
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#333333" }}>
                      {formatCurrency(totalVat)}
                      
                    </Typography>
                  </Box>
                )}
                
                
                {/* Total */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                    // pt: 2,
                    // borderTop: "1px solid #EAEFF4",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#333333",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#333333",
                    }}
                  >
                    {formatCurrency(totalAPagar)}
                  </Typography>
                </Box>

                {/* Botón Continuar compra */}
                {/* <Button
                  variant="contained"
                  fullWidth
                  onClick={handleContinuePurchase}
                  disabled={products.length === 0}
                  sx={{
                    bgcolor: "#E81A68",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#C7155A",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(0, 0, 0, 0.12)",
                      color: "rgba(0, 0, 0, 0.26)",
                    },
                  }}
                >
                  Continuar compra
                </Button> */}


                <Button
                variant="contained"
                type='submit'
                color="primary"
                size="large"
                disabled={webpay?.token ? false : true}
                endIcon={
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "#E81A68",
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#C7155A",
                      },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(0, 0, 0, 0.12)",
                        color: "rgba(0, 0, 0, 0.26)",
                      },
                    }}
                  />
                }
                sx={{
                  paddingX: 4,
                  paddingY: 1.5,
                  marginTop: '20px',
                  borderRadius: '24px',
                  minWidth: { xs: '100%', md: '170px' }, // 100% en móviles, 170px en desktop
                  width: { xs: '100%', md: '100%' } // 100% en móviles, 170px en desktop
                }}
              >
                { status === "loading" && <>
                    <LoadingIcon icon="puff" color="#FFFFFF" style={{width:"40px", height:"40px"}}/>
                </>
                }
                { status === "idle" && <>
                <span>Pagar compra</span>
                </>
                }
              </Button>


                {/* Información del cliente si existe */}
                {shoppingCart?.customer && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, fontSize: "14px" }}>
                        Cliente:
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666666", fontSize: "13px" }}>
                        {shoppingCart.customer.Name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666666", fontSize: "12px" }}>
                        {shoppingCart.customer.Email}
                      </Typography>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          
            </form>
          </Box>
        </Box>
        )}
      </Container>
      
      {/* <pre>{JSON.stringify(shoppingCart, null,2 )}</pre> */}
    </Box>
  );
};