import { useState } from "react";

interface FAQ { question: string; answer: string; }
interface FAQProps { title: string; faqs: FAQ[]; }

/* FAQ1 — Numbered typography-first accordions */
const FAQ1 = ({ title, faqs }: FAQProps) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32">
        <div className="mb-16">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">FAQ</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
            {title || "Questions"}
          </h2>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start gap-6 py-6 lg:py-8 text-left transition-all duration-300 hover:pl-4"
              >
                <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <span className="text-lg lg:text-xl font-bold tracking-tight">{faq.question}</span>
                </div>
                <svg
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 mt-1 ${open === i ? "rotate-45" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${open === i ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                <div className="pl-12 text-sm leading-relaxed text-muted-foreground max-w-2xl">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ1;
