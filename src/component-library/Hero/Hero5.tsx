interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

export default function Hero5({ headline, subheadline, ctaText, ctaLink, backgroundImage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {backgroundImage && (
        <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
      )}
      <div className="text-center px-6 max-w-3xl mx-auto relative z-10">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-8 pReveal">
          {subheadline}
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] tracking-tight mb-12 pReveal">
          {headline}
        </h1>
        <a
          href={ctaLink}
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all pReveal"
        >
          {ctaText}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
