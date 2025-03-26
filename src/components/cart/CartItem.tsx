
import React, { useState } from 'react';
import { useCart, CartItem as CartItemType, RentalPeriod } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import RentalDatePicker from './RentalDatePicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart, updateRentalPeriod } = useCart();
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(item.id, newQuantity);
  };
  
  const handleRentalPeriodChange = (period: RentalPeriod) => {
    if (item.type === 'rental') {
      updateRentalPeriod(item.id, period);
    }
  };
  
  // Calculate the price for the item
  const calculatePrice = () => {
    if (item.type === 'sale') {
      return item.price * item.quantity;
    } else {
      const days = Math.ceil(
        (item.rentalPeriod.endDate.getTime() - item.rentalPeriod.startDate.getTime()) / 
        (1000 * 60 * 60 * 24)
      ) || 1;
      return item.pricePerDay * days * item.quantity;
    }
  };
  
  const getDurationText = () => {
    if (item.type !== 'rental') return '';
    
    const days = Math.ceil(
      (item.rentalPeriod.endDate.getTime() - item.rentalPeriod.startDate.getTime()) / 
      (1000 * 60 * 60 * 24)
    ) || 1;
    
    return `${days} jour${days > 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product image */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Product details */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className="font-semibold text-purple-700">
              {calculatePrice().toFixed(2)}€
              {item.type === 'rental' && <span className="text-xs text-gray-500 ml-1">({item.pricePerDay}€/jour)</span>}
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {item.type === 'sale' ? 'Achat' : 'Location'}
            </span>
            
            {item.type === 'rental' && (
              <span className="ml-2 text-xs text-gray-500">
                {getDurationText()}
              </span>
            )}
          </div>
          
          {/* Rental date picker */}
          {item.type === 'rental' && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Période de location</p>
              <RentalDatePicker 
                period={item.rentalPeriod}
                onPeriodChange={handleRentalPeriodChange}
              />
            </div>
          )}
          
          {/* Quantity and actions */}
          <div className="flex flex-wrap items-center justify-between mt-4">
            <div className="flex items-center space-x-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="w-8 text-center">{item.quantity}</span>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className="text-gray-500 hover:text-red-500 hover:bg-red-50"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
