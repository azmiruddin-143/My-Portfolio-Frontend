
import AboutMeSection from '@/components/modules/Home/AboutMeSection';
import Hero from '@/components/modules/Home/Hero';
import SkillsSection from '@/components/modules/Home/SkillsSection';
import React from 'react';

const Homepage = async () => {

  return (
    <div>
      <Hero />
      <SkillsSection></SkillsSection>
      <AboutMeSection></AboutMeSection>


    </div>
  );
};

export default Homepage;