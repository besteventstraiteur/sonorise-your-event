
import React from 'react';
import { DeliveryZone } from '@/context/CartContext';
import { Info, Clock } from 'lucide-react';

interface ZoneInfoProps {
  deliveryZone: DeliveryZone;
}

const ZoneInfo: React.FC<ZoneInfoProps> = ({ deliveryZone }) => {
  if (deliveryZone.id === 'custom-distance') return null;
  
  return (
    <div className="bg-purple-50 p-3 rounded-md text-sm space-y-2">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-purple-600" />
        <span className="font-medium">{deliveryZone.description}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-purple-600" />
        <span>Temps de trajet estimé: {deliveryZone.estimatedTime}</span>
      </div>
      <p className="text-xs text-purple-700">
        Notre équipe vous contactera pour planifier une heure précise de livraison et d'installation.
      </p>
    </div>
  );
};

export default ZoneInfo;
