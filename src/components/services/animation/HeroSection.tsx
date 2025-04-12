
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-800 to-pink-700 text-white py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
            Animation Événementielle
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
            Transformez votre événement en une expérience inoubliable avec nos animations personnalisées
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-white text-pink-700 hover:bg-gray-100"
              size="lg"
              asChild
            >
              <Link to="/devis">
                Demander un devis
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              size="lg"
              asChild
            >
              <a href="/brochures/animation-evenementielle.pdf" download>
                <Download className="mr-2 h-5 w-5" /> Télécharger la brochure
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
