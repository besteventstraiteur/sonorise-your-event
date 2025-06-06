
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare } from 'lucide-react';
import { useSavTickets } from '@/hooks/useSavTickets';
import { formatDate } from '@/lib/utils';
import SavTicketDialog from './SavTicketDialog';

interface SavTicketsTableProps {
  filterStatus: 'open' | 'in_progress' | 'closed' | null;
  priorityFilter?: string | null;
}

const SavTicketsTable = ({ filterStatus, priorityFilter }: SavTicketsTableProps) => {
  const { tickets, loading } = useSavTickets();
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null);

  // Apply both status and priority filters
  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus ? ticket.status === filterStatus : true;
    const priorityMatch = priorityFilter ? ticket.priority === priorityFilter : true;
    return statusMatch && priorityMatch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: 'bg-green-100 text-green-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-gray-100 text-gray-800'
    };

    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status] || ''}`;
  };

  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (filteredTickets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun ticket ne correspond aux critères sélectionnés.</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Priorité</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id.slice(0, 8)}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.customer_id?.slice(0, 8) || 'N/A'}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadge(ticket.status)}>
                  {ticket.status === 'open' && 'En attente'}
                  {ticket.status === 'in_progress' && 'En cours'}
                  {ticket.status === 'closed' && 'Résolu'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={
                  ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                  ticket.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {ticket.priority === 'high' && 'Haute'}
                  {ticket.priority === 'normal' && 'Normale'}
                  {ticket.priority === 'low' && 'Basse'}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(ticket.created_at)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <SavTicketDialog
        isOpen={!!selectedTicket}
        ticketId={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
};

export default SavTicketsTable;
