import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "@/api/axios";
import WebsiteRenderer from "@/renderer/WebsiteRenderer";

const PreviewPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { currentProject } = useSelector((s: any) => s.project);
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">No website spec found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold text-foreground">Preview</h1>
            <span className="text-xs text-muted-foreground">v{spec.version}</span>
          </div>

          <div className="flex items-center gap-2">
            {spec.pages?.map((p: any) => (
              <button
                key={p.slug}
                onClick={() => setActivePage(p.slug)}
                className={`px-3 py-1 rounded-full text-xs cursor-pointer ${activePage === p.slug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRevision}
              className="px-4 py-1.5 rounded-lg border border-border text-xs text-foreground hover:bg-muted cursor-pointer"
            >
              Request Revision
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 cursor-pointer"
            >
              Approve
            </button>
          </div>
        </div>
      </header>

      <main>
        <WebsiteRenderer data={spec} currentPage={activePage} onNavigatePage={setActivePage} />
      </main>
    </div>
  );
};

export default PreviewPage;
