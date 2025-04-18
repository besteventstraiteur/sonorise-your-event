
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import GallerySection from '@/components/testimonials/GallerySection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DownloadBrochuresSection from '@/components/home/DownloadBrochuresSection';
import FAQSection from '@/components/home/FAQSection';
import PricingCalculator from '@/components/home/PricingCalculator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingCalculator />
      <DownloadBrochuresSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
    </div>
  );
};

export default Index;
