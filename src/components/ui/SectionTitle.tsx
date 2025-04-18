
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleId?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  centered = false,
  className,
  subtitleClassName,
  titleClassName,
  descriptionClassName,
  titleId,
}) => {
  return (
    <div 
      className={cn(
        "mb-8 sm:mb-12 px-4 sm:px-0",
        centered && "text-center",
        className
      )}
    >
      {subtitle && (
        <motion.span 
          className={cn(
            "inline-block text-sm uppercase tracking-wider font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-800",
            subtitleClassName
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        id={titleId}
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-800",
          titleClassName
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          className={cn(
            "text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed",
            centered && "mx-auto",
            descriptionClassName
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
