interface Testimonial { name: string; role: string; content: string; avatar?: string | null; }
interface TestimonialsProps { title: string; testimonials: Testimonial[]; }

/* Testimonials2 — Vertical stack with large quotes */
const Testimonials2 = ({ title, testimonials }: TestimonialsProps) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Reviews</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {title || "What Clients Say"}
        </h2>
      </div>

      <div className="space-y-0">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group border-t border-border py-10 transition-all duration-500 hover:pl-6"
            style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}
          >
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-9">
                <p className="text-xl lg:text-3xl font-bold tracking-tight leading-tight" style={{ letterSpacing: "-0.03em" }}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div className="lg:col-span-3 lg:text-right">
                <div className="flex items-center gap-3 lg:justify-end">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 object-cover" />
                  ) : (
                    <div className="h-10 w-10 bg-foreground text-background flex items-center justify-center text-xs font-bold">
                      {t.name?.charAt(0)}
                    </div>
                  )}
                  <div className="lg:text-right">
                    <p className="text-sm font-bold tracking-tight">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials2;
