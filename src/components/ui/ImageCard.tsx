
import React from 'react';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageCardProps {
  src: string;
  alt: string;
  description: string;
  index?: number;
}

const ImageCard = ({ src, alt, description, index = 0 }: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group overflow-hidden rounded-lg shadow-md"
    >
      <AspectRatio ratio={4 / 3}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold mb-1">{alt}</h3>
            <p className="text-white/90 text-sm">{description}</p>
          </div>
        </div>
      </AspectRatio>
    </motion.div>
  );
};

export default ImageCard;
