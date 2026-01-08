"use client";
import { FC, useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Link,
} from "@mui/material";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectShoppingCart, getShoppingCart } from "@/store/ShoppingCart/slice";
import { selectCalendarVisits } from "@/store/CalendarVisits/slice";
import { formatCurrency } from "@/utils/currency";

interface CartItem {
  shoppingCartDetailId: string;
  glosa: string;
  price: number;
  imageUrl?: string;
}

export const Step05: FC<any> = () => {
  const dispatch = useAppDispatch();
  const { shoppingCart } = useAppSelector(selectShoppingCart);
  const { calendarVisits } = useAppSelector(selectCalendarVisits);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (calendarVisits?.calendarId) {
        await dispatch(getShoppingCart({
          shoppingCartId: calendarVisits?.calendarId,
        }));
      }
    };
    
    fetchData();
  }, [calendarVisits?.calendarId, dispatch]);

  // Datos mock para el ejemplo - reemplazar con datos reales cuando estén disponibles
  useEffect(() => {
    // Por ahora usamos datos mock basados en la imagen
    // Cuando tengas los ShoppingCartDetails reales, reemplaza esto
    setCartItems([
      {
        shoppingCartDetailId: "1",
        glosa: "Cargador BENY - 7kW",
        price: 599900,
        imageUrl: "/images/products/cargador-beny-7kw.jpg", // Ajustar según tu estructura de imágenes
      },
    ]);
  }, []);

  const handleRemoveItem = (itemId: string) => {
    // Implementar lógica para eliminar item del carrito
    console.log("Eliminar item:", itemId);
  };

  const handleContinuePurchase = () => {
    // Implementar lógica para continuar con la compra
    console.log("Continuar compra");
  };

  // Calcular valores
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const shipping = 12500; // Valor fijo según la imagen, ajustar según tu lógica
  const total = subtotal + shipping;
  const itemCount = cartItems.length;

  return (
    <Box bgcolor="#f5f5f5" pt={4} pb={4}>
      <Container
        sx={{
          maxWidth: "1200px !important",
          position: "relative",
          paddingBottom: "56px",
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 3,
          }}
        >
          {/* Columna Izquierda - Artículos del Carrito */}
          <Box>
            <Card
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                p: 3,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {cartItems.map((item) => (
                  <Box
                    key={item.shoppingCartDetailId}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      mb: 3,
                      pb: 3,
                      borderBottom: item !== cartItems[cartItems.length - 1] ? "1px solid #EAEFF4" : "none",
                    }}
                  >
                    {/* Imagen del producto */}
                    <Box
                      component="img"
                      src={item.imageUrl || "/images/placeholder-product.jpg"}
                      alt={item.glosa}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: "8px",
                        bgcolor: "#ffffff",
                        mr: 2,
                        flexShrink: 0,
                      }}
                    />

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
                        {item.glosa}
                      </Typography>
                      <Link
                        component="button"
                        onClick={() => handleRemoveItem(item.shoppingCartDetailId)}
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

                    {/* Precio */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#333333",
                        ml: 2,
                        alignSelf: "flex-start",
                      }}
                    >
                      {formatCurrency(item.price || 0)}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Columna Derecha - Resumen de Compra */}
          <Box>
            <Card
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                p: 3,
                position: "sticky",
                top: 20,
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
                    Subtotal ({itemCount})
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#333333" }}>
                    {formatCurrency(subtotal)}
                  </Typography>
                </Box>

                {/* Envíos */}
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
                    {formatCurrency(shipping)}
                  </Typography>
                </Box>

                {/* Total */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                    pt: 2,
                    borderTop: "1px solid #EAEFF4",
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
                    {formatCurrency(total)}
                  </Typography>
                </Box>

                {/* Botón Continuar compra */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleContinuePurchase}
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
                  }}
                >
                  Continuar compra
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};