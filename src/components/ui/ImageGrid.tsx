
import React from 'react';

interface ImageGridProps {
  children: React.ReactNode;
  className?: string;
}

const ImageGrid = ({ children, className = "" }: ImageGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default ImageGrid;
