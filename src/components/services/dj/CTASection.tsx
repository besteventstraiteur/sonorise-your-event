
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-12 sm:py-16 md:py-20 bg-pink-700 text-white relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-pink-800 to-pink-600 opacity-50"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6"
        >
          Votre DJ pour un événement unique
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10"
        >
          Contactez-nous pour discuter de vos attentes et obtenir un devis personnalisé
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
        >
          <Button 
            className="w-full sm:w-auto bg-white text-pink-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
            asChild
          >
            <Link to="/devis">
              Demander un devis
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-white text-white hover:bg-white/10 backdrop-blur-sm"
            size="lg"
            asChild
          >
            <Link to="/contact">
              Nous contacter
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTASection;
