
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onBack, onContinue }) => {
  return (
    <div className="flex justify-between mt-12 mb-8">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Modifier les dates
      </Button>
      
      <Button 
        onClick={onContinue}
        className="bg-pink-600 hover:bg-pink-500 flex items-center gap-2"
      >
        Passer au paiement
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NavigationButtons;
