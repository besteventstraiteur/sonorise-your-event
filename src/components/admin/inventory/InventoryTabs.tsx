
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from '../products/ProductList';
import { StockMovementForm } from '../stock/StockMovementForm';
import { StockMovementHistory } from '../stock/StockMovementHistory';
import { Badge } from '@/components/ui/badge';

interface InventoryTabsProps {
  products: { id: string; name: string; }[];
  isLoading?: boolean;
}

export const InventoryTabs = ({ products, isLoading = false }: InventoryTabsProps) => {
  const [activeTab, setActiveTab] = useState("all-products");
  
  return (
    <Tabs defaultValue="all-products" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="all-products">
          Tous les produits
        </TabsTrigger>
        <TabsTrigger value="rental-products">
          <div className="flex items-center gap-2">
            <span>Location</span>
            <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">Location</Badge>
          </div>
        </TabsTrigger>
        <TabsTrigger value="sale-products">
          <div className="flex items-center gap-2">
            <span>Vente</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Vente</Badge>
          </div>
        </TabsTrigger>
        <TabsTrigger value="stock-movement">Mouvements de Stock</TabsTrigger>
        <TabsTrigger value="stock-history">Historique</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all-products">
        <ProductList productType="all" isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="rental-products">
        <ProductList productType="location" isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="sale-products">
        <ProductList productType="vente" isLoading={isLoading} />
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
