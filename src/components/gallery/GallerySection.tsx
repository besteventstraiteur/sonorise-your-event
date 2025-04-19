
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ImageLightbox from './ImageLightbox';
import { GalleryImage } from '@/types/gallery';

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/lovable-uploads/c82eb0c0-3a47-460c-bb7c-58ce1775351d.jpg",
    alt: "Mariage en extérieur",
    description: "Installation complète son et lumière pour un mariage en plein air"
  },
  {
    id: 2,
    src: "/lovable-uploads/48e9afe6-c2f9-4ce9-88c1-005729646d3a.jpg",
    alt: "Animation DJ professionnelle",
    description: "Prestation DJ avec écran géant et jeux de lumières"
  },
  {
    id: 3,
    src: "/lovable-uploads/2968431e-bb67-4c83-861d-16a9cbf4c765.jpg",
    alt: "Configuration sonorisation",
    description: "Installation sonore professionnelle pour événement d'envergure"
  },
  {
    id: 4,
    src: "/lovable-uploads/82e3cfbb-844e-4fb3-acd0-2841438f70d5.jpg",
    alt: "Éclairage architectural",
    description: "Mise en lumière exceptionnelle pour soirée de prestige"
  },
  {
    id: 5,
    src: "/lovable-uploads/f4eb52e0-777c-48e3-b94c-6ee7a086a03d.jpg",
    alt: "Performance live",
    description: "Animation musicale live avec artistes professionnels"
  },
  {
    id: 6,
    src: "/lovable-uploads/0577c695-9458-4420-b19e-ee2ed9aa5034.jpg",
    alt: "Événement en extérieur",
    description: "Configuration son et lumière pour événement en extérieur"
  }
];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev < galleryImages.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nos réalisations"
          subtitle="Galerie"
          description="Découvrez nos prestations à travers une sélection de nos meilleures réalisations"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold mb-1 text-shadow-sm">{image.alt}</h3>
                  <p className="text-white/90 text-sm text-shadow-sm">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          currentImage={galleryImages[currentImageIndex].src}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentImageIndex > 0}
          hasNext={currentImageIndex < galleryImages.length - 1}
        />
      </div>
    </section>
  );
};

export default GallerySection;
