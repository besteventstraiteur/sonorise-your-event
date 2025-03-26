
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Filter, Download, Eye, Package, ShoppingBag } from 'lucide-react';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Données fictives pour les commandes
  const orders = [
    {
      id: "CMD-001234",
      customer: "Jean Dupont",
      date: "2023-05-15",
      items: ["JBL EON ONE Compact", "Micro sans fil (x2)"],
      total: 95.00,
      status: "completed",
      type: "location",
      rentDates: { start: "2023-05-15", end: "2023-05-17" },
      phone: "06-12-34-56-78",
      address: "23 Rue du Commerce, Toulon"
    },
    {
      id: "CMD-001235",
      customer: "Marie Martin",
      date: "2023-05-28",
      items: ["Câble XLR 10m (x2)", "Adaptateur Jack (x3)"],
      total: 42.50,
      status: "delivered",
      type: "purchase",
      deliveryDate: "2023-05-30",
      phone: "07-65-43-21-09",
      address: "45 Avenue de la République, Nice"
    },
    {
      id: "CMD-001236",
      customer: "Entreprise ABC",
      date: "2023-06-02",
      items: ["Système Bose L1 Pro8", "Machine à fumée"],
      total: 160.00,
      status: "processing",
      type: "location",
      rentDates: { start: "2023-06-12", end: "2023-06-15" },
      phone: "04-98-76-54-32",
      address: "12 Zone Industrielle, Toulon"
    },
    {
      id: "CMD-001237",
      customer: "Association XYZ",
      date: "2023-06-05",
      items: ["Pack d'éclairage LED ADJ", "Câbles divers"],
      total: 280.00,
      status: "pending",
      type: "purchase",
      phone: "04-11-22-33-44",
      address: "78 Rue des Associations, La Seyne-sur-Mer"
    },
    {
      id: "CMD-001238",
      customer: "Pierre Durand",
      date: "2023-06-08",
      items: ["Machine à confettis"],
      total: 50.00,
      status: "cancelled",
      type: "location",
      phone: "06-98-76-54-32",
      address: "34 Boulevard de la Plage, Hyères"
    }
  ];

  // Filtrer les commandes en fonction de la recherche
  const filteredOrders = orders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.customer.toLowerCase().includes(searchLower)
    );
  });

  // Obtenir le statut avec le style approprié
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terminée</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Livrée</Badge>;
      case 'processing':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En cours</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En attente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Annulée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Commandes</h1>
        <p className="text-gray-600">Gestion des commandes et livraisons</p>
      </div>

      <div className="flex flex-col gap-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="purchase">Achats</TabsTrigger>
              <TabsTrigger value="location">Locations</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une commande..."
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
            </div>
          </div>

          <TabsContent value="all">
            <OrdersTable orders={filteredOrders} formatDate={formatDate} getStatusBadge={getStatusBadge} />
          </TabsContent>
          
          <TabsContent value="purchase">
            <OrdersTable 
              orders={filteredOrders.filter(order => order.type === 'purchase')} 
              formatDate={formatDate} 
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="location">
            <OrdersTable 
              orders={filteredOrders.filter(order => order.type === 'location')} 
              formatDate={formatDate} 
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface OrdersTableProps {
  orders: any[];
  formatDate: (date: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, formatDate, getStatusBadge }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                Aucune commande trouvée
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>
                  {order.type === 'location' ? (
                    <Badge variant="outline" className="text-pink-600 border-pink-200 bg-pink-50">
                      <Package className="h-3 w-3 mr-1" />
                      Location
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      Achat
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate">
                    {order.items.join(", ")}
                  </div>
                </TableCell>
                <TableCell>{order.total.toFixed(2)} €</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
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

export default AdminOrders;
