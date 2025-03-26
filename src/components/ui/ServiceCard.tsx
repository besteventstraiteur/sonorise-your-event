
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        "group hover-lift bg-white rounded-xl overflow-hidden shadow-md border border-gray-200",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Link to={link} className="block h-full">
        <div className="p-6">
          <div className="mb-4 text-gold-600 bg-gold-50 p-3 rounded-lg inline-block">
            {icon}
          </div>
          <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold-600 transition-colors text-pink-800">
            {title}
          </h3>
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
          <span className="text-sm font-medium text-pink-700 group-hover:text-gold-600 transition-colors">
            En savoir plus
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
