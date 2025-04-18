
import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import FeatureCard from './features/FeatureCard';
import { featuresData } from './features/FeaturesData';
import { motion } from 'framer-motion';

const ServiceFeatures = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Notre expertise DJ"
          subtitle="Services"
          description="Découvrez ce qui fait la différence dans nos prestations DJ"
          centered
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FeatureCard
                key={feature.title}
                icon={<Icon className="w-8 h-8 text-pink-600" />}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceFeatures;
