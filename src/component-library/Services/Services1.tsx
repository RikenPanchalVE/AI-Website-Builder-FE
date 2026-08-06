interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  title: string;
  services: Service[];
}

const iconMap: Record<string, string> = {
  palette: "🎨",
  code: "💻",
  target: "🎯",
  chart: "📊",
  shield: "🛡️",
  rocket: "🚀",
};

const Services1 = ({ title, services }: ServicesProps) => (
  <section className="py-16 bg-background" id="services">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border bg-card text-card-foreground hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-4">
              {iconMap[service.icon] || "✨"}
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services1;
