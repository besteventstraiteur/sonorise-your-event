
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/services/dj/HeroSection';
import ServiceFeatures from '@/components/services/dj/ServiceFeatures';
import PricingSection from '@/components/services/dj/PricingSection';
import CTASection from '@/components/services/dj/CTASection';

const DJProfessionnel = () => {
  const serviceDescription = "Notre service de DJ professionnel est bien plus qu'une simple animation musicale. Nous proposons une expérience sonore sur-mesure qui transformera votre événement en moment inoubliable. Avec plus de 15 ans d'expérience dans l'événementiel, nos DJs professionnels s'adaptent à tous types de celebrations : mariages, soirées d'entreprise, anniversaires, festivals. Leur expertise technique et leur sens du rythme garantissent une ambiance parfaitement maîtrisée, du choix des morceaux à la gestion du son et de la lumière.";

  return (
    <>
      <Helmet>
        <title>DJ Professionnel | Sonorisation 83 - Animation musicale dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="DJ mariage, animation soirée, DJ événementiel, musique var, animation professionnelle" />
      </Helmet>

      <div className="min-h-screen pb-12 sm:pb-16">
        <HeroSection />
        <ServiceFeatures />
        <PricingSection />
        <CTASection />
      </div>
    </>
  );
};

export default DJProfessionnel;
