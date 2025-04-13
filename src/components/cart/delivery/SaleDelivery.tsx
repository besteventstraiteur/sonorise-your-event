
import React from 'react';
import { useCart, DeliveryOption } from '@/context/CartContext';
import { Package } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Helper functions for shipping calculations
const calculateStandardShipping = (weight: number): number => {
  if (weight <= 0.5) return 5.95;
  if (weight <= 1) return 7.95;
  if (weight <= 2) return 9.95;
  if (weight <= 5) return 14.95;
  if (weight <= 10) return 19.95;
  if (weight <= 20) return 29.95;
  return 39.95;
};

const calculateExpressShipping = (weight: number): number => {
  return calculateStandardShipping(weight) * 1.5;
};

const getDeliveryOptions = (totalWeight: number): DeliveryOption[] => {
  const baseOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Livraison standard',
      price: calculateStandardShipping(totalWeight)
    },
    {
      id: 'express',
      name: 'Livraison express (24-48h)',
      price: calculateExpressShipping(totalWeight)
    }
  ];
  
  if (totalWeight <= 3) {
    baseOptions.unshift({
      id: 'letter',
      name: 'Lettre suivie',
      price: 4.95
    });
  }
  
  return baseOptions;
};

const SaleDelivery: React.FC = () => {
  const { 
    deliveryOption,
    setDeliveryOption,
    totalItemWeight
  } = useCart();
  
  const deliveryOptions = getDeliveryOptions(totalItemWeight);

  const handleOptionChange = (optionId: string) => {
    const option = deliveryOptions.find(o => o.id === optionId) || null;
    setDeliveryOption(option);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Package className="h-4 w-4 text-purple-600" />
        Livraison des articles achetés
        <span className="text-xs text-gray-500 ml-1">
          (Poids total: {totalItemWeight.toFixed(2)} kg)
        </span>
      </h3>
      <Select 
        value={deliveryOption?.id || "pickup-sale"} 
        onValueChange={handleOptionChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez une option de livraison" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pickup-sale">Retrait en magasin (gratuit)</SelectItem>
          {deliveryOptions.map(option => (
            <SelectItem key={option.id} value={option.id}>
              {option.name} - {option.price.toFixed(2)}€
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {deliveryOption && (
        <div className="bg-purple-50 p-3 rounded-md text-sm">
          <p>
            Livraison via Colissimo ou transporteur selon le poids et la dimension du colis.
          </p>
          {deliveryOption.id === 'express' && (
            <p className="text-xs text-purple-700 mt-1">
              Commandez avant 12h pour un envoi le jour même (jours ouvrés).
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SaleDelivery;
