interface ContactProps { title: string; email: string; phone: string; address: string; }

/* Contact2 — Centered with minimal form */
const Contact2 = ({ title, email, phone, address }: ContactProps) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32 text-center">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</p>
      <h2 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-6" style={{ letterSpacing: "-0.05em" }}>
        {title || "Get in Touch"}
      </h2>
      <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-16">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

      <div className="grid gap-0 sm:grid-cols-3 border border-border mb-16 text-left">
        <div className="p-8 border-b sm:border-b-0 sm:border-r border-border">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Email</p>
          <a href={`mailto:${email}`} className="text-sm font-medium hover:text-primary transition-colors">{email}</a>
        </div>
        <div className="p-8 border-b sm:border-b-0 sm:border-r border-border">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Phone</p>
          <a href={`tel:${phone}`} className="text-sm font-medium hover:text-primary transition-colors">{phone}</a>
        </div>
        <div className="p-8">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Address</p>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>
      </div>

      <a
        href={`mailto:${email}`}
        className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.2em]"
      >
        Send us a Message
        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </section>
);

export default Contact2;
