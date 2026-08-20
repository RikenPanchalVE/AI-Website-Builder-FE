interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

/* Hero1 - Full-bleed dark cinematic hero */
const Hero1 = ({ headline, subheadline, ctaText, ctaLink, backgroundImage }: HeroProps) => (
  <section className="relative min-h-screen flex items-end bg-foreground overflow-hidden">
    {backgroundImage && (
      <div className="absolute inset-0">
        <img src={backgroundImage} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-transparent" />
      </div>
    )}
    {!backgroundImage && (
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-primary/20" />
    )}

    <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-12 pb-16 lg:pb-24">
      <div className="mb-8">
        <span className="inline-block text-[11px] font-medium tracking-[0.2em] uppercase text-background/40 mb-6">
          {subheadline ? subheadline.substring(0, 50) : "Welcome"}
        </span>
      </div>

      <h1
        className="text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-bold tracking-tight leading-[0.88] text-background mb-8 max-w-5xl"
        style={{ letterSpacing: "-0.05em", animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}
      >
        {headline}
      </h1>

      <div className="flex flex-col sm:flex-row items-start gap-6 mt-12" style={{ animation: "pReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
        <a
          href={ctaLink}
          className="group inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.2em]"
        >
          {ctaText}
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default Hero1;
