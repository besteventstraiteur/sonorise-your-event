
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Music, Star } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const ServiceFeatures = () => {
  const features = [
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Musique sur-mesure",
      description: "Sélection musicale adaptée à votre événement et vos invités"
    },
    {
      icon: <Music className="w-8 h-8 text-pink-600" />,
      title: "Matériel professionnel",
      description: "Sonorisation et éclairage haut de gamme dernier cri"
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "Expérience événementielle",
      description: "Plus de 15 ans d'animation pour tous types d'événements"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Notre expertise DJ"
          subtitle="Services"
          description="Découvrez ce qui fait la différence dans nos prestations DJ"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover-lift h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-pink-50 rounded-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{feature.title}</h3>
                  <p className="text-gray-700 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
