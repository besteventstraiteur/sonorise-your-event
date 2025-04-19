
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const fetchStockMovements = async () => {
  const { data, error } = await supabase
    .from('stock_movements')
    .select(`
      *,
      product:products(name)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const StockMovementHistory = () => {
  const { data: movements, isLoading, error } = useQuery({
    queryKey: ['stock_movements'],
    queryFn: fetchStockMovements
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement des mouvements de stock</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Historique des mouvements de stock</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantité</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements?.map(movement => (
            <TableRow key={movement.id}>
              <TableCell>{movement.product?.name}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    movement.type === 'in' ? 'outline' : 
                    movement.type === 'out' ? 'destructive' : 'secondary'
                  }
                >
                  {movement.type === 'in' ? 'Entrée' : 
                   movement.type === 'out' ? 'Sortie' : 'Ajustement'}
                </Badge>
              </TableCell>
              <TableCell>{movement.quantity}</TableCell>
              <TableCell>{movement.reason || '-'}</TableCell>
              <TableCell>{new Date(movement.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
