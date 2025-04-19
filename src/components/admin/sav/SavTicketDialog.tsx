
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSavTickets } from '@/hooks/useSavTickets';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SavTicketDialogProps {
  isOpen: boolean;
  ticketId: string | null;
  onClose: () => void;
}

const SavTicketDialog = ({ isOpen, ticketId, onClose }: SavTicketDialogProps) => {
  const { tickets, fetchCustomerTickets } = useSavTickets();
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = React.useState('');
  const [status, setStatus] = React.useState<'open' | 'in_progress' | 'closed'>('open');

  const ticket = tickets.find(t => t.id === ticketId);

  React.useEffect(() => {
    if (ticket) {
      setStatus(ticket.status as 'open' | 'in_progress' | 'closed');
    }
  }, [ticket]);

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket || !currentUser) return;

    try {
      const { error } = await supabase
        .from('sav_tickets')
        .update({ status: newStatus })
        .eq('id', ticket.id);

      if (error) throw error;

      toast.success('Statut mis à jour avec succès');
      fetchCustomerTickets();
      setStatus(newStatus as 'open' | 'in_progress' | 'closed');
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const handleSendMessage = async () => {
    if (!ticket || !currentUser || !newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('sav_messages')
        .insert({
          ticket_id: ticket.id,
          sender_id: currentUser.id,
          message: newMessage.trim(),
          is_internal: false
        });

      if (error) throw error;

      toast.success('Message envoyé avec succès');
      setNewMessage('');
      fetchCustomerTickets();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Ticket SAV - {ticket.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Créé le {new Date(ticket.created_at).toLocaleDateString()}
              </p>
              <Badge variant="outline" className={
                ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                ticket.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }>
                Priorité : {
                  ticket.priority === 'high' ? 'Haute' :
                  ticket.priority === 'normal' ? 'Normale' :
                  'Basse'
                }
              </Badge>
            </div>

            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Changer le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">En attente</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="closed">Résolu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-gray-600">{ticket.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Textarea
                placeholder="Votre réponse..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleSendMessage} className="self-end">
                Envoyer la réponse
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavTicketDialog;
