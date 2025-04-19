
import React from 'react';
import { useProductsList } from '@/hooks/useProductsList';
import { InventoryTabs } from '@/components/admin/inventory/InventoryTabs';

const AdminInventory = () => {
  const { data: products = [] } = useProductsList();

  return <InventoryTabs products={products} />;
};

export default AdminInventory;
