import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await api.post(`/projects/${projectId}/payment/process`);
      setSuccess(true);
    } catch (err) {
      console.error("Payment failed:", err);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(`/publish/${projectId}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, projectId, navigate]);

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground">Redirecting to publish...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Payment</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-lg flex-1 px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Mock Payment</h2>
            <p className="text-sm text-muted-foreground">
              This is a simulated payment for the MVP - no real charges will be made, and no card data is sent anywhere.
            </p>
          </div>

          <form onSubmit={handlePayment} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <rect x="2" y="5" width="20" height="14" rx="2" /><path strokeLinecap="round" d="M2 10h20" />
              </svg>
              Test mode - any values work, nothing is charged.
            </div>

            <div>
              <Label htmlFor="cardNumber" className="mb-1.5">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="mb-1.5">Expiry</Label>
                <Input
                  id="expiry"
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="12/28"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="mb-1.5">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                />
              </div>
            </div>

            <Button type="submit" disabled={processing} className="w-full" size="lg">
              {processing ? "Processing..." : "Pay Now"}
            </Button>
          </form>

          <Button type="button" variant="outline" onClick={() => navigate(`/pricing/${projectId}`)}>
            Back to Pricing
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
