import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRevisions, addRevision } from "@/store/slices/revisionSlice";
import api from "@/api/axios";
import RevisionForm from "@/components/revision/RevisionForm";
import RevisionHistory from "@/components/revision/RevisionHistory";
import { Button } from "@/components/ui/button";

const RevisionPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { revisions } = useSelector((s: any) => s.revision);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRevisions();
  }, [projectId]);

  const loadRevisions = async () => {
    try {
      const res = await api.get(`/projects/${projectId}/revisions`);
      dispatch(setRevisions(res.data));
    } catch (err) {
      console.error("Failed to load revisions:", err);
    }
  };

  const handleSubmit = async (request: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/projects/${projectId}/revisions`, {
        request,
      });
      dispatch(addRevision(res.data));
    } catch (err) {
      console.error("Failed to submit revision:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPreview = () => {
    navigate(`/preview/${projectId}`);
  };

  const handleApprove = async () => {
    try {
      await api.post(`/projects/${projectId}/approve`);
      navigate(`/pricing/${projectId}`);
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Revision</h1>
          <span className="text-sm text-muted-foreground">
            {revisions.length} revision{revisions.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl flex-1 px-6 py-8">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="mb-1 text-xl font-semibold text-foreground">Request Changes</h2>
              <p className="text-sm text-muted-foreground">
                Describe what you'd like to change. AI will interpret your request and update the website.
              </p>
            </div>
            <RevisionForm onSubmit={handleSubmit} loading={loading} />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">Revision History</h3>
            <RevisionHistory revisions={revisions} />
          </div>

          <div className="flex justify-between pt-2">
            <Button type="button" variant="outline" onClick={handleBackToPreview}>
              Back to Preview
            </Button>
            <Button type="button" onClick={handleApprove}>
              Approve Website
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RevisionPage;
