
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, UserPlus } from 'lucide-react';
import { CustomersTable } from '@/components/admin/customers/CustomersTable';
import { useCustomersList } from '@/hooks/useCustomersList';

const AdminCustomers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: customers = [] } = useCustomersList();
  
  // Filtrer les clients en fonction de la recherche
  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (customer.first_name?.toLowerCase().includes(searchLower) || false) ||
      (customer.last_name?.toLowerCase().includes(searchLower) || false) ||
      (customer.email?.toLowerCase().includes(searchLower) || false) ||
      (customer.phone?.includes(searchQuery) || false)
    );
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Clients</h1>
        <p className="text-gray-600">Gestion de la base client</p>
      </div>

      <div className="flex flex-col gap-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="individual">Particuliers</TabsTrigger>
              <TabsTrigger value="business">Professionnels</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un client..."
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
          </div>

          <TabsContent value="all">
            <CustomersTable customers={filteredCustomers} />
          </TabsContent>
          
          <TabsContent value="individual">
            <CustomersTable customers={filteredCustomers.filter(c => c.type === 'individual')} />
          </TabsContent>
          
          <TabsContent value="business">
            <CustomersTable customers={filteredCustomers.filter(c => c.type === 'business')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCustomers;
