
import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import FeatureCard from './features/FeatureCard';
import { featuresData } from './features/FeaturesData';

const ServiceFeatures = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Notre expertise DJ"
          subtitle="Services"
          description="Découvrez ce qui fait la différence dans nos prestations DJ"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;

