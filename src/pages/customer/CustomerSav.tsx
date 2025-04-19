
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSavTickets, SavTicket } from '@/hooks/useSavTickets';
import { Plus, FileText, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CustomerSav: React.FC = () => {
  const { tickets, loading, fetchCustomerTickets, createTicket } = useSavTickets();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<SavTicket>>({
    title: '',
    description: '',
    status: 'open',
    priority: 'normal'
  });

  useEffect(() => {
    fetchCustomerTickets();
  }, []);

  const handleCreateTicket = () => {
    if (newTicket.title && newTicket.description) {
      createTicket(newTicket as SavTicket);
      setIsCreateDialogOpen(false);
      setNewTicket({ 
        title: '', 
        description: '', 
        status: 'open', 
        priority: 'normal' 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mes demandes de SAV</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle demande
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un ticket SAV</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input 
                placeholder="Titre du ticket" 
                value={newTicket.title}
                onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea 
                placeholder="Description détaillée du problème" 
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
              />
              <Select 
                value={newTicket.priority} 
                onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value as 'low' | 'normal' | 'high' }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="normal">Normale</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleCreateTicket} className="w-full">
                Créer le ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p>Vous n'avez pas encore de demandes de SAV.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map(ticket => (
            <Card key={ticket.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{ticket.title}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                  ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {ticket.status === 'open' ? 'Ouvert' : 
                   ticket.status === 'in_progress' ? 'En cours' : 
                   'Fermé'}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{ticket.description}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Priorité : {ticket.priority === 'low' ? 'Faible' : ticket.priority === 'normal' ? 'Normale' : 'Haute'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerSav;
