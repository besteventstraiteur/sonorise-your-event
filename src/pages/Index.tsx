
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
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingCalculator />
      
      {/* Completely redesigned Animation Features Section */}
      <section className="my-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-white opacity-50 z-0"></div>
        <div className="absolute top-10 right-10 opacity-10">
          <Sparkles size={120} className="text-pink-300" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-pink-800 mb-4">
              Nos prestations d'animation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services d'animation pour rendre votre événement inoubliable
            </p>
          </div>
          <AnimationFeatures />
        </div>
      </section>
      
      <DownloadBrochuresSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
    </div>
  );
};

export default Index;
