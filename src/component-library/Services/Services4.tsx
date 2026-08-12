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

export default function Services4({ title, subtitle, services }: ServicesProps) {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 pReveal">
            {subtitle || "Our Process"}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight pReveal">
            {title}
          </h2>
        </div>

        <div className="space-y-16">
          {services.map((service, i) => (
            <div
              key={i}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-primary/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-0 lg:ml-20">
                  {service.description}
                </p>
              </div>
              <div className="flex-1">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                    <span className="text-6xl opacity-30">
                      {service.icon === "star" ? "\u2B50" : service.icon === "zap" ? "\u26A1" : "\uD83D\uDCAB"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
