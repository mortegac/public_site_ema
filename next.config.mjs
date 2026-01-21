/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // output: 'export', // Comentar o remover esta línea
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.prismic.io',
          pathname: '/**',
        },
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
    // Configuración para analytics
    experimental: {
      optimizePackageImports: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
    },
    // Optimización de compilación moderna
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production' ? {
        exclude: ['error', 'warn'],
      } : false,
    },
    // Configuración SWC para eliminar legacy JavaScript
    swcMinify: true,
    // Headers de seguridad y performance
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on'
            },
          ],
        },
      ];
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