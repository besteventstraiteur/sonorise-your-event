
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface OrderSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const OrderSearch = ({ searchQuery, onSearchChange }: OrderSearchProps) => {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Rechercher une commande..."
        className="pl-9"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
