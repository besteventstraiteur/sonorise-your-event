
import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import PriceCard from './pricing/PriceCard';
import { pricingPlans } from './pricing/PricingData';
import { motion } from 'framer-motion';

const PricingSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 via-white to-pink-50/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            title="Nos formules DJ"
            subtitle="Tarifs"
            description="Découvrez nos offres adaptées à vos besoins"
            centered
          />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-16">
          {pricingPlans.map((plan, index) => (
            <PriceCard
              key={plan.title}
              title={plan.title}
              description={plan.description}
              features={plan.features}
              price={plan.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PricingSection;
