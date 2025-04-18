
import React, { createContext, useContext, useState } from 'react';
import { CartContextType, DeliveryZone, DeliveryOption } from '../types/cart';
import { useCartStorage } from '../hooks/useCartStorage';
import { useCartCalculations } from '../hooks/useCartCalculations';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalPeriod,
    clearCart
  } = useCartStorage();

  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | null>(null);
  const [customDeliveryPrice, setCustomDeliveryPrice] = useState(0);

  const {
    cartTotal,
    cartCount,
    deliveryCost,
    totalWithDelivery,
    hasRentalItems,
    hasSaleItems,
    totalItemWeight
  } = useCartCalculations(cart, deliveryZone, deliveryOption, customDeliveryPrice);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        updateRentalPeriod, 
        clearCart, 
        cartTotal,
        cartCount,
        deliveryZone,
        setDeliveryZone,
        deliveryOption,
        setDeliveryOption,
        deliveryCost,
        totalWithDelivery,
        hasRentalItems,
        hasSaleItems,
        totalItemWeight,
        customDeliveryPrice,
        setCustomDeliveryPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Re-export types
export type { 
  CartItem,
  SaleCartItem,
  RentalCartItem,
  CartItemBase,
  RentalPeriod,
  DeliveryZone,
  DeliveryOption
} from '../types/cart';
