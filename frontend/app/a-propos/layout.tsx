import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos - Shay Acoca | Expert Marketing Digital & Développeur',
  description: 'Découvrez le parcours de Shay Acoca : Expert Marketing Digital, Créateur de Contenu et Développeur Full-Stack. Ancien combattant Tsahal, étudiant HackerU.',
  alternates: {
    languages: {
      'fr': '/a-propos',
      'en': '/about',
    },
  },
  openGraph: {
    title: 'À Propos - Shay Acoca',
    description: 'Expert Marketing Digital & Développeur Full-Stack',
    images: ['/images/shay-acoca.jpg'],
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
