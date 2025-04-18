
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/services/animation/HeroSection';
import AnimationFeatures from '@/components/services/animation/AnimationFeatures';
import GallerySection from '@/components/services/animation/GallerySection';
import TestimonialsSection from '@/components/services/animation/TestimonialsSection';
import CTASection from '@/components/services/animation/CTASection';

const AnimationEvenementielle = () => {
  const serviceDescription = "Nos animations événementielles sont conçues pour créer des moments uniques et inoubliables. Au-delà d'un simple divertissement, nous proposons des expériences interactives qui captiveront vos invités. Notre équipe d'animateurs professionnels adapte chaque prestation à votre événement, que ce soit par des jeux sur-mesure, des animations thématiques ou des concepts originaux. Nous comprenons que chaque celebration est différente, et c'est pourquoi nous personnalisons notre approche pour correspondre parfaitement à vos attentes. Que vous organisiez un mariage, un séminaire d'entreprise ou un anniversaire, nous garantissons une ambiance dynamique et mémorable qui fera de votre événement un succès total.";

  return (
    <>
      <Helmet>
        <title>Animation Événementielle | Sonorisation 83 - Animation Professionnelle dans le Var</title>
        <meta name="description" content={serviceDescription} />
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
