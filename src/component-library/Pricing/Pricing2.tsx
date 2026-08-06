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

const Pricing2 = ({ title, plans }: PricingProps) => (
  <section className="py-16 bg-card" id="pricing">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`flex-1 p-6 rounded-xl border ${plan.highlighted ? "border-primary bg-primary/5" : "border-border"}`}>
            <h3 className="font-semibold mb-1">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f, j) => (
                <li key={j} className="text-sm text-muted-foreground">• {f}</li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-lg text-sm font-medium cursor-pointer ${plan.highlighted ? "bg-primary text-primary-foreground" : "border border-border"}`}>
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing2;
