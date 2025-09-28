import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadModal } from "@/components/admin/LeadModal";
import { LeadFilters } from "@/components/admin/LeadFilters";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  problem_text: string;
  status: string;
  score: number | null;
  fit_band: string | null;
  label: string | null;
  rationale: string | null;
  industry: string | null;
  use_case_label: string | null;
  model_rationale: string | null;
  company_size: string | null;
  fit_score: number | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bandFilter, setBandFilter] = useState<string>("");
  const [labelFilter, setLabelFilter] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, bandFilter, labelFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (bandFilter) {
      filtered = filtered.filter((lead) => lead.fit_band === bandFilter);
    }

    if (labelFilter) {
      filtered = filtered.filter((lead) => lead.label === labelFilter);
    }

    setFilteredLeads(filtered);
  };

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleSendOutreach = async () => {
    if (!selectedLead) return;

    try {
      // Update lead status immediately in local state
      const updatedLead = { ...selectedLead, status: "outreach_sent" };
      setSelectedLead(updatedLead);
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === selectedLead.id ? updatedLead : lead
        )
      );

      const response = await fetch("https://raj24.app.n8n.cloud/webhook/send-outreach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: selectedLead.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({
        title: "Success",
        description: "Outreach Sent!",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending outreach:", error);
      toast({
        title: "Error",
        description: "Failed to send outreach. Please try again.",
        variant: "destructive",
      });
    }
  };

  const uniqueBands = Array.from(new Set(leads.map(lead => lead.fit_band).filter(band => band && band.trim() !== '')));
  const uniqueLabels = Array.from(new Set(leads.map(lead => lead.label).filter(label => label && label.trim() !== '')));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>
        
        <LeadFilters
          bandFilter={bandFilter}
          setBandFilter={setBandFilter}
          labelFilter={labelFilter}
          setLabelFilter={setLabelFilter}
          uniqueBands={uniqueBands}
          uniqueLabels={uniqueLabels}
        />

        <LeadsTable
          leads={filteredLeads}
          onRowClick={handleRowClick}
          isLoading={isLoading}
        />

        <LeadModal
          lead={selectedLead}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSendOutreach={handleSendOutreach}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;