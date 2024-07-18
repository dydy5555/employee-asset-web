/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',');
// const nextConfig = {};

// export default nextConfig;
const nextConfig = {
    output: 'standalone',
    env: {
      apiUrl: process.env.API_URL,
      apiUrl1: process.env.API_URL1,
      API_URL_AUTH: process.env.API_URL_AUTH,
      KEY: process.env.NEXT_PUBLIC_KEY,
      NEXT_PUBLIC_IMAGE_DOMAINS: process.env.NEXT_PUBLIC_IMAGE_DOMAINS
    },
    images: {
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
    rules: {
      "no-console": "off",
      },
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx'],
  };
  
  module.exports = nextConfig;