import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  metadataBase: new URL('https://trufflesmacedonia.com'),
  title: {
    default: 'Truffles Macedonia - Premium Lagotto Romagnolo',
    template: '%s | Truffles Macedonia'
  },
  description: "Europe's leading Lagotto Romagnolo breeders since 1999. Champion bloodline puppies, health tested, Italian truffle hunting dogs.",
  keywords: [
    'Lagotto Romagnolo breeder',
    'Lagotto Romagnolo puppies for sale',
    'truffle hunting dogs',
    'champion bloodlines',
    'European dog breeder',
    'Macedonia'
  ],
  alternates: {
    canonical: '/'   
  },
  openGraph: {
    type: 'website',
    siteName: 'Truffles Macedonia',
    url: 'https://trufflesmacedonia.com',
    images: [{ url: '/og-image.jpg' }]
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}


