
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 bg-pink-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
          Votre DJ pour un événement unique
        </h2>
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
          Contactez-nous pour discuter de vos attentes et obtenir un devis personnalisé
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <Button 
            className="w-full sm:w-auto bg-white text-pink-700 hover:bg-gray-100"
            size="lg"
            asChild
          >
            <Link to="/devis">
              Demander un devis
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            size="lg"
            asChild
          >
            <Link to="/contact">
              Nous contacter
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
