interface AboutProps {
  title: string;
  description: string;
  image?: string | null;
}

const About2 = ({ title, description, image }: AboutProps) => (
  <section className="py-16 bg-card" id="about">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
      {image && (
        <div className="rounded-xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-auto" />
        </div>
      )}
    </div>
  </section>
);

export default About2;
