
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import LocationStepper from '@/components/location/LocationStepper';
import GridSection from '@/components/ui/layout/GridSection';

const Location = () => {
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
                src="/placeholder.svg" 
                alt="Équipement de sonorisation" 
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
          </GridSection>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <LocationStepper />
      </div>
    </div>
  );
};

export default Location;
