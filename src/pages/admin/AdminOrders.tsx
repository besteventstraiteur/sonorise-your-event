
import React, { useState } from 'react';
import { useOrdersList } from '@/hooks/useOrdersList';
import { OrderSearch } from '@/components/admin/orders/OrderSearch';
import { OrderActions } from '@/components/admin/orders/OrderActions';
import { OrderTypeTabs } from '@/components/admin/orders/OrderTypeTabs';

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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex space-x-2 w-full sm:w-auto">
            <OrderSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <OrderActions />
          </div>
        </div>

        <OrderTypeTabs filteredOrders={filteredOrders} />
      </div>
    </div>
  );
};

export default AdminOrders;
