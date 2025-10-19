import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Shay Acoca | Digital Marketing Expert & Developer',
  description: 'Discover Shay Acoca\'s journey: Digital Marketing Expert, Content Creator and Full-Stack Developer. Former IDF soldier, HackerU student.',
  alternates: {
    languages: {
      'fr': '/a-propos',
      'en': '/about',
    },
  },
  openGraph: {
    title: 'About - Shay Acoca',
    description: 'Digital Marketing Expert & Full-Stack Developer',
    images: ['/images/shay-acoca.jpg'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
