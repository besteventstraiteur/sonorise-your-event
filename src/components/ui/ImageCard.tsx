
import React from 'react';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageCardProps {
  src: string;
  alt: string;
  description: string;
  index?: number;
  filter?: "pink" | "purple" | "gold" | "none";
}

const ImageCard = ({ 
  src, 
  alt, 
  description, 
  index = 0,
  filter = "none" 
}: ImageCardProps) => {
  // Color filter classes based on theme
  const filterClasses = {
    pink: "after:bg-pink-600/20",
    purple: "after:bg-primary/20",
    gold: "after:bg-gold-500/20",
    none: ""
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <AspectRatio ratio={4 / 3}>
        <div className={`
          relative w-full h-full
          after:absolute after:inset-0 after:z-10 
          ${filterClasses[filter]}
          after:transition-opacity after:duration-300
          after:pointer-events-none
        `}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold mb-1 text-shadow-sm">{alt}</h3>
              <p className="text-white/90 text-sm text-shadow-sm">{description}</p>
            </div>
          </div>
        </div>
      </AspectRatio>
    </motion.div>
  );
};

export default ImageCard;
