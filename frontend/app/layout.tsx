import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shayacoca.dev'),
  title: {
    default: 'Shay Acoca - Développeur Full-Stack & Architecte Solutions',
    template: '%s | Shay Acoca'
  },
  description: 'Développeur Full-Stack passionné par la création d\'expériences numériques exceptionnelles. Spécialisé en React, Next.js, TypeScript, Node.js et architectures cloud modernes.',
  keywords: ['développeur full-stack', 'react', 'next.js', 'typescript', 'node.js', 'architecte solutions', 'tel aviv', 'portfolio', 'web development', 'javascript'],
  authors: [{ name: 'Shay Acoca', url: 'https://shayacoca.dev' }],
  creator: 'Shay Acoca',
  publisher: 'Shay Acoca',
  category: 'Technology',
  classification: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'he_IL'],
    url: 'https://shayacoca.dev',
    siteName: 'Shay Acoca - Portfolio',
    title: 'Shay Acoca - Développeur Full-Stack & Architecte Solutions',
    description: 'Développeur Full-Stack passionné créant des expériences numériques exceptionnelles avec React, Next.js, TypeScript et Node.js.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shay Acoca - Développeur Full-Stack Portfolio',
        type: 'image/jpeg',
      },
      {
        url: '/images/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Shay Acoca - Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shayacoca',
    creator: '@shayacoca',
    title: 'Shay Acoca - Développeur Full-Stack & Architecte Solutions',
    description: 'Développeur Full-Stack créant des expériences numériques exceptionnelles avec les technologies modernes.',
    images: {
      url: '/images/og-image.jpg',
      alt: 'Shay Acoca - Portfolio',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://shayacoca.dev',
    languages: {
      'fr-FR': 'https://shayacoca.dev/fr',
      'en-US': 'https://shayacoca.dev/en',
      'he-IL': 'https://shayacoca.dev/he',
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-primary-100 selection:text-primary-900">
          {children}
        </div>
      </body>
    </html>
  );
}
