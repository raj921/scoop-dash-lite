import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeadFiltersProps {
  bandFilter: string;
  setBandFilter: (value: string) => void;
  labelFilter: string;
  setLabelFilter: (value: string) => void;
  uniqueBands: string[];
  uniqueLabels: string[];
}

export const LeadFilters = ({
  bandFilter,
  setBandFilter,
  labelFilter,
  setLabelFilter,
  uniqueBands,
  uniqueLabels,
}: LeadFiltersProps) => {
  const clearFilters = () => {
    setBandFilter("");
    setLabelFilter("");
  };

  // Sanitize and deduplicate options to guarantee valid SelectItem values
  const bandOptions = Array.from(
    new Set(
      (uniqueBands || [])
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
    )
  );

  const labelOptions = Array.from(
    new Set(
      (uniqueLabels || [])
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
    )
  );

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Filters:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Band:</span>
          <Select value={bandFilter} onValueChange={setBandFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All bands" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {bandOptions.map((band) => (
                <SelectItem key={band} value={band}>
                  {band}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Label:</span>
          <Select value={labelFilter} onValueChange={setLabelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All labels" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {labelOptions.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(bandFilter || labelFilter) && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </Card>
  );
};