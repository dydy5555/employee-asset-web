/** @type {import('next').NextConfig} */
// const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',');
const nextConfig = {};

export default nextConfig;
// const nextConfig = {
//     env: {
//       API_URL: process.env.API_URL,
//       KEY: process.env.KEY,
//       NEXT_PUBLIC_IMAGE_DOMAINS: process.env.NEXT_PUBLIC_IMAGE_DOMAINS
//     },
//     images: {
//       domains: imageDomains,
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: '**',
//           port: '',
//           pathname: '**',
//         },
//       ],
//     },
//     typescript: {
//       ignoreBuildErrors: true,
//     },
//     rules: {
//       "no-console": "off",
//       },
//     reactStrictMode: true,
//     pageExtensions: ['ts', 'tsx'],
//   };
  
//   module.exports = nextConfig;