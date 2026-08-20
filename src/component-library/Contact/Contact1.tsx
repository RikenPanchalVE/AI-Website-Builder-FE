import { useState } from "react";

interface ContactProps {
  title: string;
  email: string;
  phone: string;
  address: string;
  // The form heading and submit button text were hardcoded - no way to
  // change "Message"/"Send Message" to anything else.
  intro?: string;
  submitButtonText?: string;
  // Submitting used to just call e.preventDefault() and discard the input -
  // now it actually posts to /api/contact, the same fixed path a
  // downloaded/exported site's own standalone server implements (see
  // downloadService.ts), so this works identically in both contexts.
  // projectId travels in the body (not the URL) for that reason and is
  // simply ignored by the downloaded server's flat-file store.
  projectId?: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

/* Contact1 - Dramatic split layout */
const Contact1 = ({ title, email, phone, address, intro, submitButtonText, projectId }: ContactProps) => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || !form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, ...form }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</p>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-8" style={{ letterSpacing: "-0.04em" }}>
              {title || "Let's Talk"}
            </h2>
            {intro && <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{intro}</p>}

            <div className="space-y-0 border border-border mt-12">
              <div className="p-6 border-b border-border">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Email</p>
                <a href={`mailto:${email}`} className="text-sm font-medium hover:text-primary transition-colors">{email}</a>
              </div>
              <div className="p-6 border-b border-border">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Phone</p>
                <a href={`tel:${phone}`} className="text-sm font-medium hover:text-primary transition-colors">{phone}</a>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Address</p>
                <p className="text-sm text-muted-foreground">{address}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="bg-muted/30 p-8 lg:p-12 border border-border">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Message</p>
              {status === "sent" ? (
                <div className="border border-border bg-background p-8 text-center">
                  <p className="text-sm font-medium text-foreground">Thanks for reaching out - we'll get back to you soon.</p>
                </div>
              ) : (
                <form className="space-y-0 border border-border bg-background" onSubmit={handleSubmit}>
                  <div className="border-b border-border">
                    <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="border-b border-border">
                    <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="border-b border-border">
                    <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-transparent px-6 pb-6 text-sm text-foreground focus:outline-none appearance-none"
                    >
                      <option value="">Select...</option>
                      <option>General Inquiry</option>
                      <option>Project Quote</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block px-6 py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent px-6 pb-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none resize-none"
                      rows={4}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <div className="p-6">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-foreground text-background px-10 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-all disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending..." : submitButtonText || "Send Message"}
                    </button>
                    {status === "error" && (
                      <p className="mt-3 text-xs text-red-500">Something went wrong. Please try again.</p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;
