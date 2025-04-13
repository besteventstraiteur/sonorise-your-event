
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import RentalDelivery from './delivery/RentalDelivery';
import SaleDelivery from './delivery/SaleDelivery';

const DeliveryOptions: React.FC = () => {
  const { 
    hasRentalItems,
    hasSaleItems
  } = useCart();

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
          <RentalDelivery />
        )}
        
        {hasRentalItems && hasSaleItems && (
          <Separator className="my-4" />
        )}
        
        {hasSaleItems && (
          <SaleDelivery />
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryOptions;
