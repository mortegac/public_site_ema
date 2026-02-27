"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { defaultComponents } from "@/app/components/PrismicRichText";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import { formatCurrency } from "@/utils/currency";
import * as prismic from "@prismicio/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, selectShoppingCart, updateShoppingCartTotalsThunk } from "@/store/ShoppingCart/slice";
import { CartProduct } from "@/store/ShoppingCart/type";
import { setStep } from "@/store/Wizard/slice";
import { createShoppingCartDetail } from "@/store/ShoppingCart/services";
import { fetchProductWithPriceAndStock } from "@/utils/queries/Product/fetchProductWithPriceAndStock";
import type { ProductWithPriceAndStock } from "@/utils/queries/Product/fetchProductWithPriceAndStock";


const createPrismicClient = () => {
  return prismic.createClient("energica-public-site", {
    // Usar un parámetro válido para evitar caché
    fetch: (url, options) => {
      const timestamp = Date.now();
      const separator = url.includes('?') ? '&' : '?';
      return fetch(`${url}${separator}t=${timestamp}`, options);
    }
  })
  
  
  // prismic.createClient("https://miniswimmerchile.cdn.prismic.io/api/v2", {
  //   // Usar un parámetro válido para evitar caché
  //   fetch: (url, options) => {
  //     const timestamp = Date.now();
  //     const separator = url.includes('?') ? '&' : '?';
  //     return fetch(`${url}${separator}t=${timestamp}`, options);
  //   }
  // });
};



// Tipos para mejor type safety
type DocumentData = {
  data?: {
    slices?: any[];
  };
  slice_type?: string;
  variation?: string;
};

