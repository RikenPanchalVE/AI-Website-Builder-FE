interface PortfolioProps {
  title: string;
  projects: { title: string; image: string; category: string }[];
}

/* Portfolio1 — Editorial masonry with varied sizes */
const Portfolio1 = ({ title, projects }: PortfolioProps) => (
  <section className="bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">Work</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.04em" }}>
            {title || "Selected Projects"}
          </h2>
        </div>
        <a href="#" className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          View All
        </a>
      </div>

      <div className="grid gap-1 lg:grid-cols-12 auto-rows-[minmax(200px,auto)]">
        {projects.map((project, i) => {
          const colSpan = i === 0 ? "lg:col-span-8" : i === 1 ? "lg:col-span-4" : i === 2 ? "lg:col-span-5" : i === 3 ? "lg:col-span-7" : "lg:col-span-6";
          const aspectClass = i === 0 ? "aspect-[16/9]" : i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]";

          return (
            <a
              key={i}
              href="#"
              className={`group relative overflow-hidden bg-muted ${colSpan}`}
              style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s both` }}
            >
              <div className={`${aspectClass} overflow-hidden`}>
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

              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-background/60 mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-background">
                  {project.title}
                </h3>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="h-5 w-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

export default Portfolio1;
