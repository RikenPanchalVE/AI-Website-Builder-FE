import React from "react";

interface VehicleCardProps {
  id?: string;
  name: string;
  price: string;
  originalPrice?: string;
  description?: string;
  image?: string | null;
  rating?: number;
  reviewCount?: number;
  slug?: string;
  category?: string;
  badge?: string;
  specs?: Record<string, string>;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  name,
  price,
  originalPrice,
  description,
  image,
  rating = 0,
  reviewCount = 0,
  slug,
  category,
  badge,
  specs = {},
}) => {
  const [hovered, setHovered] = React.useState(false);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
  ));

  return (
    <div
      className="group relative bg-[var(--bgc)] rounded-xl border border-[var(--bdr)] overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-48 bg-[var(--bgd)] flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl opacity-40">🚗</span>
        )}
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--c1)] text-[var(--ctx)] text-xs font-bold rounded-lg uppercase tracking-wide">
            {badge}
          </span>
        )}
        {category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white text-xs font-semibold rounded-lg">
            {category}
          </span>
        )}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}>
          <button className="px-4 py-2 bg-background text-foreground text-sm font-semibold rounded-lg hover:bg-background/90">
            View Details
          </button>
          <button
            data-add-to-cart={slug || name.toLowerCase().replace(/\s+/g, "-")}
            className="px-4 py-2 bg-[var(--c1)] text-[var(--ctx)] text-sm font-semibold rounded-lg hover:opacity-90"
          >
            Inquire Now
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {stars}
          <span className="text-xs text-[var(--ctx2)] ml-1">({reviewCount})</span>
        </div>
        <h3 className="text-lg font-bold text-[var(--ctx)] leading-tight">{name}</h3>
        {description && (
          <p className="mt-1 text-sm text-[var(--ctx2)] line-clamp-2">{description}</p>
        )}
        {Object.keys(specs).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(specs).slice(0, 4).map(([key, val]) => (
              <span key={key} className="px-2 py-0.5 bg-[var(--bg)] border border-[var(--bdr)] rounded text-xs text-[var(--ctx2)]">
                {key}: {val}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-[var(--c1)]">{price}</span>
          {originalPrice && (
            <span className="text-sm text-[var(--ctx2)] line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface VehicleGridProps {
  title?: string;
  subtitle?: string;
  products?: VehicleCardProps[];
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  title = "Featured Vehicles",
  subtitle = "Top picks from our inventory",
  products = [],
}) => (
  <section className="py-16 px-4 bg-[var(--bg)]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[var(--ctx)]">{title}</h2>
        {subtitle && <p className="mt-2 text-[var(--ctx2)]">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <VehicleCard key={i} {...p} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/vehicles" className="inline-block px-6 py-3 bg-[var(--c1)] text-[var(--ctx)] font-semibold rounded-lg hover:opacity-90 transition-opacity">
          View All Vehicles
        </a>
      </div>
    </div>
  </section>
);

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
  title = "Service Center",
  subtitle = "Professional maintenance and repair",
  services = [],
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <section className="py-16 px-4 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--ctx)]">{title}</h2>
          {subtitle && <p className="mt-2 text-[var(--ctx2)]">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer ${
                selected === s.name
                  ? "border-[var(--c1)] shadow-lg scale-[1.02]"
                  : "border-[var(--bdr)] hover:border-[var(--c1)]50 hover:shadow-md"
              } bg-[var(--bgc)]`}
              onClick={() => setSelected(selected === s.name ? null : s.name)}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-bold text-[var(--ctx)]">{s.title || s.name}</h3>
              <p className="mt-1 text-sm text-[var(--ctx2)] leading-relaxed">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-[var(--c1)]">${s.price}</span>
                <button
                  data-add-to-cart={s.name.toLowerCase().replace(/\s+/g, "-")}
                  className="px-3 py-1.5 bg-[var(--c1)] text-[var(--ctx)] text-sm font-semibold rounded-lg hover:opacity-90"
                  onClick={(e) => e.stopPropagation()}
                >
                  Book Now
                </button>
              </div>
              {selected === s.name && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--c1)] text-[var(--ctx)] rounded-full flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
