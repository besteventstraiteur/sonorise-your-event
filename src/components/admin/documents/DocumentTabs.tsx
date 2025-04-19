
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsTable } from './DocumentsTable';
import { Document } from '@/hooks/useDocumentsList';

interface DocumentTabsProps {
  documents: Document[];
}

export const DocumentTabs = ({ documents }: DocumentTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="devis">Devis</TabsTrigger>
        <TabsTrigger value="factures">Factures</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <DocumentsTable documents={documents} />
      </TabsContent>
      
      <TabsContent value="devis">
        <DocumentsTable 
          documents={documents.filter(doc => doc.type === 'devis')} 
        />
      </TabsContent>
      
      <TabsContent value="factures">
        <DocumentsTable 
          documents={documents.filter(doc => doc.type === 'facture')} 
        />
      </TabsContent>
    </Tabs>
  );
};
