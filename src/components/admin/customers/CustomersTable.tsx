
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
import { Customer } from "@/hooks/useCustomersList";

interface CustomersTableProps {
  customers: Customer[];
}

export const CustomersTable = ({ customers }: CustomersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Création</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                Aucun client trouvé
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.company_name || `${customer.first_name || ''} ${customer.last_name || ''}`}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{customer.email}</div>
                    <div className="text-gray-500">{customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {customer.address && (
                    <div className="text-sm">
                      <div>{customer.address}</div>
                      <div className="text-gray-500">
                        {customer.postal_code} {customer.city}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={customer.type === 'business' ? 'default' : 'secondary'}>
                    {customer.type === 'business' ? 'Professionnel' : 'Particulier'}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {formatDate(customer.created_at)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
