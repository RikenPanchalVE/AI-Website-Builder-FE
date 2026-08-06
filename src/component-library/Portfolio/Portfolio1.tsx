interface PortfolioProps {
  title: string;
  projects: { title: string; image: string; category: string }[];
}

const Portfolio1 = ({ title, projects }: PortfolioProps) => (
  <section className="py-16 bg-background" id="portfolio">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="group rounded-xl overflow-hidden border border-border bg-card">
            <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <span className="text-muted-foreground text-sm">Project {i + 1}</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-primary font-medium mb-1">{project.category}</p>
              <h3 className="font-semibold text-foreground">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio1;
