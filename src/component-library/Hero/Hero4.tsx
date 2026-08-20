interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

export default function Hero4({ headline, subheadline, ctaText, ctaLink, backgroundImage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
      {backgroundImage ? (
        <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
      ) : (
        // Every color here used to be a hardcoded gray-900/black/white -
        // this section never responded to the site's theme (global or
        // per-section) at all when no image was uploaded, since it read
        // literal Tailwind palette shades instead of the theme's own
        // foreground/primary. Mirrors Hero1's proven bg-foreground section
        // + primary-tinted gradient pattern.
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-primary/25" />
      )}
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-background/60 mb-6 pReveal">
          Welcome
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-background leading-[0.95] tracking-tight mb-6 pReveal">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-background/70 max-w-2xl mx-auto mb-10 pReveal">
          {subheadline}
        </p>
        <a
          href={ctaLink}
          className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-background/90 transition-all pReveal"
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
