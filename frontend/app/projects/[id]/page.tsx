'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface RealProject {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tech: string[];
  color: string;
  stats: { [key: string]: string };
  github: string;
  live: string;
  image: string;
  featured: boolean;
}

// Project data (same as in ProjectsRealShowcase)
const realProjects: RealProject[] = [
  {
    id: 1,
    title: "FaceWork - Plateforme de cartes de visite numériques",
    description: "Plateforme SaaS complète pour cartes de visite numériques avec 150+ clients actifs et 500+ cartes créées.",
    longDescription: "FaceWork est une plateforme SaaS innovante qui révolutionne les cartes de visite traditionnelles. Elle permet aux professionnels de créer, personnaliser et partager des cartes de visite numériques interactives. Avec plus de 150 clients actifs et 500+ cartes créées, la plateforme offre des fonctionnalités avancées comme l'intégration des réseaux sociaux, l'analyse des interactions, et la synchronisation automatique des contacts.",
    category: "saas",
    tech: ["React", "Next.js", "TypeScript", "MongoDB", "Stripe"],
    color: "from-blue-600 to-purple-600",
    stats: { clients: "150+", cards: "500+", conversion: "15%" },
    github: "https://github.com/Sy2force/BCARD",
    live: "https://futuristcards.netlify.app",
    image: "/images/Design sans titre/card saas.jpg",
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce moderne avec panier intelligent et paiements sécurisés.",
    longDescription: "Une plateforme e-commerce complète développée avec les dernières technologies web. Elle inclut un système de gestion des produits, un panier intelligent, des paiements sécurisés via Stripe, et un tableau de bord administrateur complet. L'interface utilisateur est optimisée pour les conversions avec un design moderne et responsive.",
    category: "ecommerce",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    color: "from-green-600 to-teal-600",
    stats: { products: "200+", orders: "1.2k", revenue: "€45k" },
    github: "https://github.com/shayacoca/ecommerce-platform",
    live: "https://ecommerce-demo.netlify.app",
    image: "/images/Design sans titre/ecommerce.jpg",
    featured: true
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec synchronisation temps réel.",
    longDescription: "Une application de gestion de tâches moderne qui permet aux équipes de collaborer efficacement. Elle offre des fonctionnalités comme la création de projets, l'assignation de tâches, le suivi du temps, et la synchronisation en temps réel. L'interface intuitive et les notifications intelligentes améliorent la productivité des équipes.",
    category: "productivity",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    color: "from-orange-600 to-red-600",
    stats: { users: "500+", tasks: "10k+", teams: "50+" },
    github: "https://github.com/shayacoca/task-manager",
    live: "https://taskmanager-demo.netlify.app",
    image: "/images/Design sans titre/task management.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Real Estate Platform",
    description: "Plateforme immobilière avec recherche avancée et visites virtuelles.",
    longDescription: "Une plateforme immobilière moderne qui connecte acheteurs, vendeurs et agents. Elle propose une recherche avancée avec filtres géographiques, des visites virtuelles 360°, et un système de messagerie intégré. L'interface responsive et les cartes interactives offrent une expérience utilisateur exceptionnelle.",
    category: "real-estate",
    tech: ["Vue.js", "Laravel", "MySQL", "Mapbox"],
    color: "from-purple-600 to-pink-600",
    stats: { properties: "1k+", visits: "50k+", agents: "100+" },
    github: "https://github.com/shayacoca/real-estate",
    live: "https://realestate-demo.netlify.app",
    image: "/images/Design sans titre/real estate.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Learning Management System",
    description: "Plateforme d'apprentissage en ligne avec cours interactifs et certifications.",
    longDescription: "Un système de gestion d'apprentissage complet qui permet aux instructeurs de créer des cours interactifs et aux étudiants d'apprendre à leur rythme. La plateforme inclut des quiz, des certifications, un suivi des progrès, et des outils de collaboration. L'interface adaptive s'ajuste au style d'apprentissage de chaque utilisateur.",
    category: "education",
    tech: ["Angular", "Express", "PostgreSQL", "WebRTC"],
    color: "from-indigo-600 to-blue-600",
    stats: { students: "2k+", courses: "150+", completion: "85%" },
    github: "https://github.com/shayacoca/lms-platform",
    live: "https://lms-demo.netlify.app",
    image: "/images/Design sans titre/lms.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Portfolio Full-Stack 2025",
    description: "Portfolio personnel moderne avec architecture full-stack, multilingue FR/EN/HE et optimisations avancées.",
    longDescription: "Portfolio personnel développé avec Next.js 14 et TypeScript, intégrant une architecture full-stack complète avec backend Express et MongoDB. Interface multilingue (français, anglais, hébreu) avec animations Framer Motion, optimisations de performance avancées et design moderne. Inclut un système d'administration, gestion de contenu dynamique et déploiement automatisé.",
    category: "portfolio",
    tech: ["Next.js 14", "TypeScript", "Express", "MongoDB"],
    color: "from-purple-600 to-pink-600",
    stats: { languages: "3", performance: "A+", features: "25+" },
    github: "https://github.com/Sy2force/Portfolio-2025",
    live: "https://portfolio-shay.netlify.app",
    image: "/images/Design sans titre/Portfolio full stack .jpg",
    featured: true
  }
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  const project = realProjects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Retour aux projets
          </Link>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${project.color}`}>
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-neutral-900">{value}</div>
                  <div className="text-sm text-neutral-500 capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CodeBracketIcon className="w-5 h-5" />
                Voir le Code
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <EyeIcon className="w-5 h-5" />
                Voir la Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
