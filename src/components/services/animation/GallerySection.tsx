
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const GallerySection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos animations en images"
          subtitle="Galerie"
          description="Découvrez quelques moments forts de nos prestations"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
            >
              <img 
                src={`/placeholder.svg`} 
                alt={`Animation événementielle ${item}`} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
