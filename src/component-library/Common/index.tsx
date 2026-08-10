import { useState, useEffect } from "react";

// ── WhyChooseUs ────────────────────────────────────────────────
export const WhyChooseUs = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.features || []).map((f: any, i: number) => (
          <div key={i} className="group rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-110">
              <span className="text-xl">✨</span>
            </div>
            <h3 className="mb-2 font-bold text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials ───────────────────────────────────────────────
export const Testimonials = (props: any) => (
  <section className="py-16 sm:py-20" id="testimonials">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(props.testimonials || []).map((t: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <svg key={j} className={`h-4 w-4 ${j < (t.rating || 5) ? "text-yellow-400" : "text-muted/50"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-5 text-sm leading-relaxed italic text-muted-foreground">"{t.content}"</p>
            <div className="flex items-center gap-3">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{t.name?.charAt(0)}</div>
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── BrandShowcase ──────────────────────────────────────────────
export const BrandShowcase = (props: any) => (
  <section className="py-12 sm:py-16 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{props.title}</h2>}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {(props.brands || []).map((b: any, i: number) => (
          <div key={i} className="flex items-center justify-center rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold tracking-wide text-muted-foreground/60 transition-all duration-300 hover:text-foreground hover:shadow-md">
            {b.logo ? <img src={b.logo} alt={b.name} className="h-8 object-contain grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100" /> : b.name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── NewsletterSignup ───────────────────────────────────────────
export const NewsletterSignup = (props: any) => (
  <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-secondary">
    <div className="mx-auto max-w-2xl px-6 text-center">
      {props.title && <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mb-3 text-white/80">{props.subtitle}</p>}
      {props.discount && <p className="mb-6 text-sm font-semibold text-white/90">{props.discount}</p>}
      <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder={props.placeholder || "Enter your email"} className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20" />
        <button type="submit" className="whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:shadow-xl hover:scale-105">
          {props.buttonText || "Subscribe"}
        </button>
      </form>
    </div>
  </section>
);

// ── InstagramFeed ──────────────────────────────────────────────
export const InstagramFeed = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mb-10 text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {(props.images || []).map((img: string | null, i: number) => (
          <div key={i} className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-muted">
            {img ? <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-2xl text-primary/30">📷</span></div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQPreview ─────────────────────────────────────────────────
export const FAQPreview = (props: any) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-3xl px-6">
        {props.title && <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
        <div className="space-y-3">
          {(props.faqs || []).map((faq: any, i: number) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted/50">
                {faq.question}
                <span className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
        {props.link && (
          <div className="mt-8 text-center">
            <a href={props.link} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:underline">
              {props.linkText || "View All FAQs"}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

// ── ContactPreview ─────────────────────────────────────────────
export const ContactPreview = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-4xl px-6 text-center">
      {props.title && <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mb-12 text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-3">
        {props.email && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-foreground">Email</h3>
            <p className="text-sm text-primary">{props.email}</p>
          </div>
        )}
        {props.phone && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-foreground">Phone</h3>
            <p className="text-sm text-primary">{props.phone}</p>
          </div>
        )}
        {props.address && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-foreground">Address</h3>
            <p className="text-sm text-muted-foreground">{props.address}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

// ── StoreLocator ───────────────────────────────────────────────
export const StoreLocator = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mb-12 text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.stores || []).map((store: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-foreground">{store.name}</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📍 {store.address}</p>
              {store.phone && <p>📞 {store.phone}</p>}
              {store.hours && <p>🕐 {store.hours}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── PageHero ───────────────────────────────────────────────────
export const PageHero = (props: any) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
    {props.backgroundImage && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${props.backgroundImage})` }} />}
    <div className="absolute inset-0 bg-background/70" />
    <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{props.title}</h1>
      {props.subtitle && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{props.subtitle}</p>}
    </div>
  </section>
);

// ── Breadcrumbs ────────────────────────────────────────────────
export const Breadcrumbs = (props: any) => (
  <nav className="border-b border-border bg-card py-4">
    <div className="mx-auto max-w-6xl px-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {(props.items || []).map((item: any, i: number) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <svg className="h-3 w-3 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
            {i < (props.items?.length || 0) - 1 ? <a href={item.href} className="transition-colors hover:text-primary">{item.label}</a> : <span className="font-medium text-foreground">{item.label}</span>}
          </li>
        ))}
      </ol>
    </div>
  </nav>
);

