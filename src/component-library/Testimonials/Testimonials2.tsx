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

const Testimonials2 = ({ title, testimonials }: TestimonialsProps) => (
  <section className="py-16 bg-card" id="testimonials">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-[300px] p-6 rounded-xl bg-background border border-border">
            <p className="text-sm text-muted-foreground mb-4">"{t.content}"</p>
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials2;
