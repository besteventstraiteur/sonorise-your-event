
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
import { Search, PlusCircle, Edit, Trash2, AlertTriangle } from 'lucide-react';

const AdminInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Données fictives pour les produits
  const products = [
    {
      id: "1",
      name: "JBL EON ONE Compact",
      category: "enceintes",
      type: "location",
      price: 45,
      stock: 4,
      rentedOut: 2,
      available: true,
      minStock: 2
    },
    {
      id: "2",
      name: "Système Bose L1 Pro8",
      category: "enceintes",
      type: "location",
      price: 120,
      stock: 3,
      rentedOut: 1,
      available: true,
      minStock: 1
    },
    {
      id: "3",
      name: "Console Yamaha MG16XU",
      category: "mixage",
      type: "location",
      price: 75,
      stock: 2,
      rentedOut: 2,
      available: false,
      minStock: 1
    },
    {
      id: "4",
      name: "Projecteurs LED RGBW",
      category: "eclairage",
      type: "location",
      price: 35,
      stock: 8,
      rentedOut: 3,
      available: true,
      minStock: 2
    },
    {
      id: "5",
      name: "Enceinte JBL Partybox 110",
      category: "enceintes",
      type: "vente",
      price: 349.99,
      stock: 5,
      available: true,
      minStock: 2
    },
    {
      id: "6",
      name: "Câble XLR professionnel 10m",
      category: "accessoires",
      type: "vente",
      price: 29.99,
      stock: 12,
      available: true,
      minStock: 5
    },
    {
      id: "7",
      name: "Pack d'éclairage LED ADJ",
      category: "eclairage",
      type: "vente",
      price: 249.99,
      stock: 1,
      available: true,
      minStock: 2
    }
  ];

  // Filtrer les produits en fonction de la recherche
  const filteredProducts = products.filter(product => {
    if (searchQuery === '') return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  // Obtenir le stock avec le style approprié
  const getStockBadge = (product: any) => {
    if (product.type === 'location') {
      const available = product.stock - product.rentedOut;
      
      if (available <= 0) {
        return <Badge className="bg-red-100 text-red-800">Indisponible</Badge>;
      } else if (available <= product.minStock) {
        return <Badge className="bg-amber-100 text-amber-800">Stock bas</Badge>;
      } else {
        return <Badge className="bg-green-100 text-green-800">{available} disponibles</Badge>;
      }
    } else {
      if (product.stock <= 0) {
        return <Badge className="bg-red-100 text-red-800">Rupture</Badge>;
      } else if (product.stock <= product.minStock) {
        return <Badge className="bg-amber-100 text-amber-800">Stock bas</Badge>;
      } else {
        return <Badge className="bg-green-100 text-green-800">{product.stock} en stock</Badge>;
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Gestion des stocks</h1>
        <p className="text-gray-600">Inventaire des produits et équipements</p>
      </div>

      <div className="flex flex-col gap-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="location">Matériel de location</TabsTrigger>
              <TabsTrigger value="vente">Produits à vendre</TabsTrigger>
              <TabsTrigger value="lowstock">Stock bas</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-9" size="sm">
                <PlusCircle className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <ProductsTable products={filteredProducts} getStockBadge={getStockBadge} />
          </TabsContent>
          
          <TabsContent value="location">
            <ProductsTable 
              products={filteredProducts.filter(p => p.type === 'location')} 
              getStockBadge={getStockBadge}
            />
          </TabsContent>
          
          <TabsContent value="vente">
            <ProductsTable 
              products={filteredProducts.filter(p => p.type === 'vente')} 
              getStockBadge={getStockBadge}
            />
          </TabsContent>
          
          <TabsContent value="lowstock">
            <ProductsTable 
              products={filteredProducts.filter(p => {
                if (p.type === 'location') {
                  return (p.stock - p.rentedOut) <= p.minStock;
                } else {
                  return p.stock <= p.minStock;
                }
              })} 
              getStockBadge={getStockBadge}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ProductsTableProps {
  products: any[];
  getStockBadge: (product: any) => JSX.Element;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, getStockBadge }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock total</TableHead>
            <TableHead>Disponibilité</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucun produit trouvé
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>
                  {product.type === 'location' ? (
                    <Badge variant="outline" className="text-pink-600 border-pink-200 bg-pink-50">
                      Location
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                      Vente
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {product.price.toFixed(2)} €
                  {product.type === 'location' && <span className="text-xs text-gray-500">/jour</span>}
                </TableCell>
                <TableCell>
                  {product.stock}
                  {product.type === 'location' && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.rentedOut} loués)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {getStockBadge(product)}
                  {product.type === 'location' && product.stock - product.rentedOut <= product.minStock && product.stock - product.rentedOut > 0 && (
                    <div className="flex items-center mt-1 text-xs text-amber-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Stock bas
                    </div>
                  )}
                  {product.type === 'vente' && product.stock <= product.minStock && product.stock > 0 && (
                    <div className="flex items-center mt-1 text-xs text-amber-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Réapprovisionner
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminInventory;
