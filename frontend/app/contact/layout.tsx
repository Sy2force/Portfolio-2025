import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Shay Acoca | Full Stack Developer',
  description: 'Contactez Shay Acoca pour vos projets de développement web, design UI/UX et marketing digital. Disponible pour de nouveaux projets.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
