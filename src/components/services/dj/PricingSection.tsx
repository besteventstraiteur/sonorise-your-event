
import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import PriceCard from './pricing/PriceCard';
import { pricingPlans } from './pricing/PricingData';

const PricingSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Nos formules DJ"
          subtitle="Tarifs"
          description="Découvrez nos offres adaptées à vos besoins"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
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
    </div>
  );
};

export default PricingSection;
