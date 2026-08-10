import { useState, useEffect } from "react";

// ── HeroEcommerce ──────────────────────────────────────────────
export const HeroEcommerce = (props: any) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary">
    {props.backgroundImage && (
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${props.backgroundImage})` }} />
    )}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
    <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
      {props.badge && (
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          {props.badge}
        </span>
      )}
      <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
        {props.headline}
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
        {props.subheadline}
      </p>
      <div className="flex flex-wrap gap-4">
        <a href={props.ctaLink} className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:shadow-xl hover:scale-105">
          {props.ctaText}
        </a>
        {props.secondaryCtaText && (
          <a href={props.secondaryCtaLink} className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10">
            {props.secondaryCtaText}
          </a>
        )}
      </div>
    </div>
  </section>
);

// ── FeaturedCategories ─────────────────────────────────────────
export const FeaturedCategories = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.categories || []).map((cat: any, i: number) => (
          <a key={i} href={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <span className="text-5xl text-primary/30">📦</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium">Shop Now →</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">{cat.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{cat.productCount} {cat.productCount === 1 ? "product" : "products"}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ── ProductCard (shared) ───────────────────────────────────────
const ProductCard = (props: any) => {
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    // Broadcast so other components (nav cart badge, etc.) can react
    window.dispatchEvent(new CustomEvent("cart:add", { detail: { ...props, qty: 1 } }));
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {props.image ? (
          <img src={props.image} alt={props.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-card to-secondary/10">
            <span className="text-6xl text-primary/20 drop-shadow-sm">🛍️</span>
          </div>
        )}
        {props.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-destructive to-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">{props.badge}</span>
        )}
        {props.discount && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">-{props.discount}</span>
        )}
        {/* Hover overlay: Quick View + Add to Cart */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-lg transition-transform hover:scale-105 hover:bg-gray-50"
          >
            Quick View
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          {props.category ? <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80">{props.category}</p> : <span />}
          {props.rating && (
            <div className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-xs font-semibold text-foreground">{props.rating}</span>
              <span className="text-xs text-muted-foreground">({props.reviewCount || 0})</span>
            </div>
          )}
        </div>
        <h4 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">{props.name}</h4>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-tight text-foreground">{props.price}</span>
          {props.originalPrice && <span className="text-sm text-muted-foreground line-through">{props.originalPrice}</span>}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${added
            ? "bg-emerald-500 text-white"
            : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
          {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setQuickView(false)}>
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickView(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/70 text-white shadow-lg transition-colors hover:bg-gray-900"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-square bg-muted">
                {props.image ? <img src={props.image} alt={props.name} className="h-full w-full object-cover" /> : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-7xl text-primary/20">🛍️</span></div>
                )}
                {props.badge && <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-destructive to-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">{props.badge}</span>}
              </div>
              <div className="flex flex-col p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{props.category}</p>
                <h3 className="mt-1 text-xl font-extrabold tracking-tight text-foreground">{props.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className={`h-4 w-4 ${j < Math.round(props.rating || 0) ? "text-yellow-400" : "text-muted/50"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({props.reviewCount || 0} reviews)</span>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-foreground">{props.price}</span>
                  {props.originalPrice && <span className="text-lg text-muted-foreground line-through">{props.originalPrice}</span>}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{props.description || "Premium quality product crafted with care and attention to detail."}</p>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold shadow-lg transition-all hover:shadow-xl ${added ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:scale-[1.02]"
                    }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
                  {added ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── BestSellers ────────────────────────────────────────────────
export const BestSellers = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.products || []).map((p: any) => <ProductCard key={p.id} {...p} />)}
      </div>
      {props.viewAllLink && (
        <div className="mt-12 text-center">
          <a href={props.viewAllLink} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105">
            View All Products
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      )}
    </div>
  </section>
);

// ── NewArrivals ────────────────────────────────────────────────
export const NewArrivals = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.products || []).map((p: any) => <ProductCard key={p.id} {...p} badge={p.badge || "New"} />)}
      </div>
    </div>
  </section>
);

