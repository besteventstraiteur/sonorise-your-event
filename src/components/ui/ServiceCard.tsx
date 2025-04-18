
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
  color?: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  color = "from-pink-600 to-pink-700",
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
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Card className="group h-full border border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-pink-200 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden">
        <Link to={link} className="block h-full relative">
          {/* Color gradient accent on top */}
          <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${color}`} />
          
          <CardContent className="p-6 flex flex-col h-full">
            <motion.div 
              className={`mb-5 p-3 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 5 }}
            >
              {icon}
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-pink-700 transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              {description}
            </p>
            
            <div className="mt-5 flex items-center text-pink-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
              En savoir plus
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
