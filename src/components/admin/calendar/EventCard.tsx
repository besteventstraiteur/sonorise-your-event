
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, User, Phone, MapPin } from 'lucide-react';

interface Event {
  id: string;
  type: 'delivery' | 'pickup';
  time: string;
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  items: string[];
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge className={
              event.type === 'delivery' 
                ? "bg-green-100 text-green-800" 
                : "bg-blue-100 text-blue-800"
            }>
              {event.type === 'delivery' ? (
                <>
                  <Truck className="h-3 w-3 mr-1" />
                  Livraison
                </>
              ) : (
                <>
                  <Package className="h-3 w-3 mr-1" />
                  Récupération
                </>
              )}
            </Badge>
            <span className="font-medium text-sm">{event.time}</span>
          </div>
          
          <h3 className="font-medium">{event.orderId}</h3>
        </div>
        
        <Button variant="outline" size="sm">Détails</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-sm">
            <User className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Client</p>
              <p className="text-gray-600">{event.customerName}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Téléphone</p>
              <p className="text-gray-600">{event.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Adresse</p>
              <p className="text-gray-600">{event.address}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <Package className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Articles</p>
              <p className="text-gray-600">{event.items.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

