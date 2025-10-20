'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  type: 'work' | 'education' | 'project' | 'achievement';
  isActive?: boolean;
}

interface TimelineProps {
  items?: TimelineItem[];
}

// Matrix Timeline Icons
const MatrixWorkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="14" r="2" fill="currentColor"/>
    <path d="M8 14H16" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
  </svg>
);

const MatrixEducationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 10V6L12 2L2 6V10L12 14L22 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12V17C6 17 9 20 12 20S18 17 18 17V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="2" fill="currentColor"/>
  </svg>
);

const MatrixProjectIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V22" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const MatrixAchievementIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

const defaultTimelineItems: TimelineItem[] = [
  {
    id: '2024',
    year: '2024',
    title: 'Full-Stack Developer Freelance',
    company: 'Entrepreneur Digital',
    description: 'Développement d\'applications web modernes avec React, Node.js et Next.js. Création de solutions digitales innovantes pour des clients internationaux.',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Vercel'],
    type: 'work',
    isActive: true
  },
  {
    id: '2023',
    year: '2023',
    title: 'Formation Développeur Full-Stack',
    company: 'HackerU Academy',
    description: 'Formation intensive de 400 heures en développement web. Apprentissage des technologies modernes et des meilleures pratiques du développement.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Git'],
    type: 'education'
  },
  {
    id: '2022-2024',
    year: '2022-2024',
    title: 'Spécialiste Marketing Digital',
    company: 'Bezeq International',
    description: 'Gestion de campagnes marketing multi-canaux, optimisation SEO/SEM, et développement de stratégies digitales pour augmenter la visibilité en ligne.',
    technologies: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO', 'Content Marketing'],
    type: 'work'
  },
  {
    id: '2021',
    year: '2021',  
    title: 'Certification Meta Blueprint',
    company: 'Meta (Facebook)',
    description: 'Certification officielle en publicité Facebook et Instagram. Maîtrise des outils publicitaires et des stratégies de ciblage avancées.',
    technologies: ['Facebook Ads', 'Instagram Ads', 'Pixel Tracking', 'Campaign Optimization'],
    type: 'achievement'
  },
  {
    id: '2020',
    year: '2020',
    title: 'Projets E-commerce & Landing Pages',
    company: 'Projets Personnels',
    description: 'Développement de plusieurs sites e-commerce et landing pages avec WordPress et outils no-code. Focus sur l\'UX/UI et les conversions.',
    technologies: ['WordPress', 'WooCommerce', 'Figma', 'Adobe Suite', 'Shopify'],
    type: 'project'
  }
];

const getIconByType = (type: string) => {
  switch (type) {
    case 'work':
      return <MatrixWorkIcon />;
    case 'education':
      return <MatrixEducationIcon />;
    case 'project':
      return <MatrixProjectIcon />;
    case 'achievement':
      return <MatrixAchievementIcon />;
    default:
      return <MatrixWorkIcon />;
  }
};

const getColorByType = (type: string) => {
  switch (type) {
    case 'work':
      return { primary: '#00FFAA', secondary: '#888EF0' };
    case 'education':
      return { primary: '#888EF0', secondary: '#3C3C66' };
    case 'project':
      return { primary: '#00FFAA', secondary: '#888EF0' };
    case 'achievement':
      return { primary: '#FFD700', secondary: '#FF4081' };
    default:
      return { primary: '#00FFAA', secondary: '#888EF0' };
  }
};

