import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import WebsiteRenderer from "./renderer/WebsiteRenderer";
import "./index.css";

declare global {
  interface Window {
    __INITIAL_PAGE__: string;
  }
}

function getSiteData(): any {
  const el = document.getElementById("site-data");
  if (el && el.textContent) {
    try { return JSON.parse(el.textContent); } catch { return null; }
  }
  return null;
}

function getPageFromUrl(basePath: string): string {
  const loc = window.location.pathname;
  let relative = loc;
  if (basePath && relative.startsWith(basePath)) {
    relative = relative.slice(basePath.length);
  }
  const segments = relative.replace(/^\/+/, "").replace(/\/+$/, "").split("/");
  const slug = segments[0] || "home";
  if (slug === "index.html" || slug === "") return "home";
  return slug;
}

function slugToUrlPath(slug: string, basePath: string): string {
  if (slug === "home" || slug === "index") return `${basePath}/`;
  return `${basePath}/${slug}`;
}

function App() {
  const [data] = useState(() => getSiteData());
  const basePath = data?.__basePath || "";
  const [currentPage, setCurrentPage] = useState<string>(
    window.__INITIAL_PAGE__ || getPageFromUrl(basePath)
  );

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getPageFromUrl(basePath));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [basePath]);

  if (!data) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        No site data found
      </div>
    );
  }

  const handleNavigate = (slug: string) => {
    setCurrentPage(slug);
    const newPath = slugToUrlPath(slug, basePath);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
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
