
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { cartCount, cartTotal } = useCart();

  return (
    <Button variant="outline" className="relative p-2 flex items-center gap-2 bg-white shadow-sm border border-pink-100" asChild>
      <Link to="/panier">
        <ShoppingCart className="h-5 w-5 text-pink-600" />
        <span className="hidden sm:inline text-sm font-medium text-gray-700">Mon panier</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
        {cartTotal > 0 && (
          <span className="hidden sm:inline text-sm font-medium text-pink-600 ml-1">
            ({cartTotal.toFixed(2)}€)
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartIcon;
