/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dni30h5dy/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dni30h5dy/**'
      }
    ]
  }
};

module.exports = nextConfig;
