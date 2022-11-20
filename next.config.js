/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'purecatamphetamine.github.io',
        port: '443',
        pathname: '/country-flag-icons/**',
      },
    ],
  },
}

module.exports = nextConfig
