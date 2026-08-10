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

// ── ReservationForm ────────────────────────────────────────────
export const ReservationForm = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-2xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mb-10 text-center text-muted-foreground">{props.subtitle}</p>}
      <form className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Date</label><input type="date" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Time</label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select time</option>
              {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Party Size</label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select size</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>)}
            </select>
          </div>
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Phone</label><input type="tel" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        </div>
        <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Special Requests</label><textarea className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" rows={3} placeholder="Allergies, celebrations, seating preferences..." /></div>
        <button type="submit" className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">{props.submitText || "Reserve Table"}</button>
      </form>
    </div>
  </section>
);
