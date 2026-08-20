interface CTAProps { headline: string; subheadline: string; ctaText: string; ctaLink: string; }

/* CTA1 - Full-width dark statement */
const CTA1 = ({ headline, subheadline, ctaText, ctaLink }: CTAProps) => (
  <section className="bg-foreground text-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-40">
      <div className="max-w-4xl">
        <h2
          className="text-4xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8"
          style={{ letterSpacing: "-0.05em" }}
        >
          {headline}
        </h2>
        {subheadline && (
          <p className="text-lg text-background/60 leading-relaxed max-w-xl mb-10">{subheadline}</p>
        )}
        {ctaText && (
          <a
            href={ctaLink}
            className="group inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.2em]"
          >
            {ctaText}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  </section>
);

export default CTA1;
