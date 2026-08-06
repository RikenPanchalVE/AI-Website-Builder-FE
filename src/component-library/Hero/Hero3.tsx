interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

const Hero3 = ({ headline, subheadline, ctaText, ctaLink }: HeroProps) => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4 tracking-tight">
        {headline}
      </h1>
      <p className="text-muted-foreground mb-8">{subheadline}</p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
      >
        {ctaText}
      </a>
    </div>
  </section>
);

export default Hero3;
