import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!pricing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Failed to calculate pricing</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Pricing</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-lg flex-1 px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Your Website Price</h2>
            <p className="text-sm text-muted-foreground">
              Transparent, itemized pricing based on the pages, sections, and revisions in your project. No hidden fees.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-3">
              {pricing.breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">${item.amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">${pricing.total}</span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="button" onClick={handleContinue}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
