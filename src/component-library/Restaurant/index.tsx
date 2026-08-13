import { useState, useEffect } from "react";

// ── MenuHighlights ─────────────────────────────────────────────
export const MenuHighlights = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {(props.items || []).map((item: any, i: number) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
              {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-2xl text-primary/30">🍽️</span></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{item.name}</h3>
              {item.description && <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">{item.description}</p>}
            </div>
            <span className="text-lg font-extrabold text-primary">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── DailySpecials ──────────────────────────────────────────────
export const DailySpecials = (props: any) => (
  <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.items || []).map((item: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">{item.tag || "Today's Special"}</span>
              {item.originalPrice && <span className="text-sm font-bold text-white/60 line-through">{item.originalPrice}</span>}
            </div>
            <h3 className="text-lg font-bold text-white">{item.name}</h3>
            {item.description && <p className="mt-1 text-sm text-white/70">{item.description}</p>}
            <p className="mt-3 text-2xl font-extrabold text-white">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── MenuHighlights2 (classic printed-menu look — name, dotted leader
//    line, price; no photos) ──────────────────────────────────
export const MenuHighlights2 = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-2xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="space-y-6">
        {(props.items || []).map((item: any, i: number) => (
          <div key={i}>
            <div className="flex items-baseline gap-2">
              <h3 className="whitespace-nowrap font-bold text-foreground">{item.name}</h3>
              <span className="mb-1 flex-1 border-b border-dotted border-border" />
              <span className="whitespace-nowrap text-lg font-extrabold text-primary">{item.price}</span>
            </div>
            {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── DailySpecials2 ─────────────────────────────────────────────
export const DailySpecials2 = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-3xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {(props.items || []).map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 p-5">
            <div>
              <span className="mb-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">{item.tag || "Today's Special"}</span>
              <h3 className="font-bold text-foreground">{item.name}</h3>
              {item.description && <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>}
            </div>
            <div className="flex-shrink-0 text-right">
              {item.originalPrice && <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>}
              <p className="text-xl font-extrabold text-primary">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── ChefTable ──────────────────────────────────────────────────
export const ChefTable = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-muted">
          {props.image ? <img src={props.image} alt="" className="aspect-[4/3] w-full object-cover" /> : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-7xl text-primary/20">👨‍🍳</span></div>
          )}
        </div>
        <div>
          {props.title && <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
          <p className="mb-6 text-muted-foreground leading-relaxed">{props.description || props.content}</p>
          {props.chef && (
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{props.chef.name?.split(" ").map((n: string) => n[0]).join("")}</div>
              <div><p className="font-bold text-foreground">{props.chef.name}</p><p className="text-sm text-primary">{props.chef.title}</p></div>
            </div>
          )}
          {(props.ctaText || props.ctaLink) && (
            <a
              href={props.ctaLink || "#"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              onClick={(e) => { if (!props.ctaLink || props.ctaLink === "#") e.preventDefault(); }}
            >
              {props.ctaText || "Learn More"}
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
);
