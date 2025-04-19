
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types/catalogue';

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  brand: z.string().optional(),
  category_id: z.string().min(1, 'Veuillez sélectionner une catégorie'),
  type: z.enum(['location', 'vente', 'both']),
  description: z.string().optional(),
  short_description: z.string().optional(),
  daily_price: z.string().optional(),
  sale_price: z.string().optional(),
  stock: z.string().min(1, 'Le stock est requis'),
  min_stock: z.string(),
  available: z.boolean(),
  featured: z.boolean(),
});

export type ProductFormData = z.infer<typeof formSchema>;

export const useProductForm = (product: Product | null, onClose: () => void) => {
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      brand: product?.brand || '',
      category_id: product?.category_id || '',
      type: product?.type || 'location',
      description: product?.description || '',
      short_description: product?.short_description || '',
      daily_price: product?.daily_price?.toString() || '',
      sale_price: product?.sale_price?.toString() || '',
      stock: product?.stock?.toString() || '0',
      min_stock: product?.min_stock?.toString() || '1',
      available: product?.available ?? true,
      featured: product?.featured ?? false,
    },
  });

  const onSubmit = async (values: ProductFormData) => {
    try {
      const formattedValues = {
        ...values,
        daily_price: values.daily_price ? parseFloat(values.daily_price) : null,
        sale_price: values.sale_price ? parseFloat(values.sale_price) : null,
        stock: parseInt(values.stock),
        min_stock: parseInt(values.min_stock),
      };

      if (product?.id) {
        const { error } = await supabase
          .from('products')
          .update(formattedValues)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: "Produit mis à jour",
          description: "Le produit a été mis à jour avec succès."
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert(formattedValues);

        if (error) throw error;

        toast({
          title: "Produit créé",
          description: "Le produit a été créé avec succès."
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du produit.",
        variant: "destructive"
      });
    }
  };

  return {
    form,
    onSubmit,
    formSchema
  };
};
