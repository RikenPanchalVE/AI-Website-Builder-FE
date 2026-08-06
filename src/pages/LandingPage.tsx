import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "@/store/slices/projectSlice";
import api from "@/api/axios";

interface EnquiryForm {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState<EnquiryForm>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof EnquiryForm]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof EnquiryForm, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.businessName.trim()) errs.businessName = "Business name is required";
    if (!form.businessType.trim()) errs.businessType = "Business type is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await api.post("/projects", form);
      dispatch(setCurrentProject(res.data));
      navigate("/start");
    } catch (err: any) {
      console.error("Failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const businessTypes = [
    "Technology / Software",
    "E-Commerce / Retail",
    "Healthcare / Medical",
    "Finance / Banking",
    "Education / E-Learning",
    "Restaurant / Food",
    "Real Estate",
    "Marketing / Agency",
    "Consulting / Professional",
    "Creative / Design",
    "Travel / Hospitality",
    "Fitness / Wellness",
    "Non-Profit",
    "Other",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground">AI Website Builder</h1>
          <span className="text-sm text-muted-foreground">Beta</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-3">
              Build Your Website
              <span className="text-primary"> with AI</span>
            </h2>
            <p className="text-muted-foreground">
              Tell us about your business. AI will build a professional website in minutes.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-6 space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.fullName ? "border-destructive" : "border-border"
                  }`}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.email ? "border-destructive" : "border-border"
                  }`}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Acme Corp"
                className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.businessName ? "border-destructive" : "border-border"
                  }`}
              />
              {errors.businessName && (
                <p className="text-xs text-destructive mt-1">{errors.businessName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Business Type *
              </label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.businessType ? "border-destructive" : "border-border"
                  } ${!form.businessType ? "text-muted-foreground" : ""}`}
              >
                <option value="">Select your business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p className="text-xs text-destructive mt-1">{errors.businessType}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Creating..." : "Start Building"}
            </button>
          </form>
        </div>
      </main>

      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          AI Website Builder MVP
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
