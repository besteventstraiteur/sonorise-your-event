
import React from 'react';
import ProductCard from '@/components/catalogue/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types/catalogue';

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      brand,
      short_description,
      daily_price,
      sale_price,
      type,
      stock,
      min_stock,
      available,
      featured,
      description,
      category_id,
      category:categories(name),
      image_url: product_images(image_url)
    `)
    .eq('available', true)
    .eq('product_images.is_primary', true);
  
  if (error) throw error;

  // Transform the data to match the Product type
  const formattedProducts = data?.map(product => ({
    ...product,
    image_url: product.image_url?.[0]?.image_url || null,
    category: product.category?.[0]?.name || null
  })) as Product[];

  return formattedProducts;
};

const Catalogue = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catalogue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
