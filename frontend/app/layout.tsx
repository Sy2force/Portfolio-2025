import type { Metadata } from 'next';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MatrixBackgroundClient from '../components/layout/MatrixBackgroundClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio Shay Acoca - Développeur Full-Stack & Expert Marketing',
  description: 'Portfolio professionnel de Shay Acoca, développeur full-stack et expert en marketing digital basé à Jérusalem. Spécialisé en React, Next.js, Node.js, MongoDB et stratégies digitales innovantes.',
  keywords: ['Shay Acoca', 'développeur full-stack', 'marketing digital', 'Next.js', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Jérusalem', 'Israël', 'portfolio', 'développeur web', 'expert marketing'],
  authors: [{ name: 'Shay Acoca', url: 'https://portfolio-2025-ashy-theta.vercel.app' }],
  creator: 'Shay Acoca',
  publisher: 'Shay Acoca',
  category: 'technology',
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
  openGraph: {
    title: 'Portfolio Shay Acoca - Développeur Full-Stack & Expert Marketing',
    description: 'Portfolio professionnel de Shay Acoca, développeur full-stack et expert en marketing digital basé à Jérusalem. Découvrez mes projets innovants et compétences techniques.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://portfolio-2025-ashy-theta.vercel.app',
    siteName: 'Portfolio Shay Acoca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Shay Acoca - Développeur Full-Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Shay Acoca - Développeur Full-Stack & Expert Marketing',
    description: 'Portfolio professionnel de Shay Acoca, développeur full-stack et expert en marketing digital basé à Jérusalem.',
    images: ['/images/og-image.jpg'],
    creator: '@shayacoca',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00FFAA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-matrix-dark text-white font-sans">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {/* Matrix Background */}
          <MatrixBackgroundClient />
          
          {/* Main Layout */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-1 pt-20">
              {children}
            </main>
            
            <Footer />
          </div>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(10, 10, 15, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 255, 170, 0.2)',
                color: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 255, 170, 0.1)',
              },
              success: {
                duration: 3000,
                style: {
                  background: 'rgba(0, 255, 170, 0.1)',
                  border: '1px solid rgba(0, 255, 170, 0.3)',
                  color: '#00FFAA',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: 'rgba(255, 64, 129, 0.1)',
                  border: '1px solid rgba(255, 64, 129, 0.3)',
                  color: '#FF4081',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
