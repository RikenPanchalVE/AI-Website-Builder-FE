import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface DeviceFrameProps {
  /** CSS width to render the device viewport at, e.g. "390px", "768px". */
  width: string;
  /** Fixed CSS height for the simulated viewport, e.g. "844px". The frame
   * scrolls its own content internally past this - exactly like a real
   * phone/tablet screen, which doesn't grow to fit the page. */
  height: string;
  /** false (desktop) renders children inline with no isolation - nothing
   * to simulate, the page's own real width already applies. */
  active: boolean;
  children: ReactNode;
}

// Tailwind's sm:/md:/lg: classes compile to real `@media (min-width: …)`
// queries, which read the actual BROWSER viewport - never a parent
// element's width. The Tablet/Mobile toggle here used to just clamp a
// wrapping div's `max-width` to 768px/390px, which visually squeezes the
// content into a narrow box but changes nothing that `sm:`/`lg:` actually
// look at: on a normal desktop window every lg:/xl: class still matched,
// so "Mobile" showed a full desktop 4-column grid and 7xl headline
// shrink-wrapped into a 390px strip - not a real preview of mobile layout,
// just a distorted thumbnail of the desktop one.
//
// An <iframe> has its own independent document and viewport, so giving it
// its own real width/height and rendering the site's markup *inside* that
// document (via a portal into iframe.contentDocument.body, after copying
// over the same compiled Tailwind CSS + font <link> the host page uses)
// makes every media query - including `vh` units - evaluate against that
// size for real, the same technique browser dev tools' device toolbar uses.
//
// The height is a fixed prop, not auto-measured from content: an earlier
// version tried to grow the iframe to fit its content via a ResizeObserver,
// but several sections use `min-h-[70vh]` - sized off the iframe's *own*
// viewport height. Setting the iframe's height from content that itself
// scales with the iframe's height is a feedback loop (taller iframe → taller
// vh-sized section → taller scrollHeight → observer grows the iframe
// again → …), and it runs away to absurd heights within a couple of
// frames. A fixed height with the iframe scrolling its own content is both
// simpler and more accurate: a real phone doesn't grow to fit the page either.
export default function DeviceFrame({ width, height, active, children }: DeviceFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      setMountNode(null);
      return;
    }
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setup = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.head.innerHTML = "";
      // Clone every stylesheet <link> and <style> tag from the host
      // document (Tailwind's compiled CSS + the Google Fonts <link> from
      // index.html) so the iframe's own document renders identically,
      // just at its own width.
      document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
        doc.head.appendChild(node.cloneNode(true));
      });
      doc.documentElement.style.margin = "0";
      doc.body.style.margin = "0";
      setMountNode(doc.body);
    };

    if (iframe.contentDocument?.readyState === "complete") setup();
    iframe.addEventListener("load", setup);
    return () => iframe.removeEventListener("load", setup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return <>{children}</>;

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Device preview"
        style={{ width: "100%", height, border: "none", display: "block" }}
      />
      {mountNode && createPortal(children, mountNode)}
    </>
  );
}
