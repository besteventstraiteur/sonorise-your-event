
import React from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from './BlogPostCard';

const blogPosts = [
  {
    title: "Comment choisir son DJ de mariage : Guide complet",
    excerpt: "Découvrez les critères essentiels pour sélectionner le DJ parfait pour votre mariage. De l'expérience au style musical, en passant par les équipements, tous nos conseils pour faire le bon choix.",
    date: "2024-04-15",
    imageUrl: "/lovable-uploads/82e3cfbb-844e-4fb3-acd0-2841438f70d5.jpg",
    slug: "choisir-dj-mariage-guide"
  },
  {
    title: "Les moments clés d'une soirée de mariage réussie",
    excerpt: "De l'entrée des mariés à l'ouverture du bal, en passant par les animations : découvrez comment orchestrer parfaitement les moments forts de votre soirée de mariage.",
    date: "2024-04-10",
    imageUrl: "/lovable-uploads/48e9afe6-c2f9-4ce9-88c1-005729646d3a.jpg",
    slug: "moments-cles-soiree-mariage"
  },
  {
    title: "Créer une playlist de mariage personnalisée",
    excerpt: "Comment construire une playlist qui reflète votre personnalité tout en faisant danser vos invités ? Nos conseils de DJ professionnel pour une ambiance réussie.",
    date: "2024-04-05",
    imageUrl: "/lovable-uploads/f4eb52e0-777c-48e3-b94c-6ee7a086a03d.jpg",
    slug: "creer-playlist-mariage-personnalisee"
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Notre Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conseils et astuces pour réussir l'animation de votre mariage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
