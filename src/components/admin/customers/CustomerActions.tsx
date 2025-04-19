
import { Filter, Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CustomerActions = () => {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Filter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Download className="h-4 w-4" />
      </Button>
      <Button className="h-9" size="sm">
        <UserPlus className="h-4 w-4 mr-1" />
        Ajouter
      </Button>
    </div>
  );
};
