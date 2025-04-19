
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from '../products/ProductList';
import { StockMovementForm } from '../stock/StockMovementForm';
import { StockMovementHistory } from '../stock/StockMovementHistory';

interface InventoryTabsProps {
  products: { id: string; name: string; }[];
}

export const InventoryTabs = ({ products }: InventoryTabsProps) => {
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
