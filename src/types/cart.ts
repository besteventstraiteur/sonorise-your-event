
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
  weight?: number;
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

export type CartContextType = {
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
  customDeliveryPrice: number;
  setCustomDeliveryPrice: (price: number) => void;
};
