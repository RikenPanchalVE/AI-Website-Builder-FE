interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

/* Hero3 — Centered statement hero with stats */
const Hero3 = ({ headline, subheadline, ctaText, ctaLink, backgroundImage }: HeroProps) => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    {backgroundImage && (
      <div className="absolute inset-0 opacity-[0.03]">
        <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
      </div>
    )}
    {!backgroundImage && (
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-secondary/5" />
    )}

    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40 text-center">
      <span
        className="inline-block text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8"
        style={{ animation: "pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}
      >
        {subheadline ? subheadline.substring(0, 50) : "Discover"}
      </span>

      <h1
        className="text-5xl sm:text-7xl lg:text-[7rem] font-bold tracking-tight leading-[0.88] mb-8 max-w-6xl mx-auto"
        style={{ letterSpacing: "-0.05em", animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}
      >
        {headline}
      </h1>

      <p
        className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12"
        style={{ animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}
      >
        {subheadline}
      </p>

      <div
        className="flex flex-wrap items-center justify-center gap-4"
        style={{ animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both" }}
      >
        <a
          href={ctaLink}
          className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.2em]"
        >
          {ctaText}
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a
          href="#about"
          className="inline-flex items-center gap-2 border border-border px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground transition-all duration-500 hover:border-foreground hover:text-foreground"
        >
          Learn More
        </a>
      </div>

      <div
        className="mt-24 grid grid-cols-3 gap-0 max-w-3xl mx-auto border-t border-border"
        style={{ animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both" }}
      >
        {[
          { value: "500+", label: "Projects" },
          { value: "98%", label: "Satisfaction" },
          { value: "24/7", label: "Support" },
        ].map((stat, i) => (
          <div key={i} className="py-8 text-center border-r border-border last:border-r-0">
            <div className="text-3xl lg:text-4xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
              {stat.value}
            </div>
            <div className="mt-2 text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero3;
