
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DownloadCloud, Calendar } from 'lucide-react';

const CTASection = () => {
  return (
    <motion.div 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-pink-800 to-pink-700 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Une animation pour votre événement ?
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl max-w-3xl mx-auto mb-6 md:mb-10 opacity-90"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contactez-nous dès maintenant pour discuter de vos besoins et obtenir un devis personnalisé.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              className="w-full sm:w-auto bg-white text-pink-700 hover:bg-gray-100 shadow-lg group transition-all duration-300"
              size="lg"
              asChild
            >
              <Link to="/devis" className="flex items-center gap-2">
                <Calendar className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                <span>Demander un devis</span>
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-white text-white hover:bg-white/20 shadow group transition-all duration-300"
              size="lg"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-2">
                <span>Nous contacter</span>
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              variant="ghost" 
              className="w-full sm:w-auto text-white hover:bg-white/10 group transition-all duration-300"
              size="lg"
              asChild
            >
              <a 
                href="/brochures/animation-evenementielle.pdf" 
                download 
                className="flex items-center gap-2"
              >
                <DownloadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                <span>Télécharger la brochure</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CTASection;
