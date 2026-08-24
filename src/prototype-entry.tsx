import { useState } from "react";
import { createRoot } from "react-dom/client";
import WebsiteRenderer from "./renderer/WebsiteRenderer";
import "./index.css";

// Entry point for the standalone "Download Prototype HTML" build (see
// vite.prototype.config.ts + server/src/services/downloadService.ts's
// buildPrototypeHtml). Deliberately its own, simpler entry rather than
// reusing generated-site.tsx: that entry drives multi-file /generated-sites/
// hosting over a real http(s) origin, where pushState-based page routing
// and a __basePath prefix both make sense. This one is bundled into a
// single self-contained .html file meant to be opened directly from disk
// (file://) with no server behind it at all - pushState to a path like
// "/services" has no matching resource to navigate to there and is flaky
// across browsers under file://, so page switching here stays purely
// client-side React state with no History API calls, and the whole site
// (every page) is embedded in one document instead of one file per page.
function getSiteData(): any {
  const el = document.getElementById("site-data");
  if (el && el.textContent) {
    try { return JSON.parse(el.textContent); } catch { return null; }
  }
  return null;
}

function App() {
  const [data] = useState(() => getSiteData());
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const pages = data?.pages || [];
    return pages.find((p: any) => p.slug === "home")?.slug || pages[0]?.slug || "home";
  });

  if (!data) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        No site data found
      </div>
    );
  }

  const handleNavigate = (slug: string) => {
    setCurrentPage(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <WebsiteRenderer
      data={data}
      currentPage={currentPage}
      onNavigatePage={handleNavigate}
    />
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
