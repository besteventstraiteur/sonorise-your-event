
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import LocationStepper from '@/components/location/LocationStepper';

const Location = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-700 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Location de Matériel
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Équipements professionnels disponibles à la location pour vos événements
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <LocationStepper />
      </div>
    </div>
  );
};

export default Location;
