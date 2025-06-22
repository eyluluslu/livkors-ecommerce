/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  // SQLite için gerekli
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  }
}

export default nextConfig
