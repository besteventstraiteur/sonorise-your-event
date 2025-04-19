
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import LocationStepper from '@/components/location/LocationStepper';
import GridSection from '@/components/ui/layout/GridSection';
import ImageGrid from '@/components/ui/ImageGrid';
import ImageCard from '@/components/ui/ImageCard';

const Location = () => {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200",
      alt: "Sonorisation Concert",
      description: "Configuration son et lumière pour concert",
      filter: "pink" as const
    },
    {
      src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200",
      alt: "Matériel DJ",
      description: "Équipement professionnel pour vos événements",
      filter: "purple" as const
    },
    {
      src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200",
      alt: "Éclairage Événementiel",
      description: "Solutions d'éclairage pour tous types d'événements",
      filter: "gold" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-700 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <GridSection>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:order-2"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Location de Matériel
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl opacity-90">
                Équipements professionnels disponibles à la location pour vos événements
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200" 
                alt="Équipement de sonorisation" 
                className="rounded-lg shadow-xl w-full object-cover aspect-video"
              />
            </motion.div>
          </GridSection>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-16">
        <SectionTitle 
          title="Notre Matériel"
          subtitle="Découvrez"
          description="Une sélection d'équipements professionnels pour vos événements"
          centered
          className="mb-12"
        />
        <ImageGrid>
          {galleryImages.map((image, index) => (
            <ImageCard
              key={index}
              src={image.src}
              alt={image.alt}
              description={image.description}
              index={index}
              filter={image.filter}
            />
          ))}
        </ImageGrid>
      </div>

      <div className="container mx-auto px-4 py-16">
        <LocationStepper />
      </div>
    </div>
  );
};

export default Location;
