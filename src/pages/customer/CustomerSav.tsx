
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSavTickets, SavTicket } from '@/hooks/useSavTickets';
import { Plus, FileText, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const CustomerSav: React.FC = () => {
  const { tickets, loading, fetchCustomerTickets, createTicket } = useSavTickets();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { currentUser } = useAuth();
  const [newTicket, setNewTicket] = useState<Partial<SavTicket>>({
    title: '',
    description: '',
    status: 'open',
    priority: 'normal'
  });

  useEffect(() => {
    console.log("CustomerSav component mounting, fetching tickets...");
    fetchCustomerTickets();
  }, []);

  const handleCreateTicket = () => {
    if (newTicket.title && newTicket.description) {
      // Ensure customer_id is set correctly
      const ticketWithCustomerId = {
        ...newTicket,
        customer_id: currentUser?.id
      } as SavTicket;
      
      console.log("Creating ticket with data:", ticketWithCustomerId);
      createTicket(ticketWithCustomerId);
      setIsCreateDialogOpen(false);
      setNewTicket({ 
        title: '', 
        description: '', 
        status: 'open', 
        priority: 'normal' 
      });
      toast.success("Votre demande de SAV a été créée avec succès");
    } else {
      toast.error("Veuillez remplir tous les champs obligatoires");
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'open':
        return 'Ouvert';
      case 'in_progress':
        return 'En cours';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  console.log("CustomerSav rendering with tickets:", tickets);

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
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{ticket.title}</CardTitle>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(ticket.status)}`}>
                  {getStatusIcon(ticket.status)}
                  <span>{getStatusText(ticket.status)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{ticket.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Priorité : {
                    ticket.priority === 'low' ? 'Faible' : 
                    ticket.priority === 'normal' ? 'Normale' : 'Haute'
                  }</span>
                  <span>Créé le : {new Date(ticket.created_at).toLocaleDateString()}</span>
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
