import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  metadataBase: new URL('https://trufflesmacedonia.com'),
  title: {
    default: 'Truffles Macedonia | Premium Lagotto Romagnolo Breeders',
    template: '%s | Truffles Macedonia'
  },
  icons: {
    icon: '/logotto.webp',
    apple: '/logotto.webp'
  },
  description: "Truffles Macedonia - Premier Lagotto Romagnolo breeder in Europe. Champion bloodlines, health-tested puppies, award-winning Italian truffle hunting dogs. FCI-recognized kennel with lifetime support.",
  keywords: [
    'Lagotto Romagnolo breeder',
    'Lagotto Romagnolo puppies for sale',
    'truffle hunting dogs',
    'Italian water dog',
    'hypoallergenic dogs',
    'champion bloodlines',
    'European dog breeder',
    'Macedonia',
    'FCI kennel',
    'Lagotto Romagnolo Macedonia',
    'non-shedding dogs',
    'truffle dogs Europe',
    'Lagotto breeder Europe'
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


