
import React from 'react';
import { useCart, DeliveryZone, DeliveryOption } from '@/context/CartContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck, Package, Clock, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Zones de livraison isochrones pour le matériel de location
const deliveryZones: DeliveryZone[] = [
  {
    id: 'zone1',
    name: 'Zone 1 (0-15km)',
    description: 'Toulon et alentours proches',
    price: 25,
    estimatedTime: '30 minutes'
  },
  {
    id: 'zone2',
    name: 'Zone 2 (15-30km)',
    description: 'Six-Fours, La Seyne, Hyères...',
    price: 40,
    estimatedTime: '45 minutes'
  },
  {
    id: 'zone3',
    name: 'Zone 3 (30-50km)',
    description: 'Saint-Tropez, Brignoles...',
    price: 60,
    estimatedTime: '1 heure'
  },
  {
    id: 'zone4',
    name: 'Zone 4 (50-100km)',
    description: 'Marseille, Aix-en-Provence...',
    price: 100,
    estimatedTime: '1h30'
  }
];

// Options de livraison pour les articles en vente
const getDeliveryOptions = (totalWeight: number): DeliveryOption[] => {
  const baseOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Livraison standard',
      price: calculateStandardShipping(totalWeight)
    },
    {
      id: 'express',
      name: 'Livraison express (24-48h)',
      price: calculateExpressShipping(totalWeight)
    }
  ];
  
  // Si le poids est faible, proposer l'option lettre suivie
  if (totalWeight <= 3) {
    baseOptions.unshift({
      id: 'letter',
      name: 'Lettre suivie',
      price: 4.95
    });
  }
  
  return baseOptions;
};

// Calcul du prix de livraison standard en fonction du poids
const calculateStandardShipping = (weight: number): number => {
  if (weight <= 0.5) return 5.95;
  if (weight <= 1) return 7.95;
  if (weight <= 2) return 9.95;
  if (weight <= 5) return 14.95;
  if (weight <= 10) return 19.95;
  if (weight <= 20) return 29.95;
  return 39.95; // Plus de 20kg
};

// Calcul du prix de livraison express en fonction du poids
const calculateExpressShipping = (weight: number): number => {
  return calculateStandardShipping(weight) * 1.5; // 50% plus cher que standard
};

const DeliveryOptions: React.FC = () => {
  const { 
    hasRentalItems,
    hasSaleItems,
    deliveryZone,
    setDeliveryZone,
    deliveryOption,
    setDeliveryOption,
    totalItemWeight
  } = useCart();
  
  // Options de livraison basées sur le poids total
  const deliveryOptions = getDeliveryOptions(totalItemWeight);
  
  const handleZoneChange = (zoneId: string) => {
    const zone = deliveryZones.find(z => z.id === zoneId) || null;
    setDeliveryZone(zone);
  };
  
  const handleOptionChange = (optionId: string) => {
    const option = deliveryOptions.find(o => o.id === optionId) || null;
    setDeliveryOption(option);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-purple-600" />
          Options de livraison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasRentalItems && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              Livraison et installation du matériel de location
            </h3>
            <Select 
              value={deliveryZone?.id || ''} 
              onValueChange={handleZoneChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez une zone de livraison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Retrait à notre entrepôt (gratuit)</SelectItem>
                {deliveryZones.map(zone => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name} - {zone.price.toFixed(2)}€
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {deliveryZone && (
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
            )}
          </div>
        )}
        
        {hasRentalItems && hasSaleItems && (
          <Separator className="my-4" />
        )}
        
        {hasSaleItems && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-600" />
              Livraison des articles achetés
              <span className="text-xs text-gray-500 ml-1">
                (Poids total: {totalItemWeight.toFixed(2)} kg)
              </span>
            </h3>
            <Select 
              value={deliveryOption?.id || ''} 
              onValueChange={handleOptionChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez une option de livraison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Retrait en magasin (gratuit)</SelectItem>
                {deliveryOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name} - {option.price.toFixed(2)}€
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {deliveryOption && (
              <div className="bg-purple-50 p-3 rounded-md text-sm">
                <p>
                  Livraison via Colissimo ou transporteur selon le poids et la dimension du colis.
                </p>
                {deliveryOption.id === 'express' && (
                  <p className="text-xs text-purple-700 mt-1">
                    Commandez avant 12h pour un envoi le jour même (jours ouvrés).
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryOptions;
