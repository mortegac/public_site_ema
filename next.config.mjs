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
    // Configuración de transpilación moderna
    transpilePackages: [],
    // Optimización de webpack para mejor code splitting
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization = {
          ...config.optimization,
          moduleIds: 'deterministic',
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              // Vendor chunks separados para mejor caching
              mui: {
                name: 'mui',
                test: /[\\/]node_modules[\\/]@mui[\\/]/,
                priority: 30,
                reuseExistingChunk: true,
              },
              datePickers: {
                name: 'date-pickers',
                test: /[\\/]node_modules[\\/]@mui[\\/]x-date-pickers[\\/]/,
                priority: 25,
                reuseExistingChunk: true,
              },
              apexcharts: {
                name: 'apexcharts',
                test: /[\\/]node_modules[\\/](apexcharts|react-apexcharts)[\\/]/,
                priority: 20,
                reuseExistingChunk: true,
              },
              embla: {
                name: 'embla',
                test: /[\\/]node_modules[\\/]embla-carousel[\\/]/,
                priority: 20,
                reuseExistingChunk: true,
              },
              reactBigCalendar: {
                name: 'react-big-calendar',
                test: /[\\/]node_modules[\\/]react-big-calendar[\\/]/,
                priority: 20,
                reuseExistingChunk: true,
              },
              vendor: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                reuseExistingChunk: true,
              },
            },
          },
        };
      }
      return config;
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