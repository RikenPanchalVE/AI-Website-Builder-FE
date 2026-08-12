interface Plan {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}
interface PricingProps {
  title: string;
  plans: Plan[];
}

/* Pricing2 — Side-by-side with featured highlight */
const Pricing2 = ({ title, plans }: PricingProps) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Plans</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {title || "Pricing"}
        </h2>
      </div>

      <div className="space-y-1">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`group grid gap-0 lg:grid-cols-12 items-center border border-border transition-all duration-500 ${
              plan.highlighted
                ? "bg-foreground text-background relative"
                : "bg-background hover:bg-muted/30"
            }`}
            style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}
          >
            <div className={`lg:col-span-4 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border ${plan.highlighted ? "border-background/10" : ""}`}>
              <p className={`text-[11px] font-medium tracking-[0.2em] uppercase mb-3 ${plan.highlighted ? "text-background/50" : "text-muted-foreground"}`}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-background/40" : "text-muted-foreground"}`}>/mo</span>
              </div>
            </div>

            <div className={`lg:col-span-6 p-8 lg:p-10 flex flex-wrap gap-x-6 gap-y-2 ${plan.highlighted ? "border-background/10" : "border-border"}`}>
              {plan.features.map((feature, j) => (
                <span key={j} className={`text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                  {feature}
                </span>
              ))}
            </div>

            <div className="lg:col-span-2 p-8 lg:p-10 flex lg:justify-end">
              <a
                href="#"
                className={`px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "border border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                Choose
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing2;
