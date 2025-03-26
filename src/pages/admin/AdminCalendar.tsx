
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, 
  User, 
  MapPin, 
  Phone, 
  Package, 
  Truck,
  ListFilter
} from 'lucide-react';

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState<'all' | 'delivery' | 'pickup'>('all');
  
  // Données fictives pour les événements du calendrier
  const calendarEvents = [
    {
      id: "EVT-001",
      type: "delivery",
      date: "2023-06-10",
      time: "10:00",
      customerId: "1",
      customerName: "Jean Dupont",
      phone: "06-12-34-56-78",
      address: "23 Rue du Commerce, Toulon",
      orderId: "CMD-001234",
      items: ["JBL EON ONE Compact", "Micro sans fil (x2)"]
    },
    {
      id: "EVT-002",
      type: "pickup",
      date: "2023-06-12",
      time: "16:00",
      customerId: "1",
      customerName: "Jean Dupont",
      phone: "06-12-34-56-78",
      address: "23 Rue du Commerce, Toulon",
      orderId: "CMD-001234",
      items: ["JBL EON ONE Compact", "Micro sans fil (x2)"]
    },
    {
      id: "EVT-003",
      type: "delivery",
      date: "2023-06-15",
      time: "14:30",
      customerId: "2",
      customerName: "Marie Martin",
      phone: "07-65-43-21-09",
      address: "45 Avenue de la République, Nice",
      orderId: "CMD-001235",
      items: ["Système Bose L1 Pro8", "Machine à fumée"]
    },
    {
      id: "EVT-004",
      type: "pickup",
      date: "2023-06-18",
      time: "18:00",
      customerId: "2",
      customerName: "Marie Martin",
      phone: "07-65-43-21-09",
      address: "45 Avenue de la République, Nice",
      orderId: "CMD-001235",
      items: ["Système Bose L1 Pro8", "Machine à fumée"]
    },
    {
      id: "EVT-005",
      type: "delivery",
      date: "2023-06-20",
      time: "09:00",
      customerId: "3",
      customerName: "Entreprise ABC",
      phone: "04-98-76-54-32",
      address: "12 Zone Industrielle, Toulon",
      orderId: "CMD-001236",
      items: ["Pack d'éclairage LED ADJ", "Câbles divers"]
    }
  ];

  // Fonction pour déterminer si une date a des événements
  const getDayClassNames = (day: Date) => {
    const formattedDate = day.toISOString().split('T')[0];
    const hasEvent = calendarEvents.some(event => event.date === formattedDate);
    
    return hasEvent ? "bg-pink-100 text-pink-800 font-bold" : "";
  };

  // Filtrer les événements pour la date sélectionnée et le type de vue
  const selectedDateEvents = calendarEvents
    .filter(event => {
      const isSameDate = event.date === date?.toISOString().split('T')[0];
      if (!isSameDate) return false;
      
      if (viewType === 'all') return true;
      return event.type === viewType;
    })
    .sort((a, b) => {
      // Trier par heure
      return a.time.localeCompare(b.time);
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Calendrier</h1>
        <p className="text-gray-600">Planning des livraisons et récupérations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                modifiersClassNames={{
                  selected: "bg-pink-500 text-white",
                }}
                modifiersStyles={{
                  selected: { fontWeight: "bold" },
                }}
                modifiers={{
                  hasEvent: (date) => {
                    const formattedDate = date.toISOString().split('T')[0];
                    return calendarEvents.some(event => event.date === formattedDate);
                  }
                }}
                modifiersClassNames={{
                  hasEvent: "bg-pink-100 text-pink-800 font-bold",
                  selected: "bg-pink-500 text-white",
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
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {date && (
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="h-5 w-5 text-pink-500" />
                      <span>
                        {date.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedDateEvents.length} événement(s)
                </p>
              </div>
              
              <Tabs value={viewType} onValueChange={(value) => setViewType(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="delivery">Livraisons</TabsTrigger>
                  <TabsTrigger value="pickup">Récupérations</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">Aucun événement</h3>
                  <p className="text-gray-500">
                    Aucun événement prévu pour cette date.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
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
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
