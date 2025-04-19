
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageGridProps {
  children: React.ReactNode;
  className?: string;
}

const ImageGrid = ({ children, className = "" }: ImageGridProps) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12",
      className
    )}>
      {children}
    </div>
  );
};

export default ImageGrid;
