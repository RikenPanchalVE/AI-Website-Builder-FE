interface AboutProps { title: string; description: string; image?: string | null; }

const About1 = ({ title, description, image }: AboutProps) => (
  <section className="overflow-hidden bg-background py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid items-center gap-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">About Us</div>
          <h2 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl" style={{ letterSpacing: "-0.04em" }}>{title}</h2>
          <div className="mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">{description}</p>
          {/* Bare grid-cols-3 used to stay 3-across at every width - fine for
              these short stat values, but the gap didn't shrink with it, so
              phones got a cramped, edge-to-edge row. */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {[
              { value: "10K+", label: "Clients" },
              { value: "50+", label: "Projects" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-extrabold tracking-tight text-foreground">{stat.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7" style={{ animation: "pSlideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl" style={{ aspectRatio: "4/3" }}>
              {image ? (
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
                  <div className="text-9xl text-primary/10">&#9670;</div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-8 -left-8 rounded-2xl border border-border bg-card p-6 shadow-2xl" style={{ animation: "pReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" }}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Trusted Partner</p>
                  <p className="text-xs text-muted-foreground">Since 2015</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About1;
