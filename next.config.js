/** @type {import('next').NextConfig} */

require('dotenv').config()
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'gukjwxqepfbwkdspkoly.supabase.co',
      'images.unsplash.com',
      'cdn.sanity.io',
    ],
  },
}

module.exports = nextConfig
