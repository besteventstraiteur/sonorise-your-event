
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Document {
  id: string;
  type: 'devis' | 'facture';
  number: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'cancelled' | 'paid';
  total_amount: number;
  created_at: string;
  sent_at: string | null;
  accepted_at: string | null;
  paid_at: string | null;
  due_date: string | null;
  content: any;
}

export const useDocumentsList = () => {
  return useQuery({
    queryKey: ['admin_documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          template:document_templates(
            name,
            type,
            content
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Document[];
    }
  });
};
