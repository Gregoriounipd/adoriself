/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'coeauemtoodganzfygkn.supabase.co',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@supabase/supabase-js"],
  },
}

module.exports = nextConfig