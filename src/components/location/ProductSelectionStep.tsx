
import React from 'react';
import { Tabs } from "@/components/ui/tabs";
import { RentalPeriod } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { categories, products } from '@/data/rentalProducts';
import CategoryTabs from './CategoryTabs';
import CategoryContent from './CategoryContent';
import DateInfoBanner from './DateInfoBanner';
import NavigationButtons from './NavigationButtons';

interface ProductSelectionStepProps {
  rentalPeriod: RentalPeriod;
  onBack: () => void;
  onContinue: () => void;
  selectedProducts: string[];
  onProductSelect: (productId: string) => void;
}

const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({ 
  rentalPeriod, 
  onBack, 
  onContinue,
  selectedProducts,
  onProductSelect
}) => {
  const { cart } = useCart();

  const handleContinue = () => {
    if (cart.length === 0) {
      toast.error("Veuillez ajouter au moins un produit au panier avant de continuer");
      return;
    }
    onContinue();
  };

  return (
    <div className="w-full">
      <DateInfoBanner rentalPeriod={rentalPeriod} />

      <Tabs defaultValue="son" className="mt-8">
        <CategoryTabs 
          categories={categories} 
          defaultCategory="son" 
        />
        
        {Object.keys(products).map((categoryId) => (
          <CategoryContent 
            key={categoryId}
            categoryId={categoryId}
            products={products[categoryId]}
            rentalPeriod={rentalPeriod}
          />
        ))}
      </Tabs>

      <NavigationButtons 
        onBack={onBack} 
        onContinue={handleContinue} 
      />
    </div>
  );
};

export default ProductSelectionStep;
