import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  problem_text: string;
  status: string;
  score: number | null;
  band: string | null;
  label: string | null;
  rationale: string | null;
  industry: string | null;
  fit_band: string | null;
  use_case_label: string | null;
  model_rationale: string | null;
  company_size: string | null;
  fit_score: number | null;
  created_at: string;
  updated_at: string;
}

interface LeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSendOutreach: () => void;
}

export const LeadModal = ({ lead, isOpen, onClose, onSendOutreach }: LeadModalProps) => {
  if (!lead) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{lead.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Email:</span>
                <p className="font-medium">{lead.email}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Company:</span>
                <p className="font-medium">{lead.company || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Website:</span>
                <p className="font-medium">{lead.website || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Industry:</span>
                <p className="font-medium">{lead.industry || "—"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Scoring & Classification */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Scoring & Classification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Score:</span>
                <p className="font-medium">{lead.score || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Fit Score:</span>
                <p className="font-medium">{lead.fit_score || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Band:</span>
                <p className="font-medium">{lead.band || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Fit Band:</span>
                <p className="font-medium">{lead.fit_band || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Label:</span>
                <p className="font-medium">{lead.label || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Use Case Label:</span>
                <p className="font-medium">{lead.use_case_label || "—"}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="mt-1">
                <Badge variant="outline">{lead.status}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Problem & Rationale */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Problem Description</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">{lead.problem_text}</p>
            </div>
          </div>

          {lead.rationale && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Rationale</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">{lead.rationale}</p>
              </div>
            </div>
          )}

          {lead.model_rationale && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Model Rationale</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">{lead.model_rationale}</p>
              </div>
            </div>
          )}

          <Separator />

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Company Size:</span>
                <p className="font-medium">{lead.company_size || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Created:</span>
                <p className="font-medium text-xs">{formatDate(lead.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button onClick={onSendOutreach} className="w-full">
              Send Outreach
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};