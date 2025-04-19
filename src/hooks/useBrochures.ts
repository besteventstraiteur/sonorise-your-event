
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Brochure } from '@/types/brochures';

export const useBrochures = () => {
  const queryClient = useQueryClient();
  const [uploadingFile, setUploadingFile] = useState(false);

  const { data: brochures = [], isLoading } = useQuery({
    queryKey: ['brochures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brochures')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Erreur lors du chargement des brochures');
        throw error;
      }

      return data;
    }
  });

  const uploadBrochure = async (file: File, brochureData: Omit<Brochure, 'id' | 'file_path' | 'created_at' | 'updated_at'>) => {
    try {
      setUploadingFile(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('brochures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('brochures')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('brochures')
        .insert([{ ...brochureData, file_path: publicUrl }]);

      if (insertError) throw insertError;

      queryClient.invalidateQueries({ queryKey: ['brochures'] });
      toast.success('Brochure ajoutée avec succès');
    } catch (error) {
      console.error('Error uploading brochure:', error);
      toast.error('Erreur lors de l\'ajout de la brochure');
    } finally {
      setUploadingFile(false);
    }
  };

  const deleteBrochure = async (brochure: Brochure) => {
    try {
      const fileName = brochure.file_path.split('/').pop();
      if (!fileName) throw new Error('Invalid file path');

      const { error: deleteStorageError } = await supabase.storage
        .from('brochures')
        .remove([fileName]);

      if (deleteStorageError) throw deleteStorageError;

      const { error: deleteError } = await supabase
        .from('brochures')
        .delete()
        .eq('id', brochure.id);

      if (deleteError) throw deleteError;

      queryClient.invalidateQueries({ queryKey: ['brochures'] });
      toast.success('Brochure supprimée avec succès');
    } catch (error) {
      console.error('Error deleting brochure:', error);
      toast.error('Erreur lors de la suppression de la brochure');
    }
  };

  return {
    brochures,
    isLoading,
    uploadingFile,
    uploadBrochure,
    deleteBrochure
  };
};
