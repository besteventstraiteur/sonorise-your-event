
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SavTicketsTable from '@/components/admin/sav/SavTicketsTable';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Download, 
  Filter, 
  LifeBuoy, 
  RefreshCw
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSavTickets } from '@/hooks/useSavTickets';

const AdminSav = () => {
  const { currentUser } = useAuth();
  const { loading, fetchCustomerTickets } = useSavTickets();
  const [priorityFilter, setPriorityFilter] = React.useState<string | null>(null);

  if (!currentUser) {
    return null;
  }

  const handleRefresh = () => {
    fetchCustomerTickets();
    toast.success("Données actualisées");
  };

  const handleExport = () => {
    toast.success("Export des tickets SAV en cours...");
    // This would be implemented with actual export functionality in a real app
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion du SAV</h1>
          <p className="text-gray-500">Gérez les demandes de service après-vente</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-3 py-1">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">En attente: 3</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 rounded-full px-3 py-1">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">En cours: 5</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Résolus: 12</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={priorityFilter || ""} onValueChange={(value) => setPriorityFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les priorités</SelectItem>
              <SelectItem value="high">Haute</SelectItem>
              <SelectItem value="normal">Normale</SelectItem>
              <SelectItem value="low">Basse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">Tous les tickets</TabsTrigger>
          <TabsTrigger value="open">En attente</TabsTrigger>
          <TabsTrigger value="in_progress">En cours</TabsTrigger>
          <TabsTrigger value="closed">Résolus</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="p-4">
            <SavTicketsTable filterStatus={null} priorityFilter={priorityFilter} />
          </Card>
        </TabsContent>

        <TabsContent value="open">
          <Card className="p-4">
            <SavTicketsTable filterStatus="open" priorityFilter={priorityFilter} />
          </Card>
        </TabsContent>

        <TabsContent value="in_progress">
          <Card className="p-4">
            <SavTicketsTable filterStatus="in_progress" priorityFilter={priorityFilter} />
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card className="p-4">
            <SavTicketsTable filterStatus="closed" priorityFilter={priorityFilter} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSav;
