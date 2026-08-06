import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  faqs: FAQ[];
}

const FAQ1 = ({ title, faqs }: FAQProps) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 bg-background" id="faq">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between text-foreground font-medium cursor-pointer hover:bg-muted/50"
              >
                {faq.question}
                <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ1;
