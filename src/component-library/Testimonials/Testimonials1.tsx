interface Testimonial { name: string; role: string; content: string; rating?: number; avatar?: string | null; }
interface TestimonialsProps { title: string; subtitle?: string; testimonials: Testimonial[]; }

/* Testimonials1 — Large quote wall with varied sizes */
const Testimonials1 = ({ title, testimonials }: TestimonialsProps) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Testimonials</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {title || "Client Reviews"}
        </h2>
      </div>

      <div className="grid gap-1 lg:grid-cols-12">
        {testimonials.map((t, i) => {
          const isLarge = i === 0;
          return (
            <div
              key={i}
              className={`group border border-border p-8 lg:p-10 transition-all duration-500 hover:bg-muted/30 ${
                isLarge ? "lg:col-span-8" : i === 1 ? "lg:col-span-4" : "lg:col-span-4"
              }`}
              style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}
            >
              <p className={`font-bold tracking-tight leading-tight mb-6 ${isLarge ? "text-2xl lg:text-3xl" : "text-lg"}`} style={{ letterSpacing: "-0.02em" }}>
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 object-cover" />
                ) : (
                  <div className="h-10 w-10 bg-foreground text-background flex items-center justify-center text-xs font-bold">
                    {t.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold tracking-tight">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
              {t.rating && (
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="h-3 w-3 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Testimonials1;
