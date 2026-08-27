import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

const finalConfig = {images: {unoptimized: true},basePath: "/repo",output: "export"}
Object.assign(finalConfig, withNextIntl(nextConfig))

export default finalConfig;
