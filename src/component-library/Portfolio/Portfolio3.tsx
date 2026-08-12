import { useState } from "react";

interface PortfolioProps {
  title?: string;
  subtitle?: string;
  projects?: Array<{
    title: string;
    category: string;
    image?: string | null;
    description?: string;
  }>;
}

export default function Portfolio3({
  title = "Our Work",
  subtitle = "Featured Projects",
  projects = [],
}: PortfolioProps) {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 pReveal">
            {subtitle}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight pReveal">
            {title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 pReveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <div
              key={i}
              className="group cursor-pointer overflow-hidden border border-border rounded-lg hover:shadow-lg transition-all duration-500 pReveal"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-6xl">
                    {i + 1}
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
