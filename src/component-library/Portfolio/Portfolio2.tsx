interface PortfolioProps {
  title: string;
  projects: { title: string; image: string; category: string }[];
}

/* Portfolio2 — Full-width alternating gallery */
const Portfolio2 = ({ title, projects }: PortfolioProps) => (
  <section className="bg-muted/30 overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="mb-16">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Projects</p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
          {title || "Featured Work"}
        </h2>
      </div>

      <div className="space-y-1">
        {projects.map((project, i) => (
          <a
            key={i}
            href="#"
            className={`group grid gap-0 lg:grid-cols-12 items-center bg-background border border-border transition-all duration-500 hover:bg-muted/50 ${
              i % 2 === 0 ? "" : ""
            }`}
            style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both` }}
          >
            <div className={`overflow-hidden ${i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"}`}>
              <div className="aspect-[16/10] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                    <span className="text-6xl text-primary/10">&#9670;</span>
                  </div>
                )}
              </div>
            </div>
            <div className={`p-8 lg:p-12 ${i % 2 === 0 ? "lg:col-span-5" : "lg:col-span-5 lg:order-1"}`}>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                {project.category}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                View Project
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio2;
