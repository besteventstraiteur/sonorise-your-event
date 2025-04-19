
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { 
  PartyPopper, 
  Users, 
  Gamepad2,
  Music,
  Trophy,
  Star,
  Sparkles,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnimationFeatures = () => {
  const features = [
    {
      icon: <PartyPopper className="w-8 h-8 text-primary-600" />,
      title: "Animations sur mesure",
      description: "Des animations personnalisées selon votre thème et vos envies"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Animateurs professionnels",
      description: "Une équipe expérimentée pour garantir le succès de votre événement"
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-primary-600" />,
      title: "Jeux interactifs",
      description: "Des activités ludiques pour tous les âges et tous les goûts"
    },
    {
      icon: <Music className="w-8 h-8 text-primary-600" />,
      title: "Animation musicale",
      description: "Une ambiance sonore adaptée à chaque moment de votre événement"
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary-600" />,
      title: "Challenges et concours",
      description: "Des animations compétitives pour créer une dynamique de groupe"
    },
    {
      icon: <Star className="w-8 h-8 text-primary-600" />,
      title: "Moments mémorables",
      description: "Des souvenirs inoubliables pour tous vos invités"
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-primary-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-primary-50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary-50 rounded-full border border-primary-200">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-primary-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-center mb-4">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2"
            asChild
          >
            <a href="/services/animation-evenementielle">
              Découvrir nos services d'animation
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimationFeatures;
