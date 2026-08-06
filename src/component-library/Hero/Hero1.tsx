interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

const Hero1 = ({ headline, subheadline, ctaText, ctaLink, backgroundImage }: HeroProps) => (
  <section
    className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10"
    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
  >
    <div className="absolute inset-0 bg-background/80" />
    <div className="relative container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
        {headline}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        {subheadline}
      </p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        {ctaText}
      </a>
    </div>
  </section>
);

export default Hero1;
