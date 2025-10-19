import React from 'react';
import StorySection from '@/components/about/StorySection';
import StatsSection from '@/components/about/StatsSection';
import TeamSection from '@/components/about/TeamSection';
import FeaturesSection from '@/components/about/FeaturesSection';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs />
      <StorySection />
      <StatsSection />
      <TeamSection />
      <FeaturesSection />
    </div>
  );
};

export default AboutPage;
