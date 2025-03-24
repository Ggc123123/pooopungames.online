/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co',
      'example.com',
      'www.onlinegames.io',
      'onlinegames.io',
      'img.onlinegames.io',
      'assets.onlinegames.io',
      'cdn.onlinegames.io',
      'images.onlinegames.io',
      'media.onlinegames.io',
      'static.onlinegames.io',
      'www.crazygames.com',
      'images.crazygames.com',
      'cdn.crazygames.com',
      'gameforge.com',
      'cdn.gameforge.com',
      'images.gameforge.com',
      'img.gamedistribution.com',
      'media.gamedistribution.com',
      'static.gamedistribution.com',
      'assets.gamedistribution.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.onlinegames.io'
      },
      {
        protocol: 'https',
        hostname: '**.crazygames.com'
      },
      {
        protocol: 'https',
        hostname: '**.gamedistribution.com'
      },
      {
        protocol: 'https',
        hostname: '**.gameforge.com'
      }
    ]
  }
}

module.exports = nextConfig 