'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketSquareIcon, 
  ChartBarIcon, 
  PaintBrushIcon, 
  CheckIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  color: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'development',
    title: 'Développement Web',
    description: 'Applications web modernes, performantes et scalables',
    icon: <CodeBracketSquareIcon className="w-8 h-8" />,
    features: [
      'Applications React/Next.js',
      'API REST & GraphQL',
      'Base de données MongoDB/PostgreSQL',
      'Authentification & sécurité',
      'Intégration paiement Stripe',
      'Déploiement cloud'
    ],
    price: 'À partir de 2000€',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Stratégies digitales pour maximiser votre ROI',
    icon: <ChartBarIcon className="w-8 h-8" />,
    features: [
      'Campagnes Meta Ads',
      'Google Ads optimisé',
      'SEO & Content Marketing',
      'Email Marketing automatisé',
      'Analytics & Reporting',
      'Growth Hacking'
    ],
    price: 'À partir de 1500€/mois',
    color: 'from-green-500 to-green-700',
    popular: true
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Interfaces modernes et expériences utilisateur optimales',
    icon: <PaintBrushIcon className="w-8 h-8" />,
    features: [
      'Design System complet',
      'Prototypage Figma',
      'Responsive Design',
      'Branding & identité visuelle',
      'Tests utilisateurs',
      'Design Sprint'
    ],
    price: 'À partir de 1000€',
    color: 'from-purple-500 to-pink-600'
  }
];

export default function ServicesSection() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Plus populaire
                  </span>
                </div>
              )}
              
              <Card 
                hover 
                gradient={service.popular}
                className={`h-full flex flex-col ${service.popular ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.price}
                  </p>
                  <Button
                    onClick={() => setSelectedService(service)}
                    variant={service.popular ? 'primary' : 'outline'}
                    fullWidth
                    icon={<ArrowRightIcon className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    En savoir plus
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card glass className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Mon processus de travail
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discussion', desc: 'Comprendre vos besoins' },
                { step: '02', title: 'Stratégie', desc: 'Plan d\'action détaillé' },
                { step: '03', title: 'Exécution', desc: 'Développement itératif' },
                { step: '04', title: 'Livraison', desc: 'Support & maintenance' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Service Detail Modal */}
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title}
          size="lg"
        >
          {selectedService && (
            <div className="space-y-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedService.color} flex items-center justify-center text-white`}>
                {selectedService.icon}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">
                {selectedService.description}
              </p>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Ce qui est inclus:
                </h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedService.price}
                </p>
                <div className="flex gap-4">
                  <Button
                    href="/contact"
                    variant="primary"
                    className="flex-1"
                  >
                    Demander un devis
                  </Button>
                  <Button
                    onClick={() => setSelectedService(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
