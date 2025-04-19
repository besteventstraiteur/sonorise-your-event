
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck } from 'lucide-react';

interface CalendarSidebarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  events: Array<{ date: string }>;
}

const CalendarSidebar = ({ date, onDateSelect, events }: CalendarSidebarProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calendrier</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateSelect}
            className="w-full"
            modifiersClassNames={{
              hasEvent: "bg-pink-100 text-pink-800 font-bold",
              selected: "bg-pink-500 text-white",
            }}
            modifiersStyles={{
              selected: { fontWeight: "bold" },
            }}
            modifiers={{
              hasEvent: (date) => {
                const formattedDate = date.toISOString().split('T')[0];
                return events.some(event => event.date === formattedDate);
              }
            }}
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-pink-500"></div>
              <span className="text-sm text-gray-600">Aujourd'hui</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-pink-200"></div>
              <span className="text-sm text-gray-600">Événement</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Légende</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Truck className="h-3 w-3 mr-1" />
              Livraison
            </Badge>
            <span className="text-sm text-gray-600">Livraison de matériel</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Package className="h-3 w-3 mr-1" />
              Récupération
            </Badge>
            <span className="text-sm text-gray-600">Récupération de matériel</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CalendarSidebar;

