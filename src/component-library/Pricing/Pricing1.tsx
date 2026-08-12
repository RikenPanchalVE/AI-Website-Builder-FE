interface Plan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}
interface PricingProps {
  title: string;
  subtitle?: string;
  plans: Plan[];
}

/* Pricing1 — Premium comparison table */
const Pricing1 = ({ title, plans }: PricingProps) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Pricing</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {title || "Choose Your Plan"}
        </h2>
      </div>

      <div className="grid gap-0 lg:grid-cols-3 border border-border">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border last:border-r-0 transition-all duration-500 ${
              (plan.popular || plan.highlighted) ? "bg-foreground text-background" : "bg-background hover:bg-muted/30"
            }`}
            style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}
          >
            {(plan.popular || plan.highlighted) && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-background" />
            )}
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase mb-6 opacity-50">
              {plan.name}
            </p>
            <div className="mb-8">
              <span className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm opacity-50 ml-1">/{plan.period}</span>
              )}
            </div>
            {plan.description && (
              <p className="text-sm opacity-60 leading-relaxed mb-8">{plan.description}</p>
            )}
            <div className="space-y-3 mb-10">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3 text-sm">
                  <svg className={`h-4 w-4 mt-0.5 shrink-0 ${(plan.popular || plan.highlighted) ? "text-background" : "text-foreground"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="opacity-80">{feature}</span>
                </div>
              ))}
            </div>
            <a
              href={plan.ctaLink || "#"}
              className={`block w-full text-center py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 ${
                (plan.popular || plan.highlighted)
                  ? "bg-background text-foreground hover:bg-background/90"
                  : "border border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {plan.ctaText || "Get Started"}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing1;
