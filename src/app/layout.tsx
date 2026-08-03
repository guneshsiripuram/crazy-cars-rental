import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://crazy-cars-rental.vercel.app'),
  title: 'Crazy Cars Self Drive Rental | Visakhapatnam | Reliable Self Drive Cars',
  description: 'Premium self-drive car rental service providing clean, well-maintained, affordable cars in Visakhapatnam for daily, weekly, monthly and hourly rentals. Call 7337422124.',
  keywords: 'Crazy Cars Self Drive Rental, Self Drive Cars Visakhapatnam, Car Rental Gajuwaka, Hire Swift Vizag, Hire Fortuner Vizag, Self drive car Vizag',
  authors: [{ name: 'Crazy Cars Self Drive Rental' }],
  openGraph: {
    title: 'Crazy Cars Self Drive Rental - Visakhapatnam',
    description: 'Rent clean & sanitized self-drive cars in Visakhapatnam. Swift, i20, Dzire, Thar, Fortuner, Creta & Innova. Hourly, daily & monthly rates.',
    url: 'https://crazy-cars-rental.vercel.app',
    siteName: 'Crazy Cars Self Drive Rental',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Crazy Cars Self Drive Rental Visakhapatnam',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crazy Cars Self Drive Rental - Visakhapatnam',
    description: 'Reliable Self Drive Car Rental in Visakhapatnam. Swift, Fortuner, Thar, Creta & Innova.',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="antialiased selection:bg-blue-600/20 selection:text-blue-600">
        {children}
      </body>
    </html>
  );
}
