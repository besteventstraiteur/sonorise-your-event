
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Users, Trophy, Sparkles, CalendarCheck } from 'lucide-react';
import { PartyIcon, LaughIcon } from './CustomIcons';

const AnimationFeatures = () => {
  const features = [
    {
      icon: <PartyIcon className="w-8 h-8 text-pink-600" />,
      title: "Animations thématiques",
      description: "Soirées à thème, années 80, disco, mousse, halloween... Nous créons l'ambiance parfaite pour votre événement."
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "Jeux interactifs",
      description: "Des jeux participatifs pour tous les âges qui favorisent les échanges et la bonne humeur."
    },
    {
      icon: <Trophy className="w-8 h-8 text-pink-600" />,
      title: "Challenges et quiz",
      description: "Stimulez la créativité et l'esprit de compétition de vos invités avec nos quiz et défis originaux."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-600" />,
      title: "Animations visuelles",
      description: "Projection sur écran géant, mapping vidéo, effets spéciaux... Des animations visuelles spectaculaires."
    },
    {
      icon: <LaughIcon className="w-8 h-8 text-pink-600" />,
      title: "Animations humoristiques",
      description: "Des moments de rire et de convivialité avec nos animations comiques et décalées."
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
      title: "Animations sur mesure",
      description: "Une idée particulière ? Nous créons des animations personnalisées selon vos envies et le thème de votre événement."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos animations"
          subtitle="Des animations pour tous les goûts"
          description="Découvrez notre large gamme d'animations pour tous types d'événements: mariages, anniversaires, soirées d'entreprise..."
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
    </div>
  );
};

export default AnimationFeatures;
