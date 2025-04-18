
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  brand: string | null;
  short_description: string | null;
  daily_price: number | null;
  sale_price: number | null;
  image_url: string | null;
  type: 'location' | 'vente' | 'both';
  category: { name: string } | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={item}>
      <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={product.image_url || '/placeholder.svg'} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-sm font-medium px-2 py-1 bg-pink-600 rounded-full">
                {product.category.name}
              </span>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              {product.brand && (
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              )}
              <p className="text-sm text-gray-600">{product.short_description}</p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.daily_price && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Prix location/jour</p>
                    <p className="text-lg font-semibold text-pink-600">
                      {product.daily_price}€
                    </p>
                  </div>
                )}
                {product.sale_price && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Prix vente</p>
                    <p className="text-lg font-semibold text-pink-600">
                      {product.sale_price}€
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  className="flex-1"
                  asChild
                >
                  <Link to={`/devis?product=${product.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Devis
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <Link to={`/catalogue/${product.id}`}>
                    <Info className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
