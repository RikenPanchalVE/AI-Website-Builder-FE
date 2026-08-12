import { Badge } from "@/components/ui/badge";

interface Revision {
  _id: string;
  request: string;
  status: string;
  version: number;
  createdAt: string;
}

interface RevisionHistoryProps {
  revisions: Revision[];
}

const statusVariant: Record<string, "secondary" | "default" | "destructive"> = {
  pending: "secondary",
  applied: "default",
  rejected: "destructive",
};

const RevisionHistory = ({ revisions }: RevisionHistoryProps) => {
  if (revisions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
        No revisions yet. Describe a change above to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {revisions.map((r) => (
        <div key={r._id} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="flex-1 text-sm text-foreground">{r.request}</p>
            <Badge variant={statusVariant[r.status] || "outline"} className="shrink-0 capitalize">
              {r.status}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span>v{r.version}</span>
            <span>{new Date(r.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevisionHistory;
