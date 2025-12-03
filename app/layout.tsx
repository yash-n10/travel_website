// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/analytics/next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'GoSamyati – Handpicked Destinations, Personalized Experiences',
    template: '%s | GoSamyati'
  },
  description: 'Book a holiday, specially curated for you. Discover handpicked destinations, personalized experiences, and stress-free planning—all tailored to your taste.',
  keywords: ['travel', 'vacation', 'tour packages', 'holiday', 'adventure travel'],
  authors: [{ name: 'Go Samyati', url: 'https://gosamyati.com' }],
  creator: 'Go Samyati Travel',
  publisher: 'Go Samyati Travel',
  metadataBase: new URL('https://gosamyati.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GoSamyati – Handpicked Destinations, Personalized Experiences',
    description: 'Book a holiday, specially curated for you. Discover handpicked destinations, personalized experiences, and stress-free planning—all tailored to your taste.',
    url: 'https://gosamyati.com',
    siteName: 'Go Samyati Travel',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoSamyati – Handpicked Destinations, Personalized Experiences',
    description: 'Book a holiday, specially curated for you. Discover handpicked destinations, personalized experiences, and stress-free planning—all tailored to your taste.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
        <Script  id="razorpay-checkout-script"
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload" />
        {children}
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}