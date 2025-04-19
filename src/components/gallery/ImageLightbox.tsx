
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const ImageLightbox = ({
  isOpen,
  onClose,
  currentImage,
  onPrevious,
  onNext,
  hasNext,
  hasPrevious
}: ImageLightboxProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0 bg-black/95">
        <DialogTitle className="sr-only">Galerie d'images</DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-white/20 z-50"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-2 text-white hover:bg-white/20 z-50",
              !hasPrevious && "hidden"
            )}
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={currentImage}
              alt="Image en plein écran"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-2 text-white hover:bg-white/20 z-50",
              !hasNext && "hidden"
            )}
            onClick={onNext}
            disabled={!hasNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
