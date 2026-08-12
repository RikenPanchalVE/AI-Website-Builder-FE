interface Service {
  title: string;
  description: string;
  icon: string;
  name?: string;
  price?: string;
  image?: string | null;
}

interface ServicesProps {
  title: string;
  subtitle?: string;
  services: Service[];
}

export default function Services3({ title, subtitle, services }: ServicesProps) {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 pReveal">
            {subtitle || "What We Offer"}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight pReveal">
            {title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={i}
              className="group border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 pReveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {service.image ? (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted/30 flex items-center justify-center">
                  <span className="text-4xl">{service.icon === "star" ? "\u2B50" : service.icon === "zap" ? "\u26A1" : "\uD83D\uDCAB"}</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                {service.price && (
                  <p className="mt-4 text-sm font-medium text-primary">From {service.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
