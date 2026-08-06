import { useState } from "react";

// ── HeroEcommerce ──────────────────────────────────────────────
export const HeroEcommerce = (props: any) => (
  <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
    {props.backgroundImage && (
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${props.backgroundImage})` }} />
    )}
    <div className="absolute inset-0 bg-background/70" />
    <div className="relative container mx-auto px-6 py-20 text-center">
      {props.badge && <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold bg-primary text-primary-foreground rounded-full">{props.badge}</span>}
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">{props.headline}</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{props.subheadline}</p>
      <div className="flex gap-4 justify-center">
        <a href={props.ctaLink} className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">{props.ctaText}</a>
        {props.secondaryCtaText && <a href={props.secondaryCtaLink} className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border font-medium hover:bg-muted transition-colors">{props.secondaryCtaText}</a>}
      </div>
    </div>
  </section>
);

// ── FeaturedCategories ─────────────────────────────────────────
export const FeaturedCategories = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {(props.categories || []).map((cat: any, i: number) => (
          <a key={i} href={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden">
              {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <span className="text-4xl text-muted-foreground/40">📦</span>}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{cat.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cat.productCount} products</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ── BestSellers ────────────────────────────────────────────────
const ProductCardSmall = (props: any) => (
  <div className="group border border-border rounded-xl bg-card overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative">
      {props.image ? <img src={props.image} alt={props.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <span className="text-6xl text-muted-foreground/30">🛍️</span>}
      {props.badge && <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">{props.badge}</span>}
    </div>
    <div className="p-4">
      <h4 className="font-medium text-foreground text-sm truncate">{props.name}</h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-bold text-foreground">{props.price}</span>
        {props.originalPrice && <span className="text-sm text-muted-foreground line-through">{props.originalPrice}</span>}
      </div>
      {props.rating && <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">⭐ {props.rating.toFixed(1)} ({props.reviewCount})</div>}
    </div>
  </div>
);

export const BestSellers = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} />)}
      </div>
      {props.viewAllLink && <div className="text-center mt-10"><a href={props.viewAllLink} className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">View All</a></div>}
    </div>
  </section>
);

// ── NewArrivals ────────────────────────────────────────────────
export const NewArrivals = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── FlashSale ──────────────────────────────────────────────────
export const FlashSale = (props: any) => (
  <section className="py-16 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">🔥 {props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-4">{props.subtitle}</p>}
      {props.endDate && <p className="text-center text-sm text-muted-foreground mb-10">Ends {new Date(props.endDate).toLocaleDateString()}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} badge={p.discount || "Sale"} />)}
      </div>
    </div>
  </section>
);

// ── FeaturedProducts ───────────────────────────────────────────
export const FeaturedProducts = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── WhyChooseUs ────────────────────────────────────────────────
const iconMap: Record<string, string> = {
  truck: "🚚",
  shield: "🛡️",
  refresh: "🔄",
  headphones: "🎧",
  heart: "❤️",
  leaf: "🌿",
  users: "👥",
  lightbulb: "💡",
  "credit-card": "💳",
  "check-circle": "✅",
};

export const WhyChooseUs = (props: any) => (
  <section className="py-16 bg-muted/30">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {(props.features || []).map((f: any, i: number) => (
          <div key={i} className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">{iconMap[f.icon] || "✨"}</div>
            <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials ───────────────────────────────────────────────
export const Testimonials = (props: any) => (
  <section className="py-16 bg-background" id="testimonials">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {(props.testimonials || []).map((t: any, i: number) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card">
            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, j) => <span key={j} className={`text-sm ${j < (t.rating || 5) ? "text-yellow-500" : "text-muted-foreground/30"}`}>★</span>)}
            </div>
            <p className="text-muted-foreground mb-4 italic text-sm">"{t.content}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{t.name?.charAt(0)}</div>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── BrandShowcase ──────────────────────────────────────────────
export const BrandShowcase = (props: any) => (
  <section className="py-12 bg-background border-t border-border">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-2xl font-bold text-foreground text-center mb-8">{props.title}</h2>}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {(props.brands || []).map((b: any, i: number) => (
          <div key={i} className="flex items-center justify-center px-6 py-3 text-muted-foreground/60 font-semibold text-lg tracking-wide hover:text-foreground transition-colors">
            {b.logo ? <img src={b.logo} alt={b.name} className="h-8 object-contain" /> : b.name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── NewsletterSignup ───────────────────────────────────────────
export const NewsletterSignup = (props: any) => (
  <section className="py-16 bg-primary/5">
    <div className="container mx-auto px-6 max-w-2xl text-center">
      {props.title && <h2 className="text-3xl font-bold text-foreground mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground mb-6">{props.subtitle}</p>}
      {props.discount && <p className="text-sm font-medium text-primary mb-4">{props.discount}</p>}
      <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder={props.placeholder || "Enter your email"} className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <button type="submit" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap">{props.buttonText || "Subscribe"}</button>
      </form>
    </div>
  </section>
);

// ── InstagramFeed ──────────────────────────────────────────────
export const InstagramFeed = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6 text-center">
      {props.title && <h2 className="text-3xl font-bold text-foreground mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground mb-8">{props.subtitle}</p>}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {(props.images || []).map((img: string | null, i: number) => (
          <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
            {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="text-muted-foreground/30 text-2xl">📷</span>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQPreview ─────────────────────────────────────────────────
export const FAQPreview = (props: any) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 bg-background" id="faq">
      <div className="container mx-auto px-6 max-w-3xl">
        {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-10">{props.title}</h2>}
        <div className="space-y-3">
          {(props.faqs || []).map((faq: any, i: number) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-4 flex items-center justify-between text-foreground font-medium text-sm cursor-pointer hover:bg-muted/50">
                {faq.question}
                <svg className={`w-5 h-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {open === i && <div className="px-6 pb-4 text-sm text-muted-foreground">{faq.answer}</div>}
            </div>
          ))}
        </div>
        {props.link && <div className="text-center mt-8"><a href={props.link} className="text-primary font-medium text-sm hover:underline">{props.linkText || "View All FAQs"} →</a></div>}
      </div>
    </section>
  );
};

