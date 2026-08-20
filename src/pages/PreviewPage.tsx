import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "@/api/axios";
import WebsiteRenderer from "@/renderer/WebsiteRenderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DeviceFrame from "@/components/questionnaire/DeviceFrame";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: "100%", height: "auto" },
  { id: "tablet", label: "Tablet", width: "768px", height: "1024px" },
  { id: "mobile", label: "Mobile", width: "390px", height: "844px" },
] as const;

const DeviceIcon = ({ id }: { id: string }) => {
  if (id === "mobile") {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <rect x="7" y="2" width="10" height="20" rx="2" /><path strokeLinecap="round" d="M11 18h2" />
      </svg>
    );
  }
  if (id === "tablet") {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <rect x="4" y="2" width="16" height="20" rx="2" /><path strokeLinecap="round" d="M11 18h2" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" /><path strokeLinecap="round" d="M8 20h8M12 16v4" />
    </svg>
  );
};

const PreviewPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { currentProject } = useSelector((s: any) => s.project);
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");

  useEffect(() => {
    loadSpec();
  }, [projectId]);

  const loadSpec = async () => {
    try {
      const res = await api.get(`/projects/${projectId}/website-spec`);
      setSpec(res.data);
    } catch (err) {
      console.error("Failed to load spec:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await api.post(`/projects/${projectId}/approve`);
      navigate(`/pricing/${projectId}`);
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const handleRevision = () => {
    navigate(`/revision/${projectId}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">No website spec found</p>
      </div>
    );
  }

  const activeDevice = DEVICES.find((d) => d.id === device) || DEVICES[0];

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-foreground">Preview</h1>
            <span className="text-xs text-muted-foreground">v{spec.version}</span>
          </div>

          {/* min-w-0 is load-bearing here: a flex item's default min-width
              is auto (its content size), so without it this row refused to
              shrink below the combined width of every page-tab button -
              even though it already has overflow-x-auto ready to scroll
              that overflow internally - and pushed the whole page wider
              than the viewport on narrow screens instead of scrolling in
              place. flex-1 lets it claim the space between the title and
              the action buttons rather than staying at its content width. */}
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {spec.pages?.map((p: any) => (
              <button
                key={p.slug}
                onClick={() => setActivePage(p.slug)}
                className={cn(
                  "shrink-0 cursor-pointer rounded-full px-3 py-1 text-xs transition-colors",
                  activePage === p.slug
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* flex-wrap: the device toggle + both buttons together are wider
              than a phone screen has room for once the title and tabs rows
              also claim space - this lets them wrap onto a second line
              instead of forcing the page itself to overflow horizontally. */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDevice(d.id)}
                  title={d.label}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                    device === d.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <DeviceIcon id={d.id} />
                </button>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={handleRevision}>
              Request Revision
            </Button>
            <Button type="button" size="sm" onClick={handleApprove}>
              Approve
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6">
        <div
          className={cn(
            "mx-auto overflow-hidden bg-background shadow-sm transition-all duration-300",
            device !== "desktop" && "rounded-xl border border-border"
          )}
          style={{ maxWidth: activeDevice.width }}
        >
          <DeviceFrame width={activeDevice.width} height={activeDevice.height} active={device !== "desktop"}>
            <WebsiteRenderer data={spec} currentPage={activePage} onNavigatePage={setActivePage} />
          </DeviceFrame>
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
