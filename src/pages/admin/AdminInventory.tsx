
import React, { useState } from 'react';
import { useProductsList } from '@/hooks/useProductsList';
import { InventoryTabs } from '@/components/admin/inventory/InventoryTabs';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import ImportExportModal from '@/components/admin/inventory/ImportExportModal';

const AdminInventory = () => {
  const { data: products = [], isLoading } = useProductsList();
  const [showImportExport, setShowImportExport] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion du stock</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowImportExport(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            <span>Importer/Exporter</span>
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <InventoryTabs products={products} isLoading={isLoading} />
      </Card>

      <ImportExportModal 
        open={showImportExport} 
        onClose={() => setShowImportExport(false)} 
      />
    </div>
  );
};

export default AdminInventory;