// ── ContactPreview ─────────────────────────────────────────────
export const ContactPreview = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      {props.title && <h2 className="text-3xl font-bold text-foreground mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground mb-8">{props.subtitle}</p>}
      <div className="grid md:grid-cols-3 gap-6">
        {props.email && <div className="p-6 rounded-xl border border-border bg-card"><div className="text-2xl mb-2">✉️</div><h3 className="font-medium text-foreground text-sm mb-1">Email</h3><p className="text-sm text-primary">{props.email}</p></div>}
        {props.phone && <div className="p-6 rounded-xl border border-border bg-card"><div className="text-2xl mb-2">📞</div><h3 className="font-medium text-foreground text-sm mb-1">Phone</h3><p className="text-sm text-primary">{props.phone}</p></div>}
        {props.address && <div className="p-6 rounded-xl border border-border bg-card"><div className="text-2xl mb-2">📍</div><h3 className="font-medium text-foreground text-sm mb-1">Address</h3><p className="text-sm text-muted-foreground">{props.address}</p></div>}
      </div>
    </div>
  </section>
);

// ── StoreLocator ───────────────────────────────────────────────
export const StoreLocator = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {(props.stores || []).map((store: any, i: number) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">{store.name}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 {store.address}</p>
              <p>📞 {store.phone}</p>
              <p>🕐 {store.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── ShopHero ───────────────────────────────────────────────────
export const ShopHero = (props: any) => (
  <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
    {props.backgroundImage && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${props.backgroundImage})` }} />}
    <div className="absolute inset-0 bg-background/70" />
    <div className="relative container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{props.title || "Shop"}</h1>
      {props.subtitle && <p className="text-lg text-muted-foreground max-w-xl mx-auto">{props.subtitle}</p>}
    </div>
  </section>
);

// ── ProductFilters ─────────────────────────────────────────────
export const ProductFilters = (props: any) => (
  <div className="bg-background border-b border-border py-6">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap gap-4 items-center">
        {(props.filters || []).map((filter: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">{filter.name}:</label>
            {filter.type === "select" && (
              <select className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background text-foreground">
                {(filter.options || []).map((opt: any, j: number) => <option key={j} value={opt.value}>{opt.label}</option>)}
              </select>
            )}
            {filter.type === "checkbox" && (
              <div className="flex gap-2">
                {(filter.options || []).slice(0, 4).map((opt: any, j: number) => (
                  <label key={j} className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" className="rounded" /> {opt.label} ({opt.count})
                  </label>
                ))}
              </div>
            )}
            {filter.type === "range" && <span className="text-sm text-muted-foreground">{filter.currency}0 – {filter.currency}{filter.max?.toFixed(0)}</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── ProductGrid ────────────────────────────────────────────────
export const ProductGrid = (props: any) => (
  <section className="py-10 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} />)}
      </div>
      {props.pagination && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: props.pagination.totalPages }).map((_, i) => (
            <button key={i} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${i + 1 === props.pagination.currentPage ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  </section>
);

// ── Breadcrumbs ────────────────────────────────────────────────
export const Breadcrumbs = (props: any) => (
  <nav className="py-4 bg-background border-b border-border">
    <div className="container mx-auto px-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        {(props.items || []).map((item: any, i: number) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {i < (props.items?.length || 0) - 1 ? <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a> : <span className="text-foreground font-medium">{item.label}</span>}
          </li>
        ))}
      </ol>
    </div>
  </nav>
);

// ── ProductDetails ─────────────────────────────────────────────
export const ProductDetails = (props: any) => {
  const product = props.product || {};
  const images = product.images || [null];
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <div className="aspect-square bg-muted rounded-xl flex items-center justify-center overflow-hidden">
              {images[0] ? <img src={images[0]} alt={product.name} className="w-full h-full object-cover" /> : <span className="text-8xl text-muted-foreground/30">🛍️</span>}
            </div>
            <div className="flex gap-2">
              {images.slice(0, 4).map((img: string | null, i: number) => (
                <div key={i} className="w-16 h-16 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary">
                  {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="text-muted-foreground/30 text-xs">📷</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-500 text-sm">{"★".repeat(Math.round(product.rating || 0))}</div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-foreground">{product.price}</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>}
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{product.fullDescription || product.description}</p>
            {product.colors && (
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Color</p>
                <div className="flex gap-2">
                  {product.colors.map((c: any, i: number) => <div key={i} className="w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: c.hex, borderColor: i === 0 ? "var(--primary)" : "transparent" }} title={c.name} />)}
                </div>
              </div>
            )}
            {product.sizes && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-2">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((s: string, i: number) => <button key={i} className={`px-3 py-1.5 text-sm rounded-lg border ${i === 2 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary"}`}>{s}</button>)}
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">Add to Cart</button>
              {props.hasWishlist && <button className="px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors">♡</button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── ProductReviews ─────────────────────────────────────────────
export const ProductReviews = (props: any) => {
  const summary = props.summary || {};
  return (
    <section className="py-10 bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>
        <div className="flex items-center gap-6 mb-8 p-6 rounded-xl bg-muted/50">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">{summary.average}</div>
            <div className="flex text-yellow-500 text-sm mt-1">{"★".repeat(Math.round(summary.average || 0))}</div>
            <div className="text-xs text-muted-foreground mt-1">{summary.total} reviews</div>
          </div>
          <div className="flex-1 space-y-1">
            {(summary.distribution || []).map((d: any) => (
              <div key={d.stars} className="flex items-center gap-2 text-sm">
                <span className="w-6 text-muted-foreground">{d.stars}★</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-yellow-500 rounded-full" style={{ width: `${d.percentage}%` }} /></div>
                <span className="w-10 text-xs text-muted-foreground text-right">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {(props.reviews || []).map((r: any) => (
            <div key={r.id} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{r.author?.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.author} {r.verified && <span className="text-xs text-primary">✓ Verified</span>}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex text-yellow-500 text-xs">{"★".repeat(r.rating)}</div>
              </div>
              {r.title && <p className="font-medium text-foreground text-sm mb-1">{r.title}</p>}
              <p className="text-sm text-muted-foreground">{r.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── RelatedProducts ────────────────────────────────────────────
export const RelatedProducts = (props: any) => (
  <section className="py-10 bg-background border-t border-border">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-2xl font-bold text-foreground text-center mb-8">{props.title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── RecentlyViewed ─────────────────────────────────────────────
export const RecentlyViewed = (props: any) => (
  <section className="py-10 bg-background border-t border-border">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-2xl font-bold text-foreground mb-6">{props.title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(props.products || []).map((p: any) => <ProductCardSmall key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── PageHero ───────────────────────────────────────────────────
export const PageHero = (props: any) => (
  <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
    {props.backgroundImage && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${props.backgroundImage})` }} />}
    <div className="absolute inset-0 bg-background/70" />
    <div className="relative container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{props.title}</h1>
      {props.subtitle && <p className="text-lg text-muted-foreground max-w-xl mx-auto">{props.subtitle}</p>}
    </div>
  </section>
);

// ── CategoryGrid ───────────────────────────────────────────────
export const CategoryGrid = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(props.categories || []).map((cat: any, i: number) => (
          <a key={i} href={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] bg-muted flex items-center justify-center overflow-hidden">
              {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <span className="text-5xl text-muted-foreground/30">📦</span>}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-foreground text-lg">{cat.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
              <p className="text-xs text-primary font-medium mt-2">{cat.productCount} products →</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ── AboutStory ─────────────────────────────────────────────────
export const AboutStory = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center overflow-hidden">
          {props.image ? <img src={props.image} alt="" className="w-full h-full object-cover" /> : <span className="text-7xl text-muted-foreground/30">📖</span>}
        </div>
        <div>
          {props.title && <h2 className="text-3xl font-bold text-foreground mb-4">{props.title}</h2>}
          <p className="text-muted-foreground leading-relaxed mb-6">{props.content}</p>
          {props.stats && (
            <div className="grid grid-cols-2 gap-4">
              {props.stats.map((s: any, i: number) => (
                <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

// ── AboutValues ────────────────────────────────────────────────
export const AboutValues = (props: any) => (
  <section className="py-16 bg-muted/30">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-10">{props.title}</h2>}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(props.values || []).map((v: any, i: number) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card text-center">
            <div className="text-3xl mb-3">{iconMap[v.icon] || "✨"}</div>
            <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── TeamSection ────────────────────────────────────────────────
export const TeamSection = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {props.title && <h2 className="text-3xl font-bold text-foreground text-center mb-2">{props.title}</h2>}
      {props.subtitle && <p className="text-muted-foreground text-center mb-10">{props.subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {(props.members || []).map((m: any, i: number) => (
          <div key={i} className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-3">{m.name?.split(" ").map((n: string) => n[0]).join("")}</div>
            <h3 className="font-semibold text-foreground text-sm">{m.name}</h3>
            <p className="text-xs text-primary mb-1">{m.role}</p>
            <p className="text-xs text-muted-foreground">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTABanner ──────────────────────────────────────────────────
export const CTABanner = (props: any) => (
  <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80">
    {props.backgroundImage && <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${props.backgroundImage})` }} />}
    <div className="relative container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{props.headline}</h2>
      {props.subheadline && <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">{props.subheadline}</p>}
      {props.ctaText && <a href={props.ctaLink} className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-primary font-medium hover:bg-white/90 transition-colors">{props.ctaText}</a>}
    </div>
  </section>
);

// ── ContactInfo ────────────────────────────────────────────────
export const ContactInfo = (props: any) => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {(props.methods || []).map((m: any, i: number) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card text-center">
            <div className="text-3xl mb-3">{iconMap[m.icon] || "📞"}</div>
            <h3 className="font-semibold text-foreground mb-1">{m.title}</h3>
            <p className="text-sm font-medium text-primary mb-1">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── ContactForm ────────────────────────────────────────────────
export const ContactForm = (props: any) => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6 max-w-2xl">
      {props.title && <h2 className="text-2xl font-bold text-foreground text-center mb-8">{props.title}</h2>}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {(props.fields || []).map((f: any, i: number) => (
          <div key={i} className={f.halfWidth ? "inline-block w-[calc(50%-0.5rem)] mr-4" : ""}>
            <label className="block text-sm font-medium text-foreground mb-1">{f.label} {f.required && <span className="text-red-500">*</span>}</label>
            {f.type === "textarea" ? <textarea className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" rows={4} /> :
             f.type === "select" ? <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"><option value="">Select...</option>{(f.options || []).map((o: string, j: number) => <option key={j}>{o}</option>)}</select> :
             <input type={f.type || "text"} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />}
          </div>
        ))}
        <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">{props.submitText || "Submit"}</button>
      </form>
    </div>
  </section>
);

// ── MapEmbed ───────────────────────────────────────────────────
export const MapEmbed = (props: any) => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="rounded-xl overflow-hidden border border-border bg-muted h-[300px] flex items-center justify-center">
        {props.lat && props.lng ? (
          <iframe src={`https://maps.google.com/maps?q=${props.lat},${props.lng}&z=15&output=embed`} className="w-full h-full border-0" loading="lazy" title="Map" />
        ) : (
          <div className="text-center text-muted-foreground"><p className="text-4xl mb-2">🗺️</p><p className="text-sm">{props.address || "Map placeholder"}</p></div>
        )}
      </div>
    </div>
  </section>
);

// ── BlogGrid ───────────────────────────────────────────────────
export const BlogGrid = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(props.posts || []).map((post: any) => (
          <a key={post.id} href={`/blog/${post.slug}`} className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/9] bg-muted flex items-center justify-center overflow-hidden">
              {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <span className="text-4xl text-muted-foreground/30">📝</span>}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <span>{post.date}</span>
                {post.author && <span>· {post.author.name}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
      {props.pagination && props.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: props.pagination.totalPages }).map((_, i) => (
            <button key={i} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${i + 1 === props.pagination.currentPage ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  </section>
);

// ── FAQAccordion ───────────────────────────────────────────────
export const FAQAccordion = (props: any) => {
  const [openCat, setOpenCat] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        {(props.categories || []).map((cat: any, ci: number) => (
          <div key={ci} className="mb-6">
            <button onClick={() => setOpenCat(openCat === ci ? null : ci)} className="w-full text-left px-6 py-4 rounded-lg border border-border bg-card flex items-center justify-between font-semibold text-foreground hover:bg-muted/50 transition-colors">
              {cat.name}
              <svg className={`w-5 h-5 text-muted-foreground transition-transform ${openCat === ci ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openCat === ci && (
              <div className="mt-2 space-y-2">
                {(cat.faqs || []).map((faq: any, fi: number) => {
                  const key = `${ci}-${fi}`;
                  return (
                    <div key={fi} className="border border-border rounded-lg overflow-hidden ml-4">
                      <button onClick={() => setOpenFaq(openFaq === key ? null : key)} className="w-full text-left px-5 py-3 flex items-center justify-between text-sm font-medium text-foreground hover:bg-muted/50 cursor-pointer">
                        {faq.question}
                        <svg className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === key ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {openFaq === key && <div className="px-5 pb-3 text-sm text-muted-foreground">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        {props.contactLink && <p className="text-center text-sm text-muted-foreground mt-8">{props.contactText || "Still have questions?"} <a href={props.contactLink} className="text-primary hover:underline">Contact us</a></p>}
      </div>
    </section>
  );
};

// ── OrderTracking ──────────────────────────────────────────────
export const OrderTracking = (props: any) => {
  const sample = props.sampleOrder;
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <form className="bg-card border border-border rounded-xl p-6 mb-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {(props.formFields || []).map((f: any, i: number) => (
              <div key={i}>
                <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            ))}
          </div>
          <button type="submit" className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">{props.submitText || "Track"}</button>
        </form>
        {sample && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order #{sample.orderNumber}</p>
                <p className="font-semibold text-foreground capitalize">Status: {sample.status}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Est. Delivery</p>
                <p className="font-medium text-foreground">{sample.estimatedDelivery}</p>
              </div>
            </div>
            {sample.carrier && <p className="text-sm text-muted-foreground mb-4">Carrier: {sample.carrier} · {sample.trackingNumber}</p>}
            <div className="space-y-3">
              {(sample.steps || []).map((step: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step.completed ? "bg-primary text-primary-foreground" : step.current ? "bg-primary/20 text-primary border-2 border-primary" : "bg-muted text-muted-foreground"}`}>
                    {step.completed && !step.current ? "✓" : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${step.completed || step.current ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ── WishlistGrid ───────────────────────────────────────────────
export const WishlistGrid = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      {(props.products || []).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {props.products.map((p: any) => (
            <div key={p.id} className="group border border-border rounded-xl bg-card overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-5xl text-muted-foreground/30">🛍️</span>}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-red-500 hover:bg-white text-sm">❤️</button>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-foreground text-sm truncate">{p.name}</h4>
                <p className="font-bold text-foreground mt-1">{p.price}</p>
                <button className="w-full mt-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">♡</p>
          <h3 className="text-xl font-semibold text-foreground mb-2">{props.emptyState?.title || "Wishlist is empty"}</h3>
          <p className="text-muted-foreground mb-6">{props.emptyState?.message || "Browse our collection and save items you love."}</p>
          <a href={props.emptyState?.ctaLink || "/shop"} className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">{props.emptyState?.ctaText || "Start Shopping"}</a>
        </div>
      )}
    </div>
  </section>
);

// ── CartItems ──────────────────────────────────────────────────
export const CartItems = (props: any) => (
  <section className="py-10 bg-background">
    <div className="container mx-auto px-6">
      {(props.items || []).length > 0 ? (
        <div className="space-y-4">
          {props.items.map((item: any) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-2xl text-muted-foreground/30">🛍️</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{item.color} / {item.size}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-muted text-sm">−</button>
                    <span className="text-sm font-medium text-foreground">{item.quantity}</span>
                    <button className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-muted text-sm">+</button>
                  </div>
                  <span className="font-bold text-foreground text-sm">{item.price}</span>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-red-500 text-sm self-start">✕</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🛒</p>
          <h3 className="text-xl font-semibold text-foreground mb-2">{props.emptyState?.title || "Cart is empty"}</h3>
          <p className="text-muted-foreground mb-6">{props.emptyState?.message || "Looks like you haven't added anything yet."}</p>
          <a href={props.emptyState?.ctaLink || "/shop"} className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">{props.emptyState?.ctaText || "Continue Shopping"}</a>
        </div>
      )}
    </div>
  </section>
);

// ── CartSummary ────────────────────────────────────────────────
export const CartSummary = (props: any) => (
  <section className="py-10 bg-background">
    <div className="container mx-auto px-6 max-w-md">
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium text-foreground">{props.subtotal}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-medium text-foreground">{props.shipping}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-medium text-foreground">{props.tax}</span></div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between"><span className="font-semibold text-foreground">Total</span><span className="font-bold text-foreground">{props.total}</span></div>
        </div>
        {props.couponCode && (
          <div className="flex gap-2 mt-4">
            <input type="text" placeholder={props.couponCode.placeholder} className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none" />
            <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">{props.couponCode.buttonText}</button>
          </div>
        )}
        {props.shippingOptions && props.shippingOptions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground mb-2">Shipping Method</p>
            {props.shippingOptions.map((opt: any, i: number) => (
              <label key={i} className="flex items-center gap-2 text-sm text-muted-foreground mb-1 cursor-pointer"><input type="radio" name="shipping" defaultChecked={i === 0} className="accent-primary" /> {opt.label}</label>
            ))}
          </div>
        )}
        <div className="mt-6 space-y-2">
          {props.checkoutLink && <a href={props.checkoutLink} className="block w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-center hover:opacity-90 transition-opacity">Proceed to Checkout</a>}
          {props.continueShoppingLink && <a href={props.continueShoppingLink} className="block w-full py-3 rounded-lg border border-border text-foreground font-medium text-center hover:bg-muted transition-colors">Continue Shopping</a>}
        </div>
      </div>
    </div>
  </section>
);

// ── CheckoutForm ───────────────────────────────────────────────
export const CheckoutForm = (props: any) => {
  const [step, setStep] = useState(0);
  const steps = props.steps || [];
  const summary = props.orderSummary;

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex justify-center gap-4 mb-10">
          {steps.map((s: any, i: number) => (
            <button key={s.id} onClick={() => setStep(i)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {i < step ? "✓" : <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">{i + 1}</span>}
              {s.label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {step === 0 && props.shippingForm && (
              <form className="bg-card border border-border rounded-xl p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-semibold text-foreground mb-4">Shipping Information</h3>
                {props.shippingForm.fields.map((f: any, i: number) => (
                  <div key={i} className={f.halfWidth ? "inline-block w-[calc(50%-0.5rem)]" : ""}>
                    <label className="block text-sm font-medium text-foreground mb-1">{f.label} {f.required && <span className="text-red-500">*</span>}</label>
                    {f.type === "select" ? <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"><option value="">Select...</option>{(f.options || []).map((o: string, j: number) => <option key={j}>{o}</option>)}</select> : <input type={f.type} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />}
                  </div>
                ))}
                <button onClick={() => setStep(1)} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity mt-4">Continue to Payment</button>
              </form>
            )}
            {step === 1 && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
                {(props.paymentMethods || []).map((m: any, i: number) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50">
                    <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                  </label>
                ))}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors">Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">Review Order</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Review Your Order</h3>
                <p className="text-sm text-muted-foreground mb-4">Please review your order details before placing your order.</p>
                {props.secureCheckout && <p className="text-sm text-primary mb-4">🔒 Secure checkout powered by SSL encryption</p>}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors">Back</button>
                  <button className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">{props.placeOrderText || "Place Order"}</button>
                </div>
              </div>
            )}
          </div>
          {summary && (
            <div className="bg-card border border-border rounded-xl p-6 h-fit">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {(summary.items || []).map((item: any, i: number) => (
                  <div key={i} className="flex justify-between"><span className="text-muted-foreground">{item.name} x{item.quantity}</span><span className="text-foreground">{item.price}</span></div>
                ))}
              </div>
              <div className="border-t border-border pt-2 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{summary.subtotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{summary.shipping}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-foreground">{summary.tax}</span></div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold"><span className="text-foreground">Total</span><span className="text-foreground">{summary.total}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ── LegalContent ───────────────────────────────────────────────
export const LegalContent = (props: any) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6 max-w-3xl">
      {props.lastUpdated && <p className="text-sm text-muted-foreground mb-6">Last Updated: {props.lastUpdated}</p>}
      <div className="prose prose-sm max-w-none text-muted-foreground">
        {(props.content || "").split("\n").map((line: string, i: number) => {
          if (line.startsWith("# ")) return <h1 key={i} className="text-3xl font-bold text-foreground mt-8 mb-4">{line.slice(2)}</h1>;
          if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{line.slice(3)}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-foreground mt-4 mb-2">{line.slice(4)}</h3>;
          if (line.startsWith("- ")) return <li key={i} className="ml-4 text-sm">{line.slice(2)}</li>;
          if (line.startsWith("**")) return <p key={i} className="text-sm font-semibold text-foreground mt-4" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i} className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-foreground text-xs">$1</code>') }} />;
        })}
      </div>
    </div>
  </section>
);
