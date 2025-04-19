
import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ImageCard from '@/components/ui/ImageCard';
import ImageGrid from '@/components/ui/ImageGrid';

const images = [
  {
    id: 1,
    src: "/lovable-uploads/c82eb0c0-3a47-460c-bb7c-58ce1775351d.jpg",
    alt: "Soirée mariage en extérieur",
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
    alt: "Sonorisation extérieure",
    description: "Configuration son et lumière pour événement en extérieur"
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
