
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CustomerSearchProps {
  searchQuery: string;
  onChange: (value: string) => void;
}

export const CustomerSearch = ({ searchQuery, onChange }: CustomerSearchProps) => {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Rechercher un client..."
        className="pl-9 h-9"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
