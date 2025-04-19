
import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ImageCard from '@/components/ui/ImageCard';
import ImageGrid from '@/components/ui/ImageGrid';

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60",
    alt: "Soirée dansante",
    description: "Animation et ambiance musicale pour une soirée festive"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&auto=format&fit=crop&q=60",
    alt: "Animation événementielle",
    description: "Jeux et animations interactives pour tous les âges"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=60",
    alt: "Animation enfants",
    description: "Animations dédiées aux enfants et familles"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800&auto=format&fit=crop&q=60",
    alt: "Anniversaire",
    description: "Animations spéciales pour anniversaires et célébrations"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=60",
    alt: "Team building",
    description: "Animations et jeux pour événements d'entreprise"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&auto=format&fit=crop&q=60",
    alt: "Soirée à thème",
    description: "Animations thématiques sur mesure"
  }
];

const GallerySection = () => {
  return (
    <section className="section section-gradient">
      <div className="section-content">
        <SectionTitle
          title="Nos animations en images"
          subtitle="Galerie"
          description="Découvrez quelques moments forts de nos prestations"
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
