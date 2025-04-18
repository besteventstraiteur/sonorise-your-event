
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Filter } from 'lucide-react';
import ProductGrid from '@/components/catalogue/ProductGrid';
import CategoryFilter from '@/components/catalogue/CategoryFilter';
import SectionTitle from '@/components/ui/SectionTitle';

const Catalogue = () => {
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:product_categories(name)
        `);
      if (error) throw error;
      return data;
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-pink-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Catalogue de Location"
            description="Découvrez notre sélection de matériel professionnel pour vos événements"
            className="text-white"
            titleClassName="text-white"
            descriptionClassName="text-white/90"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <CategoryFilter categories={categories || []} isLoading={categoriesLoading} />
          </aside>

          <main className="flex-1">
            <ProductGrid products={products || []} isLoading={productsLoading} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
