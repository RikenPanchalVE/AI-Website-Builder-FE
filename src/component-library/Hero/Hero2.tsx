interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

/* Hero2 — Split editorial hero with large image */
const Hero2 = ({ headline, subheadline, ctaText, ctaLink, backgroundImage }: HeroProps) => (
  <section className="relative bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 min-h-[70vh] items-center">
        <div className="lg:col-span-6">
          <span
            className="inline-block text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6"
            style={{ animation: "pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}
          >
            {subheadline ? subheadline.substring(0, 60) : "Featured"}
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-8"
            style={{ letterSpacing: "-0.05em", animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}
          >
            {headline}
          </h1>

          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10"
            style={{ animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}
          >
            {subheadline}
          </p>

          <div
            className="flex flex-wrap items-center gap-4"
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
          </div>

          <div className="mt-16 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[0,1,2,3].map((i) => (
                <div key={i} className="h-10 w-10 border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">Trusted by 1,000+</p>
              <p className="text-[11px] text-muted-foreground">happy clients</p>
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-6 relative"
          style={{ animation: "pScaleIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            {backgroundImage ? (
              <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-secondary/10">
                <span className="text-8xl text-primary/10">&#9670;</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 bg-background border border-border p-5 max-w-[200px]">
            <div className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">Since</div>
            <div className="text-2xl font-bold tracking-tight">2020</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero2;
