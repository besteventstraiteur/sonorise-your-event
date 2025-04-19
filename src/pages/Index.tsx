
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import GallerySectionComponent from '@/components/testimonials/GallerySection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DownloadBrochuresSection from '@/components/home/DownloadBrochuresSection';
import FAQSection from '@/components/home/FAQSection';
import PricingCalculator from '@/components/home/PricingCalculator';
import AnimationFeatures from '@/components/services/animation/AnimationFeatures';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GallerySection from '@/components/gallery/GallerySection';

const Index = () => {
  // After component mounts, check if we need to scroll to a section based on URL hash
  React.useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Find the element with the id matching the hash
      const element = document.getElementById(hash);
      // If the element exists, scroll to it
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <HowItWorksSection />
      <PricingCalculator />
      
      {/* Add the gallery section here before the CTA */}
      <GallerySection />
      
      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('/src/assets/placeholders/hero-background.jpg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Obtenez un devis personnalisé pour votre événement en quelques clics
          </p>
          <Link to="/devis">
            <Button 
              size="lg"
              className="bg-white text-pink-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Demander votre devis gratuit
            </Button>
          </Link>
        </div>
      </motion.section>
      
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
      <div id="testimonials">
        <TestimonialsSection />
        <GallerySectionComponent />
      </div>
      <FAQSection />
    </div>
  );
};

export default Index;
