import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface RevisionChangeEntry {
  path: string;
  label: string;
  oldValue: unknown;
  newValue: unknown;
}

interface Revision {
  _id: string;
  request: string;
  status: string;
  version: number;
  changes?: RevisionChangeEntry[];
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

function needsRawDetail(v: unknown): boolean {
  return Array.isArray(v) || (typeof v === "object" && v !== null);
}

// sectionColors entries are the one object-shaped value diffConfig doesn't
// drill into (see configDiff.ts's isOpaqueObjectPath) - show their preset
// name inline instead of falling back to "(details)" for every one of them.
function formatValue(v: unknown): string {
  if (v === null || v === undefined || v === "") return "(empty)";
  if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? "" : "s"}`;
  if (typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if (typeof obj.preset === "string") return obj.preset === "default" ? "Match Site" : obj.preset;
    return "(details)";
  }
  const s = String(v);
  return s.length > 70 ? s.slice(0, 70) + "…" : s;
}

const ChangeRow = ({ change }: { change: RevisionChangeEntry }) => {
  const [expanded, setExpanded] = useState(false);
  const hasRaw = needsRawDetail(change.oldValue) || needsRawDetail(change.newValue);

  return (
    <div className="rounded-md border border-border/60 bg-muted/30 p-3 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium text-foreground">{change.label}</span>
        {hasRaw && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="cursor-pointer text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            {expanded ? "Hide detail" : "View detail"}
          </button>
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive line-through">
          {formatValue(change.oldValue)}
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
          {formatValue(change.newValue)}
        </span>
      </div>
      {expanded && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Before</p>
            <pre className="max-h-48 overflow-auto rounded bg-background p-2 text-[11px] text-foreground/80">
              {JSON.stringify(change.oldValue, null, 2) ?? "null"}
            </pre>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">After</p>
            <pre className="max-h-48 overflow-auto rounded bg-background p-2 text-[11px] text-foreground/80">
              {JSON.stringify(change.newValue, null, 2) ?? "null"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

const RevisionHistory = ({ revisions }: RevisionHistoryProps) => {
  if (revisions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
        No revisions yet. Click "Edit Website" above to make your first change.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {revisions.map((r) => (
        <div key={r._id} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="flex-1 text-sm font-medium text-foreground">{r.request}</p>
            <Badge variant={statusVariant[r.status] || "outline"} className="shrink-0 capitalize">
              {r.status}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span>v{r.version}</span>
            <span>{new Date(r.createdAt).toLocaleString()}</span>
          </div>

          {/* Every field this revision actually touched, old value ->
              new value, always visible (not tucked behind a click) - an
              empty/summary-only revision entry was the whole problem with
              the old free-text flow, so the detail stays front and center
              here. Complex values (content lists, section-color presets)
              get a "View detail" toggle for the full raw before/after. */}
          {r.changes && r.changes.length > 0 && (
            <div className="mt-3 space-y-2">
              {r.changes.map((c, i) => (
                <ChangeRow key={`${c.path}-${i}`} change={c} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RevisionHistory;
