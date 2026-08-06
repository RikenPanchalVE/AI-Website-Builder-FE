interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  faqs: FAQ[];
}

const FAQ2 = ({ title, faqs }: FAQProps) => (
  <section className="py-16 bg-card" id="faq">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="p-4 rounded-lg bg-background border border-border">
            <h3 className="font-semibold mb-1">{faq.question}</h3>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ2;
