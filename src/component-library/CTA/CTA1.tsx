interface CTAProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

const CTA1 = ({ headline, subheadline, ctaText, ctaLink }: CTAProps) => (
  <section className="py-16 bg-primary">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-primary-foreground mb-4">{headline}</h2>
      <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">{subheadline}</p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-background text-foreground font-medium hover:opacity-90 transition-opacity"
      >
        {ctaText}
      </a>
    </div>
  </section>
);

export default CTA1;
