
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Music, Mic, Star, Award, Users, CalendarCheck } from 'lucide-react';

const categories = [
  {
    icon: <Music className="w-8 h-8 text-pink-600" />,
    title: "Musiciens",
    description: "Pianistes, guitaristes, violonistes, saxophonistes... Des musiciens talentueux pour une ambiance live unique."
  },
  {
    icon: <Mic className="w-8 h-8 text-pink-600" />,
    title: "Chanteurs",
    description: "Solistes, duos ou groupes vocaux pour interpréter les plus grandes chansons lors de votre événement."
  },
  {
    icon: <Star className="w-8 h-8 text-pink-600" />,
    title: "Danseurs",
    description: "Danse contemporaine, classique, hip-hop, latine... Des performances chorégraphiées qui éblouiront vos invités."
  },
  {
    icon: <Award className="w-8 h-8 text-pink-600" />,
    title: "Performers",
    description: "Artistes de cirque, acrobates, jongleurs, magiciens... Des performances spectaculaires et originales."
  },
  {
    icon: <Users className="w-8 h-8 text-pink-600" />,
    title: "Groupes",
    description: "Orchestres, groupes de jazz, rock, pop ou variété... Une formation complète pour animer votre soirée."
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
    title: "Performances sur mesure",
    description: "Une prestation artistique unique et personnalisée selon le thème de votre événement."
  }
];

const CategoriesSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos catégories d'artistes"
          subtitle="Des talents pour tous les goûts"
          description="Découvrez notre sélection d'artistes professionnels pour votre événement"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {categories.map((category, index) => (
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
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{category.title}</h3>
                  <p className="text-gray-700 text-center">{category.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
