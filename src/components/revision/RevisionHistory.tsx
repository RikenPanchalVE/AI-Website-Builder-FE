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

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  applied: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const RevisionHistory = ({ revisions }: RevisionHistoryProps) => {
  if (revisions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No revisions yet. Describe a change above to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {revisions.map((r) => (
        <div
          key={r._id}
          className="p-4 rounded-lg border border-border bg-card"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-foreground flex-1">{r.request}</p>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                statusColors[r.status] || "bg-muted text-muted-foreground"
              }`}
            >
              {r.status}
            </span>
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
