
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/services/sonorisation/HeroSection';
import ServicesGridSection from '@/components/services/sonorisation/ServicesGridSection';
import FormulesPricingSection from '@/components/services/sonorisation/FormulesPricingSection';
import CTASection from '@/components/services/sonorisation/CTASection';

const Sonorisation = () => {
  const serviceDescription = "Notre expertise en sonorisation professionnelle vous garantit une qualité audio exceptionnelle pour tous vos événements. De l'étude acoustique préalable à l'assistance technique le jour J, nous mettons à votre disposition un équipement haut de gamme et une équipe expérimentée pour une diffusion sonore parfaitement maîtrisée. Que ce soit pour un mariage, un concert, une conférence ou un festival, nous vous accompagnons avec des solutions sur-mesure adaptées à vos besoins.";

  return (
    <>
      <Helmet>
        <title>Sonorisation Professionnelle | Sonorisation 83 - Solutions audio dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="sonorisation professionnelle, location sono, système audio, concert, événementiel, var, paca" />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <ServicesGridSection />
        <FormulesPricingSection />
        <CTASection />
      </div>
    </>
  );
};

export default Sonorisation;
