
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface SavTicket {
  id?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'normal' | 'high';
  product_id?: string;
  order_id?: string;
}

export const useSavTickets = () => {
  const [tickets, setTickets] = useState<SavTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCustomerTickets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sav_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur de chargement",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticket: SavTicket) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sav_tickets')
        .insert(ticket)
        .select();

      if (error) throw error;
      
      toast({
        title: "Ticket créé",
        description: "Votre ticket de SAV a été créé avec succès.",
      });

      // Mettre à jour la liste des tickets
      if (data) setTickets(prev => [data[0], ...prev]);
    } catch (error: any) {
      toast({
        title: "Erreur de création",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return { tickets, loading, fetchCustomerTickets, createTicket };
};
