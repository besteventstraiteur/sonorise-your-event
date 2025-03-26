
import React from 'react';
import { useCart } from '../../context/CartContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ShoppingCart, Truck, Trash2 } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    removeFromCart, 
    deliveryZone,
    deliveryOption,
    deliveryCost,
    totalWithDelivery
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="text-center py-10">
          <ShoppingCart className="mx-auto h-12 w-12 text-pink-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
          <p className="text-gray-500">Ajoutez des articles pour commencer vos achats.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Résumé de votre commande</h2>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantité: {item.quantity} × {item.type === 'sale' ? (
                    `${item.price.toFixed(2)}€`
                  ) : (
                    `${item.pricePerDay.toFixed(2)}€/jour`
                  )}
                </p>
                
                {item.type === 'rental' && (
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>
                      {format(item.rentalPeriod.startDate, 'dd MMM', { locale: fr })} - {format(item.rentalPeriod.endDate, 'dd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="font-medium mr-3">
                  {item.type === 'sale' 
                    ? `${(item.price * item.quantity).toFixed(2)}€`
                    : (() => {
                        const days = Math.ceil(
                          (item.rentalPeriod.endDate.getTime() - item.rentalPeriod.startDate.getTime()) / 
                          (1000 * 60 * 60 * 24)
                        ) || 1;
                        return `${(item.pricePerDay * days * item.quantity).toFixed(2)}€`;
                      })()
                  }
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Sous-total</span>
          <span>{cartTotal.toFixed(2)}€</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 flex items-center">
            <Truck className="h-3 w-3 mr-1" /> 
            Frais de livraison
          </span>
          <span>
            {deliveryCost > 0 
              ? `${deliveryCost.toFixed(2)}€` 
              : deliveryZone || deliveryOption 
                ? "Gratuit" 
                : "Non sélectionné"}
          </span>
        </div>
        
        {deliveryZone && (
          <div className="flex justify-between mb-2 text-xs text-gray-500 pl-4">
            <span>Livraison équipement ({deliveryZone.name})</span>
            <span>{deliveryZone.price.toFixed(2)}€</span>
          </div>
        )}
        
        {deliveryOption && (
          <div className="flex justify-between mb-2 text-xs text-gray-500 pl-4">
            <span>Expédition articles ({deliveryOption.name})</span>
            <span>{deliveryOption.price.toFixed(2)}€</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span>{totalWithDelivery.toFixed(2)}€</span>
        </div>
        
        <Button className="w-full bg-pink-500 hover:bg-pink-600">
          Procéder au paiement
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
