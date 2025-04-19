
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types/catalogue';
import { BasicInfoSection } from './form/BasicInfoSection';
import { PricingSection } from './form/PricingSection';
import { StockSection } from './form/StockSection';
import { ToggleSection } from './form/ToggleSection';

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

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { toast } = useToast();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <BasicInfoSection form={form} categories={categories} />
        <PricingSection form={form} selectedType={form.watch('type')} />
        <StockSection form={form} />
        <ToggleSection form={form} />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">
            {product ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
