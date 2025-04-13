
import React from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from "@/components/ui/tabs";
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/data/rentalProducts';
import { RentalPeriod } from '@/context/CartContext';

interface CategoryContentProps {
  categoryId: string;
  products: Product[];
  rentalPeriod: RentalPeriod;
}

const CategoryContent: React.FC<CategoryContentProps> = ({ 
  categoryId, 
  products, 
  rentalPeriod 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <TabsContent value={categoryId} className="mt-8">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
            available={product.availability}
            isRental={true}
            index={index}
            rentalPeriod={rentalPeriod}
          />
        ))}
      </motion.div>
    </TabsContent>
  );
};

export default CategoryContent;
