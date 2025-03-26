
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, MoreHorizontal, UserPlus } from 'lucide-react';

const AdminCustomers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Données fictives pour les clients
  const customers = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '06-12-34-56-78',
      address: '23 Rue du Commerce, Toulon',
      orders: 12,
      totalSpent: 2350,
      lastOrder: '2023-05-15',
      status: 'active',
      type: 'individual'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '07-65-43-21-09',
      address: '45 Avenue de la République, Nice',
      orders: 8,
      totalSpent: 1580,
      lastOrder: '2023-05-28',
      status: 'active',
      type: 'individual'
    },
    {
      id: '3',
      name: 'Entreprise ABC',
      email: 'contact@abc.com',
      phone: '04-98-76-54-32',
      address: '12 Zone Industrielle, Toulon',
      orders: 25,
      totalSpent: 8750,
      lastOrder: '2023-06-02',
      status: 'active',
      type: 'business'
    },
    {
      id: '4',
      name: 'Association XYZ',
      email: 'info@xyz-asso.org',
      phone: '04-11-22-33-44',
      address: '78 Rue des Associations, La Seyne-sur-Mer',
      orders: 18,
      totalSpent: 4250,
      lastOrder: '2023-05-20',
      status: 'active',
      type: 'business'
    },
    {
      id: '5',
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      phone: '06-98-76-54-32',
      address: '34 Boulevard de la Plage, Hyères',
      orders: 2,
      totalSpent: 320,
      lastOrder: '2023-04-10',
      status: 'inactive',
      type: 'individual'
    }
  ];

  // Filtrer les clients en fonction de la recherche
  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchQuery)
    );
  });

  // Obtenir le statut avec le style approprié
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactif</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
            <ClientsTable customers={filteredCustomers} />
          </TabsContent>
          
          <TabsContent value="individual">
            <ClientsTable customers={filteredCustomers.filter(c => c.type === 'individual')} />
          </TabsContent>
          
          <TabsContent value="business">
            <ClientsTable customers={filteredCustomers.filter(c => c.type === 'business')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ClientsTableProps {
  customers: any[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ customers }) => {
  // Obtenir le statut avec le style approprié
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactif</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Commandes</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucun client trouvé
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{customer.email}</div>
                    <div className="text-gray-500">{customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCustomers;
