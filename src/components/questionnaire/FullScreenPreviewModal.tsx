import { useEffect, useMemo, useState } from "react";
import WebsiteRenderer from "@/renderer/WebsiteRenderer";
import { buildPreviewSpec } from "./previewSpec";
import { cn } from "@/lib/utils";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: "100%" },
  { id: "tablet", label: "Tablet", width: "768px" },
  { id: "mobile", label: "Mobile", width: "390px" },
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

interface FullScreenPreviewModalProps {
  config: any;
  activePage: string;
  onPageChange: (slug: string) => void;
  onClose: () => void;
}

const FullScreenPreviewModal = ({ config, activePage, onPageChange, onClose }: FullScreenPreviewModalProps) => {
  const spec = useMemo(() => buildPreviewSpec(config), [config]);
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const currentPage = spec.pages.find((p) => p.slug === activePage) ? activePage : spec.pages[0]?.slug || "home";
  const activeDevice = DEVICES.find((d) => d.id === device) || DEVICES[0];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h2 className="text-sm font-semibold text-foreground">Live Preview</h2>
          <span className="text-xs text-muted-foreground">— approximate, generated on the next step</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {spec.pages.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => onPageChange(p.slug)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs transition-colors",
                currentPage === p.slug ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
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
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close preview"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-muted/30 py-6">
        <div
          className={cn(
            "mx-auto overflow-hidden bg-background shadow-sm transition-all duration-300",
            device !== "desktop" && "rounded-xl border border-border"
          )}
          style={{ maxWidth: activeDevice.width }}
        >
          <WebsiteRenderer data={spec as any} currentPage={currentPage} onNavigatePage={onPageChange} />
        </div>
      </div>
    </div>
  );
};

export default FullScreenPreviewModal;
