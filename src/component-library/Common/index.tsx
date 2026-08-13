import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   EDITORIAL COMPONENT LIBRARY
   Premium design system — each component is unique
   ═══════════════════════════════════════════════════════════ */

// Platform-accurate social icons for the footer's social links row. These
// used to render as plain two-letter initials (e.g. "IN" for both
// Instagram and LinkedIn), which looked unfinished and was ambiguous.
// Monochrome + currentColor so each icon inherits whatever text color the
// footer badge is already using, including its hover state.
const SOCIAL_ICON_PATHS: Record<string, { viewBox: string; path: string }> = {
  facebook: {
    viewBox: "0 0 320 512",
    path: "M279.1 288l14.2-92.7h-88.9v-60.1c0-25.4 12.4-50.1 52.2-50.1h40.4V6.3S260.4 0 225.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.9V288h81.4v224h100.2V288z",
  },
  twitter: {
    viewBox: "0 0 24 24",
    path: "M18.24 2.25h3.3l-7.2 8.23L23 21.75h-6.62l-5.2-6.8-5.94 6.8H2l7.73-8.84L1 2.25h6.78l4.7 6.22 5.76-6.22Zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64Z",
  },
  linkedin: {
    viewBox: "0 0 448 512",
    path: "M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.9 0 54.3a53.8 53.8 0 1 1 107.6 0c0 29.6-24.1 53.8-53.8 53.8zM447.9 448h-92.7V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z",
  },
  tiktok: {
    viewBox: "0 0 448 512",
    path: "M448 209.9a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z",
  },
};

export const SocialIcon = ({ platform, className }: { platform?: string; className?: string }) => {
  const key = (platform || "").toLowerCase();
  const cls = className || "h-4 w-4";

  if (key === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-label="Instagram">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.7" cy="6.3" r="1.15" fill="currentColor" />
      </svg>
    );
  }
  if (key === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-label="YouTube">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10.5 9l6 3-6 3V9z" fill="currentColor" />
      </svg>
    );
  }
  const icon = SOCIAL_ICON_PATHS[key];
  if (icon) {
    return (
      <svg viewBox={icon.viewBox} fill="currentColor" className={cls} aria-label={platform}>
        <path d={icon.path} />
      </svg>
    );
  }
  // Unknown platform — fall back to initials rather than rendering nothing.
  return <span className="text-[10px] font-bold uppercase">{platform?.substring(0, 2)}</span>;
};

