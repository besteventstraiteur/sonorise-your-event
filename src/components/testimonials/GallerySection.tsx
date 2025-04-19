import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ImageCard from '@/components/ui/ImageCard';
import ImageGrid from '@/components/ui/ImageGrid';

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
    <section className="section section-gradient">
      <div className="section-content">
        <SectionTitle
          title="Notre galerie"
          subtitle="Réalisations"
          description="Découvrez nos dernières réalisations en images"
          centered
        />

        <ImageGrid className="mt-12">
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              src={image.src}
              alt={image.alt}
              description={image.description}
              index={index}
            />
          ))}
        </ImageGrid>
      </div>
    </section>
  );
};

export default GallerySection;
