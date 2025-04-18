
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import GallerySection from '@/components/testimonials/GallerySection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DownloadBrochuresSection from '@/components/home/DownloadBrochuresSection';
import FAQSection from '@/components/home/FAQSection';
import PricingCalculator from '@/components/home/PricingCalculator';
import AnimationFeatures from '@/components/services/animation/AnimationFeatures';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingCalculator />
      
      {/* Animation Features Section with completely revamped styling */}
      <div className="my-12 py-4 px-2 bg-gradient-to-r from-white via-gray-50 to-pink-50 rounded-lg shadow-inner">
        <h2 className="text-center text-2xl font-semibold text-pink-700 mb-6">Nos prestations d'animation</h2>
        <AnimationFeatures />
      </div>
      
      <DownloadBrochuresSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
    </div>
  );
};

export default Index;
