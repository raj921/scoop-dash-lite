import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: string;
  name: string;
  company: string | null;
  score: number | null;
  band: string | null;
  status: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
  isLoading: boolean;
}

export const LeadsTable = ({ leads, onRowClick, isLoading }: LeadsTableProps) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "default";
      case "contacted":
        return "secondary";
      case "qualified":
        return "outline";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading leads...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Band</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowClick(lead)}
              >
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.company || "—"}</TableCell>
                <TableCell>{lead.score || "—"}</TableCell>
                <TableCell>{lead.band || "—"}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};