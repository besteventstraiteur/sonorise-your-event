
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/services/artistes/HeroSection';
import CategoriesSection from '@/components/services/artistes/CategoriesSection';
import GallerySection from '@/components/services/artistes/GallerySection';
import TestimonialsSection from '@/components/services/artistes/TestimonialsSection';
import CTASection from '@/components/services/artistes/CTASection';

const Artistes = () => {
  const serviceDescription = "Notre service artistique vous offre un accès à une sélection exclusive de talents professionnels pour sublimer votre événement. Des musiciens de jazz aux performers de cirque, nous proposons une palette d'artistes capables de s'adapter à tous les styles et ambiances. Chaque prestation est soigneusement sélectionnée pour garantir une qualité irréprochable et une performance qui marquera les esprits. Que vous recherchiez un trio de jazz pour un cocktail élégant, un groupe pour animer une soirée d'entreprise ou des performers pour un moment spectaculaire, nous avons la solution artistique qui correspondra parfaitement à votre vision.";

  return (
    <>
      <Helmet>
        <title>Artistes | Sonorisation 83 - Performers et Musiciens dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="artistes var, musiciens événementiel, danseurs, performers, animation artistique, concert privé" />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <CategoriesSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
};

export default Artistes;
