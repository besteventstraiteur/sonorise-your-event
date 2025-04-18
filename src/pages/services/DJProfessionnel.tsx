
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import HeroSection from '@/components/services/dj/HeroSection';
import ServiceFeatures from '@/components/services/dj/ServiceFeatures';
import PricingSection from '@/components/services/dj/PricingSection';
import CTASection from '@/components/services/dj/CTASection';

const DJProfessionnel = () => {
  const serviceDescription = "Notre service de DJ professionnel est bien plus qu'une simple animation musicale. Nous proposons une expérience sonore sur-mesure qui transformera votre événement en moment inoubliable. Avec plus de 15 ans d'expérience dans l'événementiel, nos DJs professionnels s'adaptent à tous types de celebrations : mariages, soirées d'entreprise, anniversaires, festivals. Leur expertise technique et leur sens du rythme garantissent une ambiance parfaitement maîtrisée, du choix des morceaux à la gestion du son et de la lumière.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-white via-pink-50/10 to-white"
    >
      <Helmet>
        <title>DJ Professionnel | Sonorisation 83 - Animation musicale dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="DJ mariage, animation soirée, DJ événementiel, musique var, animation professionnelle" />
      </Helmet>

      <div className="relative overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ServiceFeatures />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PricingSection />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CTASection />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DJProfessionnel;
