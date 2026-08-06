interface PortfolioProps {
  title: string;
  projects: { title: string; image: string; category: string }[];
}

const Portfolio2 = ({ title, projects }: PortfolioProps) => (
  <section className="py-16 bg-card" id="portfolio">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {projects.map((project, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-border">
            <div className="aspect-video bg-muted">
              {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio2;
