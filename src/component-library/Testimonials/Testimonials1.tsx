interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string | null;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

const Testimonials1 = ({ title, testimonials }: TestimonialsProps) => (
  <section className="py-16 bg-background" id="testimonials">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card">
            <p className="text-muted-foreground mb-4 italic">"{t.content}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials1;
