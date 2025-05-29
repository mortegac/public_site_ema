'use client';
import React from 'react';
import { Box, Grid, Typography, Chip, CardContent, Divider, Stack, Button } from '@mui/material';
import Image from 'next/image';
import BlankCard from '../BlankCard';

const Licenses = [
    {
        id: 3,
        type: 'Instalación cargador 2,2kW',
        isPopular: true,
        typeText: 'Use for single end product which end users can be charged for.',
        price: ' 279.900',
        fullSourceCode: true,
        isDoc: true,
        isSass: true,
        isSingleProject: true,
        isSupport: true,
        isUpdate: true
    },
    {
        id: 1,
        type: 'Instalación cargador 7kW',
        isPopular: false,
        typeText: 'Use for single end product which end users cant be charged for.',
        price: '529.900',
        fullSourceCode: true,
        isDoc: true,
        isSass: false,
        isSingleProject: true,
        isSupport: true,
        isUpdate: true
    },
    {
        id: 2,
        type: 'Instalación cargador 7kW',
        isPopular: false,
        typeText: 'Use for unlimited end products end users cant be charged for.',
        price: '779.900',
        fullSourceCode: true,
        isDoc: true,
        isSass: false,
        isSingleProject: false,
        isSupport: true,
        isUpdate: true
    },
    
]

const PricingCard = () => {
    return (
        <>
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 3,
                height: '100%', 
                justifyContent: 'space-between',
                padding: '24px',
                width: '100%'
            }}>
                {Licenses.map((license, i) => (
                    <Box 
                        key={i}  
                        sx={{ 
                            height: '100%',
                            flex: 1,
                            minWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', lg: 'calc(31% - 16px)' },
                            maxWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', lg: 'calc(31% - 16px)' },
                            padding: '0 !important',
                            ...(i === 1 && { margin: '0 6px' })
                        }}>
                        <BlankCard sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            minHeight: '800px',
                            maxHeight: '800px'
                        }}>
                            <CardContent sx={{ 
                                p: '32px', 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                flex: 1,
                                '& .MuiTypography-root': {
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal'
                                }
                            }}>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Typography variant="h4" fontSize="20px" fontWeight={600}>{license.type}</Typography>
                                    {/* {license.isPopular ?
                                        <Chip label="Popular" size="small" sx={{
                                            ml: '6px',
                                            borderRadius: '8px',
                                            color: 'primary.main',
                                            backgroundColor: 'rgba(93, 135, 255, 0.15)'
                                        }} />
                                        : null} */}

                                </Box>

                                <Typography fontSize="13px" mb={4}>{license.typeText}</Typography>
                                <Divider />
                                <Stack mt={4} direction="row" gap="8px" alignItems="end">
                                    <Typography variant='h4' fontSize="40px" fontWeight={700}>${license.price}</Typography>
                                </Stack>
                                <Stack my={4} gap="12px">
                                    <Box display="flex" alignItems="center" gap="8px">
                                        {license.fullSourceCode ?
                                            <Image src="/images/icons/icon-check.svg" alt="circle" width={20} height={20} />
                                            :
                                            <Image src="/images/icons/icon-close.svg" alt="circle" width={20} height={20} />
                                        }
                                        <Typography fontSize="14px" fontWeight={500}>Ideal para Cargadores Portátiles</Typography>

                                    </Box>
                                    <Box display="flex" alignItems="center" gap="8px">
                                        {license.isDoc ?
                                            <Image src="/images/icons/icon-check.svg" alt="circle" width={20} height={20} />
                                            :
                                            <Image src="/images/icons/icon-close.svg" alt="circle" width={20} height={20} />
                                        }
                                        <Typography fontSize="14px" fontWeight={500}>Valor Estimado para 10 metros de Cableado</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap="8px">
                                        {license.isSass ?
                                            <Image src="/images/icons/icon-check.svg" alt="circle" width={20} height={20} />
                                            :
                                            <Image src="/images/icons/icon-close.svg" alt="circle" width={20} height={20} />
                                        }
                                        <Typography fontSize="14px" sx={{
                                            color: `${license.isSass ? 'text.primary' : '#99AABA'}`,
                                            fontWeight: `${license.isSass ? '500' : '400'}`,
                                        }}>Instalación de Cargador o Toma en Muralla</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap="8px">
                                        {license.isSingleProject ?
                                            <Image src="/images/icons/icon-check.svg" alt="circle" width={20} height={20} />
                                            :
                                            <Image src="/images/icons/icon-check.svg" alt="circle" width={20} height={20} />
                                        }
                                        <Typography fontSize="14px" whiteSpace="nowrap" gap="2px" fontWeight={500} display="flex">
                                            
                                            Obtén un 10% de descuento si eres miembro del Club Tesla Chile*
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Button fullWidth variant="contained" size="large">Agenda tu visita</Button>
                            </CardContent>
                        </BlankCard>
                        </Box>
                        
                    
                ))}

            </Box>
        </>
    );
};

export default PricingCard;
