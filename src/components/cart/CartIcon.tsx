
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <Button variant="ghost" className="relative p-2" asChild>
      <Link to="/panier">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartIcon;
