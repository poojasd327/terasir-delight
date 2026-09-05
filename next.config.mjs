/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/terasiri',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

export default nextConfig;
