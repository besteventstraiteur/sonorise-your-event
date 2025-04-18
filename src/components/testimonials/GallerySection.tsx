
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const images = [
  {
    id: 1,
    src: "/placeholder.svg",
    alt: "Soirée d'entreprise",
    description: "Animation DJ pour une soirée d'entreprise"
  },
  {
    id: 2,
    src: "/placeholder.svg",
    alt: "Mariage en plein air",
    description: "Sonorisation d'un mariage en extérieur"
  },
  {
    id: 3,
    src: "/placeholder.svg",
    alt: "Concert live",
    description: "Installation sonore pour un concert"
  },
  {
    id: 4,
    src: "/placeholder.svg",
    alt: "Événement sportif",
    description: "Sonorisation d'un événement sportif"
  }
];

const GallerySection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos réalisations"
          subtitle="Portfolio"
          description="Quelques exemples de nos prestations récentes"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-lg"
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    {image.description}
                  </p>
                </div>
              </AspectRatio>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
