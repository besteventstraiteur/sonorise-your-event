
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from '@/data/rentalProducts';

interface CategoryTabsProps {
  categories: Category[];
  defaultCategory: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, defaultCategory }) => {
  return (
    <div className="mb-8">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.id}
            value={category.id}
            className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800 data-[state=active]:border-pink-300 border py-6"
          >
            <div className="flex flex-col items-center gap-2">
              {category.icon}
              <span>{category.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default CategoryTabs;
