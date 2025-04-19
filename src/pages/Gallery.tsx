
import React from 'react';
import { Helmet } from 'react-helmet';
import GallerySection from '@/components/gallery/GallerySection';

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Galerie | Sonorisation & DJ Mariage Var (83) - Sonorisation 83</title>
        <meta 
          name="description" 
          content="Découvrez notre galerie de réalisations en sonorisation, éclairage et animation DJ dans le Var. Photos de nos prestations pour mariages, événements professionnels et soirées privées." 
        />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16">
        <GallerySection />
      </main>
    </>
  );
};

export default Gallery;