const Timeline: React.FC<TimelineProps> = ({ items = defaultTimelineItems }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-timeline-id');
            if (id) setActiveItem(id);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    const timelineItems = document.querySelectorAll('[data-timeline-id]');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto px-6 py-16">
      {/* Matrix Timeline Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-mono font-bold matrix-text mb-6">
          <span className="text-[#00FFAA]">{'< '}</span>
          PARCOURS_PROFESSIONNEL
          <span className="text-[#00FFAA]">{' />'}</span>
        </h2>
        <p className="text-white/80 text-lg font-mono max-w-2xl mx-auto">
          Mon évolution dans l'écosystème digital, de l'acquisition de compétences 
          à la création de solutions innovantes.
        </p>
      </motion.div>

      {/* Matrix Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-px">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-[#00FFAA] via-[#888EF0] to-[#00FFAA] opacity-30"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: 'top' }}
        />
        
        {/* Moving Matrix Particles */}
        <motion.div
          className="absolute inset-0 w-full"
          animate={{
            background: [
              'linear-gradient(0deg, transparent 0%, rgba(0, 255, 170, 0.6) 50%, transparent 100%)',
              'linear-gradient(0deg, transparent 20%, rgba(136, 142, 240, 0.6) 70%, transparent 100%)',
              'linear-gradient(0deg, transparent 0%, rgba(0, 255, 170, 0.6) 50%, transparent 100%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Timeline Items */}
      <div className="space-y-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const colors = getColorByType(item.type);
          const isActive = activeItem === item.id || item.isActive;

          return (
            <motion.div
              key={item.id}
              data-timeline-id={item.id}
              initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
                whileHover={{ scale: 1.2 }}
                animate={isActive ? {
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    `0 0 0px ${colors.primary}`,
                    `0 0 30px ${colors.primary}`,
                    `0 0 0px ${colors.primary}`
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div 
                  className={`w-16 h-16 matrix-glass rounded-2xl border-4 flex items-center justify-center
                    transition-all duration-500 ${
                    isActive 
                      ? 'border-[#00FFAA] shadow-matrix text-[#00FFAA]' 
                      : 'border-[#888EF0]/30 hover:border-[#888EF0] text-[#888EF0]'
                  }`}
                >
                  {getIconByType(item.type)}
                </div>
              </motion.div>

              {/* Timeline Content */}
              <motion.div
                className={`w-5/12 ${isLeft ? 'pr-16' : 'pl-16'}`}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`matrix-glass p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer
                    ${isActive 
                      ? 'border-[#00FFAA]/60 shadow-matrix-lg' 
                      : 'border-[#888EF0]/20 hover:border-[#888EF0]/40'
                    }`}
                  whileHover={{
                    boxShadow: `0 20px 40px ${colors.primary}20`
                  }}
                >
                  {/* Year Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 mb-4"
                    animate={isActive ? {
                      color: [colors.primary, colors.secondary, colors.primary]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div 
                      className={`px-4 py-2 rounded-xl font-mono text-sm font-bold border ${
                        colors.primary === '#00FFAA' ? 'bg-[#00FFAA]/20 border-[#00FFAA]/40 text-[#00FFAA]' :
                        colors.primary === '#888EF0' ? 'bg-[#888EF0]/20 border-[#888EF0]/40 text-[#888EF0]' :
                        colors.primary === '#FFD700' ? 'bg-[#FFD700]/20 border-[#FFD700]/40 text-[#FFD700]' :
                        'bg-[#00FFAA]/20 border-[#00FFAA]/40 text-[#00FFAA]'
                      }`}
                    >
                      {item.year}
                    </div>
                    <motion.div
                      className={`w-2 h-2 rounded-full ${
                        colors.primary === '#00FFAA' ? 'bg-[#00FFAA]' :
                        colors.primary === '#888EF0' ? 'bg-[#888EF0]' :
                        colors.primary === '#FFD700' ? 'bg-[#FFD700]' :
                        'bg-[#00FFAA]'
                      }`}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-mono font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p 
                        className={`font-mono text-sm font-semibold tracking-wider ${
                          colors.secondary === '#888EF0' ? 'text-[#888EF0]' :
                          colors.secondary === '#3C3C66' ? 'text-[#3C3C66]' :
                          colors.secondary === '#FF4081' ? 'text-[#FF4081]' :
                          'text-[#888EF0]'
                        }`}
                      >
                        {item.company}
                      </p>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <div className="text-[#888EF0] text-xs font-mono tracking-wider">
                        TECHNOLOGIES:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: `0 0 10px ${colors.primary}50`
                            }}
                            className="px-3 py-1 matrix-glass border border-[#888EF0]/30 hover:border-[#00FFAA]/60 
                                      rounded-lg text-xs font-mono text-white/90 hover:text-[#00FFAA]
                                      transition-all duration-300 cursor-pointer"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Matrix Status Indicator */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#888EF0]/20">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          colors.primary === '#00FFAA' ? 'bg-[#00FFAA]' :
                          colors.primary === '#888EF0' ? 'bg-[#888EF0]' :
                          colors.primary === '#FFD700' ? 'bg-[#FFD700]' :
                          'bg-[#00FFAA]'
                        }`}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className={`text-xs font-mono ${
                        colors.primary === '#00FFAA' ? 'text-[#00FFAA]' :
                        colors.primary === '#888EF0' ? 'text-[#888EF0]' :
                        colors.primary === '#FFD700' ? 'text-[#FFD700]' :
                        'text-[#00FFAA]'
                      }`}>
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-white/40 text-xs font-mono">
                      NODE_ID: {item.id.replace('-', '').slice(0, 6).toUpperCase()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Matrix Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-20 pt-12 border-t border-[#888EF0]/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'ANNÉES_EXPÉRIENCE', value: '3+', color: '#00FFAA' },
            { label: 'PROJETS_RÉALISÉS', value: '30+', color: '#888EF0' },
            { label: 'TECHNOLOGIES_MAÎTRISÉES', value: '15+', color: '#3C3C66' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
              className="text-center matrix-glass p-6 rounded-2xl border border-[#888EF0]/20 hover:border-[#00FFAA]/40 transition-all duration-300"
            >
              <motion.div 
                className={`text-3xl font-mono font-bold mb-2 ${
                  stat.color === '#00FFAA' ? 'text-[#00FFAA] drop-shadow-[0_0_10px_#00FFAA]' :
                  stat.color === '#888EF0' ? 'text-[#888EF0] drop-shadow-[0_0_10px_#888EF0]' :
                  'text-[#3C3C66] drop-shadow-[0_0_10px_#3C3C66]'
                }`}
                animate={{
                  textShadow: [
                    `0 0 10px ${stat.color}`,
                    `0 0 20px ${stat.color}`,
                    `0 0 10px ${stat.color}`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white/70 text-sm font-mono tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;
