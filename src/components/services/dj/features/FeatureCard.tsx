
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="hover-lift h-full">
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-pink-50 rounded-lg">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{title}</h3>
          <p className="text-gray-700 text-center">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;

