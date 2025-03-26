
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available?: boolean;
  isRental?: boolean;
  className?: string;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  available = true,
  isRental = false,
  className,
  index = 0,
}) => {
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  const link = isRental 
    ? `/location/produit/${id}` 
    : `/boutique/produit/${id}`;

  return (
    <motion.div
      className={cn(
        "group overflow-hidden rounded-xl border border-gray-200 bg-white hover-lift",
        !available && "opacity-70",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={link} className="block h-full">
        <div className="relative pb-[56.25%] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {!available && (
            <div className="absolute inset-0 bg-sonic-900/50 flex items-center justify-center">
              <span className="bg-sonic-900 text-white text-sm font-medium px-3 py-1 rounded">
                Indisponible
              </span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="bg-gold-100 text-gold-800 text-xs font-medium px-2 py-1 rounded">
              {category}
            </span>
          </div>
          {isRental && (
            <div className="absolute top-2 right-2">
              <span className="bg-sonic-100 text-sonic-800 text-xs font-medium px-2 py-1 rounded">
                Location
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-lg font-medium text-sonic-800 mb-1 group-hover:text-gold-600 transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <p className="font-semibold text-sonic-900">
              {formattedPrice}
              {isRental && <span className="text-sm text-gray-500 font-normal ml-1">/jour</span>}
            </p>
            
            <button 
              className={cn(
                "text-sm font-medium rounded-md px-3 py-1 transition-colors",
                available 
                  ? "bg-gold-100 text-gold-800 hover:bg-gold-200" 
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              )}
              disabled={!available}
            >
              {isRental ? "Réserver" : "Ajouter"}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
