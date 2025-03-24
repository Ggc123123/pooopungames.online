import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PoooPun Games - Play Free Online Games',
  description: 'Play the best free online games at PoooPun Games. New games added daily with high-quality gameplay experience.',
  keywords: 'online games, free games, browser games, PoooPun games',
  metadataBase: new URL('https://pooopungames.online'),
  openGraph: {
    title: 'PoooPun Games - Play Free Online Games',
    description: 'Play the best free online games at PoooPun Games. New games added daily!',
    url: 'https://pooopungames.online',
    siteName: 'PoooPun Games',
    images: [
      {
        url: 'https://pooopungames.online/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PoooPun Games - Play Free Online Games',
    description: 'Play the best free online games at PoooPun Games. New games added daily!',
    images: ['https://pooopungames.online/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
