
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart, RentalPeriod } from '@/context/CartContext';
import { ShoppingCart, Calendar, Package } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available?: boolean;
  isRental?: boolean;
  weight?: number; // Poids du produit en kg pour les articles en vente
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
  weight = 1, // Poids par défaut de 1kg si non spécifié
  className,
  index = 0,
}) => {
  const { addToCart } = useCart();
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  const link = isRental 
    ? `/location/produit/${id}` 
    : `/boutique/produit/${id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    
    if (!available) return;
    
    if (isRental) {
      // For rental items, set default rental period (today to tomorrow)
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      
      const rentalPeriod: RentalPeriod = {
        startDate: today,
        endDate: tomorrow
      };
      
      addToCart({
        id,
        name,
        price,
        image,
        quantity: 1,
        type: 'rental',
        pricePerDay: price,
        rentalPeriod
      });
    } else {
      // For sale items
      addToCart({
        id,
        name,
        price,
        image,
        quantity: 1,
        type: 'sale',
        weight
      });
    }
  };

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
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <span className="bg-gray-900 text-white text-sm font-medium px-3 py-1 rounded">
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
              <span className="bg-pink-100 text-pink-700 text-xs font-medium px-2 py-1 rounded flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Location
              </span>
            </div>
          )}
          {!isRental && (
            <div className="absolute top-2 right-2">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded flex items-center">
                <Package className="w-3 h-3 mr-1" />
                {weight} kg
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-lg font-medium text-gray-800 mb-1 group-hover:text-pink-500 transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <p className="font-semibold text-gray-900">
              {formattedPrice}
              {isRental && <span className="text-sm text-gray-500 font-normal ml-1">/jour</span>}
            </p>
            
            <Button 
              className={cn(
                "text-sm font-medium rounded-md px-3 py-1 transition-colors flex items-center gap-1",
                available 
                  ? "bg-pink-100 text-pink-700 hover:bg-pink-200" 
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              )}
              disabled={!available}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-3 h-3" />
              {isRental ? "Réserver" : "Ajouter"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
