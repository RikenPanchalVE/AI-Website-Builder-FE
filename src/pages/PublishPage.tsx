import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/api/endpoints";

const PublishPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [published, setPublished] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground">Publishing your website...</p>
        </div>
      </div>
    );
  }

  if (!published) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Failed to publish</p>
      </div>
    );
  }

  const siteUrl = `${window.location.origin}${published.url}`;
  const downloadUrl = `/api${ENDPOINTS.DOWNLOAD.SOURCE(projectId as string)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — ignore
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Published!</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-lg flex-1 px-6 py-8">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Your Website is Live!</h2>
            <p className="text-sm text-muted-foreground">
              Version {published.version} • Published {new Date(published.publishedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-2 text-sm text-muted-foreground">Your website URL:</p>
            <div className="flex items-center gap-2">
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 break-all text-left font-medium text-primary hover:underline"
              >
                {siteUrl}
              </a>
              <Button type="button" variant="outline" size="sm" onClick={handleCopy} className="shrink-0">
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg">
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                Open Your Website
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={downloadUrl} download>
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Website Code
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`/preview/${projectId}`}>Back to Preview</a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get a .zip with your website's source — a client and a server folder, ready to build and run.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PublishPage;
