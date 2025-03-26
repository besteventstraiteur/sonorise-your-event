
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type RentalPeriod = {
  startDate: Date;
  endDate: Date;
};

export type CartItemBase = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type SaleCartItem = CartItemBase & {
  type: 'sale';
  weight?: number; // Poids en kg pour calculer les frais de livraison
};

export type RentalCartItem = CartItemBase & {
  type: 'rental';
  rentalPeriod: RentalPeriod;
  pricePerDay: number;
};

export type CartItem = SaleCartItem | RentalCartItem;

export type DeliveryZone = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
};

export type DeliveryOption = {
  id: string;
  name: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateRentalPeriod: (id: string, period: RentalPeriod) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  deliveryZone: DeliveryZone | null;
  setDeliveryZone: (zone: DeliveryZone | null) => void;
  deliveryOption: DeliveryOption | null;
  setDeliveryOption: (option: DeliveryOption | null) => void;
  deliveryCost: number;
  totalWithDelivery: number;
  hasRentalItems: boolean;
  hasSaleItems: boolean;
  totalItemWeight: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | null>(null);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalWithDelivery, setTotalWithDelivery] = useState(0);
  const [hasRentalItems, setHasRentalItems] = useState(false);
  const [hasSaleItems, setHasSaleItems] = useState(false);
  const [totalItemWeight, setTotalItemWeight] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert string dates back to Date objects for rental items
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

  // Calculate if cart has rental or sale items
  useEffect(() => {
    setHasRentalItems(cart.some(item => item.type === 'rental'));
    setHasSaleItems(cart.some(item => item.type === 'sale'));
    
    // Calculate total weight for sale items
    const weight = cart.reduce((total, item) => {
      if (item.type === 'sale' && item.weight) {
        return total + (item.weight * item.quantity);
      }
      return total;
    }, 0);
    
    setTotalItemWeight(weight);
  }, [cart]);

  // Calculate delivery cost
  useEffect(() => {
    let cost = 0;
    
    // Add zone cost if rental items exist and a zone is selected
    if (hasRentalItems && deliveryZone) {
      cost += deliveryZone.price;
    }
    
    // Add delivery option cost if sale items exist and an option is selected
    if (hasSaleItems && deliveryOption) {
      cost += deliveryOption.price;
    }
    
    setDeliveryCost(cost);
    setTotalWithDelivery(cartTotal + cost);
  }, [cartTotal, deliveryZone, deliveryOption, hasRentalItems, hasSaleItems]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate total and count
    const total = cart.reduce((sum, item) => {
      if (item.type === 'sale') {
        return sum + (item.price * item.quantity);
      } else {
        // For rental items, calculate based on number of days
        const days = Math.ceil(
          (item.rentalPeriod.endDate.getTime() - item.rentalPeriod.startDate.getTime()) / 
          (1000 * 60 * 60 * 24)
        ) || 1; // Minimum 1 day
        return sum + (item.pricePerDay * days * item.quantity);
      }
    }, 0);
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === newItem.id && item.type === newItem.type);
      
      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity
        };
        toast.success(`${newItem.name} ajouté au panier !`);
        return updatedCart;
      } else {
        // Add new item
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
        totalItemWeight
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
