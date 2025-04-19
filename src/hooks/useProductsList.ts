
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name')
    .order('name');
  
  if (error) throw error;
  return data;
};

export const useProductsList = () => {
  return useQuery({
    queryKey: ['products_list'],
    queryFn: fetchProducts
  });
};
