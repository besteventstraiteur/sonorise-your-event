
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartIcon from '../cart/CartIcon';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { cartCount } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="fixed top-4 right-14 z-50">
        <CartIcon />
      </div>
      <Navbar />
      <main className="flex-grow pt-16 text-gray-800">{children}</main>
      <Footer />
      
      {/* Floating cart button for easy access */}
      <Link
        to="/panier"
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-pink-600 text-white shadow-lg hover:bg-pink-700 transition-colors"
        aria-label="Voir le panier"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Layout;
