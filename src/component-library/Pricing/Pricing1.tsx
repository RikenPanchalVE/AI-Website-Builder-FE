interface Plan {
  name: string;
  price: string;
  features: string[];
  highlighted: boolean;
}

interface PricingProps {
  title: string;
  plans: Plan[];
}

const Pricing1 = ({ title, plans }: PricingProps) => (
  <section className="py-16 bg-background" id="pricing">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`p-8 rounded-xl border ${
              plan.highlighted
                ? "border-primary bg-primary/5 shadow-lg scale-105"
                : "border-border bg-card"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-foreground mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing1;
