
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderDetails } from './OrderDetails';
import { formatDate } from '@/lib/utils';

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  type: string;
  total_amount: number;
  customer_id: string;
  delivery_address?: string;
  phone_number?: string;
  order_items: any[];
}

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      completed: "bg-green-100 text-green-800 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      delivered: "bg-green-100 text-green-800 hover:bg-green-200",
    };

    return <Badge className={styles[status as keyof typeof styles]}>{status}</Badge>;
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Commande</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.order_number}</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {order.type === 'rental' ? 'Location' : 'Achat'}
                  </Badge>
                </TableCell>
                <TableCell>{order.total_amount.toFixed(2)} €</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetails
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
};
