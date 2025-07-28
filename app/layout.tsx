// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Go Samyati Travel',
    template: '%s | Go Samyati Travel'
  },
  description: 'Your premier travel agency for unforgettable journeys to exotic destinations worldwide',
  keywords: ['travel', 'vacation', 'tour packages', 'holiday', 'adventure travel'],
  authors: [{ name: 'Go Samyati', url: 'https://gosamyati.com' }],
  creator: 'Go Samyati Travel',
  publisher: 'Go Samyati Travel',
  metadataBase: new URL('https://gosamyati.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Go Samyati Travel',
    description: 'Your premier travel agency for unforgettable journeys',
    url: 'https://gosamyati.com',
    siteName: 'Go Samyati Travel',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go Samyati Travel',
    description: 'Your premier travel agency for unforgettable journeys',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}