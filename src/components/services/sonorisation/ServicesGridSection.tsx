
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Settings, Shield, Music, Star, Users, Truck } from 'lucide-react';

const services = [
  {
    icon: <Settings className="w-8 h-8 text-pink-600" />,
    title: "Installation & réglages",
    description: "Installation professionnelle, paramétrage optimal et test complet du système avant votre événement"
  },
  {
    icon: <Shield className="w-8 h-8 text-pink-600" />,
    title: "Assistance technique",
    description: "Un technicien qualifié présent pendant toute la durée de votre événement"
  },
  {
    icon: <Music className="w-8 h-8 text-pink-600" />,
    title: "Matériel professionnel",
    description: "Un parc de matériel haut de gamme régulièrement entretenu et renouvelé"
  },
  {
    icon: <Star className="w-8 h-8 text-pink-600" />,
    title: "Sur-mesure",
    description: "Une configuration adaptée à votre lieu et vos besoins spécifiques"
  },
  {
    icon: <Users className="w-8 h-8 text-pink-600" />,
    title: "Expertise",
    description: "Plus de 15 ans d'expérience dans l'événementiel professionnel"
  },
  {
    icon: <Truck className="w-8 h-8 text-pink-600" />,
    title: "Livraison incluse",
    description: "Transport, installation et démontage inclus dans nos prestations"
  }
];

const ServicesGridSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Une prestation complète"
          subtitle="Notre expertise à votre service"
          description="Découvrez nos services de sonorisation professionnelle"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
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
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{service.title}</h3>
                  <p className="text-gray-700 text-center">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGridSection;
