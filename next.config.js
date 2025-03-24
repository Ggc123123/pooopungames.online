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
  basePath: process.env.NODE_ENV === 'production' ? '/pooopungames.online' : '',
}

module.exports = nextConfig 