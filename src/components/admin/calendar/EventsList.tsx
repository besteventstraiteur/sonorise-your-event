
import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from './EventCard';

interface Event {
  id: string;
  type: 'delivery' | 'pickup';
  date: string;
  time: string;
  customerId: string;
  customerName: string;
  phone: string;
  address: string;
  orderId: string;
  items: string[];
}

interface EventsListProps {
  selectedDate: Date;
  events: Event[];
  viewType: 'all' | 'delivery' | 'pickup';
  onViewTypeChange: (value: 'all' | 'delivery' | 'pickup') => void;
}

const EventsList = ({ selectedDate, events, viewType, onViewTypeChange }: EventsListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-pink-500" />
            <span>
              {selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {events.length} événement(s)
          </p>
        </div>
        
        <Tabs value={viewType} onValueChange={(value) => onViewTypeChange(value as any)}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="delivery">Livraisons</TabsTrigger>
            <TabsTrigger value="pickup">Récupérations</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8">
            <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Aucun événement</h3>
            <p className="text-gray-500">
              Aucun événement prévu pour cette date.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsList;

