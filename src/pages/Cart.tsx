
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import DeliveryOptions from '@/components/cart/DeliveryOptions';

const Cart = () => {
  const { cart, clearCart } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-purple-800">Mon Panier</h1>
          {cart.length > 0 && (
            <Button 
              variant="outline" 
              className="text-sm" 
              onClick={clearCart}
            >
              Vider le panier
            </Button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <ShoppingCart className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="text-2xl font-display font-medium mb-2">Votre panier est vide</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Découvrez notre sélection de produits et équipements professionnels pour vos événements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/boutique">
                    <Box className="mr-2 h-4 w-4" />
                    Explorer la boutique
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/location">
                    Voir le matériel de location
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              className="lg:col-span-2 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cart.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <CartItem item={item} />
                </motion.div>
              ))}
              
              <DeliveryOptions />
            </motion.div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
