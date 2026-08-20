import { useState } from "react";

interface ContactProps {
  title: string;
  email: string;
  phone: string;
  address: string;
  intro?: string;
  submitButtonText?: string;
  // Submitting used to just be a mailto: link with no real form - now it
  // actually posts to /api/contact, the same fixed path a
  // downloaded/exported site's own standalone server implements (see
  // downloadService.ts). projectId travels in the body (not the URL) for
  // that reason and is simply ignored by the downloaded server's flat-file
  // store.
  projectId?: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

/* Contact2 - Centered with minimal form */
const Contact2 = ({ title, email, phone, address, intro, submitButtonText, projectId }: ContactProps) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32 text-center">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</p>
        <h2 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-6" style={{ letterSpacing: "-0.05em" }}>
          {title || "Get in Touch"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-16">{intro || "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}</p>

        <div className="grid gap-0 sm:grid-cols-3 border border-border mb-16 text-left">
          <div className="p-8 border-b sm:border-b-0 sm:border-r border-border">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Email</p>
            <a href={`mailto:${email}`} className="text-sm font-medium hover:text-primary transition-colors">{email}</a>
          </div>
          <div className="p-8 border-b sm:border-b-0 sm:border-r border-border">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Phone</p>
            <a href={`tel:${phone}`} className="text-sm font-medium hover:text-primary transition-colors">{phone}</a>
          </div>
          <div className="p-8">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Address</p>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>

        {status === "sent" ? (
          <div className="mx-auto max-w-md border border-border bg-background p-8">
            <p className="text-sm font-medium text-foreground">Thanks for reaching out - we'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-0 border border-border bg-background text-left">
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
                className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.2em] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : submitButtonText || "Send us a Message"}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              {status === "error" && (
                <p className="mt-3 text-xs text-red-500">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact2;
