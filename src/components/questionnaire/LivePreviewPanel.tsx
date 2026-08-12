import { useEffect, useMemo, useRef, useState } from "react";
import WebsiteRenderer from "@/renderer/WebsiteRenderer";
import { buildPreviewSpec } from "./previewSpec";
import { cn } from "@/lib/utils";

const DESIGN_WIDTH = 1280;

interface LivePreviewPanelProps {
  config: any;
  activePage: string;
  onPageChange: (slug: string) => void;
  onExpand: () => void;
}

const LivePreviewPanel = ({ config, activePage, onPageChange, onExpand }: LivePreviewPanelProps) => {
  const spec = useMemo(() => buildPreviewSpec(config), [config]);
  const currentPage = spec.pages.find((p) => p.slug === activePage) ? activePage : spec.pages[0]?.slug || "home";

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [contentHeight, setContentHeight] = useState(400);

  useEffect(() => {
    const updateScale = () => {
      if (viewportRef.current) {
        setScale(viewportRef.current.clientWidth / DESIGN_WIDTH);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContentHeight(entry.contentRect.height);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [spec, currentPage]);

  return (
    <div className="sticky top-24">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live Preview
        </div>
        <button
          type="button"
          onClick={onExpand}
          className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="View full screen"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
          </svg>
          Expand
        </button>
      </div>

      {spec.pages.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {spec.pages.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => onPageChange(p.slug)}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] transition-colors",
                currentPage === p.slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          <div className="ml-2 flex-1 truncate rounded bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
            {(spec.name || "yoursite").toLowerCase().replace(/[^a-z0-9]+/g, "")}.com/{currentPage === "home" ? "" : currentPage}
          </div>
        </div>

        <div
          ref={viewportRef}
          className="max-h-[65vh] overflow-y-auto overflow-x-hidden"
          style={{ height: Math.max(contentHeight * scale, 200) }}
        >
          <div
            ref={contentRef}
            style={{ width: DESIGN_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}
          >
            <WebsiteRenderer data={spec as any} currentPage={currentPage} onNavigatePage={onPageChange} />
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Approximate preview — full content is generated on the next step.
      </p>
    </div>
  );
};

export default LivePreviewPanel;
