
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PriceCardProps {
  title: string;
  price: string;
  features: string[];
  description: string;
  index: number;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  price,
  features,
  description,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full"
    >
      <Card className="flex-1 relative overflow-hidden border-2 border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-pink-50/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600" />
        <CardContent className="pt-8">
          <motion.h3 
            className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-pink-500"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            {title}
          </motion.h3>
          <p className="text-gray-600 mb-6">{description}</p>
          <motion.ul 
            className="space-y-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3 text-gray-700 group"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Check className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm sm:text-base leading-tight">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
          <div className="space-y-4">
            <p className="text-2xl font-bold text-pink-700 text-center">{price}</p>
            <Button 
              className="w-full bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              size="lg"
              asChild
            >
              <Link to="/devis" className="relative z-10">
                <span className="relative z-10">Demander un devis</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PriceCard;
