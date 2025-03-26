
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Utilisez une image de fond de haute qualité qui reflète le domaine de la sonorisation
const heroBackground = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sonic-900/80 to-sonic-900/40"></div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            className="inline-block mb-3 text-gold-400 text-sm md:text-base font-medium tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sonorisation professionnelle dans le Var
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Donnez vie à vos événements avec un son <span className="text-gold-500">exceptionnel</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Location de matériel professionnel, prestations DJ et services d'animation pour tous vos événements. Faites confiance à notre expertise pour une expérience sonore inoubliable.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/services" 
              className="btn-gold w-full sm:w-auto text-lg font-medium"
            >
              Découvrir nos services
            </Link>
            <Link 
              to="/contact" 
              className="btn-sonic w-full sm:w-auto text-lg font-medium"
            >
              Demander un devis
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm font-medium mb-2">Découvrir</span>
          <svg 
            className="w-6 h-6 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
