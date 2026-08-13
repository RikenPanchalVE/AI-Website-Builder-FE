import { useState, useEffect } from "react";

// ── Services ───────────────────────────────────────────────────
export const Services = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.services || []).map((s: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="mb-2 font-bold text-foreground">{s.name}</h3>
            {s.description && <p className="mb-3 text-sm text-muted-foreground">{s.description}</p>}
            {s.price && <p className="text-lg font-extrabold text-primary">{s.price}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── AppointmentBooking ─────────────────────────────────────────
export const AppointmentBooking = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-2xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mb-10 text-center text-muted-foreground">{props.subtitle}</p>}
      <form className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Full Name</label><input type="text" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Email</label><input type="email" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="john@example.com" /></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Phone</label><input type="tel" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="(555) 123-4567" /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Service</label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select service</option>
              {(props.services || []).map((s: any, i: number) => <option key={i}>{s.name} {s.price ? `- ${s.price}` : ""}</option>)}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Preferred Date</label><input type="date" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Preferred Time</label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select time</option>
              {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div><label className="mb-1.5 block text-sm font-semibold text-foreground">Notes</label><textarea className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" rows={3} placeholder="Any additional information..." /></div>
        <button type="submit" className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">{props.submitText || "Book Appointment"}</button>
      </form>
    </div>
  </section>
);

// ── DoctorProfiles ─────────────────────────────────────────────
export const DoctorProfiles = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.doctors || []).map((doc: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {doc.image ? <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">👨‍⚕️</span></div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-foreground">{doc.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-primary">{doc.specialty}</p>
              {doc.description && <p className="mt-2 text-sm text-muted-foreground">{doc.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── DoctorProfiles2 ────────────────────────────────────────────
export const DoctorProfiles2 = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {(props.doctors || []).map((doc: any, i: number) => (
          <div key={i} className="text-center">
            <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
              {doc.image ? <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center text-3xl">👨‍⚕️</div>
              )}
            </div>
            <h3 className="font-bold text-foreground">{doc.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{doc.specialty}</p>
            {doc.description && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{doc.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── HealthResources ────────────────────────────────────────────
export const HealthResources = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.resources || []).map((r: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              {r.image ? <img src={r.image} alt={r.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">🩺</span></div>
              )}
            </div>
            <div className="p-5">
              {r.category && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.category}</span>}
              <h3 className="mt-3 font-bold text-foreground">{r.title}</h3>
              {r.description && <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
