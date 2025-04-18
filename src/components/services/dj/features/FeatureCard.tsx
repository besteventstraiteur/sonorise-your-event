
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      role="listitem"
      aria-labelledby={`feature-title-${index}`}
      className="h-full"
    >
      <Card className="h-full border border-pink-100/50 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-b from-white to-pink-50/20">
        <CardContent className="pt-6 px-4 sm:px-6">
          <motion.div 
            className="mb-4 flex justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="p-3 bg-pink-50 rounded-lg">
              {icon}
            </div>
          </motion.div>
          <motion.h3 
            id={`feature-title-${index}`}
            className="text-lg sm:text-xl font-semibold text-center mb-2 text-pink-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {title}
          </motion.h3>
          <p className="text-sm sm:text-base text-gray-800 text-center leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
