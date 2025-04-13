
import React, { useState } from 'react';
import { useCart, DeliveryZone } from '@/context/CartContext';
import { MapPin } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { calculateDistance } from '@/utils/deliveryUtils';
import { toast } from 'sonner';
import AddressForm, { AddressFormValues } from './AddressForm';
import ZoneInfo from './ZoneInfo';
import DistanceInfo from './DistanceInfo';

// Coordinates of the depot
const DEPOT_ADDRESS = {
  lat: 43.124228,
  lng: 5.928000
};

// List of predefined delivery zones
const deliveryZones: DeliveryZone[] = [
  {
    id: 'toulon',
    name: 'Toulon et environs (< 15km)',
    description: 'Toulon, La Seyne-sur-Mer, Six-Fours, La Valette, etc.',
    price: 25,
    estimatedTime: '30-45 minutes'
  },
  {
    id: 'var-est',
    name: 'Var Est (< 30km)',
    description: 'Hyères, Le Pradet, Carqueiranne, La Crau, etc.',
    price: 40,
    estimatedTime: '45-60 minutes'
  },
  {
    id: 'var-ouest',
    name: 'Var Ouest (< 45km)',
    description: 'Bandol, Sanary, Le Beausset, Le Castellet, etc.',
    price: 55,
    estimatedTime: '1 heure'
  },
  {
    id: 'dep-proche',
    name: 'Départements proches (< 100km)',
    description: 'Marseille, Aix-en-Provence, Brignoles, etc.',
    price: 100,
    estimatedTime: '1h30-2h'
  }
];

const RentalDelivery: React.FC = () => {
  const { 
    deliveryZone,
    setDeliveryZone,
    setCustomDeliveryPrice
  } = useCart();
  
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);

  const handleZoneChange = (zoneId: string) => {
    if (zoneId === "custom-distance") {
      setDeliveryZone(null);
    } else if (zoneId === "pickup-rental") {
      setDeliveryZone(null);
      setAddressSubmitted(false);
      setCalculatedDistance(null);
      setCustomDeliveryPrice(0);
    } else {
      const zone = deliveryZones.find(z => z.id === zoneId) || null;
      setDeliveryZone(zone);
      setAddressSubmitted(false);
      setCalculatedDistance(null);
    }
  };

  const onAddressSubmit = async (data: AddressFormValues) => {
    try {
      const formattedAddress = `${data.street}, ${data.postalCode} ${data.city}, France`;
      
      const distance = await calculateDistance(DEPOT_ADDRESS, formattedAddress);
      
      if (distance) {
        const roundedDistance = Math.ceil(distance);
        setCalculatedDistance(roundedDistance);
        
        const price = roundedDistance * 1;
        
        const customZone: DeliveryZone = {
          id: 'custom-distance',
          name: `Livraison personnalisée (${roundedDistance} km)`,
          description: `${data.street}, ${data.postalCode} ${data.city}`,
          price: price,
          estimatedTime: `${Math.ceil(roundedDistance / 50)} heure(s)`
        };
        
        setDeliveryZone(customZone);
        setCustomDeliveryPrice(price);
        setAddressSubmitted(true);
        
        toast.success(`Distance calculée: ${roundedDistance} km - Prix: ${price}€`);
      }
    } catch (error) {
      console.error("Erreur lors du calcul de la distance:", error);
      toast.error("Impossible de calculer la distance. Veuillez vérifier l'adresse.");
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <MapPin className="h-4 w-4 text-purple-600" />
        Livraison et installation du matériel de location
      </h3>
      <Select 
        value={deliveryZone?.id || "pickup-rental"} 
        onValueChange={handleZoneChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez une zone de livraison" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pickup-rental">Retrait à notre entrepôt (gratuit)</SelectItem>
          <SelectItem value="custom-distance">Distance personnalisée (1€/km)</SelectItem>
          {deliveryZones.map(zone => (
            <SelectItem key={zone.id} value={zone.id}>
              {zone.name} - {zone.price.toFixed(2)}€
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {deliveryZone?.id === 'custom-distance' && !addressSubmitted && (
        <AddressForm onSubmit={onAddressSubmit} />
      )}
      
      {deliveryZone && deliveryZone.id !== 'custom-distance' && (
        <ZoneInfo deliveryZone={deliveryZone} />
      )}
      
      {calculatedDistance && addressSubmitted && (
        <DistanceInfo 
          deliveryZone={deliveryZone} 
          calculatedDistance={calculatedDistance} 
        />
      )}
    </div>
  );
};

export default RentalDelivery;
