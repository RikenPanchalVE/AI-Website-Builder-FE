import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRevisions, addRevision } from "@/store/slices/revisionSlice";
import api from "@/api/axios";
import RevisionForm from "@/components/revision/RevisionForm";
import RevisionHistory from "@/components/revision/RevisionHistory";

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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-foreground">Revision</h1>
          <span className="text-sm text-muted-foreground">
            {revisions.length} revision{revisions.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-2xl">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Request Changes
            </h2>
            <p className="text-sm text-muted-foreground">
              Describe what you'd like to change. AI will interpret your request
              and update the website.
            </p>
          </div>

          <RevisionForm onSubmit={handleSubmit} loading={loading} />

          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Revision History
            </h3>
            <RevisionHistory revisions={revisions} />
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBackToPreview}
              className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted cursor-pointer"
            >
              Back to Preview
            </button>
            <button
              onClick={handleApprove}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer"
            >
              Approve Website
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RevisionPage;
