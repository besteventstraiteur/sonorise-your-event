
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { 
  PartyPopper, 
  Users, 
  Gamepad2,
  Music,
  Trophy,
  Star
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const AnimationFeatures = () => {
  const features = [
    {
      icon: <PartyPopper className="w-8 h-8 text-pink-600" />,
      title: "Animations sur mesure",
      description: "Des animations personnalisées selon votre thème et vos envies"
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "Animateurs professionnels",
      description: "Une équipe expérimentée pour garantir le succès de votre événement"
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-pink-600" />,
      title: "Jeux interactifs",
      description: "Des activités ludiques pour tous les âges et tous les goûts"
    },
    {
      icon: <Music className="w-8 h-8 text-pink-600" />,
      title: "Animation musicale",
      description: "Une ambiance sonore adaptée à chaque moment de votre événement"
    },
    {
      icon: <Trophy className="w-8 h-8 text-pink-600" />,
      title: "Challenges et concours",
      description: "Des animations compétitives pour créer une dynamique de groupe"
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "Moments mémorables",
      description: "Des souvenirs inoubliables pour tous vos invités"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos prestations d'animation"
          subtitle="Services"
          description="Découvrez nos différentes formules d'animation pour votre événement"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover-lift h-full border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-pink-50 rounded-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimationFeatures;
