
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/services/animation/HeroSection';
import AnimationFeatures from '@/components/services/animation/AnimationFeatures';
import GallerySection from '@/components/services/animation/GallerySection';
import TestimonialsSection from '@/components/services/animation/TestimonialsSection';
import CTASection from '@/components/services/animation/CTASection';

const AnimationEvenementielle = () => {
  return (
    <>
      <Helmet>
        <title>Animation Événementielle | Sonorisation 83 - Animation Professionnelle dans le Var</title>
        <meta name="description" content="Transformez votre événement avec nos animations personnalisées: animations thématiques, jeux interactifs et une ambiance garantie pour tous vos événements." />
        <meta name="keywords" content="animation événementielle, animation soirée, animation var, jeux interactifs, animation thématique" />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <AnimationFeatures />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
};

export default AnimationEvenementielle;
