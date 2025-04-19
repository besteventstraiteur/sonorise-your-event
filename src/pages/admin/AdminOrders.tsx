
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download } from 'lucide-react';
import { useOrdersList } from '@/hooks/useOrdersList';
import { OrdersTable } from '@/components/admin/orders/OrdersTable';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: orders = [] } = useOrdersList();
  
  // Filtrer les commandes en fonction de la recherche
  const filteredOrders = orders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.order_number.toLowerCase().includes(searchLower) ||
      order.delivery_address?.toLowerCase().includes(searchLower) ||
      order.phone_number?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Commandes</h1>
        <p className="text-gray-600">Gestion des commandes et livraisons</p>
      </div>

      <div className="flex flex-col gap-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="purchase">Achats</TabsTrigger>
              <TabsTrigger value="rental">Locations</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une commande..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <OrdersTable orders={filteredOrders} />
          </TabsContent>
          
          <TabsContent value="purchase">
            <OrdersTable 
              orders={filteredOrders.filter(order => order.type === 'purchase')} 
            />
          </TabsContent>
          
          <TabsContent value="rental">
            <OrdersTable 
              orders={filteredOrders.filter(order => order.type === 'rental')} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminOrders;
