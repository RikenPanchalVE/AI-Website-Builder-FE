import { useState, useEffect } from "react";

// ── DestinationGrid ────────────────────────────────────────────
export const DestinationGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.destinations || []).map((dest: any, i: number) => (
          <div key={i} className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {dest.image ? <img src={dest.image} alt={dest.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">✈️</span></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                {dest.price && <p className="mt-1 text-sm text-white/80">From {dest.price}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── DestinationGrid2 ───────────────────────────────────────────
export const DestinationGrid2 = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(props.destinations || []).map((dest: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {dest.image ? <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">✈️</span></div>
              )}
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-foreground">{dest.name}</h3>
              {dest.price && (
                <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">From {dest.price}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── TravelDeals ────────────────────────────────────────────────
export const TravelDeals = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.deals || []).map((deal: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {deal.image ? <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">🗺️</span></div>
              )}
              {deal.discount && <span className="absolute right-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-white shadow-md">-{deal.discount}%</span>}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-foreground">{deal.title}</h3>
              {deal.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{deal.description}</p>}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-primary">{deal.price}</span>
                {deal.originalPrice && <span className="text-sm text-muted-foreground line-through">{deal.originalPrice}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── TravelDeals2 ───────────────────────────────────────────────
export const TravelDeals2 = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-4xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="space-y-5">
        {(props.deals || []).map((deal: any, i: number) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:flex-row">
            <div className="relative aspect-[16/9] w-full flex-shrink-0 overflow-hidden bg-muted sm:aspect-square sm:w-40">
              {deal.image ? <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">🗺️</span></div>
              )}
              {deal.discount && <span className="absolute left-2 top-2 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-white shadow-md">-{deal.discount}%</span>}
            </div>
            <div className="flex flex-1 items-center justify-between gap-4 p-5">
              <div>
                <h3 className="font-bold text-foreground">{deal.title}</h3>
                {deal.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{deal.description}</p>}
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-lg font-extrabold text-primary">{deal.price}</p>
                {deal.originalPrice && <p className="text-xs text-muted-foreground line-through">{deal.originalPrice}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── PackageGrid ────────────────────────────────────────────────
export const PackageGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(props.packages || []).map((pkg: any, i: number) => (
          <div
            key={i}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] ${pkg.featured ? "border-primary ring-2 ring-primary/30" : "border-border"
              }`}
          >
            {/* Top accent bar */}
            <div
              className="flex h-1.5 w-full"
              style={{ backgroundImage: `linear-gradient(90deg, var(--theme-gradient-from), var(--theme-gradient-to))` }}
            />
            {pkg.featured && (
              <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                🔥 Most Popular
              </div>
            )}
            {(pkg.badge || pkg.tag) && !pkg.featured && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-white shadow-md">
                {pkg.badge || pkg.tag}
              </span>
            )}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {pkg.image ? <img src={pkg.image} alt={pkg.title || pkg.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-secondary/15">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/70 shadow-lg backdrop-blur">
                    <span className="text-4xl text-primary">✈️</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {pkg.duration && (
                <span className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {pkg.duration}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-foreground">{pkg.title || pkg.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-primary">{pkg.price}</span>
                {pkg.period && <span className="text-sm text-muted-foreground">/{pkg.period}</span>}
              </div>
              {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                <ul className="mt-5 mb-6 flex-1 space-y-3 border-t border-border pt-5">
                  {pkg.features.map((f: string, j: number) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <button
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${pkg.featured
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02]"
                    : "border border-border text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary"
                  }`}
                style={pkg.featured ? { backgroundImage: "linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-to))" } : undefined}
              >
                {pkg.cta || "Book Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── TravelGuides ───────────────────────────────────────────────
export const TravelGuides = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.guides || []).map((g: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {g.image ? <img src={g.image} alt={g.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">🧭</span></div>
              )}
            </div>
            <div className="p-5">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{g.destination}</span>
              <h3 className="mt-3 font-bold text-foreground">{g.title}</h3>
              {g.description && <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
