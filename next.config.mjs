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
              value: [
                "default-src 'self'",
                // Scripts: GTM, GA, Google Ads, Prismic, Maps, AdServices
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://static.cdn.prismic.io https://maps.googleapis.com",
                // Styles
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                // Fonts
                "font-src 'self' https://fonts.gstatic.com",
                // Images: GA, GTM, DoubleClick, Google Ads conversion pixels
                "img-src 'self' data: https://images.prismic.io https://energica-public-site.cdn.prismic.io https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://td.doubleclick.net https://www.google.com https://www.google.cl https://*.google.cl https://purecatamphetamine.github.io",
                // Media
                "media-src 'self' https://*.prismic.io https://energica-public-site.cdn.prismic.io",
                // Connections: GA4 endpoints, GTM, DoubleClick, AWS, Prismic, EmailJS
                "connect-src 'self' https://*.prismic.io https://www.google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://region1.analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://td.doubleclick.net https://www.google.com https://www.googleadservices.com https://ad.doubleclick.net https://cognito-identity.us-east-2.amazonaws.com https://*.amazonaws.com https://*.appsync-api.us-east-2.amazonaws.com https://api.emailjs.com",
                // Frames: GTM noscript, DoubleClick, Prismic preview
                "frame-src https://www.googletagmanager.com https://googleads.g.doubleclick.net https://td.doubleclick.net https://energica-public-site.prismic.io",
              ].join('; '),
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