
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/ui/SectionTitle';

const PricingSection = () => {
  const formules = [
    {
      title: "Pack Essentiel",
      description: "Idéal pour petits événements jusqu'à 50 personnes",
      price: "À partir de 490€",
      features: [
        "DJ professionnel",
        "Sonorisation basique",
        "2h de prestation",
        "Répertoire varié",
        "Animation de base"
      ]
    },
    {
      title: "Pack Premium",
      description: "Solution complète pour événements jusqu'à 200 personnes",
      price: "À partir de 890€",
      features: [
        "DJ professionnel confirmé",
        "Sonorisation professionnelle",
        "4h de prestation",
        "Éclairage dynamique",
        "Animation interactive",
        "Choix musical personnalisé"
      ]
    },
    {
      title: "Pack Prestige",
      description: "Configuration haut de gamme pour grands événements",
      price: "Sur devis",
      features: [
        "DJ expert international",
        "Système son & lumière complet",
        "6h de prestation",
        "Écrans & effets spéciaux",
        "Technique de mix avancée",
        "Accompagnement sur-mesure"
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos formules DJ"
          subtitle="Tarifs"
          description="Choisissez la configuration qui correspond à votre événement"
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

export default PricingSection;
