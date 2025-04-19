
import React, { useState } from 'react';
import CalendarSidebar from '@/components/admin/calendar/CalendarSidebar';
import EventsList from '@/components/admin/calendar/EventsList';

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState<'all' | 'delivery' | 'pickup'>('all');
  
  // Mock data for demonstration - In a real app, this would come from your database
  // Ensure the type property is explicitly typed as "delivery" | "pickup"
  const calendarEvents = [
    {
      id: "EVT-001",
      type: "delivery" as const, // Using 'as const' to ensure TypeScript recognizes this as the literal "delivery" type
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
      type: "pickup" as const,
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
      type: "delivery" as const,
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
      type: "pickup" as const,
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
      type: "delivery" as const,
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

  // Filter events based on selected date and view type
  const selectedDateEvents = calendarEvents
    .filter(event => {
      const isSameDate = event.date === date?.toISOString().split('T')[0];
      if (!isSameDate) return false;
      
      if (viewType === 'all') return true;
      return event.type === viewType;
    })
    .sort((a, b) => {
      return a.time.localeCompare(b.time);
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Calendrier des Locations</h1>
        <p className="text-gray-600">Gestion des livraisons et récupérations de matériel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CalendarSidebar
            date={date}
            onDateSelect={setDate}
            events={calendarEvents}
          />
        </div>
        
        <div className="lg:col-span-2">
          <EventsList
            selectedDate={date || new Date()}
            events={selectedDateEvents}
            viewType={viewType}
            onViewTypeChange={setViewType}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
