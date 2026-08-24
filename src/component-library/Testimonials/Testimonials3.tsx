interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating?: number;
  avatar?: string | null;
  company?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export default function Testimonials3({
  title = "What Our Clients Say",
  subtitle = "Trusted by leading companies",
  testimonials = [],
}: TestimonialsProps) {
  const companies = [...new Set(testimonials.map((t) => t.company || t.role.split(", ").pop() || "Company"))];

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 pReveal">
            {subtitle}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight pReveal">
            {title}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {testimonials.slice(0, 2).map((t, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-8 bg-background hover:shadow-lg transition-all duration-500 pReveal"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-foreground leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-foreground">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-12 pReveal">
          <p className="text-center text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Trusted by
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {companies.slice(0, 6).map((company, i) => (
              <div key={i} className="text-lg font-bold text-muted-foreground/30 tracking-wider uppercase">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
