
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useSavTickets } from '@/hooks/useSavTickets';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, Clock, MessageSquare, Phone, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavTicketDialogProps {
  isOpen: boolean;
  ticketId: string | null;
  onClose: () => void;
}

interface SavMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  message: string;
  created_at: string;
  is_internal: boolean;
}

const SavTicketDialog = ({ isOpen, ticketId, onClose }: SavTicketDialogProps) => {
  const { tickets, fetchCustomerTickets } = useSavTickets();
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = React.useState('');
  const [internalNote, setInternalNote] = React.useState('');
  const [status, setStatus] = React.useState<'open' | 'in_progress' | 'closed'>('open');
  const [priority, setPriority] = React.useState<'low' | 'normal' | 'high'>('normal');
  const [activeTab, setActiveTab] = React.useState('messages');
  const [messages, setMessages] = React.useState<SavMessage[]>([]);
  const [loading, setLoading] = React.useState(false);

  const ticket = tickets.find(t => t.id === ticketId);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status as 'open' | 'in_progress' | 'closed');
      setPriority(ticket.priority as 'low' | 'normal' | 'high');
      fetchMessages();
    }
  }, [ticket]);

  const fetchMessages = async () => {
    if (!ticket) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sav_messages')
        .select('*')
        .eq('ticket_id', ticket.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error("Erreur lors du chargement des messages");
    } finally {
      setLoading(false);
    }
  };

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

  const handlePriorityChange = async (newPriority: string) => {
    if (!ticket || !currentUser) return;

    try {
      const { error } = await supabase
        .from('sav_tickets')
        .update({ priority: newPriority })
        .eq('id', ticket.id);

      if (error) throw error;

      toast.success('Priorité mise à jour avec succès');
      fetchCustomerTickets();
      setPriority(newPriority as 'low' | 'normal' | 'high');
    } catch (error) {
      console.error('Error updating ticket priority:', error);
      toast.error("Erreur lors de la mise à jour de la priorité");
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
      fetchMessages();
      fetchCustomerTickets();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  const handleSendInternalNote = async () => {
    if (!ticket || !currentUser || !internalNote.trim()) return;

    try {
      const { error } = await supabase
        .from('sav_messages')
        .insert({
          ticket_id: ticket.id,
          sender_id: currentUser.id,
          message: internalNote.trim(),
          is_internal: true
        });

      if (error) throw error;

      toast.success('Note interne ajoutée');
      setInternalNote('');
      fetchMessages();
    } catch (error) {
      console.error('Error adding internal note:', error);
      toast.error("Erreur lors de l'ajout de la note interne");
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span>Ticket #{ticket.id.slice(0, 8)}</span>
            <Badge variant="outline" className={
              ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
              ticket.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }>
              Priorité {
                ticket.priority === 'high' ? 'Haute' :
                ticket.priority === 'normal' ? 'Normale' :
                'Basse'
              }
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Sujet</h3>
              <p className="font-medium">{ticket.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Date de création</h3>
              <p>{new Date(ticket.created_at).toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Changer le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">En attente</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="closed">Résolu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Priorité</h3>
              <Select value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Changer la priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Basse</SelectItem>
                  <SelectItem value="normal">Normale</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-gray-600">{ticket.description}</p>
          </div>

          <div className="pt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="internal">
                  <User className="h-4 w-4 mr-2" />
                  Notes internes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="pt-4">
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 p-2">
                  {messages.filter(msg => !msg.is_internal).length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Aucun message pour ce ticket</p>
                  ) : (
                    messages
                      .filter(msg => !msg.is_internal)
                      .map(message => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg ${message.sender_id === currentUser?.id ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}
                        >
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{message.sender_id === currentUser?.id ? 'Vous' : 'Client'}</span>
                            <span>{new Date(message.created_at).toLocaleString('fr-FR')}</span>
                          </div>
                          <p>{message.message}</p>
                        </div>
                      ))
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Textarea
                    placeholder="Votre réponse au client..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleSendMessage} className="self-end">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Envoyer la réponse
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="internal" className="pt-4">
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 p-2">
                  {messages.filter(msg => msg.is_internal).length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Aucune note interne pour ce ticket</p>
                  ) : (
                    messages
                      .filter(msg => msg.is_internal)
                      .map(message => (
                        <div 
                          key={message.id} 
                          className="p-3 rounded-lg bg-amber-50"
                        >
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Note interne</span>
                            <span>{new Date(message.created_at).toLocaleString('fr-FR')}</span>
                          </div>
                          <p>{message.message}</p>
                        </div>
                      ))
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Textarea
                    placeholder="Ajouter une note interne (visible uniquement par l'administration)..."
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleSendInternalNote} className="self-end" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Ajouter une note interne
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center pt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Appeler le client
            </Button>
          </div>
          <Button onClick={onClose} variant="ghost">Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavTicketDialog;
