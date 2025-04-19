
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SavTicketsTable from '@/components/admin/sav/SavTicketsTable';
import { useAuth } from '@/context/AuthContext';

const AdminSav = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion du SAV</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tous les tickets</TabsTrigger>
          <TabsTrigger value="open">En attente</TabsTrigger>
          <TabsTrigger value="in_progress">En cours</TabsTrigger>
          <TabsTrigger value="closed">Résolus</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="p-4">
            <SavTicketsTable filterStatus={null} />
          </Card>
        </TabsContent>

        <TabsContent value="open">
          <Card className="p-4">
            <SavTicketsTable filterStatus="open" />
          </Card>
        </TabsContent>

        <TabsContent value="in_progress">
          <Card className="p-4">
            <SavTicketsTable filterStatus="in_progress" />
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card className="p-4">
            <SavTicketsTable filterStatus="closed" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSav;
