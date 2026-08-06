import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Payment</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-lg">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Mock Payment
            </h2>
            <p className="text-sm text-muted-foreground">
              This is a simulated payment. No real charges will be made.
            </p>
          </div>

          <form onSubmit={handlePayment} className="space-y-4 rounded-xl border border-border bg-card p-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="12/28"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </form>

          <button
            onClick={() => navigate(`/pricing/${projectId}`)}
            className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted cursor-pointer"
          >
            Back to Pricing
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
