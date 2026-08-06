interface AboutProps {
  title: string;
  description: string;
  image?: string | null;
}

const About1 = ({ title, description, image }: AboutProps) => (
  <section className="py-16 bg-background" id="about">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <div className="rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-muted-foreground text-sm">About Image</span>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default About1;
