interface GalleryProps {
  title: string;
  images: string[];
}

const Gallery1 = ({ title, images }: GalleryProps) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery1;
