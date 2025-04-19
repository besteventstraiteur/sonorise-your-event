
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/836903f4-91d6-4c7f-9533-c08b871a6fba.jpg" 
          alt="Sonorisation et éclairage professionnel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sonic-900/90 to-sonic-900/70"></div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 z-10 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            className="inline-block mb-3 text-gold-400 text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sonorisation professionnelle dans le Var
          </motion.span>
          
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Donnez vie à vos événements avec un son <span className="text-gold-500">exceptionnel</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Location de matériel professionnel, prestations DJ et services d'animation pour tous vos événements. Faites confiance à notre expertise pour une expérience sonore inoubliable.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/services" 
              className="w-full sm:w-auto text-sm sm:text-base font-medium bg-gold-600 hover:bg-gold-500 text-pink-900 px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-lg border-2 border-gold-500 transition-all duration-300"
            >
              Découvrir nos services
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto text-sm sm:text-base font-medium bg-pink-700 hover:bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-lg border-2 border-pink-600 transition-all duration-300"
            >
              Demander un devis
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
