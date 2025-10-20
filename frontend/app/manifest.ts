import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portfolio Shay Acoca - Développeur Full-Stack & Expert Marketing',
    short_name: 'Shay Acoca Portfolio',
    description: 'Portfolio professionnel de Shay Acoca, développeur full-stack et expert en marketing digital basé à Jérusalem.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a23',
    theme_color: '#00FFAA',
    orientation: 'portrait-primary',
    categories: ['business', 'productivity', 'developer'],
    lang: 'fr',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
