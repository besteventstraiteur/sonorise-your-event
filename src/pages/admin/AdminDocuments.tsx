
import { useState } from 'react';
import { useDocumentsList } from '@/hooks/useDocumentsList';
import { DocumentTabs } from '@/components/admin/documents/DocumentTabs';

const AdminDocuments = () => {
  const { data: documents = [] } = useDocumentsList();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600">Gérez vos devis et factures</p>
      </div>

      <DocumentTabs documents={documents} />
    </div>
  );
};

export default AdminDocuments;