export const WhyChooseUs = (props: any) => (
  <section className="relative bg-foreground text-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-background/40 mb-6">Why Us</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-8" style={{ letterSpacing: "-0.04em" }}>
            {props.title || "Built Different"}
          </h2>
          {props.subtitle && <p className="text-lg text-background/60 leading-relaxed max-w-md">{props.subtitle}</p>}
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-0">
            {(props.reasons || props.features || []).map((r: any, i: number) => (
              <div key={i} className="group border-b border-background/10 py-8 transition-all duration-500 hover:pl-4" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
                <div className="flex items-start gap-6">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-background/30 mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-2">{r.title}</h3>
                    <p className="text-sm text-background/50 leading-relaxed max-w-lg">{r.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Testimonials = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40">
      <div className="mb-20">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Testimonials</p>
        <h2 className="text-5xl lg:text-8xl font-bold tracking-tight leading-[0.9]" style={{ letterSpacing: "-0.05em" }}>
          {props.title || "Client\nReviews"}
        </h2>
      </div>
      <div className="space-y-0">
        {(props.testimonials || []).map((t: any, i: number) => (
          <div key={i} className="group border-t border-border py-10 lg:py-14 transition-all duration-500 hover:pl-6" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-8">
                <p className="text-2xl lg:text-4xl font-bold tracking-tight leading-tight" style={{ letterSpacing: "-0.03em" }}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <div className="flex items-center gap-4 lg:justify-end">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="h-12 w-12 object-cover" />
                  ) : (
                    <div className="h-12 w-12 bg-foreground text-background flex items-center justify-center text-sm font-bold">
                      {t.name?.charAt(0)}
                    </div>
                  )}
                  <div className="lg:text-right">
                    <p className="text-sm font-bold tracking-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                {t.rating && (
                  <div className="flex gap-0.5 lg:justify-end mt-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="h-3 w-3 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BrandShowcase = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-10 text-center">
        {props.title || "Trusted By"}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
        {(props.brands || []).map((b: any, i: number) => (
          <div key={i} className="flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-500">
            {b.logo ? (
              <img src={b.logo} alt={b.name} className="h-6 object-contain grayscale" />
            ) : (
              <span className="text-lg font-bold tracking-tight text-foreground">{b.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const NewsletterSignup = (props: any) => (
  <section className="bg-foreground text-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-background/40 mb-6">Newsletter</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6" style={{ letterSpacing: "-0.04em" }}>
            {props.title || "Stay Informed"}
          </h2>
          {props.subtitle && <p className="text-lg text-background/60 leading-relaxed max-w-md">{props.subtitle}</p>}
          {props.discount && (
            <p className="mt-4 text-sm font-bold tracking-[0.1em] uppercase text-background/80">{props.discount}</p>
          )}
        </div>
        <div>
          <form className="flex flex-col sm:flex-row gap-0" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={props.placeholder || "Enter your email"}
              className="flex-1 bg-transparent border border-background/20 px-6 py-4 text-sm text-background placeholder-background/30 focus:outline-none focus:border-background/60 transition-colors"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-background text-foreground px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-background/90 transition-all"
            >
              {props.buttonText || "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export const InstagramFeed = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">Instagram</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            {props.title || "Follow Us"}
          </h2>
        </div>
        {props.subtitle && (
          <a href="#" className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            {props.subtitle}
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {(props.images || []).map((img: string | null, i: number) => (
          <div key={i} className="group relative aspect-square overflow-hidden bg-muted cursor-pointer" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.04}s both` }}>
            {img ? (
              <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5" />
            )}
            <div className="absolute inset-0 bg-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQPreview = (props: any) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32">
        <div className="mb-16">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">FAQ</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
            {props.title || "Questions"}
          </h2>
        </div>
        <div className="space-y-0">
          {(props.faqs || []).map((faq: any, i: number) => (
            <div key={i} className="border-t border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left transition-all duration-300 hover:pl-4"
              >
                <div className="flex items-start gap-6">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground mt-2 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg lg:text-xl font-bold tracking-tight">{faq.question}</span>
                </div>
                <svg
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${open === i ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                <div className="pl-12 text-sm leading-relaxed text-muted-foreground max-w-2xl">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        {props.link && (
          <div className="mt-12 border-t border-border pt-8">
            <a href={props.link} className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] uppercase text-foreground hover:gap-5 transition-all">
              {props.linkText || "View All FAQs"}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export const ContactPreview = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {props.title || "Get in Touch"}
        </h2>
        {props.subtitle && <p className="mt-6 text-lg text-muted-foreground max-w-lg">{props.subtitle}</p>}
      </div>
      <div className="grid gap-0 sm:grid-cols-3 border border-border">
        {props.email && (
          <div className="p-8 border-b sm:border-b-0 sm:border-r border-border">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">Email</p>
            <a href={`mailto:${props.email}`} className="text-sm font-medium hover:text-primary transition-colors">{props.email}</a>
          </div>
        )}
        {props.phone && (
          <div className="p-8 border-b sm:border-b-0 sm:border-r border-border">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">Phone</p>
            <a href={`tel:${props.phone}`} className="text-sm font-medium hover:text-primary transition-colors">{props.phone}</a>
          </div>
        )}
        {props.address && (
          <div className="p-8">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">Address</p>
            <p className="text-sm text-muted-foreground">{props.address}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export const StoreLocator = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Locations</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {props.title || "Visit Us"}
        </h2>
      </div>
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 border border-border">
        {(props.stores || []).map((store: any, i: number) => (
          <div key={i} className="p-8 border-b sm:border-b-0 sm:border-r border-border last:border-r-0" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">{store.name}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{store.address}</p>
              {store.phone && <p>{store.phone}</p>}
              {store.hours && <p>{store.hours}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// A compact page-title bar for every page other than Home — deliberately
// not built to be a second hero. It used to share Hero1-5's own scale
// (min-h-screen-style padding, an h1 that reads at the same enforced size
// as the actual Home hero, an optional side image) so every single page in
// the site opened with what looked like its own repeated hero banner. Real
// sites reserve that treatment for the homepage and give inner pages a
// modest title instead.
export const PageHero = (props: any) => (
  <section className="relative border-b border-border bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-12 lg:py-16 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em" }}>
        {props.title}
      </h2>
      {props.subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed lg:text-base">
          {props.subtitle}
        </p>
      )}
    </div>
  </section>
);

export const Breadcrumbs = (props: any) => (
  <nav className="border-b border-border bg-background">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
        {(props.items || []).map((item: any, i: number) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-border">/</span>}
            {i < (props.items?.length || 0) - 1 ? (
              <a href={item.href} className="hover:text-foreground transition-colors">{item.label}</a>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  </nav>
);

export const AboutStory = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12 items-center">
        <div className="lg:col-span-5" style={{ animation: "pSlideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}>
          {props.image ? (
            <div className="aspect-[3/4] overflow-hidden">
              <img src={props.image} alt="" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted flex items-center justify-center">
              <span className="text-8xl text-primary/10">&#9670;</span>
            </div>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {props.title && (
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-8" style={{ letterSpacing: "-0.04em" }}>
              {props.title}
            </h2>
          )}
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{props.content}</p>
          {props.stats && (
            <div className="grid grid-cols-2 gap-0 border border-border">
              {props.stats.map((s: any, i: number) => (
                <div key={i} className={`p-8 ${i < props.stats.length - (props.stats.length % 2 === 0 ? 2 : 1) ? "border-b sm:border-r" : "border-b sm:border-b-0"} ${i % 2 === 0 ? "sm:border-r" : ""} border-border`}>
                  <div className="text-3xl lg:text-4xl font-bold tracking-tight mb-1" style={{ letterSpacing: "-0.04em" }}>{s.value}</div>
                  <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export const AboutValues = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Values</p>
        {props.title && (
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
            {props.title}
          </h2>
        )}
      </div>
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 border border-border">
        {(props.values || []).map((v: any, i: number) => (
          <div key={i} className="p-8 border-b sm:border-b-0 sm:border-r border-border last:border-r-0 bg-background transition-all duration-500 hover:bg-muted/50" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground mb-6 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold tracking-tight mb-3">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Stats = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
      {(props.title || props.subtitle) && (
        <div className="mb-12 text-center">
          {props.title && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
              {props.title}
            </h2>
          )}
          {props.subtitle && <p className="mt-3 text-muted-foreground">{props.subtitle}</p>}
        </div>
      )}
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 border border-border">
        {(props.stats || []).map((s: any, i: number) => (
          <div key={i} className="p-8 text-center border-b sm:border-b-0 sm:border-r border-border last:border-r-0" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>{s.value}</div>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Timeline = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-16 lg:py-24">
      {(props.title || props.subtitle) && (
        <div className="mb-14 text-center">
          {props.title && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
              {props.title}
            </h2>
          )}
          {props.subtitle && <p className="mt-3 text-muted-foreground">{props.subtitle}</p>}
        </div>
      )}
      <div className="border-l border-border pl-8">
        {(props.milestones || []).map((m: any, i: number) => (
          <div key={i} className="relative pb-10 last:pb-0" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{m.year}</p>
            <h3 className="mt-1 font-bold text-foreground">{m.title}</h3>
            {m.description && <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BusinessHours = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-2xl px-6 lg:px-12 py-12">
      {props.title && (
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground">{props.title}</h2>
      )}
      <div className="border border-border">
        {(props.hours || []).map((h: any, i: number) => (
          <div key={i} className="flex items-center justify-between border-b border-border px-6 py-3 text-sm last:border-b-0">
            <span className="font-medium text-foreground">{h.day}</span>
            <span className="text-muted-foreground">{h.hours}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ClassSchedule = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-16 lg:py-24">
      {(props.title || props.subtitle) && (
        <div className="mb-10 text-center">
          {props.title && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
              {props.title}
            </h2>
          )}
          {props.subtitle && <p className="mt-3 text-muted-foreground">{props.subtitle}</p>}
        </div>
      )}
      <div className="border border-border bg-background">
        {(props.schedule || []).map((s: any, i: number) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4 text-sm last:border-b-0">
            <span className="font-bold text-foreground">{s.className}</span>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{s.day}</span>
              <span className="font-medium text-primary">{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TeamSection = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Team</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {props.title || "Our People"}
        </h2>
        {props.subtitle && <p className="mt-6 text-lg text-muted-foreground max-w-lg">{props.subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
        {(props.members || []).map((m: any, i: number) => (
          <div key={i} className="group border-b sm:border-b-0 sm:border-r border-border last:border-r-0 overflow-hidden" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              {m.avatar ? (
                <img src={m.avatar} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-primary/15">
                  {m.name?.split(" ").map((n: string) => n[0]).join("")}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-bold tracking-tight mb-1">{m.name}</h3>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">{m.role}</p>
              {m.bio && <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{m.bio}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Variant 2s for the About page's Story/Values/Team/Statistics/Timeline
// sections — these used to have no layout choice at all (unlike every Home
// page section), so picking a design style never changed how they looked.
export const AboutStory2 = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32 text-center">
      {props.subtitle && (
        <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-primary">{props.subtitle}</p>
      )}
      {props.title && (
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-8" style={{ letterSpacing: "-0.03em" }}>
          {props.title}
        </h2>
      )}
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed mb-12">{props.content}</p>
      {props.stats && (
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {props.stats.map((s: any, i: number) => (
            <div key={i}>
              <div className="text-3xl lg:text-4xl font-bold tracking-tight text-primary" style={{ letterSpacing: "-0.03em" }}>{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

export const AboutValues2 = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16 text-center">
        <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-primary">Values</p>
        {props.title && (
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{props.title}</h2>
        )}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {(props.values || []).map((v: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-3">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Stats2 = (props: any) => (
  <section className="bg-foreground text-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-28">
      {(props.title || props.subtitle) && (
        <div className="mb-14 text-center">
          {props.title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>{props.title}</h2>
          )}
          {props.subtitle && <p className="mt-3 text-background/60">{props.subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
        {(props.stats || []).map((s: any, i: number) => (
          <div key={i} className="text-center" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="text-5xl font-extrabold tracking-tight sm:text-6xl" style={{ letterSpacing: "-0.03em" }}>{s.value}</div>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-background/50">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Timeline2 = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-5xl px-6 lg:px-12 py-16 lg:py-24">
      {(props.title || props.subtitle) && (
        <div className="mb-16 text-center">
          {props.title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>{props.title}</h2>
          )}
          {props.subtitle && <p className="mt-3 text-muted-foreground">{props.subtitle}</p>}
        </div>
      )}
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />
        <div className="space-y-10 lg:space-y-16">
          {(props.milestones || []).map((m: any, i: number) => (
            <div key={i} className={`relative flex flex-col gap-2 lg:flex-row lg:items-center ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`} style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
              <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{m.year}</p>
                <h3 className="mt-1 text-lg font-bold text-foreground">{m.title}</h3>
                {m.description && <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.description}</p>}
              </div>
              <span className="absolute left-1/2 top-1.5 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary lg:block" />
              <div className="hidden lg:block lg:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const TeamSection2 = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16 text-center">
        <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-primary">Team</p>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{props.title || "Our People"}</h2>
        {props.subtitle && <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{props.subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {(props.members || []).map((m: any, i: number) => (
          <div key={i} className="text-center" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-muted shadow-md">
              {m.avatar ? (
                <img src={m.avatar} alt={m.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-primary/20">
                  {m.name?.split(" ").map((n: string) => n[0]).join("")}
                </div>
              )}
            </div>
            <h3 className="font-bold tracking-tight">{m.name}</h3>
            <p className="mt-1 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Variant 2s for Why Choose Us, Business Hours, Contact Info, and Map —
// these had no layout choice at all, same gap as the About page sections.
export const WhyChooseUs2 = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16 text-center">
        <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-primary">Why Us</p>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          {props.title || "Built Different"}
        </h2>
        {props.subtitle && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{props.subtitle}</p>}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(props.reasons || props.features || []).map((r: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-3">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BusinessHours2 = (props: any) => (
  <section className="bg-foreground text-background overflow-hidden">
    <div className="mx-auto max-w-3xl px-6 lg:px-12 py-16 lg:py-24 text-center">
      {props.title && (
        <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>{props.title}</h2>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(props.hours || []).map((h: any, i: number) => (
          <div key={i} className="rounded-xl bg-background/10 px-4 py-5" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s both` }}>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-background/50">{h.day}</p>
            <p className="mt-1 text-sm font-bold">{h.hours}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactInfo2 = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-2xl px-6 lg:px-12 py-16">
      <div className="space-y-4">
        {(props.methods || []).map((m: any, i: number) => (
          <div key={i} className="flex items-center gap-5 rounded-2xl border border-border bg-background p-6 shadow-sm" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">{m.title}</p>
              <p className="mt-1 text-sm font-bold tracking-tight">{m.value}</p>
              {m.description && <p className="mt-0.5 text-xs text-muted-foreground">{m.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const MapEmbed2 = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-5xl px-6 lg:px-12 py-16 lg:py-24">
      <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
        {props.lat && props.lng ? (
          <iframe
            src={`https://maps.google.com/maps?q=${props.lat},${props.lng}&z=15&output=embed`}
            className="h-[420px] w-full border-0"
            loading="lazy"
            title="Map"
          />
        ) : (
          <div className="flex h-[420px] flex-col items-center justify-center bg-muted/30 text-center text-muted-foreground">
            <p className="text-lg font-bold text-foreground">{props.title || "Find Us"}</p>
            <p className="mt-2 text-sm">{props.address || "Map placeholder"}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export const CTABanner = (props: any) => (
  <section className="bg-foreground text-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40">
      <div className="max-w-3xl">
        <h2 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8" style={{ letterSpacing: "-0.05em" }}>
          {props.headline || "Let's Talk"}
        </h2>
        {props.subheadline && (
          <p className="text-lg text-background/60 leading-relaxed max-w-xl mb-10">{props.subheadline}</p>
        )}
        {props.ctaText && (
          <a
            href={props.ctaLink}
            className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-background/90 transition-all duration-500"
          >
            {props.ctaText}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  </section>
);

export const ContactInfo = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 border border-border">
        {(props.methods || []).map((m: any, i: number) => (
          <div key={i} className="p-8 border-b sm:border-b-0 sm:border-r border-border last:border-r-0" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s both` }}>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">{m.title}</p>
            <p className="text-sm font-bold tracking-tight mb-1">{m.value}</p>
            {m.description && <p className="text-xs text-muted-foreground">{m.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactForm = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Message</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95] mb-6" style={{ letterSpacing: "-0.04em" }}>
            {props.title || "Send a Message"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We'll get back to you within 24 hours.</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <form className="space-y-0 border border-border" onSubmit={(e) => e.preventDefault()}>
            {(props.fields || []).map((f: any, i: number) => (
              <div key={i} className="border-b border-border last:border-b-0">
                <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none resize-none" rows={4} />
                ) : f.type === "select" ? (
                  <select className="w-full bg-transparent px-6 pb-6 text-sm text-foreground focus:outline-none appearance-none">
                    <option value="">Select...</option>
                    {(f.options || []).map((o: string, j: number) => <option key={j}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type || "text"} className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none" />
                )}
              </div>
            ))}
            <div className="p-6">
              <button
                type="submit"
                className="bg-foreground text-background px-10 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-all"
              >
                {props.submitText || "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export const MapEmbed = (props: any) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
      <div className="overflow-hidden border border-border bg-background">
        {props.lat && props.lng ? (
          <iframe
            src={`https://maps.google.com/maps?q=${props.lat},${props.lng}&z=15&output=embed`}
            className="h-[500px] w-full border-0"
            loading="lazy"
            title="Map"
          />
        ) : (
          <div className="flex h-[500px] flex-col items-center justify-center text-muted-foreground">
            <p className="text-sm">{props.address || "Map placeholder"}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export const BlogGrid = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Blog</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {props.title || "Latest"}
        </h2>
      </div>
      <div className="grid gap-0 lg:grid-cols-12 border border-border">
        {(props.posts || []).map((post: any, i: number) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className={`group overflow-hidden border-b lg:border-b-0 lg:border-r border-border last:border-r-0 transition-all duration-500 hover:bg-muted/30 ${
              i === 0 ? "lg:col-span-6" : "lg:col-span-3"
            }`}
            style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s both` }}
          >
            <div className={`overflow-hidden bg-muted ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
              {post.image ? (
                <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5" />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">{post.category}</span>
                {post.readTime && <span className="text-[11px] text-muted-foreground/50">/ {post.readTime}</span>}
              </div>
              <h3 className={`font-bold tracking-tight leading-tight group-hover:text-primary transition-colors ${i === 0 ? "text-xl lg:text-2xl" : "text-sm"}`}>
                {post.title}
              </h3>
              {i === 0 && post.excerpt && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export const FAQAccordion = (props: any) => {
  const [openCat, setOpenCat] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32">
        {(props.categories || []).map((cat: any, ci: number) => (
          <div key={ci} className="mb-2">
            <button
              onClick={() => setOpenCat(openCat === ci ? null : ci)}
              className="flex w-full items-center justify-between border border-border px-8 py-6 text-left transition-all duration-300 hover:bg-muted/30"
            >
              <span className="text-lg font-bold tracking-tight">{cat.name}</span>
              <svg
                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${openCat === ci ? "rotate-45" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            {openCat === ci && (
              <div className="border border-t-0 border-border bg-muted/20">
                {(cat.faqs || []).map((faq: any, fi: number) => {
                  const key = `${ci}-${fi}`;
                  return (
                    <div key={fi} className="border-b border-border last:border-b-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === key ? null : key)}
                        className="flex w-full items-center justify-between px-8 py-5 text-left transition-all duration-300 hover:pl-12"
                      >
                        <span className="text-sm font-medium">{faq.question}</span>
                        <svg
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === key ? "rotate-45" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-500 ${openFaq === key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-8 pb-6 text-sm leading-relaxed text-muted-foreground">{faq.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        {props.contactLink && (
          <div className="mt-8 border border-border px-8 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              {props.contactText || "Still have questions?"}{" "}
              <a href={props.contactLink} className="font-bold text-foreground hover:underline">Contact us</a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export const LegalContent = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-3xl px-6 lg:px-12 py-24 lg:py-32">
      {props.lastUpdated && (
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-12">
          Last Updated: {props.lastUpdated}
        </p>
      )}
      <div className="prose prose-sm max-w-none text-muted-foreground">
        {(props.content || "").split("\n").map((line: string, i: number) => {
          if (line.startsWith("# ")) return <h1 key={i} className="mt-12 mb-4 text-3xl font-bold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em" }}>{line.slice(2)}</h1>;
          if (line.startsWith("## ")) return <h2 key={i} className="mt-10 mb-3 text-xl font-bold tracking-tight text-foreground" style={{ letterSpacing: "-0.02em" }}>{line.slice(3)}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="mt-8 mb-2 text-lg font-semibold text-foreground">{line.slice(4)}</h3>;
          if (line.startsWith("- ")) return <li key={i} className="ml-4 text-sm leading-relaxed">{line.slice(2)}</li>;
          if (line.startsWith("**")) return <p key={i} className="mt-4 text-sm font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i} className="mb-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 text-xs text-foreground">$1</code>') }} />;
        })}
      </div>
    </div>
  </section>
);

export const BlogPreview = (props: any) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">Blog</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            {props.title || "Latest"}
          </h2>
        </div>
        <a href="#" className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          View All
        </a>
      </div>
      <div className="grid gap-0 lg:grid-cols-3 border border-border">
        {(props.posts || []).map((post: any) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden border-b lg:border-b-0 lg:border-r border-border last:border-r-0 transition-all duration-500 hover:bg-muted/30"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {post.image ? (
                <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5" />
              )}
            </div>
            <div className="p-6">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3 block">{post.category}</span>
              <h3 className="font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>{post.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
