'use client';

import React from 'react';
import HeroMinimal from '../../components/sections/HeroMinimal';
import ProjectsMinimal from '../../components/sections/ProjectsMinimal';
import SkillsMinimal from '../../components/sections/SkillsMinimal';
import ContactMinimal from '../../components/ui/ContactMinimal';
import FooterMinimal from '../../components/layout/FooterMinimal';

export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroMinimal />
      <ProjectsMinimal />
      <SkillsMinimal />
      <ContactMinimal />
      <FooterMinimal />
    </div>
  );
}
