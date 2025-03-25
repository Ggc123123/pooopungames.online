/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      'www.onlinegames.io',
      'onlinegames.io',
      'cloud.onlinegames.io',
      'img.gamedistribution.com',
      'imgs2.dab3games.com',
      'games.poki.com'
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    })
    return config
  },
  publicRuntimeConfig: {
    staticFolder: '/data',
  }
}

module.exports = nextConfig 