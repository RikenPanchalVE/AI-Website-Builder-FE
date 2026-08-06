interface GalleryProps {
  title: string;
  images: string[];
}

const Gallery2 = ({ title, images }: GalleryProps) => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
        {images.slice(0, 6).map((img, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery2;
