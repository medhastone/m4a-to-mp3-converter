import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/next-intl/ },
      /PackFileCacheStrategy/
    ];
    return config;
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};
export default withNextIntl(nextConfig);
