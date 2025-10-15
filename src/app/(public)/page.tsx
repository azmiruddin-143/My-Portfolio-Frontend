
import ContactPage from '@/components/modules/contact/ContactPage';
import AboutMeSection from '@/components/modules/Home/AboutMeSection';
import Hero from '@/components/modules/Home/Hero';
import SkillsSection from '@/components/modules/Home/SkillsSection';
import LatestProject from '@/components/modules/Projects/LatestProject';
import React from 'react';

const Homepage = async () => {

  return (
    <div>
      <Hero />
      <AboutMeSection></AboutMeSection>
      <SkillsSection></SkillsSection>
      <LatestProject></LatestProject>
      <ContactPage></ContactPage>
    </div>
  );
};

export default Homepage;