// ── AboutStory ─────────────────────────────────────────────────
export const AboutStory = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-muted">
          {props.image ? <img src={props.image} alt="" className="aspect-[4/3] w-full object-cover" /> : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-7xl text-primary/20">📖</span></div>
          )}
        </div>
        <div>
          {props.title && <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
          <p className="mb-8 text-muted-foreground leading-relaxed">{props.content}</p>
          {props.stats && (
            <div className="grid grid-cols-2 gap-4">
              {props.stats.map((s: any, i: number) => (
                <div key={i} className="rounded-2xl bg-muted/50 p-5 text-center">
                  <div className="text-2xl font-extrabold text-primary">{s.value}</div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

// ── AboutValues ────────────────────────────────────────────────
export const AboutValues = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.values || []).map((v: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><span className="text-xl">✨</span></div>
            <h3 className="mb-2 font-bold text-foreground">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── TeamSection ────────────────────────────────────────────────
export const TeamSection = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {(props.members || []).map((m: any, i: number) => (
          <div key={i} className="text-center">
            <div className="mx-auto mb-4 overflow-hidden rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
              {m.avatar ? <img src={m.avatar} alt={m.name} className="h-28 w-28 object-cover" /> : (
                <div className="flex h-28 w-28 items-center justify-center text-2xl font-bold text-primary">{m.name?.split(" ").map((n: string) => n[0]).join("")}</div>
              )}
            </div>
            <h3 className="font-bold text-foreground">{m.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{m.role}</p>
            {m.bio && <p className="mt-1 text-xs text-muted-foreground">{m.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTABanner ──────────────────────────────────────────────────
export const CTABanner = (props: any) => (
  <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary">
    {props.backgroundImage && <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${props.backgroundImage})` }} />}
    <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">{props.headline}</h2>
      {props.subheadline && <p className="mx-auto mb-8 max-w-xl text-primary-foreground/85">{props.subheadline}</p>}
      {props.ctaText && <a href={props.ctaLink} className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:shadow-xl hover:scale-105">{props.ctaText}</a>}
    </div>
  </section>
);

// ── ContactInfo ────────────────────────────────────────────────
export const ContactInfo = (props: any) => (
  <section className="py-12">
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.methods || []).map((m: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><span className="text-xl">📞</span></div>
            <h3 className="mb-1 font-bold text-foreground">{m.title}</h3>
            <p className="mb-1 text-sm font-medium text-primary">{m.value}</p>
            {m.description && <p className="text-xs text-muted-foreground">{m.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── ContactForm ────────────────────────────────────────────────
export const ContactForm = (props: any) => (
  <section className="py-12">
    <div className="mx-auto max-w-2xl px-6">
      {props.title && <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-foreground">{props.title}</h2>}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {(props.fields || []).map((f: any, i: number) => (
          <div key={i} className={f.halfWidth ? "inline-block w-[calc(50%-0.625rem)] mr-4" : ""}>
            <label className="mb-1.5 block text-sm font-semibold text-foreground">{f.label} {f.required && <span className="text-destructive">*</span>}</label>
            {f.type === "textarea" ? <textarea className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" rows={4} /> :
              f.type === "select" ? <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"><option value="">Select...</option>{(f.options || []).map((o: string, j: number) => <option key={j}>{o}</option>)}</select> :
                <input type={f.type || "text"} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />}
          </div>
        ))}
        <button type="submit" className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">{props.submitText || "Submit"}</button>
      </form>
    </div>
  </section>
);

// ── MapEmbed ───────────────────────────────────────────────────
export const MapEmbed = (props: any) => (
  <section className="py-12">
    <div className="mx-auto max-w-6xl px-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        {props.lat && props.lng ? (
          <iframe src={`https://maps.google.com/maps?q=${props.lat},${props.lng}&z=15&output=embed`} className="h-[350px] w-full border-0" loading="lazy" title="Map" />
        ) : (
          <div className="flex h-[350px] flex-col items-center justify-center text-muted-foreground">
            <svg className="mb-3 h-12 w-12 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <p className="text-sm font-medium">{props.address || "Map placeholder"}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

// ── BlogGrid ───────────────────────────────────────────────────
export const BlogGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.posts || []).map((post: any) => (
          <a key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {post.image ? <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">📝</span></div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{post.category}</span>
                {post.readTime && <span className="text-xs text-muted-foreground">{post.readTime}</span>}
              </div>
              <h3 className="mb-2 font-bold text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                {post.author && <><span>·</span><span>{post.author.name}</span></>}
              </div>
            </div>
          </a>
        ))}
      </div>
      {props.pagination && props.pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: props.pagination.totalPages }).map((_, i) => (
            <button key={i} className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all ${i + 1 === props.pagination.currentPage ? "bg-primary text-primary-foreground shadow-md" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  </section>
);

// ── FAQAccordion ───────────────────────────────────────────────
export const FAQAccordion = (props: any) => {
  const [openCat, setOpenCat] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        {(props.categories || []).map((cat: any, ci: number) => (
          <div key={ci} className="mb-4">
            <button onClick={() => setOpenCat(openCat === ci ? null : ci)} className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-6 py-5 text-left font-bold text-foreground shadow-sm transition-all hover:shadow-md">
              {cat.name}
              <span className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-300 ${openCat === ci ? "rotate-45" : ""}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </span>
            </button>
            {openCat === ci && (
              <div className="mt-3 space-y-2 pl-4">
                {(cat.faqs || []).map((faq: any, fi: number) => {
                  const key = `${ci}-${fi}`;
                  return (
                    <div key={fi} className="overflow-hidden rounded-xl border border-border">
                      <button onClick={() => setOpenFaq(openFaq === key ? null : key)} className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted/50">
                        {faq.question}
                        <span className={`ml-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-300 ${openFaq === key ? "rotate-45" : ""}`}>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFaq === key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        {props.contactLink && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {props.contactText || "Still have questions?"} <a href={props.contactLink} className="font-semibold text-primary hover:underline">Contact us</a>
          </p>
        )}
      </div>
    </section>
  );
};

// ── LegalContent ───────────────────────────────────────────────
export const LegalContent = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-3xl px-6">
      {props.lastUpdated && <p className="mb-6 text-sm text-muted-foreground">Last Updated: {props.lastUpdated}</p>}
      <div className="prose prose-sm max-w-none text-muted-foreground">
        {(props.content || "").split("\n").map((line: string, i: number) => {
          if (line.startsWith("# ")) return <h1 key={i} className="mt-10 mb-4 text-3xl font-extrabold text-foreground">{line.slice(2)}</h1>;
          if (line.startsWith("## ")) return <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">{line.slice(3)}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="mt-6 mb-2 text-lg font-semibold text-foreground">{line.slice(4)}</h3>;
          if (line.startsWith("- ")) return <li key={i} className="ml-4 text-sm leading-relaxed">{line.slice(2)}</li>;
          if (line.startsWith("**")) return <p key={i} className="mt-4 text-sm font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i} className="mb-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">$1</code>') }} />;
        })}
      </div>
    </div>
  </section>
);

// ── BlogPreview ────────────────────────────────────────────────
export const BlogPreview = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.posts || []).map((post: any) => (
          <a key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {post.image ? <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">📝</span></div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{post.category}</span>
              </div>
              <h3 className="mb-2 font-bold text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                {post.author && <><span>·</span><span>{post.author.name}</span></>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
