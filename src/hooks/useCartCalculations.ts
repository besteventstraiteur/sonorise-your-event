
import { useEffect, useState } from 'react';
import { CartItem, DeliveryZone, DeliveryOption } from '../types/cart';

export const useCartCalculations = (
  cart: CartItem[],
  deliveryZone: DeliveryZone | null,
  deliveryOption: DeliveryOption | null,
  customDeliveryPrice: number
) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalWithDelivery, setTotalWithDelivery] = useState(0);
  const [hasRentalItems, setHasRentalItems] = useState(false);
  const [hasSaleItems, setHasSaleItems] = useState(false);
  const [totalItemWeight, setTotalItemWeight] = useState(0);

  // Calculate cart type flags and total weight
  useEffect(() => {
    setHasRentalItems(cart.some(item => item.type === 'rental'));
    setHasSaleItems(cart.some(item => item.type === 'sale'));
    
    const weight = cart.reduce((total, item) => {
      if (item.type === 'sale' && item.weight) {
        return total + (item.weight * item.quantity);
      }
      return total;
    }, 0);
    
    setTotalItemWeight(weight);
  }, [cart]);

  // Calculate delivery cost and total with delivery
  useEffect(() => {
    let cost = 0;
    
    if (customDeliveryPrice > 0) {
      cost = customDeliveryPrice;
    } else {
      if (hasRentalItems && deliveryZone) {
        cost += deliveryZone.price;
      }
      
      if (hasSaleItems && deliveryOption) {
        cost += deliveryOption.price;
      }
    }
    
    setDeliveryCost(cost);
    setTotalWithDelivery(cartTotal + cost);
  }, [cartTotal, deliveryZone, deliveryOption, hasRentalItems, hasSaleItems, customDeliveryPrice]);

  // Calculate cart totals
  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      if (item.type === 'sale') {
        return sum + (item.price * item.quantity);
      } else {
        const days = Math.ceil(
          (item.rentalPeriod.endDate.getTime() - item.rentalPeriod.startDate.getTime()) / 
          (1000 * 60 * 60 * 24)
        ) || 1;
        return sum + (item.pricePerDay * days * item.quantity);
      }
    }, 0);
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  return {
    cartTotal,
    cartCount,
    deliveryCost,
    totalWithDelivery,
    hasRentalItems,
    hasSaleItems,
    totalItemWeight
  };
};
