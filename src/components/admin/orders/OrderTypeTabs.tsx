
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrdersTable } from './OrdersTable';

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  type: string;
  total_amount: number;
  delivery_address?: string;
  phone_number?: string;
  order_items: any[];
}

interface OrderTypeTabsProps {
  filteredOrders: Order[];
}

export const OrderTypeTabs = ({ filteredOrders }: OrderTypeTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Toutes</TabsTrigger>
        <TabsTrigger value="purchase">Achats</TabsTrigger>
        <TabsTrigger value="rental">Locations</TabsTrigger>
      </TabsList>
      
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
  );
};
