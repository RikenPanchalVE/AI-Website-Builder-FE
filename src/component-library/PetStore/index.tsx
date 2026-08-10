import React from "react";

interface PetCareTipsProps {
  title?: string;
  subtitle?: string;
  posts?: Array<{
    title: string;
    excerpt: string;
    image: string | null;
    slug: string;
    category: string;
  }>;
}

export const PetCareTips: React.FC<PetCareTipsProps> = ({
  title = "Pet Care Tips",
  subtitle = "Expert advice for happy, healthy pets",
  posts = [],
}) => {
  const [expandedIdx, setExpandedIdx] = React.useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--ctx)]">{title}</h2>
          {subtitle && <p className="mt-2 text-[var(--ctx2)]">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-[var(--bgc)] rounded-xl border border-[var(--bdr)] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            >
              <div className="h-44 bg-[var(--bgd)] flex items-center justify-center text-4xl">
                {post.category === "Dogs" && "🐕"}
                {post.category === "Cats" && "🐈"}
                {post.category === "Fish" && "🐠"}
                {post.category === "Birds" && "🐦"}
                {post.category === "Reptiles" && "🦎"}
                {!["Dogs", "Cats", "Fish", "Birds", "Reptiles"].includes(post.category) && "🐾"}
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--c1)]">
                  {post.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[var(--ctx)]">{post.title}</h3>
                <p className="mt-2 text-sm text-[var(--ctx2)] leading-relaxed">
                  {expandedIdx === i ? post.excerpt : `${post.excerpt.slice(0, 80)}...`}
                </p>
                <button className="mt-3 text-sm font-semibold text-[var(--c1)] hover:underline">
                  {expandedIdx === i ? "Show less" : "Read more →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface PetGroomingBookingProps {
  title?: string;
  subtitle?: string;
  services?: Array<{
    name: string;
    price: string;
    description: string;
    icon: string;
  }>;
}

export const PetGroomingBooking: React.FC<PetGroomingBookingProps> = ({
  title = "Pet Grooming & Boarding",
  subtitle = "Book professional grooming or boarding services",
  services = [],
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ petName: "", ownerName: "", phone: "", date: "", notes: "" });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected && form.petName && form.ownerName && form.phone && form.date) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 px-4 bg-[var(--bg)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[var(--ctx)]">Booking Confirmed!</h2>
          <p className="mt-2 text-[var(--ctx2)]">
            Your appointment for <strong>{selected}</strong> on <strong>{form.date}</strong> has been booked.
            We'll contact you shortly to confirm.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-[var(--c1)] text-[var(--ctx)] font-semibold rounded-lg"
            onClick={() => { setSubmitted(false); setSelected(null); setForm({ petName: "", ownerName: "", phone: "", date: "", notes: "" }); }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {services.map((s, i) => (
              <button
                key={i}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selected === s.name
                    ? "border-[var(--c1)] bg-[var(--c1)]10 shadow-md"
                    : "border-[var(--bdr)] bg-[var(--bgc)] hover:border-[var(--c1)]50"
                }`}
                onClick={() => setSelected(s.name)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-[var(--ctx)]">{s.name}</div>
                    <div className="text-sm text-[var(--ctx2)]">{s.description}</div>
                  </div>
                  <span className="text-lg font-bold text-[var(--c1)]">{s.price}</span>
                </div>
              </button>
            ))}
          </div>
          {selected && (
            <form onSubmit={handleSubmit} className="bg-[var(--bgc)] rounded-xl border border-[var(--bdr)] p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--ctx)]">Book: {selected}</h3>
              <input
                type="text"
                placeholder="Pet's name"
                value={form.petName}
                onChange={(e) => setForm({ ...form, petName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[var(--bdr)] bg-[var(--bg)] text-[var(--ctx)] inp"
                required
              />
              <input
                type="text"
                placeholder="Your name"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
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
                placeholder="Special requests (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[var(--bdr)] bg-[var(--bg)] text-[var(--ctx)] inp"
                rows={3}
              />
              <button
                type="submit"
                className="w-full py-3 bg-[var(--c1)] text-[var(--ctx)] font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Book Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
