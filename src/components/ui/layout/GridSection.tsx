
import React from 'react';
import { cn } from '@/lib/utils';

interface GridSectionProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
}

const GridSection: React.FC<GridSectionProps> = ({ 
  children, 
  className,
  reverse = false
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
      reverse && "lg:grid-flow-dense",
      className
    )}>
      {children}
    </div>
  );
};

export default GridSection;
