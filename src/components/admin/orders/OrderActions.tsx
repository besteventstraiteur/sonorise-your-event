
import { Button } from "@/components/ui/button";
import { Filter, Download } from 'lucide-react';

export const OrderActions = () => {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};
