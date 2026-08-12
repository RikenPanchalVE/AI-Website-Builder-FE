interface ContactProps { title: string; email: string; phone: string; address: string; }

/* Contact1 — Dramatic split layout */
const Contact1 = ({ title, email, phone, address }: ContactProps) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-8" style={{ letterSpacing: "-0.04em" }}>
            {title || "Let's Talk"}
          </h2>

          <div className="space-y-0 border border-border mt-12">
            <div className="p-6 border-b border-border">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Email</p>
              <a href={`mailto:${email}`} className="text-sm font-medium hover:text-primary transition-colors">{email}</a>
            </div>
            <div className="p-6 border-b border-border">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Phone</p>
              <a href={`tel:${phone}`} className="text-sm font-medium hover:text-primary transition-colors">{phone}</a>
            </div>
            <div className="p-6">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Address</p>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="bg-muted/30 p-8 lg:p-12 border border-border">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Message</p>
            <form className="space-y-0 border border-border bg-background" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-border">
                <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Name</label>
                <input type="text" className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none" placeholder="Your name" />
              </div>
              <div className="border-b border-border">
                <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Email</label>
                <input type="email" className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none" placeholder="your@email.com" />
              </div>
              <div className="border-b border-border">
                <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Subject</label>
                <select className="w-full bg-transparent px-6 pb-6 text-sm text-foreground focus:outline-none appearance-none">
                  <option value="">Select...</option>
                  <option>General Inquiry</option>
                  <option>Project Quote</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Message</label>
                <textarea className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none resize-none" rows={4} placeholder="Tell us about your project..." />
              </div>
              <div className="p-6">
                <button type="submit" className="bg-foreground text-background px-10 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-all">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact1;
