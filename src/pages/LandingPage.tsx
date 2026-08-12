import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "@/store/slices/projectSlice";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EnquiryForm {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
}

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
    title: "Generated in minutes",
    description: "Answer a few questions and get a complete, real website - not a template with placeholders.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "No account needed",
    description: "Start right now — no login, no password, no forms to remember.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Preview before you pay",
    description: "Review the finished site, request changes, and only pay once you approve it.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState<EnquiryForm>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Business type is chosen in the questionnaire's first step, not here —
      // asking for it twice was redundant.
      const res = await api.post("/projects", form);
      dispatch(setCurrentProject(res.data));
      navigate("/start");
    } catch (err: any) {
      console.error("Failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-black text-primary-foreground shadow-sm">
              W
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">AI Website Builder</span>
          </div>
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">Beta</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12 lg:py-16">
        <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              No login required
            </span>
            <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
              Build your website
              <span className="text-primary"> with AI</span>
            </h2>
            <p className="mb-8 max-w-md text-muted-foreground">
              Tell us about your business and we'll generate a complete, professional website — ready to
              preview, revise, and publish in one sitting.
            </p>

            <div className="space-y-5">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="h-4.5 w-4.5 [&>svg]:h-[18px] [&>svg]:w-[18px]">{f.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{f.title}</div>
                    <div className="text-sm text-muted-foreground">{f.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-7"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground">Let's get started</h3>
              <p className="mt-1 text-sm text-muted-foreground">Takes less than a minute.</p>
            </div>

            <div>
              <Label htmlFor="fullName" className="mb-1.5">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="mb-1.5">Email Address *</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone" className="mb-1.5">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="businessName" className="mb-1.5">Business Name *</Label>
              <Input
                id="businessName"
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Acme Corp"
                aria-invalid={!!errors.businessName}
              />
              {errors.businessName && <p className="mt-1 text-xs text-destructive">{errors.businessName}</p>}
            </div>

            <Button type="submit" disabled={submitting} className="w-full" size="lg">
              {submitting ? "Creating..." : "Start Building"}
            </Button>
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
