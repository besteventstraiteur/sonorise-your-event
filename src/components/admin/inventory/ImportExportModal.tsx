
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Upload, File, FilePlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImportExportModalProps {
  open: boolean;
  onClose: () => void;
}

interface ExportHeadersOption {
  id: string;
  label: string;
  value: boolean;
}

const ImportExportModal: React.FC<ImportExportModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('export');
  const [fileFormat, setFileFormat] = useState<'csv' | 'xlsx'>('xlsx');
  const [exportType, setExportType] = useState<'all' | 'location' | 'vente'>('all');
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportHeaders, setExportHeaders] = useState<ExportHeadersOption[]>([
    { id: 'name', label: 'Nom', value: true },
    { id: 'brand', label: 'Marque', value: true },
    { id: 'type', label: 'Type', value: true },
    { id: 'category_id', label: 'Catégorie ID', value: true },
    { id: 'stock', label: 'Stock', value: true },
    { id: 'min_stock', label: 'Stock minimum', value: true },
    { id: 'daily_price', label: 'Prix journalier', value: true },
    { id: 'sale_price', label: 'Prix de vente', value: true },
    { id: 'description', label: 'Description', value: true },
    { id: 'short_description', label: 'Description courte', value: true },
    { id: 'available', label: 'Disponible', value: true },
  ]);

  const { data: products = [] } = useQuery({
    queryKey: ['products_for_export', exportType],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(name)
        `);
      
      if (exportType !== 'all') {
        query = query.or(`type.eq.${exportType},type.eq.both`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories_for_import'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');
      if (error) throw error;
      return data;
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const exportProducts = async () => {
    try {
      setIsExporting(true);
      
      // Préparer les données à exporter
      const dataToExport = products.map(product => {
        const item: any = {};
        
        exportHeaders.forEach(header => {
          if (header.value) {
            if (header.id === 'category_id' && product.category) {
              item['category'] = product.category.name;
            } else {
              item[header.id] = product[header.id as keyof typeof product];
            }
          }
        });
        
        return item;
      });
      
      // Créer le workbook Excel
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Produits");
      
      // Générer le fichier
      if (fileFormat === 'xlsx') {
        XLSX.writeFile(wb, `produits_${exportType}_${new Date().toISOString().split('T')[0]}.xlsx`);
      } else {
        XLSX.writeFile(wb, `produits_${exportType}_${new Date().toISOString().split('T')[0]}.csv`, { bookType: 'csv' });
      }
      
      toast.success("Export réussi !");
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      toast.error("Erreur lors de l'export des produits");
    } finally {
      setIsExporting(false);
    }
  };

  const importProducts = async () => {
    if (!file) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }

    try {
      setIsImporting(true);
      
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      
      // Validation des données
      if (jsonData.length === 0) {
        throw new Error("Aucune donnée trouvée dans le fichier");
      }
      
      // Mappage des catégories (nom -> id)
      const categoryMap = new Map(categories.map(cat => [cat.name.toLowerCase(), cat.id]));
      
      // Préparation des données pour l'insertion
      const productsToInsert = jsonData.map((row: any) => {
        // Conversion de 'category' en 'category_id' si présent
        if (row.category && !row.category_id) {
          const categoryId = categoryMap.get(row.category.toLowerCase());
          if (categoryId) {
            row.category_id = categoryId;
          }
        }
        
        delete row.category; // Supprimer la colonne 'category' car elle n'existe pas dans la table
        
        // S'assurer que les valeurs numériques sont bien des nombres
        if (row.daily_price) row.daily_price = Number(row.daily_price);
        if (row.sale_price) row.sale_price = Number(row.sale_price);
        if (row.stock) row.stock = Number(row.stock);
        if (row.min_stock) row.min_stock = Number(row.min_stock);
        
        // Conversion des booléens
        if (row.available) row.available = row.available === 'true' || row.available === true;
        if (row.featured) row.featured = row.featured === 'true' || row.featured === true;
        
        return row;
      });
      
      // Insertion en base de données
      const { error } = await supabase.from('products').insert(productsToInsert);
      
      if (error) throw error;
      
      toast.success(`${productsToInsert.length} produits importés avec succès`);
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de l'import:", error);
      toast.error(`Erreur lors de l'import: ${error.message || "Erreur inconnue"}`);
    } finally {
      setIsImporting(false);
    }
  };

  const toggleHeader = (id: string) => {
    setExportHeaders(prev => 
      prev.map(header => 
        header.id === id ? { ...header, value: !header.value } : header
      )
    );
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: "Exemple produit",
        brand: "Marque exemple",
        type: "location",
        category: "Exemple catégorie",
        stock: 10,
        min_stock: 2,
        daily_price: 50.00,
        sale_price: null,
        short_description: "Description courte",
        description: "Description longue",
        available: true
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Modèle");
    
    XLSX.writeFile(wb, "modele_import_produits.xlsx");
    toast.success("Modèle téléchargé");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Importer / Exporter des produits</DialogTitle>
          <DialogDescription>
            Importez de nouveaux produits depuis un fichier CSV ou XLSX, ou exportez votre catalogue.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="export" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="export">Exporter</TabsTrigger>
            <TabsTrigger value="import">Importer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exporter les produits</CardTitle>
                <CardDescription>
                  Exportez vos produits dans un fichier CSV ou XLSX
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Type de produits</label>
                  <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type de produits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les produits</SelectItem>
                      <SelectItem value="location">Produits en location</SelectItem>
                      <SelectItem value="vente">Produits en vente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Format du fichier</label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={fileFormat === 'xlsx' ? 'default' : 'outline'}
                      onClick={() => setFileFormat('xlsx')}
                    >
                      XLSX
                    </Button>
                    <Button
                      type="button"
                      variant={fileFormat === 'csv' ? 'default' : 'outline'}
                      onClick={() => setFileFormat('csv')}
                    >
                      CSV
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Colonnes à exporter</label>
                  <div className="grid grid-cols-2 gap-2">
                    {exportHeaders.map(header => (
                      <div key={header.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`header-${header.id}`}
                          checked={header.value}
                          onChange={() => toggleHeader(header.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`header-${header.id}`} className="text-sm">
                          {header.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {products.length} produits trouvés
                </div>
                <Button 
                  onClick={exportProducts} 
                  disabled={isExporting}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isExporting ? "Exportation..." : "Exporter"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Importer des produits</CardTitle>
                <CardDescription>
                  Importez vos produits depuis un fichier CSV ou XLSX
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="bg-blue-50 p-4 rounded border border-blue-200 text-blue-700 text-sm">
                    <p className="font-medium">Conseils d'importation :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Téléchargez le modèle pour voir le format attendu</li>
                      <li>Les colonnes 'name' et 'type' sont obligatoires</li>
                      <li>Types acceptés : 'location', 'vente', 'both'</li>
                      <li>Utilisez les noms exacts des catégories</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      onClick={downloadTemplate}
                      className="flex items-center gap-2"
                    >
                      <FilePlus className="h-4 w-4" />
                      Télécharger le modèle
                    </Button>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">Fichier à importer</label>
                    <div className="flex space-x-2">
                      <Input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleFileChange}
                      />
                    </div>
                    {file && (
                      <p className="text-sm text-gray-500">
                        Fichier sélectionné : {file.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={importProducts} 
                  disabled={!file || isImporting}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isImporting ? "Importation..." : "Importer"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImportExportModal;
