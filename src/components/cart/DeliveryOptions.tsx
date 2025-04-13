import React, { useState } from 'react';
import { useCart, DeliveryZone, DeliveryOption } from '@/context/CartContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck, Package, Clock, Info, MapPinned } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { calculateDistance } from '@/utils/deliveryUtils';

const addressSchema = z.object({
  street: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(5, "Le code postal doit contenir 5 chiffres").max(5)
});

type AddressFormValues = z.infer<typeof addressSchema>;

const DEPOT_ADDRESS = {
  lat: 43.124228,
  lng: 5.928000
};

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
  
  if (totalWeight <= 3) {
    baseOptions.unshift({
      id: 'letter',
      name: 'Lettre suivie',
      price: 4.95
    });
  }
  
  return baseOptions;
};

const calculateStandardShipping = (weight: number): number => {
  if (weight <= 0.5) return 5.95;
  if (weight <= 1) return 7.95;
  if (weight <= 2) return 9.95;
  if (weight <= 5) return 14.95;
  if (weight <= 10) return 19.95;
  if (weight <= 20) return 29.95;
  return 39.95;
};

const calculateExpressShipping = (weight: number): number => {
  return calculateStandardShipping(weight) * 1.5;
};

const DeliveryOptions: React.FC = () => {
  const { 
    hasRentalItems,
    hasSaleItems,
    deliveryZone,
    setDeliveryZone,
    deliveryOption,
    setDeliveryOption,
    totalItemWeight,
    setCustomDeliveryPrice
  } = useCart();
  
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  
  const deliveryOptions = getDeliveryOptions(totalItemWeight);
  
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      postalCode: ''
    }
  });

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
  
  const handleOptionChange = (optionId: string) => {
    const option = deliveryOptions.find(o => o.id === optionId) || null;
    setDeliveryOption(option);
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onAddressSubmit)} className="space-y-4 bg-purple-50 p-3 rounded-md">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-purple-700">Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 rue exemple" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-700">Code postal</FormLabel>
                          <FormControl>
                            <Input placeholder="83000" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-700">Ville</FormLabel>
                          <FormControl>
                            <Input placeholder="Toulon" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Calculer les frais
                  </Button>
                </form>
              </Form>
            )}
            
            {deliveryZone && deliveryZone.id !== 'custom-distance' && (
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
            
            {calculatedDistance && addressSubmitted && (
              <div className="bg-purple-50 p-3 rounded-md text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <MapPinned className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">{deliveryZone?.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-purple-600" />
                  <span>Distance: {calculatedDistance} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>Temps de trajet estimé: {deliveryZone?.estimatedTime}</span>
                </div>
                <p className="text-xs text-purple-700">
                  Prix: {deliveryZone?.price.toFixed(2)}€ (1€/km)
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
              value={deliveryOption?.id || "pickup-sale"} 
              onValueChange={handleOptionChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez une option de livraison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pickup-sale">Retrait en magasin (gratuit)</SelectItem>
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
