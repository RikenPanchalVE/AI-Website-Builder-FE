import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";

const PublishPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [published, setPublished] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publishSite();
  }, [projectId]);

  const publishSite = async () => {
    try {
      const res = await api.post(`/projects/${projectId}/publish`);
      setPublished(res.data);
    } catch (err) {
      console.error("Publish failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-foreground">Publishing your website...</p>
        </div>
      </div>
    );
  }

  if (!published) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Failed to publish</p>
      </div>
    );
  }

  const siteUrl = `${window.location.origin}${published.url}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Published!</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-lg">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your Website is Live!
            </h2>
            <p className="text-sm text-muted-foreground">
              Version {published.version} • Published{" "}
              {new Date(published.publishedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Your website URL:</p>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline break-all"
            >
              {siteUrl}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 text-center"
            >
              Open Your Website
            </a>
            <a
              href={`/preview/${projectId}`}
              className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted text-center"
            >
              Back to Preview
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublishPage;
