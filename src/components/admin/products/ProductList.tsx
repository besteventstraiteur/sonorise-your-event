
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Download, FileSpreadsheet } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import ProductForm from './ProductForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Product } from '@/types/catalogue';
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  productType: 'all' | 'location' | 'vente' | 'both';
  isLoading?: boolean;
}

const fetchProducts = async (productType: string) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(name)
    `)
    .order('name');
  
  if (productType !== 'all') {
    // Si un type est spécifié, filtrer par ce type ou le type 'both'
    query = query.or(`type.eq.${productType},type.eq.both`);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

const ProductList = ({ productType, isLoading: parentLoading = false }: ProductListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', productType],
    queryFn: () => fetchProducts(productType)
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du produit.",
        variant: "destructive"
      });
    }
  };

  if (error) {
    return <div className="text-red-500">Erreur de chargement des produits</div>;
  }

  // Titre en fonction du type de produit sélectionné
  const getTitle = () => {
    switch (productType) {
      case 'location': return 'Produits en location';
      case 'vente': return 'Produits en vente';
      case 'both': return 'Produits mixtes (location & vente)';
      default: return 'Tous les produits';
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">{getTitle()}</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</SheetTitle>
          </SheetHeader>
          <ProductForm 
            product={editingProduct}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
        </SheetContent>
      </Sheet>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Disponibilité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isLoading || parentLoading) ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={7}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : products?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Aucun produit trouvé
                </TableCell>
              </TableRow>
            ) : (
              products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      product.type === 'location' ? 'text-pink-600 border-pink-200 bg-pink-50' :
                      product.type === 'vente' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                      'text-purple-600 border-purple-200 bg-purple-50'
                    }>
                      {product.type === 'location' ? 'Location' : 
                       product.type === 'vente' ? 'Vente' : 'Location & Vente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.type !== 'vente' && product.daily_price && (
                      <div>{product.daily_price}€/jour</div>
                    )}
                    {product.type !== 'location' && product.sale_price && (
                      <div>{product.sale_price}€</div>
                    )}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.available ? "outline" : "destructive"}>
                      {product.available ? "Disponible" : "Indisponible"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDelete(product.id)}
                      >
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
    </div>
  );
};

export default ProductList;
