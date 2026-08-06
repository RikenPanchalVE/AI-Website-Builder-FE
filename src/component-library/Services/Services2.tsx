interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  title: string;
  services: Service[];
}

const Services2 = ({ title, services }: ServicesProps) => (
  <section className="py-16 bg-card" id="services">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service, i) => (
          <div key={i} className="flex gap-4 p-6 rounded-xl bg-background border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-lg">
              ✨
            </div>
            <div>
              <h3 className="font-semibold mb-1">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services2;
