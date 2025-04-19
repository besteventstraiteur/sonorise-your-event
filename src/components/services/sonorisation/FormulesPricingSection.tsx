
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionTitle from '@/components/ui/SectionTitle';
import { Link } from 'react-router-dom';

const formules = [
  {
    title: "Pack Essential",
    description: "Idéal pour les petits événements jusqu'à 100 personnes",
    features: [
      "2 enceintes actives 1000W",
      "1 caisson de basse 1200W",
      "1 console de mixage numérique",
      "2 microphones sans fil",
      "Câblage et pieds inclus",
      "Installation et assistance technique"
    ],
    price: "À partir de 290€"
  },
  {
    title: "Pack Performance",
    description: "Solution complète pour événements jusqu'à 300 personnes",
    features: [
      "4 enceintes actives 1500W",
      "2 caissons de basse 2000W",
      "1 console numérique professionnelle",
      "4 microphones sans fil",
      "Système de monitoring",
      "Technicien dédié sur toute la durée"
    ],
    price: "À partir de 590€"
  },
  {
    title: "Pack Premium",
    description: "Configuration professionnelle pour grands événements",
    features: [
      "Système Line Array complet",
      "Amplification Crown/Lab Gruppen",
      "Console numérique haut de gamme",
      "Kit microphones complet",
      "Système intercom",
      "2 techniciens professionnels"
    ],
    price: "Sur devis"
  }
];

const FormulesPricingSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos formules de sonorisation"
          subtitle="Forfaits adaptés"
          description="Choisissez la configuration qui correspond à vos besoins"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {formules.map((formule, index) => (
            <motion.div
              key={formule.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <Card className="flex-1">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-2 text-pink-700">{formule.title}</h3>
                  <p className="text-gray-600 mb-4">{formule.description}</p>
                  <ul className="space-y-2 mb-6">
                    {formule.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="text-pink-600 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg font-semibold text-pink-700">{formule.price}</p>
                  <Button 
                    className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
                    asChild
                  >
                    <Link to="/devis">
                      Demander un devis
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormulesPricingSection;
