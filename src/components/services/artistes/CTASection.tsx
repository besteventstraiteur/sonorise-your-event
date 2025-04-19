
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="py-20 bg-pink-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
          Besoin d'artistes pour votre événement ?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-10">
          Contactez-nous dès maintenant pour discuter de vos besoins et obtenir un devis personnalisé.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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
