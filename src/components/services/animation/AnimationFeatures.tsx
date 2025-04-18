
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad, Users, Sparkles, CalendarCheck, Palette, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const AnimationFeatures = () => {
  const features = [
    {
      icon: <Gamepad className="w-8 h-8 text-pink-600" />,
      title: "Jeux interactifs",
      description: "Animations ludiques et participatives pour impliquer tous vos invités"
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "Adaptabilité",
      description: "Des animations sur-mesure adaptées à votre public et type d'événement"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-600" />,
      title: "Moments magiques",
      description: "Créations d'instants mémorables qui marqueront vos invités"
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
      title: "Organisation parfaite",
      description: "Planning détaillé et coordination précise de vos animations"
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-600" />,
      title: "Thématiques variées",
      description: "Large choix de thèmes et d'ambiances pour personnaliser votre événement"
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "Qualité professionnelle",
      description: "Animateurs expérimentés et matériel de qualité pour des prestations haut de gamme"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos prestations d'animation"
          subtitle="Animation événementielle professionnelle"
          description="Nos animations événementielles sont conçues pour créer des moments uniques et inoubliables. Au-delà d'un simple divertissement, nous proposons des expériences interactives qui captiveront vos invités."
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
                    <div className="p-3 bg-pink-50 rounded-lg text-pink-700">
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
    </section>
  );
};

export default AnimationFeatures;
