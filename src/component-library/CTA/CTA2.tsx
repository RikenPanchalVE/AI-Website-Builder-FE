interface CTAProps { headline: string; subheadline: string; ctaText: string; ctaLink: string; }

/* CTA2 - Bordered statement with icon */
const CTA2 = ({ headline, subheadline, ctaText, ctaLink }: CTAProps) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="border border-border p-12 lg:p-20 text-center relative">
        <div className="mb-8">
          <svg className="h-8 w-8 text-muted-foreground mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2
          className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto"
          style={{ letterSpacing: "-0.04em" }}
        >
          {headline}
        </h2>
        {subheadline && (
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">{subheadline}</p>
        )}
        {ctaText && (
          <a
            href={ctaLink}
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.2em]"
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

export default CTA2;
