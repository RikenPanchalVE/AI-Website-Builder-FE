interface Service { title: string; description: string; icon: string; name?: string; price?: string; }
interface ServicesProps { title: string; services: Service[]; }

/* Services2 - Grid with large icons and asymmetric layout */
const Services2 = ({ title, services }: ServicesProps) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">What We Do</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {title || "Services"}
        </h2>
      </div>
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 border border-border">
        {services.map((service, i) => (
          <div
            key={i}
            className={`group p-8 border-b sm:border-b-0 sm:border-r border-border last:border-r-0 bg-background transition-all duration-500 hover:bg-muted/50 ${i === 0 ? "lg:row-span-2" : ""}`}
            style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s both` }}
          >
            <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground mb-6 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-bold tracking-tight mb-3">{service.title || service.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            {service.price && (
              <p className="mt-4 text-[11px] font-bold tracking-[0.15em] uppercase text-primary">From {service.price}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services2;
