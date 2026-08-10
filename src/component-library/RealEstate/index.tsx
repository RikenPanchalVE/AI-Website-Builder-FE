import { useState, useEffect } from "react";

// ── PropertyGrid ───────────────────────────────────────────────
export const PropertyGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.properties || []).map((prop: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {prop.image ? <img src={prop.image} alt={prop.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">🏠</span></div>
              )}
              {prop.badge && <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">{prop.badge}</span>}
            </div>
            <div className="p-5">
              <p className="text-lg font-extrabold text-primary">{prop.price}</p>
              <h3 className="mt-1 font-bold text-foreground">{prop.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{prop.address}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                {prop.beds && <span>🛏 {prop.beds} beds</span>}
                {prop.baths && <span>🚿 {prop.baths} baths</span>}
                {prop.sqft && <span>📐 {prop.sqft} sqft</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── PropertySearch ─────────────────────────────────────────────
export const PropertySearch = (props: any) => (
  <section className="py-8 bg-card border-b border-border">
    <div className="mx-auto max-w-6xl px-6">
      <form className="flex flex-wrap items-end gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1.5 block text-sm font-semibold text-foreground">Location</label>
          <input type="text" placeholder="City, neighborhood, or address" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="min-w-[150px]">
          <label className="mb-1.5 block text-sm font-semibold text-foreground">Type</label>
          <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Condo</option>
          </select>
        </div>
        <div className="min-w-[120px]">
          <label className="mb-1.5 block text-sm font-semibold text-foreground">Bedrooms</label>
          <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>Any</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
          </select>
        </div>
        <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">Search</button>
      </form>
    </div>
  </section>
);

// ── NeighborhoodGuide ──────────────────────────────────────────
export const NeighborhoodGuide = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.neighborhoods || []).map((n: any, i: number) => (
          <a key={i} href={n.href || "#"} className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {n.image ? <img src={n.image} alt={n.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">📍</span></div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">{n.name}</h3>
              {n.description && <p className="mt-1 text-sm text-muted-foreground">{n.description}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ── AgentProfiles ──────────────────────────────────────────────
export const AgentProfiles = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {(props.agents || []).map((a: any, i: number) => (
          <div key={i} className="text-center">
            <div className="mx-auto mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
              {a.avatar ? <img src={a.avatar} alt={a.name} className="h-28 w-28 object-cover" /> : (
                <div className="flex h-28 w-28 items-center justify-center text-2xl font-bold text-primary">{a.name?.split(" ").map((n: string) => n[0]).join("")}</div>
              )}
            </div>
            <h3 className="font-bold text-foreground">{a.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{a.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
