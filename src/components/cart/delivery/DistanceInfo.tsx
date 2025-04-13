
import React from 'react';
import { DeliveryZone } from '@/context/CartContext';
import { MapPinned, Truck, Clock } from 'lucide-react';

interface DistanceInfoProps {
  deliveryZone: DeliveryZone | null;
  calculatedDistance: number | null;
}

const DistanceInfo: React.FC<DistanceInfoProps> = ({ 
  deliveryZone, 
  calculatedDistance 
}) => {
  if (!deliveryZone || !calculatedDistance) return null;
  
  return (
    <div className="bg-purple-50 p-3 rounded-md text-sm space-y-2">
      <div className="flex items-center gap-2">
        <MapPinned className="h-4 w-4 text-purple-600" />
        <span className="font-medium">{deliveryZone.description}</span>
      </div>
      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-purple-600" />
        <span>Distance: {calculatedDistance} km</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-purple-600" />
        <span>Temps de trajet estimé: {deliveryZone.estimatedTime}</span>
      </div>
      <p className="text-xs text-purple-700">
        Prix: {deliveryZone.price.toFixed(2)}€ (1€/km)
      </p>
    </div>
  );
};

export default DistanceInfo;
