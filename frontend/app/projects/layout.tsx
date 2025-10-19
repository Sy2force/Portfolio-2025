import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets - Shay Acoca | Portfolio Full Stack Developer',
  description: 'Découvrez mes projets de développement web, applications React, sites e-commerce et solutions digitales. Portfolio complet de Shay Acoca.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
