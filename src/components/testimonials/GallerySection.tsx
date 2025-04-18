
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60",
    alt: "Soirée d'entreprise",
    description: "Animation DJ et sonorisation pour une soirée d'entreprise à Cannes"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=60",
    alt: "Mariage en plein air",
    description: "Installation sonore et éclairages pour un mariage en extérieur"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
    alt: "Concert live",
    description: "Sonorisation complète pour un concert live à Nice"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60",
    alt: "Événement sportif",
    description: "Animation et sonorisation pour un événement sportif majeur"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=60",
    alt: "Festival",
    description: "Installation technique complète pour un festival de musique"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
    alt: "Séminaire",
    description: "Sonorisation et éclairages pour un séminaire d'entreprise"
  }
];

const GallerySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Notre galerie"
          subtitle="Réalisations"
          description="Découvrez nos dernières réalisations en images"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <AspectRatio ratio={4 / 3}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold mb-1">{image.alt}</h3>
                    <p className="text-white/90 text-sm">{image.description}</p>
                  </div>
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
