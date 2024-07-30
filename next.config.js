/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',');
// const nextConfig = {};

// export default nextConfig;
const nextConfig = {
    env: {
      apiUrl: process.env.API_URL,
      apiUrl1: process.env.API_URL1,
      API_URL_AUTH: process.env.API_URL_AUTH,
      UI_URL: process.env.UI_URL,
      KEY: process.env.NEXT_PUBLIC_KEY,
      NEXT_PUBLIC_IMAGE_DOMAINS: process.env.NEXT_PUBLIC_IMAGE_DOMAINS
    },
// next.config.js

  images: {
    // domains: ['localhost', 'platform.bizplay.co.kr'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'platform.bizplay.co.kr',
    //     port: '',
    //     pathname: '/wecloud3/**',
    //   },
    // ],
    domains: imageDomains,
    remotePatterns: [
      {
        protocol: "https",
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },


    typescript: {
      ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx'],
  };
  
  module.exports = nextConfig;