import React from "react";

interface ServicePackagesProps {
  title?: string;
  subtitle?: string;
  services?: Array<{
    name: string;
    title?: string;
    price: string;
    description: string;
    icon: string;
  }>;
}

export const ServicePackages: React.FC<ServicePackagesProps> = ({
  title = "Our Services",
  subtitle = "Professional services tailored to your needs",
  services = [],
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ name: "", phone: "", date: "", notes: "" });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected && form.name && form.phone && form.date) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 px-4 bg-[var(--bg)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[var(--ctx)]">Request Submitted!</h2>
          <p className="mt-2 text-[var(--ctx2)]">
            Your <strong>{selected}</strong> appointment request for <strong>{form.date}</strong> has been received.
            We'll call you within 30 minutes to confirm.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-[var(--c1)] text-[var(--ctx)] font-semibold rounded-lg"
            onClick={() => { setSubmitted(false); setSelected(null); setForm({ name: "", phone: "", date: "", notes: "" }); }}
          >
            Book Another Service
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--ctx)]">{title}</h2>
          {subtitle && <p className="mt-2 text-[var(--ctx2)]">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                selected === s.name
                  ? "border-[var(--c1)] shadow-lg"
                  : "border-[var(--bdr)] hover:border-[var(--c1)]50 hover:shadow-md"
              } bg-[var(--bgc)]`}
              onClick={() => setSelected(s.name)}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-bold text-[var(--ctx)]">{s.title || s.name}</h3>
              <p className="mt-1 text-sm text-[var(--ctx2)] leading-relaxed">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-[var(--c1)]">{s.price}</span>
                <span className="text-xs text-[var(--ctx2)] uppercase tracking-wider font-semibold">
                  {selected === s.name ? "✓ Selected" : "Tap to select"}
                </span>
              </div>
            </div>
          ))}
        </div>
        {selected && (
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto bg-[var(--bgc)] rounded-xl border border-[var(--bdr)] p-6 space-y-4">
            <h3 className="text-lg font-bold text-[var(--ctx)]">Request: {selected}</h3>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[var(--bdr)] bg-[var(--bg)] text-[var(--ctx)] inp"
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[var(--bdr)] bg-[var(--bg)] text-[var(--ctx)] inp"
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[var(--bdr)] bg-[var(--bg)] text-[var(--ctx)] inp"
              required
            />
            <textarea
              placeholder="Describe your issue (optional)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[var(--bdr)] bg-[var(--bg)] text-[var(--ctx)] inp"
              rows={3}
            />
            <button
              type="submit"
              className="w-full py-3 bg-[var(--c1)] text-[var(--ctx)] font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Request Appointment
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

interface BeforeAfterGalleryProps {
  title?: string;
  subtitle?: string;
  items?: Array<{
    before: string | null;
    after: string | null;
    title: string;
    category: string;
  }>;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  title = "Before & After",
  subtitle = "See the difference we make",
  items = [],
}) => {
  const defaultItems = items.length > 0 ? items : [
    { before: null, after: null, title: "Kitchen Renovation", category: "Painting" },
    { before: null, after: null, title: "Lawn Transformation", category: "Landscaping" },
    { before: null, after: null, title: "Bathroom Remodel", category: "Plumbing" },
    { before: null, after: null, title: "Living Room Makeover", category: "Painting" },
    { before: null, after: null, title: "Garden Design", category: "Landscaping" },
    { before: null, after: null, title: "Deck Restoration", category: "Cleaning" },
  ];

  const [activeIdx, setActiveIdx] = React.useState(0);
  const [sliderPos, setSliderPos] = React.useState(50);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <section className="py-16 px-4 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--ctx)]">{title}</h2>
          {subtitle && <p className="mt-2 text-[var(--ctx2)]">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div
              ref={sliderRef}
              className="relative h-80 rounded-xl overflow-hidden cursor-ew-resize select-none"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 bg-[var(--bgd)] flex items-center justify-center">
                <span className="text-6xl opacity-30">Before</span>
              </div>
              <div
                className="absolute inset-0 bg-[var(--c1)] flex items-center justify-center overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <span className="text-6xl opacity-30 text-[var(--ctx)]">After</span>
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-sm font-bold">
                  ↔
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-white text-xs font-semibold rounded">
                Before
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 bg-[var(--c1)] text-[var(--ctx)] text-xs font-semibold rounded">
                After
              </div>
            </div>
            <p className="mt-3 text-center font-semibold text-[var(--ctx)]">{defaultItems[activeIdx].title}</p>
            <p className="text-center text-sm text-[var(--ctx2)]">{defaultItems[activeIdx].category}</p>
          </div>
          <div className="space-y-3">
            {defaultItems.map((item, i) => (
              <button
                key={i}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  activeIdx === i
                    ? "border-[var(--c1)] bg-[var(--c1)]10"
                    : "border-[var(--bdr)] bg-[var(--bgc)] hover:border-[var(--c1)]50"
                }`}
                onClick={() => setActiveIdx(i)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bgd)] flex items-center justify-center text-lg">
                    {item.category === "Painting" && "🎨"}
                    {item.category === "Landscaping" && "🌿"}
                    {item.category === "Plumbing" && "🔧"}
                    {item.category === "Cleaning" && "✨"}
                    {!["Painting", "Landscaping", "Plumbing", "Cleaning"].includes(item.category) && "🏠"}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-[var(--ctx)]">{item.title}</div>
                    <div className="text-xs text-[var(--ctx2)]">{item.category}</div>
                  </div>
                  {activeIdx === i && <span className="text-[var(--c1)] text-sm">●</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
