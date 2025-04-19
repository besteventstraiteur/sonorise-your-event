
import { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CustomersTable } from '@/components/admin/customers/CustomersTable';
import { useCustomersList } from '@/hooks/useCustomersList';
import { CustomerSearch } from '@/components/admin/customers/CustomerSearch';
import { CustomerActions } from '@/components/admin/customers/CustomerActions';
import { CustomerTypeTabs } from '@/components/admin/customers/CustomerTypeTabs';

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
            <CustomerTypeTabs />
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <CustomerSearch 
                searchQuery={searchQuery}
                onChange={setSearchQuery}
              />
              <CustomerActions />
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
