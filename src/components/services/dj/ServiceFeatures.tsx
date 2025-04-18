
import React, { Suspense } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import FeatureCard from './features/FeatureCard';
import { featuresData } from './features/FeaturesData';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";

// Loading placeholder for features
const FeaturesSkeleton = () => (
  <div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
    aria-label="Chargement des fonctionnalités"
    role="status"
  >
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-64">
        <Skeleton className="h-full" />
      </div>
    ))}
  </div>
);

const ServiceFeatures = () => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50"
        aria-labelledby="features-title"
      >
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Notre expertise DJ"
            subtitle="Services"
            description="Découvrez ce qui fait la différence dans nos prestations DJ"
            centered
            titleId="features-title"
          />
          
          <Suspense fallback={<FeaturesSkeleton />}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              role="list"
              aria-label="Liste des fonctionnalités DJ"
            >
              {featuresData.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <FeatureCard
                    key={feature.title}
                    icon={<Icon className="w-8 h-8 text-pink-700" aria-hidden="true" />}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                );
              })}
            </motion.div>
          </Suspense>
        </div>
      </motion.section>
    </LazyMotion>
  );
};

export default ServiceFeatures;
