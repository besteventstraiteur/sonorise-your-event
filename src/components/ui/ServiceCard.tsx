
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './card';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  delay = 0
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="group h-full border border-gray-200/50 bg-white/50 backdrop-blur-sm hover:border-pink-200 transition-all duration-300 shadow-sm hover:shadow-md">
        <Link to={link} className="block h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <motion.div 
              className="mb-4 p-3 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              whileHover={{ rotate: 5 }}
            >
              {icon}
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-pink-700 transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              {description}
            </p>
            
            <div className="mt-4 flex items-center text-pink-600 text-sm font-medium">
              En savoir plus
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
