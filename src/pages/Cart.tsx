
import React from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-display font-bold text-purple-800">Votre Panier</h1>
            <Link to="/boutique">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continuer vos achats
              </Button>
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-10 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto text-purple-300 mb-4" />
              <h2 className="text-2xl font-display mb-2">Votre panier est vide</h2>
              <p className="text-gray-500 mb-6">Ajoutez des articles à votre panier pour commencer vos achats.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/boutique">Découvrir notre boutique</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/location">Explorer les locations</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
                
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-gray-500"
                  >
                    Vider le panier
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
