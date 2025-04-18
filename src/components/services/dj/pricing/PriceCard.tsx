
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
      className="flex flex-col"
    >
      <Card className="flex-1">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-semibold mb-2 text-pink-700">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-pink-600 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-pink-700">{price}</p>
          <Button 
            className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
            asChild
          >
            <Link to="/devis">
              Demander un devis
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PriceCard;
