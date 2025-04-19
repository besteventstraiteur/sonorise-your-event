
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export interface SavTicket {
  id?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'normal' | 'high';
  product_id?: string;
  order_id?: string;
  customer_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const useSavTickets = () => {
  const [tickets, setTickets] = useState<SavTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const fetchCustomerTickets = async () => {
    setLoading(true);
    try {
      console.log("Fetching tickets for user:", currentUser?.id);
      
      // Requête différente selon que l'utilisateur est admin ou client
      let query = supabase
        .from('sav_tickets')
        .select('*');
        
      // Si l'utilisateur n'est pas admin, filtrer par son ID
      if (currentUser && currentUser.role !== 'admin') {
        query = query.eq('customer_id', currentUser.id);
      }
      
      // Tri par date décroissante
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching tickets:", error);
        throw error;
      }
      
      console.log("Tickets fetched:", data);
      setTickets(data || []);
    } catch (error: any) {
      console.error("Error in fetchCustomerTickets:", error);
      toast.error("Erreur de chargement: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticket: SavTicket) => {
    setLoading(true);
    try {
      console.log("Creating ticket:", ticket);
      
      // S'assurer que customer_id est défini
      const ticketToCreate = {
        ...ticket,
        customer_id: ticket.customer_id || currentUser?.id
      };
      
      const { data, error } = await supabase
        .from('sav_tickets')
        .insert(ticketToCreate)
        .select();

      if (error) {
        console.error("Error creating ticket:", error);
        throw error;
      }
      
      console.log("Ticket created:", data);
      
      toast.success("Votre ticket de SAV a été créé avec succès.");

      // Mettre à jour la liste des tickets
      if (data) setTickets(prev => [data[0], ...prev]);
    } catch (error: any) {
      console.error("Error in createTicket:", error);
      toast.error("Erreur de création: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Quand l'utilisateur change, récupérer ses tickets
  useEffect(() => {
    if (currentUser) {
      fetchCustomerTickets();
    }
  }, [currentUser]);

  return { tickets, loading, fetchCustomerTickets, createTicket };
};
