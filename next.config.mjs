/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    poweredByHeader: false,
    // output: 'export', // Comentar o remover esta línea
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.prismic.io',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'energica-public-site.cdn.prismic.io',
          pathname: '/**',
        },
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 2592000,
    },
    // Configuración para analytics
    experimental: {
      optimizePackageImports: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers', '@tabler/icons-react'],
    },
    // Optimización de compilación moderna
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production' ? {
        exclude: ['error', 'warn'],
      } : false,
    },
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
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload'
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=(self)'
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://static.cdn.prismic.io https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.prismic.io https://energica-public-site.cdn.prismic.io https://www.google-analytics.com https://purecatamphetamine.github.io; media-src 'self' https://*.prismic.io https://energica-public-site.cdn.prismic.io; connect-src 'self' https://*.prismic.io https://www.google-analytics.com https://analytics.google.com https://www.google.com https://www.googleadservices.com https://cognito-identity.us-east-2.amazonaws.com https://*.amazonaws.com https://*.appsync-api.us-east-2.amazonaws.com; frame-src https://www.googletagmanager.com https://googleads.g.doubleclick.net;"
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