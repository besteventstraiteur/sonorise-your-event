
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from '@/lib/utils';

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const OrderDetails = ({ isOpen, onClose, order }: OrderDetailsProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Détails de la commande {order.order_number}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-medium mb-2">Informations client</h3>
            <p className="text-sm text-gray-600">{order.delivery_address}</p>
            <p className="text-sm text-gray-600">{order.phone_number}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Informations commande</h3>
            <p className="text-sm text-gray-600">Date: {formatDate(order.created_at)}</p>
            <p className="text-sm text-gray-600">Statut: {order.status}</p>
            <p className="text-sm text-gray-600">Type: {order.type}</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead className="text-right">Quantité</TableHead>
              <TableHead className="text-right">Prix unitaire</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.order_items?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.products?.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{item.unit_price.toFixed(2)} €</TableCell>
                <TableCell className="text-right">{item.subtotal.toFixed(2)} €</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
              <TableCell className="text-right font-medium">{order.total_amount.toFixed(2)} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};
