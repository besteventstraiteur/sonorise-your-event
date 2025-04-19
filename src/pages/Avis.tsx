
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewPlatform = ({ title, rating, reviewCount, link, logo }: {
  title: string;
  rating: number;
  reviewCount: number;
  link: string;
  logo: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg shadow-lg p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <img src={logo} alt={`Logo ${title}`} className="h-8" />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-700 text-sm font-medium"
      >
        Voir tous les avis
      </a>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-lg font-semibold">{rating}/5</span>
    </div>
    <p className="text-gray-600">{reviewCount} avis</p>
  </motion.div>
);

const Avis = () => {
  return (
    <>
      <Helmet>
        <title>Avis clients | Sonorisation 83</title>
        <meta
          name="description"
          content="Découvrez les avis de nos clients sur Google, Facebook et Mariages.net. Plus de 15 ans d'expérience dans l'événementiel à votre service."
        />
      </Helmet>

      <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Ce que pensent nos clients
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos clients sur les principales plateformes d'avis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReviewPlatform
              title="Google"
              rating={4.9}
              reviewCount={124}
              link="https://www.google.com/search?q=sonorisation+83"
              logo="/google-reviews-logo.png"
            />
            <ReviewPlatform
              title="Facebook"
              rating={4.8}
              reviewCount={89}
              link="https://www.facebook.com/sonorisation83/reviews"
              logo="/facebook-reviews-logo.png"
            />
            <ReviewPlatform
              title="Mariages.net"
              rating={4.9}
              reviewCount={56}
              link="https://www.mariages.net/dj-mariage/sonorisation-83--e186246/avis"
              logo="/mariages-net-logo.png"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Avis;
