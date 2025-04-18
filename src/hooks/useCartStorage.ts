
import { useState, useEffect } from 'react';
import { CartItem, RentalPeriod } from '../types/cart';
import { toast } from 'sonner';

export const useCartStorage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const processedCart = parsedCart.map((item: CartItem) => {
          if (item.type === 'rental' && item.rentalPeriod) {
            return {
              ...item,
              rentalPeriod: {
                startDate: new Date(item.rentalPeriod.startDate),
                endDate: new Date(item.rentalPeriod.endDate)
              }
            };
          }
          return item;
        });
        setCart(processedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === newItem.id && item.type === newItem.type);
      
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity
        };
        toast.success(`${newItem.name} ajouté au panier !`);
        return updatedCart;
      } else {
        toast.success(`${newItem.name} ajouté au panier !`);
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} retiré du panier`);
      }
      return prevCart.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateRentalPeriod = (id: string, period: RentalPeriod) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id && item.type === 'rental' 
          ? { ...item, rentalPeriod: period } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Panier vidé");
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalPeriod,
    clearCart
  };
};
