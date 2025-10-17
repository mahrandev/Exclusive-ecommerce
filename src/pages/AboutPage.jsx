import React from 'react';
import { Link } from 'react-router-dom';
import StorySection from '@/components/about/StorySection';
import StatsSection from '@/components/about/StatsSection';
import TeamSection from '@/components/about/TeamSection';
import FeaturesSection from '@/components/about/FeaturesSection';

const Breadcrumbs = () => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
    <p className="text-sm text-gray-600">
      <Link to="/" className="transition-colors hover:text-gray-900 hover:underline">Home</Link>
      <span className="mx-2">/</span>
      <span>About</span>
    </p>
  </div>
);

const AboutPage = () => {
  return (
    <>
      <Breadcrumbs />
      <StorySection />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <StatsSection />
        <TeamSection />
        <FeaturesSection />
      </div>
    </>
  );
};

export default AboutPage;
