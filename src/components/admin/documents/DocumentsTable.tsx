
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/hooks/useDocumentsList";

interface DocumentsTableProps {
  documents: Document[];
}

export const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  const getStatusBadge = (status: Document['status']) => {
    const statusConfig = {
      draft: { label: 'Brouillon', variant: 'secondary' },
      sent: { label: 'Envoyé', variant: 'default' },
      accepted: { label: 'Accepté', variant: 'default' },
      rejected: { label: 'Rejeté', variant: 'destructive' },
      cancelled: { label: 'Annulé', variant: 'outline' },
      paid: { label: 'Payé', variant: 'default' }
    } as const;

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Numéro</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Échéance</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>{doc.number}</TableCell>
            <TableCell className="capitalize">{doc.type}</TableCell>
            <TableCell>{formatDate(doc.created_at)}</TableCell>
            <TableCell>
              {doc.due_date ? formatDate(doc.due_date) : '-'}
            </TableCell>
            <TableCell>{doc.total_amount.toFixed(2)} €</TableCell>
            <TableCell>{getStatusBadge(doc.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
