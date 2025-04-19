
import React from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types/catalogue';
import { BasicInfoSection } from './form/BasicInfoSection';
import { PricingSection } from './form/PricingSection';
import { StockSection } from './form/StockSection';
import { ToggleSection } from './form/ToggleSection';
import { useProductForm } from '@/hooks/useProductForm';

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
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { form, onSubmit } = useProductForm(product || null, onClose);

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
