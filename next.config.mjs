/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    // Configuración para analytics
    experimental: {
      optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
    // Headers para analytics
    // async headers() {
    //   return [
    //     {
    //       source: '/(.*)',
    //       headers: [
    //         {
    //           key: 'X-Frame-Options',
    //           value: 'DENY',
    //         },
    //         {
    //           key: 'X-Content-Type-Options',
    //           value: 'nosniff',
    //         },
    //       ],
    //     },
    //   ];
    // },
};

export default nextConfig;