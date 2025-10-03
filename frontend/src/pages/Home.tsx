import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import HeroSection from '../components/Home/HeroSection'
import FeaturedProjects from '../components/Home/FeaturedProjects'
import SkillsGrid from '../components/Skills/SkillsGrid'
import ServicesSection from '../components/Services/ServicesSection'
import ExperienceTimeline from '../components/Experience/ExperienceTimeline'
import CTASection from '../components/Home/CTASection'
import { SEO } from '../utils/seo'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Animations
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)
      
      // Parallax effect for sections
      gsap.utils.toArray('.parallax-section').forEach((section: any) => {
        gsap.to(section, {
          y: -100,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }
    
    initAnimations()
  }, [])

  return (
    <>
      <SEO 
        title="Shaya Coca - Digital Marketer & Full-Stack Developer"
        description="Expert React, Node.js, MongoDB | Spécialisé UI/UX futuriste, SEO, Growth, IA"
      />
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative overflow-hidden min-h-screen"
      >
        {/* Hero Section */}
        <HeroSection />
      
      {/* Featured Projects */}
      <section className="relative py-32 parallax-section">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-secondary/20 to-transparent" />
        <FeaturedProjects />
      </section>
      
      {/* Skills Grid */}
      <section id="skills" className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
          >
            Mes <span className="text-gradient">Compétences</span>
          </motion.h2>
          <SkillsGrid />
        </div>
      </section>

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Services Section */}
      <ServicesSection />

      {/* Call to Action */}
      <CTASection />
    </motion.div>
    </>
  )
}

export default Home
