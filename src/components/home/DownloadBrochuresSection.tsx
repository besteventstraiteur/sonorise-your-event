
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { Download, Music2, Sparkles, Speaker, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const brochures = [
  {
    title: "Services DJ",
    description: "Nos prestations DJ pour vos événements",
    icon: Music2,
    path: "/brochures/dj-professionnel.pdf"
  },
  {
    title: "Animation",
    description: "Découvrez nos services d'animation",
    icon: Users,
    path: "/brochures/animation-evenementielle.pdf"
  },
  {
    title: "Artistes",
    description: "Notre catalogue d'artistes",
    icon: Sparkles,
    path: "/brochures/artistes.pdf"
  },
  {
    title: "Sonorisation",
    description: "Solutions de sonorisation complètes",
    icon: Speaker,
    path: "/brochures/sonorisation-complete.pdf"
  }
];

const DownloadBrochuresSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos brochures"
          subtitle="Documentation"
          description="Téléchargez nos brochures détaillées pour en savoir plus sur nos services"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {brochures.map((brochure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <brochure.icon className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{brochure.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{brochure.description}</p>
              <Button
                asChild
                variant="outline"
                className="gap-2 mt-auto hover:bg-pink-50"
              >
                <a href={brochure.path} download>
                  <Download className="w-4 h-4" />
                  Télécharger
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadBrochuresSection;
