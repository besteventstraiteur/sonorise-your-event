
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductList from '@/components/admin/products/ProductList';
import { StockMovementForm } from '@/components/admin/stock/StockMovementForm';
import { StockMovementHistory } from '@/components/admin/stock/StockMovementHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name')
    .order('name');
  
  if (error) throw error;
  return data;
};

const AdminInventory = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products_list'],
    queryFn: fetchProducts
  });

  return (
    <Tabs defaultValue="products">
      <TabsList>
        <TabsTrigger value="products">Produits</TabsTrigger>
        <TabsTrigger value="stock-movement">Mouvements de Stock</TabsTrigger>
        <TabsTrigger value="stock-history">Historique des Mouvements</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <ProductList />
      </TabsContent>
      <TabsContent value="stock-movement">
        <StockMovementForm products={products} />
      </TabsContent>
      <TabsContent value="stock-history">
        <StockMovementHistory />
      </TabsContent>
    </Tabs>
  );
};

export default AdminInventory;
