interface AboutProps { title: string; description: string; image?: string | null; }

const About2 = ({ title, description, image }: AboutProps) => (
  <section className="overflow-hidden bg-muted/30 py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid items-center gap-20 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1" style={{ animation: "pSlideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}>
          <div className="relative">
            {image && (
              <div className="overflow-hidden rounded-3xl shadow-2xl" style={{ aspectRatio: "3/4" }}>
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            )}
            <div className="absolute -right-6 -top-6 rounded-3xl bg-card p-6 shadow-xl border border-border" style={{ animation: "pReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" }}>
              <div className="text-4xl font-extrabold tracking-tight text-foreground">10+</div>
              <div className="text-sm font-medium text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">Our Story</div>
          <h2 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl" style={{ letterSpacing: "-0.04em" }}>{title}</h2>
          <div className="mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{description}</p>
          {/* Used to be a bare grid-cols-2 — always 2-up, even on the
              narrowest phones, squeezing "Client Focused / Your success is
              our mission" into a ~140px column. Stacks to 1 column below sm. */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Quality First", desc: "Excellence in every detail" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Client Focused", desc: "Your success is our mission" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <div>
                  <p className="font-bold text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About2;
