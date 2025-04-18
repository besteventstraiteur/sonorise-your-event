
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import GallerySection from '@/components/testimonials/GallerySection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DownloadBrochuresSection from '@/components/home/DownloadBrochuresSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <DownloadBrochuresSection />
      <TestimonialsSection />
      <GallerySection />
    </div>
  );
};

export default Index;