// ── FlashSale ──────────────────────────────────────────────────
export const FlashSale = (props: any) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!props.endDate) return;
    const target = new Date(props.endDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [props.endDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-red-500 via-orange-500 to-amber-500">
      <div className="mx-auto max-w-6xl px-6">
        {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">🔥 {props.title}</h2>}
        {props.subtitle && <p className="mx-auto mb-6 max-w-2xl text-center text-white/80">{props.subtitle}</p>}
        {props.endDate && (
          <div className="mb-10 flex justify-center gap-3">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Sec" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold text-white backdrop-blur-sm">{pad(item.value)}</div>
                <span className="mt-1 text-xs font-medium text-white/70">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(props.products || []).map((p: any) => <ProductCard key={p.id} {...p} badge={p.discount || "Sale"} />)}
        </div>
      </div>
    </section>
  );
};

// ── FeaturedProducts ───────────────────────────────────────────
export const FeaturedProducts = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(props.products || []).map((p: any) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── ShopHero ───────────────────────────────────────────────────
export const ShopHero = (props: any) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
    {props.backgroundImage && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${props.backgroundImage})` }} />}
    <div className="absolute inset-0 bg-background/70" />
    <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
      <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="transition-colors hover:text-primary">Home</a>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="font-medium text-foreground">{props.title || "Shop"}</span>
      </nav>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{props.title || "Shop"}</h1>
      {props.subtitle && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{props.subtitle}</p>}
    </div>
  </section>
);

// ── ProductFilters ─────────────────────────────────────────────
export const ProductFilters = (props: any) => (
  <div className="border-b border-border bg-card py-4">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-wrap items-center gap-4">
        {(props.filters || []).map((filter: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">{filter.name}:</label>
            {filter.type === "select" && (
              <select className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                {(filter.options || []).map((opt: any, j: number) => <option key={j} value={opt.value}>{opt.label}</option>)}
              </select>
            )}
            {filter.type === "checkbox" && (
              <div className="flex gap-3">
                {(filter.options || []).slice(0, 4).map((opt: any, j: number) => (
                  <label key={j} className="flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20" />{opt.label} ({opt.count})
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
export const ProductGrid = (props: any) => {
  const allProducts = props.products || [];
  const perPage = props.pagination?.perPage || 8;
  const initialTotal = props.pagination?.totalProducts || allProducts.length;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const categories = allProducts
    .map((p: any) => p.category)
    .filter((c: any) => typeof c === "string" && c.length > 0) as string[];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const filtered = allProducts.filter((p: any) => {
    const matchesSearch =
      !search ||
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sort === "price_asc") return parseFloat(String(a.price).replace(/[^0-9.]/g, "")) - parseFloat(String(b.price).replace(/[^0-9.]/g, ""));
    if (sort === "price_desc") return parseFloat(String(b.price).replace(/[^0-9.]/g, "")) - parseFloat(String(a.price).replace(/[^0-9.]/g, ""));
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sort === "name") return (a.name || "").localeCompare(b.name || "");
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * perPage, safePage * perPage);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Toolbar: search + sort */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search products..."
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">Sort:</label>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="default">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Category filter chips */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">Category:</span>
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${active ? "bg-primary text-primary-foreground shadow-md" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {paged.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {paged.map((p: any) => <ProductCard key={p.id} {...p} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all ${i + 1 === safePage ? "bg-primary text-primary-foreground shadow-md" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ── ProductDetails ─────────────────────────────────────────────
export const ProductDetails = (props: any) => {
  const product = props.product || {};
  const images = product.images || [null];
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              {images[activeImage] ? <img src={images[activeImage]} alt={product.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-8xl text-primary/20">🛍️</span></div>
              )}
            </div>
            <div className="flex gap-3">
              {images.slice(0, 4).map((img: string | null, i: number) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-muted transition-all ${i === activeImage ? "border-primary shadow-md" : "border-border hover:border-primary/50"}`}>
                  {img ? <img src={img} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center"><span className="text-xs text-muted-foreground/30">📷</span></div>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground">{product.name}</h1>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className={`h-4 w-4 ${j < Math.round(product.rating || 0) ? "text-yellow-400" : "text-muted/50"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount || 0} reviews)</span>
            </div>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-foreground">{product.price}</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>}
            </div>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{product.fullDescription || product.description}</p>
            {product.colors && (
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-foreground">Color</p>
                <div className="flex gap-3">
                  {product.colors.map((c: any, i: number) => (
                    <button key={i} onClick={() => setSelectedColor(i)} className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${i === selectedColor ? "border-primary ring-2 ring-primary/20" : "border-transparent"}`} style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>
            )}
            {product.sizes && (
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-foreground">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((s: string, i: number) => (
                    <button key={i} onClick={() => setSelectedSize(i)} className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${i === selectedSize ? "bg-primary text-primary-foreground shadow-md" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("cart:add", { detail: { name: product.name, price: product.price, qty: 1 } }));
                  const btn = document.getElementById("product-add-cart-btn");
                  if (btn) {
                    btn.textContent = "✓ Added";
                    btn.classList.add("bg-emerald-500");
                    setTimeout(() => {
                      btn.textContent = "Add to Cart";
                      btn.classList.remove("bg-emerald-500");
                    }, 1800);
                  }
                }}
                id="product-add-cart-btn"
                className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              >Add to Cart</button>
              {props.hasWishlist && (
                <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              )}
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
    <section className="border-t border-border py-10">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-foreground">Customer Reviews</h2>
        <div className="mb-10 flex items-center gap-8 rounded-2xl bg-muted/50 p-6">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-foreground">{summary.average}</div>
            <div className="mt-1 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <svg key={j} className={`h-4 w-4 ${j < Math.round(summary.average || 0) ? "text-yellow-400" : "text-muted/50"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{summary.total} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {(summary.distribution || []).map((d: any) => (
              <div key={d.stars} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-muted-foreground">{d.stars}★</span>
                <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-yellow-400 transition-all duration-500" style={{ width: `${d.percentage}%` }} /></div>
                <span className="w-10 text-xs text-muted-foreground text-right">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {(props.reviews || []).map((r: any) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{r.author?.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.author}{r.verified && <span className="ml-1 inline-flex items-center text-xs font-medium text-primary">✓ Verified</span>}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "text-yellow-400" : "text-muted/50"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
              </div>
              {r.title && <p className="mb-1 text-sm font-semibold text-foreground">{r.title}</p>}
              <p className="text-sm leading-relaxed text-muted-foreground">{r.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── RelatedProducts ────────────────────────────────────────────
export const RelatedProducts = (props: any) => (
  <section className="border-t border-border py-10">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-foreground">{props.title}</h2>}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {(props.products || []).map((p: any) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── RecentlyViewed ─────────────────────────────────────────────
export const RecentlyViewed = (props: any) => (
  <section className="border-t border-border py-10">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-foreground">{props.title}</h2>}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {(props.products || []).map((p: any) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  </section>
);

// ── CategoryGrid ───────────────────────────────────────────────
export const CategoryGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(props.categories || []).map((cat: any, i: number) => (
          <a key={i} href={`/shop?category=${cat.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {cat.image ? <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">📦</span></div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">{cat.name}</h3>
              {cat.description && <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>}
              <p className="mt-2 text-xs font-semibold text-primary">{cat.productCount} products →</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ── WishlistGrid ───────────────────────────────────────────────
export const WishlistGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {(props.products || []).length > 0 ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {props.products.map((p: any) => (
            <div key={p.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-muted">
                {p.image ? <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-5xl text-primary/20">🛍️</span></div>
                )}
                <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-destructive shadow-md backdrop-blur-sm transition-transform hover:scale-110">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </button>
              </div>
              <div className="p-4">
                <h4 className="truncate font-semibold text-foreground">{p.name}</h4>
                <p className="mt-1 text-lg font-bold text-foreground">{p.price}</p>
                <button className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <svg className="h-10 w-10 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">{props.emptyState?.title || "Wishlist is empty"}</h3>
          <p className="mb-6 text-muted-foreground">{props.emptyState?.message || "Browse our collection and save items you love."}</p>
          <a href={props.emptyState?.ctaLink || "/shop"} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105">{props.emptyState?.ctaText || "Start Shopping"}</a>
        </div>
      )}
    </div>
  </section>
);

// ── CartItems ──────────────────────────────────────────────────
export const CartItems = (props: any) => (
  <section className="py-10">
    <div className="mx-auto max-w-6xl px-6">
      {(props.items || []).length > 0 ? (
        <div className="space-y-4">
          {props.items.map((item: any) => (
            <div key={item.id} className="flex gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center"><span className="text-2xl text-muted-foreground/30">🛍️</span></div>}
              </div>
              <div className="flex min-w-0 flex-1">
                <div className="flex-1">
                  <h4 className="truncate font-semibold text-foreground">{item.name}</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.color} / {item.size}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button className="text-muted-foreground transition-colors hover:text-destructive">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted">−</button>
                      <span className="w-8 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted">+</button>
                    </div>
                    <span className="w-20 text-right font-bold text-foreground">{item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <svg className="h-10 w-10 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">{props.emptyState?.title || "Cart is empty"}</h3>
          <p className="mb-6 text-muted-foreground">{props.emptyState?.message || "Looks like you haven't added anything yet."}</p>
          <a href={props.emptyState?.ctaLink || "/shop"} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105">{props.emptyState?.ctaText || "Continue Shopping"}</a>
        </div>
      )}
    </div>
  </section>
);

// ── CartSummary ────────────────────────────────────────────────
export const CartSummary = (props: any) => (
  <section className="py-10">
    <div className="mx-auto max-w-md px-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-extrabold text-foreground">Order Summary</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold text-foreground">{props.subtotal}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold text-foreground">{props.shipping}</span></div>
          {props.tax && <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-semibold text-foreground">{props.tax}</span></div>}
          <div className="border-t border-border pt-3">
            <div className="flex justify-between"><span className="font-bold text-foreground">Total</span><span className="text-lg font-extrabold text-foreground">{props.total}</span></div>
          </div>
        </div>
        {props.couponCode && (
          <div className="mt-5 flex gap-2">
            <input type="text" placeholder={props.couponCode.placeholder} className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <button className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">{props.couponCode.buttonText}</button>
          </div>
        )}
        {props.shippingOptions && props.shippingOptions.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-foreground">Shipping Method</p>
            {props.shippingOptions.map((opt: any, i: number) => (
              <label key={i} className="mb-1 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"><input type="radio" name="shipping" defaultChecked={i === 0} className="accent-primary" />{opt.label}</label>
            ))}
          </div>
        )}
        <div className="mt-6 space-y-3">
          {props.checkoutLink && <a href={props.checkoutLink} className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">Proceed to Checkout</a>}
          {props.continueShoppingLink && <a href={props.continueShoppingLink} className="block w-full rounded-xl border border-border py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted">Continue Shopping</a>}
        </div>
      </div>
    </div>
  </section>
);

// ── CheckoutForm ───────────────────────────────────────────────
export const CheckoutForm = (props: any) => {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const steps = props.steps || [];
  const summary = props.orderSummary;

  if (placed) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">Order Placed Successfully!</h2>
            <p className="mb-6 text-muted-foreground">Thank you for your order. A confirmation email has been sent with your tracking details.</p>
            <button onClick={() => setPlaced(false)} className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">Place Another Order</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 flex justify-center gap-2 overflow-x-auto">
          {steps.map((s: any, i: number) => (
            <button key={s.id} onClick={() => setStep(i)} className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold transition-all ${i === step ? "bg-primary text-primary-foreground shadow-md" : i < step ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {i < step ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs">{i + 1}</span>}
              {s.label}
            </button>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 0 && props.shippingForm && (
              <form className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm" onSubmit={(e) => { e.preventDefault(); setStep(1); }}>
                <h3 className="mb-2 font-bold text-foreground">Shipping Information</h3>
                <div className="grid gap-5">
                  {props.shippingForm.fields.map((f: any, i: number) => (
                    <div key={i} className={f.halfWidth ? "sm:col-span-1" : "sm:col-span-2"}>
                      <label className="mb-1.5 block text-sm font-semibold text-foreground">{f.label} {f.required && <span className="text-destructive">*</span>}</label>
                      {f.type === "select" ? <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"><option value="">Select...</option>{(f.options || []).map((o: string, j: number) => <option key={j}>{o}</option>)}</select> : <input type={f.type} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />}
                    </div>
                  ))}
                </div>
                <button type="submit" className="mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">Continue to Payment</button>
              </form>
            )}
            {step === 1 && (
              <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-bold text-foreground">Payment Method</h3>
                {(props.paymentMethods || []).map((m: any, i: number) => (
                  <label key={i} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:bg-muted/30">
                    <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                    <span className="text-sm font-semibold text-foreground">{m.label}</span>
                  </label>
                ))}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">Review Order</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-bold text-foreground">Review Your Order</h3>
                <p className="mb-4 text-sm text-muted-foreground">Please review your order details before placing your order.</p>
                {props.secureCheckout && <p className="mb-4 text-sm font-medium text-primary">🔒 Secure checkout powered by SSL encryption</p>}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Back</button>
                  <button onClick={() => setPlaced(true)} className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">{props.placeOrderText || "Place Order"}</button>
                </div>
              </div>
            )}
          </div>
          {summary && (
            <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-foreground">Order Summary</h3>
              <div className="mb-4 space-y-2 text-sm">
                {(summary.items || []).map((item: any, i: number) => (
                  <div key={i} className="flex justify-between"><span className="text-muted-foreground">{item.name} x{item.quantity}</span><span className="font-medium text-foreground">{item.price}</span></div>
                ))}
              </div>
              <div className="space-y-2 border-t border-border pt-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{summary.subtotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{summary.shipping}</span></div>
                {summary.tax && <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-foreground">{summary.tax}</span></div>}
                <div className="border-t border-border pt-2"><div className="flex justify-between font-bold"><span className="text-foreground">Total</span><span className="text-foreground">{summary.total}</span></div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ── OrderTracking ──────────────────────────────────────────────
export const OrderTracking = (props: any) => {
  const sample = props.sampleOrder;
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <form className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {(props.formFields || []).map((f: any, i: number) => (
              <div key={i}>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            ))}
          </div>
          <button type="submit" className="mt-4 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">{props.submitText || "Track"}</button>
        </form>
        {sample && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order #{sample.orderNumber}</p>
                <p className="font-bold capitalize text-foreground">Status: {sample.status}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Est. Delivery</p>
                <p className="font-semibold text-foreground">{sample.estimatedDelivery}</p>
              </div>
            </div>
            {sample.carrier && <p className="mb-6 text-sm text-muted-foreground">Carrier: {sample.carrier} · {sample.trackingNumber}</p>}
            <div className="space-y-4">
              {(sample.steps || []).map((step: any, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${step.completed && !step.current ? "bg-primary text-primary-foreground" : step.current ? "border-2 border-primary bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {step.completed && !step.current ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${step.completed || step.current ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
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
