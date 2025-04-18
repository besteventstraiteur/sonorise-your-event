
import React from 'react';
import { motion } from 'framer-motion';
import type { Product, Category } from '@/types/catalogue';
import ProductGrid from '@/components/catalogue/ProductGrid';
import CategoryFilter from '@/components/catalogue/CategoryFilter';
import SectionTitle from '@/components/ui/SectionTitle';

// Données temporaires mockées
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Enceinte JBL PRX815W',
    brand: 'JBL',
    short_description: 'Enceinte active 1500W, idéale pour les événements de moyenne envergure',
    daily_price: 50,
    sale_price: 899,
    image_url: '/placeholder.svg',
    type: 'both',
    category_id: '1',
    category: { name: 'Sonorisation' }
  },
  {
    id: '2',
    name: 'Console Pionner DJM-900NXS2',
    brand: 'Pioneer',
    short_description: 'Table de mixage professionnelle 4 voies',
    daily_price: 80,
    sale_price: 2199,
    image_url: '/placeholder.svg',
    type: 'location',
    category_id: '2',
    category: { name: 'DJ' }
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Sonorisation',
    slug: 'sonorisation',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'DJ',
    slug: 'dj',
    created_at: new Date().toISOString()
  }
];

const Catalogue = () => {
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
            <CategoryFilter categories={mockCategories} isLoading={false} />
          </aside>

          <main className="flex-1">
            <ProductGrid products={mockProducts} isLoading={false} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
