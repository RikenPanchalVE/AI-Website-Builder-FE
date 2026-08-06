interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string | null;
  logo?: string | null;
}

const Hero2 = ({ headline, subheadline, ctaText, ctaLink }: HeroProps) => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        {headline}
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
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

export default Hero2;
