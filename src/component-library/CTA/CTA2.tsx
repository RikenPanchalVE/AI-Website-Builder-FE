interface CTAProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

const CTA2 = ({ headline, subheadline, ctaText, ctaLink }: CTAProps) => (
  <section className="py-16 bg-muted">
    <div className="container mx-auto px-6 text-center max-w-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-3">{headline}</h2>
      <p className="text-muted-foreground mb-6">{subheadline}</p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
      >
        {ctaText}
      </a>
    </div>
  </section>
);

export default CTA2;
