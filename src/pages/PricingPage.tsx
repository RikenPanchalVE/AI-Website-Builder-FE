import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";

interface BreakdownItem {
  label: string;
  amount: number;
}

interface Pricing {
  basePrice: number;
  pageCharge: number;
  featureCharge: number;
  premiumComponentCharge: number;
  revisionCharge: number;
  total: number;
  breakdown: BreakdownItem[];
}

const PricingPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculatePricing();
  }, [projectId]);

  const calculatePricing = async () => {
    try {
      const res = await api.post(`/projects/${projectId}/pricing/calculate`);
      setPricing(res.data);
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate(`/payment/${projectId}`);
  };

  const handleBack = () => {
    navigate(`/preview/${projectId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Failed to calculate pricing</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Pricing</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-lg">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your Website Price
            </h2>
            <p className="text-sm text-muted-foreground">
              Complete pricing breakdown based on your choices.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            {pricing.breakdown.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground font-medium">
                  ${item.amount}
                </span>
              </div>
            ))}

            <div className="border-t border-border pt-4 flex justify-between">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${pricing.total}
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
