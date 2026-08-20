interface Service { title: string; description: string; icon: string; name?: string; price?: string; }
interface ServicesProps { title: string; subtitle?: string; services: Service[]; }

/* Services1 - Large numbered index with hover reveal */
const Services1 = ({ title, services }: ServicesProps) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Services</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
            {title || "What We Do"}
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-0">
            {services.map((service, i) => (
              <div
                key={i}
                className="group border-t border-border py-8 lg:py-10 transition-all duration-500 hover:pl-6 cursor-pointer"
                style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s both` }}
              >
                <div className="flex items-start gap-6">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground mt-2 shrink-0 group-hover:text-foreground transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3 group-hover:pl-4 transition-all duration-500">
                      {service.title || service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg group-hover:pl-4 transition-all duration-500">
                      {service.description}
                    </p>
                    {service.price && (
                      <span className="inline-block mt-3 text-[11px] font-bold tracking-[0.15em] uppercase text-primary group-hover:pl-4 transition-all duration-500">
                        From {service.price}
                      </span>
                    )}
                  </div>
                  <svg className="h-5 w-5 text-muted-foreground/30 mt-2 shrink-0 group-hover:text-foreground group-hover:translate-x-2 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services1;