export const Step01: FC<any> = (props:any) => {
  
  const { installationincluded } = props;
  const dispatch = useAppDispatch();
  const { shoppingCart } = useAppSelector(selectShoppingCart);
  
  const [data, setData] = useState<DocumentData | null>(null);
  const [primary, setPrimary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productBackend, setProductBackend] = useState<Record<string, ProductWithPriceAndStock>>({});

  const getOptionPrice = (option: any) => {
    const productId = option?.iddatabase;
    // If product has database ID, only use DB price (no fallback to Prismic)
    if (productId) {
      return productBackend[productId]?.cost ?? null;
    }
    // Only use Prismic price when there's no database ID
    return Number(option?.pricetopvalue || 0);
  };

  const getOptionStock = (option: any): number | null => {
    const productId = option?.iddatabase;
    if (!productId) return null;
    const stock = productBackend[productId]?.stock;
    return typeof stock === 'number' ? stock : null;
  };
  
  const handleAddToCart = async (option: any) => {
    const amount = getOptionPrice(option);
    
    // Don't allow adding to cart if price is not available from DB
    if (amount == null || amount === 0) {
      console.warn("Cannot add product to cart: price not available");
      return;
    }
    
    // Calcular IVA (19% en Chile)
    const vatRate = 0.19;
    const netAmount = amount / (1 + vatRate);
    const vatValue = amount - netAmount;
    
    // Construir descripción del producto
    const description = `${option?.brand || ""} ${option?.capacity || ""}`.trim();
    
    const productId = option?.iddatabase || "";
    const product: CartProduct = {
      productId,
      description: description,
      netAmount: Math.round(netAmount * 100) / 100, // Redondear a 2 decimales
      amount: amount,
      vatValue: Math.round(vatValue * 100) / 100, // Redondear a 2 decimales
      quantity: 1,
      imageUrl: option?.image?.url || "",
      priceId: productBackend[productId]?.priceId ?? undefined,
    };
    
    console.log("--Agregando producto al carrito--", product);
    
    // Si existe shoppingCartId, agregar el item usando la mutation createShoppingCartDetail
    if (shoppingCart?.shoppingCartId && shoppingCart.shoppingCartId.trim() !== '') {
      try {
        await createShoppingCartDetail({
          shoppingCartId: shoppingCart.shoppingCartId,
          glosa: product.description,
          price: Math.round(product.amount), // mismo formato que total (pesos)
          typeOfItem: "product",
          productId: product.productId || undefined,
          priceId: product.priceId || undefined,
        });
        console.log("--Producto agregado al carrito existente--");
      } catch (error) {
        console.error("--Error al agregar producto al carrito--", error);
      }
    }
    
    // Agregar el producto al store local
    dispatch(addProduct(product));

    // Recalculate totals and update DB (and Redux/persist via thunk)
    const existing = shoppingCart?.products ?? [];
    const existingIdx = existing.findIndex((p) => p.productId === product.productId);
    const newProducts: CartProduct[] =
      existingIdx >= 0
        ? existing.map((p, i) =>
            i === existingIdx ? { ...p, quantity: p.quantity + product.quantity } : p
          )
        : [...existing, product];
    const subtotal = newProducts.reduce((s, p) => s + p.amount * p.quantity, 0);
    const totalVat = Math.round(
      newProducts.reduce(
        (s, p) => s + (p.vatValue ?? p.amount - p.amount / 1.19) * p.quantity,
        0
      )
    );
    if (shoppingCart?.shoppingCartId && shoppingCart.shoppingCartId.trim() !== "") {
      dispatch(
        updateShoppingCartTotalsThunk({
          shoppingCartId: shoppingCart.shoppingCartId,
          total: subtotal,
          vat: totalVat,
        })
      );
    }
    
    // Si existe customerId y no está vacío, ir al paso 5 (pago), sino al paso 2 (datos del cliente)
    if (shoppingCart?.customerId && shoppingCart.customerId.trim() !== '') {
      dispatch(setStep(5));
    } else {
      dispatch(setStep(2));
    }
  };
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const client = createPrismicClient();

        // Obtener el documento de tipo "products"
        const productsPage = await client.getByType("products", {
          orderings: {
            field: "document.first_publication_date",
            direction: "desc",
          },
          pageSize: 1,
        });

        // Acceder a los datos: data?.data?.slices[]
        const firstDocument = productsPage.results[0];
        if (firstDocument?.data?.slices && firstDocument.data.slices.length > 0) {
          // Obtener el primer slice (o buscar el slice específico que necesites)
          const slice = firstDocument.data.slices[0];
          if (slice && slice.slice_type && slice.primary) {
            // Filtrar opciones donde installationincluded === true
            const filteredPrimary = {
              ...slice.primary,
              options: slice.primary.options?.filter((option: any) => 
                option.installationincluded === Boolean(installationincluded)
              ) || []
            };
            
            setData({
              data: firstDocument.data,
              slice_type: slice.slice_type,
              variation: slice.variation,
            });
            setPrimary(filteredPrimary);
          } else {
            setError('El slice no tiene la estructura esperada');
          }
        } else {
          setError('No se encontraron slices en el documento de products');
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el contenido');
        console.error('Error fetching Prismic content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Fetch price and stock from backend for each option that has iddatabase
  useEffect(() => {
    const options = primary?.options ?? [];
    const productIds = options
      .map((o: any) => o?.iddatabase)
      .filter((id: string) => id && id.trim() !== "");
    if (productIds.length === 0) return;

    let cancelled = false;
    const fetchBackend = async () => {
      const entries = await Promise.all(
        productIds.map(async (productId: string) => {
          const data = await fetchProductWithPriceAndStock(productId);
          return [productId, data] as const;
        })
      );
      if (!cancelled) {
        setProductBackend(Object.fromEntries(entries));
      }
    };
    fetchBackend();
    return () => {
      cancelled = true;
    };
  }, [primary?.options]);
  
  if (isLoading) {
    return (
      <Box bgcolor="#ffffff" pt={4} pb={2}>
        <Container sx={{ maxWidth: "1200px !important", position: "relative", paddingBottom:'56px' }}>
          <Typography>Cargando contenido...</Typography>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bgcolor="#ffffff" pt={4} pb={2}>
        <Container sx={{ maxWidth: "1200px !important", position: "relative", paddingBottom:'56px' }}>
          <Typography color="error">Error: {error}</Typography>
        </Container>
      </Box>
    );
  }

  if (!primary || !data) {
    return (
      <Box bgcolor="#ffffff" pt={4} pb={2}>
        <Container sx={{ maxWidth: "1200px !important", position: "relative", paddingBottom:'56px' }}>
          <Typography>No hay datos disponibles</Typography>
        </Container>
      </Box>
    );
  }
  
  
    return (
      
      <Box bgcolor="#ffffff" pt={0} pb={7}
      data-slice-type={data?.slice_type}
      data-slice-variation={data?.variation}
    >
    <Container
      sx={{
        maxWidth: "1200px !important",
        position: "relative",
      }}
    >
      <Box id="boxTitle" sx={{ 
        textAlign: 'left', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        width: '100%',
        padding:'0px',
      }}>
          <Typography
                  id="title-options"
                  variant="h3"
                  fontWeight={400}
                  lineHeight="1.2"
                  width='100%'
                  sx={{
                    mb: '22px',
                    fontSize: {
                      xs: "32px",
                      sm: "32px",
                    },
                  }}
                >
            <PrismicRichText
              field={primary.title} 
              components={defaultComponents}
            />                
          </Typography>
        
          <Typography
            id="description-options"
            variant="body1"
            fontWeight={200}
            lineHeight="1.5"
            align="left"
            width='100%'
            sx={{
              fontSize: {
                xs: "18px",
                sm: "18px",
              },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <PrismicRichText
              field={primary.description} 
              components={defaultComponents}
            />                
          </Typography>
        {/* </Stack> */}
        
      
      </Box>

      <Box 
      id="chargerList"
      // sx={{ 
      //   mt: "48px",
      // }}
      >
        <Grid 
          container 
          spacing={4}
          sx={{ 
            // padding: '16px 56px',
            // alignItems: 'stretch',
          }}
        >
          
          {primary.options?.map((option:any, index: number) => (
            <Grid 
            size={{ xs: 12, sm: 6 }}
            key={index}
            sx={{ 
              display: 'flex',
              padding: '0 5px',
            }}
          >
            {/* <pre>{JSON.stringify(option, null, 2 )}</pre> */}
              <Card 
                sx={{ 
                  background: option?.hastopbanner ? '#ECF2FF' :'#FFF',
                  maxWidth: '100%',
                  width: '100%',
                  // height: '100%',
                  position: 'relative',
                  boxShadow: 3,
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  // height: { xs: "500px", sm: "500px" },
                  height: "500px",
                  overflowY: { xs: 'auto', sm: 'visible' },
                  overflowX: 'hidden',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                  <Stack
                    id="listOptions"
                    my={3}
                    direction={{ xs: "column", sm: "column" }}
                    spacing="20px"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '100%' }}
                  >
                    {/* <pre>{JSON.stringify(option.hastopbanner, null,2 )}</pre> */}
                    {/* <pre>{JSON.stringify(option.texttopbanner, null,2 )}</pre> */}
                  
                  {/* texttopbanner */}
                  {!option.hastopbanner && option.texttopbanner.length > 0 && (
                    <Box
                    id="banner"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: option?.hastopbanner ? '#929292' : 'transparent',
                        padding: '12px 16px',
                        zIndex: 1,
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        borderBottomLeftRadius: '0',
                        borderBottomRightRadius: '0',
                        textAlign: 'center'
                      }}
                    >
                      <PrismicRichText
                        field={option.texttopbanner}
                        components={{
                          paragraph: ({ children }) => (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '16px',
                                fontWeight: 400,
                                color: option?.hastopbanner ? '#fff': '#3a3a3a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}
                            >
                              {children}
                            </Typography>
                          ),
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* pricetoptext */}                      
                  {option.hastopbanner && option.pricetoptext.length > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: option?.hastopbanner ? '#929292' : 'transparent',
                        padding: '12px 16px',
                        zIndex: 1,
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        textAlign: 'center'
                      }}
                    >
                      <PrismicRichText
                        field={option.texttopbanner}
                        components={{
                          paragraph: ({ children }) => (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '16px',
                                fontWeight: 400,
                                color: option?.hastopbanner ? '#fff': '#3a3a3a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}
                            >
                              {children}
                            </Typography>
                          ),
                        }}
                      />
                    </Box>
                  )}
                  
                
                
                
                {/* ORDEN LAYOUT */}
                  <Box
                    id="order"
                      sx={{
                        padding: "0",
                        pt: "24px",
                        width: "100%",
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        // height: { xs: "400px", sm: "300px" },
                        // overflowY: { xs: 'auto', sm: 'visible' },
                        // overflowX: 'hidden',
                      }}
                    >                          
                      <Box
                        id="imageBox"
                        sx={{
                          width: { xs: "100%", sm: "50%" },
                          display:'flex',
                          flexDirection: 'row',
                          justifyContent: { xs: 'flex-start', sm: 'space-between' },
                          alignItems: 'center',
                          gap: 2,
                          position: 'relative'
                        }}
                      >
                        {/* <pre>{JSON.stringify(primary.options, null, 2 )}</pre> */}
                        {/* Imagen - Parte izquierda */}
                        <Box sx={{ 
                          flex: 1,
                          backgroundImage: { xs: `url(${(option as any)?.image?.url || ''})`, sm: 'none' },
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: { xs: 'left -30px center', sm: 'left center' },
                          minHeight: { xs: '200px', sm: 'auto' }
                        }}>
                          {(option as any).image?.url && (
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                              <Image
                                id="imageBox"
                                src={(option as any).image.url}
                                alt={(option as any).image.alt || `Option ${index + 1}`}
                                width={250}
                                height={250}
                                style={{
                                  objectFit: 'contain',
                                }}
                                unoptimized
                              />
                            </Box>
                          )}
                        </Box>

                        {/* Botones RESPONSIVE- Parte derecha */}
                          <Box 
                            id="buttonBox"
                            sx={{ 
                              position: { xs: 'absolute', sm: 'static' },
                              top: { xs: '50%', sm: 'auto' },
                              right: { xs: '20px', sm: 'auto' },
                              transform: { xs: 'translateY(-50%)', sm: 'none' },
                              display: { xs: 'flex', sm: 'none' }, 
                              flexDirection: 'column', 
                              gap: 1,
                              zIndex: { xs: 10, sm: 'auto' },
                              width: "100px",
                            }}>
                          <Button
                            variant='contained'
                            sx={{
                              minWidth: 'auto',
                              width: '100%',
                              fontSize: '14px',
                            }}
                            onClick={() => handleAddToCart(option)}
                            disabled={getOptionStock(option) === 0 || (option?.iddatabase && getOptionPrice(option) == null)}
                          >
                            Comprar
                          </Button>
                          
                          
                          {option?.buttontwolink?.uid && (
                            <Link
                              href={`/${option.buttontwolink.uid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', width: '100%' }}
                            >
                              <Button
                                id="ficha-tecnica"
                                variant='outlined'
                                sx={{
                                  background: "white",
                                  minWidth: 'auto',
                                  width: '100%',
                                  fontSize: '14px',
                                }}
                              >
                                Ver Ficha
                              </Button>
                            </Link>
                          )}
                        </Box>
                        
                      </Box>
                      <Box
                        id="orderB"
                        sx={{
                          width: { xs: "100%", sm: "50%" },
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent:'flex-end',
                          alignItems:'flex-start',
                        }}
                      >
                      {/* brand */}
                      <Typography
                        id="brand-options"
                        variant="body1"
                        fontWeight={200}
                        lineHeight="1.5"
                        align="left"
                        sx={{
                          fontSize: {
                            xs: "16px",
                            sm: "16px",
                          },
                        }}
                      >
                        {option?.brand || ""}               
                      </Typography>
                      
                      <Box
                        id="potencia-box"
                        sx={{
                          width: "100%",
                          display:'flex',
                          flexDirection: { xs: 'row', sm: 'column' },
                          justifyContent:'flex-start',
                          alignItems:'flex-start',
                        }}
                      >
                        <Typography
                        variant="body1"
                        fontWeight={200}
                        lineHeight="1.5"
                        align="center"
                        sx={{
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                          },
                        }}
                      >Potencia de salida             
                      </Typography>
                      
                      
                      {/* capacity */}
                      <Typography
                        id="capacity-options"
                        variant="body1"
                        fontWeight={200}
                        lineHeight="1.5"
                        align="center"
                        sx={{
                          fontSize: {
                            xs: "16px",
                            sm: "16px",
                          },
                          marginLeft: { xs: '16px', sm: 0 }
                        }}
                      >{option.capacity} 
                      </Typography>
                      </Box>
                      
                      
                      
                      
                      <Box
                        id="orderB"
                        sx={{
                          // width: { xs: "100%", sm: "60%" },
                          width: "100%",
                          
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent:'flex-start',
                          alignItems:'center',
                        }}
                      >
                        
                        <Box
                        id="potencia-box"
                        sx={{
                          width: "100%",
                          display:'flex',
                          flexDirection: { xs: 'row', sm: 'column' },
                          justifyContent:'flex-start',
                          alignItems:'flex-start',
                        }}
                      ></Box>
                        {/* pricetoptext */}
                        <Typography
                          id="pricetoptext-options"
                          variant="body1"
                          fontWeight={200}
                          lineHeight="1.5"
                          align="center"
                          sx={{
                            width:'100%',
                            textAlign: 'left',
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                            },
                          }}
                        >
                          <PrismicRichText
                            field={option.pricetoptext} 
                            components={defaultComponents}
                          />                
                        </Typography>
                        
                        {/* pricetopvalue - from DB when iddatabase exists, otherwise from Prismic */}
                        <Typography
                          id="pricetovalue-options"
                          variant="body1"
                          fontWeight={600}
                          lineHeight="1.5"
                          align="center"
                          sx={{
                            width:'100%',
                            textAlign: 'left',
                            fontSize: {
                              xs: "26px",
                              sm: "26px",
                            },
                          }}
                        >
                          {option?.iddatabase 
                            ? (getOptionPrice(option) != null 
                                ? formatCurrency(getOptionPrice(option)!)
                                : "Cargando precio...")
                            : (() => {
                                const price = getOptionPrice(option);
                                return price != null ? formatCurrency(price) : formatCurrency(0);
                              })()
                          }
                        </Typography>
                        
                        {/* stock from backend - always show when iddatabase exists */}
                        {option?.iddatabase && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: getOptionStock(option) === 0 ? "error.main" : "text.secondary",
                              fontSize: "12px",
                              mt: 0.5,
                            }}
                          >
                            {getOptionStock(option) === null
                              ? "Cargando stock..."
                              : getOptionStock(option) === 0
                              ? "Sin stock"
                              : `${getOptionStock(option)} ${getOptionStock(option) === 1 ? 'unidad' : 'unidades'} en stock`
                            }
                          </Typography>
                        )}
                        
                        {/* pricebottomtext - hide when iddatabase exists (using DB stock instead) */}
                        {!option?.iddatabase && (
                          <Typography
                            id="pricebottomtext-options"
                            variant="body1"
                            fontWeight={200}
                            lineHeight="1.5"
                            align="left"
                            sx={{
                              // width:'100%',
                              color:'#68AD00',
                              paddingBottom: '12px',
                              // textAlign: 'center',
                              display:'flex',
                              flexDirection: 'column',
                              justifyContent:'center',
                              alignItems:'center',
                              
                              fontSize: {
                                xs: "12px",
                                sm: "12px",
                              },
                            }}
                          >
                            <PrismicRichText
                              field={option.pricebottomtext} 
                              components={defaultComponents}
                            />                
                          </Typography>
                        )}

                          {/* Botones DESKTOP- Parte derecha */}
                          <Box 
                          id="buttonBoxDesktop"
                          sx={{ 
                            display: { xs: 'none', sm: 'none', md: 'flex' }, 
                            flexDirection: 'column', 
                            gap: 1,
                            width: '100%'
                          }}>
                          <Button
                            variant='contained'
                            sx={{
                              minWidth: 'auto',
                              width: '100%',
                              fontSize: '14px',
                            }}
                            onClick={() => handleAddToCart(option)}
                            disabled={getOptionStock(option) === 0 || (option?.iddatabase && getOptionPrice(option) == null)}
                          >
                            Comprar
                          </Button>
                          
                          {option?.buttontwolink?.uid && (
                            <Link
                              href={`/${option.buttontwolink.uid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', width: '100%' }}
                            >
                              <Button
                                id="ficha-tecnica"
                                variant='outlined'
                                sx={{
                                  minWidth: 'auto',
                                  width: '100%',
                                  fontSize: '14px',
                                }}
                              >
                                Ficha
                              </Button>
                            </Link>
                          )}
                        </Box>
                      </Box>
                      
                      </Box>
                  </Box>
                  
                  <Box
                    id="orderHTML"
                      sx={{
                        padding: "0",
                        pt: "8px",
                        width: "100%",
                        height: "80px",
                        display:'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'flex-start',
                        
                        gap: 2,
                        '& ul, & ol': {
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                        },
                        '& li': {
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                        }
                      }}
                      // dangerouslySetInnerHTML={{ __html: (option as any)?.htmlfeatures || '' }}
                    >                          
                      <Box
                        id="boxHTML"
                        sx={{
                          width: { xs: "100%", sm: "100%" },
                          // display: { xs: 'none', sm: 'flex',  },                          
                          paddingX:'22px',
                          paddingY:'12px',
                          
                        }}
                        dangerouslySetInnerHTML={{ __html: (option as any)?.htmlfeatures || '' }}
                      />
                    
                  </Box>
                  {/* FIN: ORDEN LAYOUT */}

                  
                  
                  </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
          
        {/* </Box>   */}
      {/* <pre>{JSON.stringify(primary.options, null, 2 )}</pre> */}
    </Container>
</Box>
    );
  }