/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',');
// const nextConfig = {};

// export default nextConfig;
const nextConfig = {
    output: 'standalone',
    env: {
      apiUrl: process.env.API_URL,
      // KEY: process.env.KEY,
      NEXT_PUBLIC_IMAGE_DOMAINS: process.env.NEXT_PUBLIC_IMAGE_DOMAINS
    },
// next.config.js

  images: {
    domains: ['localhost', 'platform.bizplay.co.kr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'platform.bizplay.co.kr',
        port: '',
        pathname: '/wecloud3/**',
      },
    ],
  },


    typescript: {
      ignoreBuildErrors: true,
    },
    rules: {
      "no-console": "off",
      },
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx'],
  };
  
  module.exports = nextConfig;