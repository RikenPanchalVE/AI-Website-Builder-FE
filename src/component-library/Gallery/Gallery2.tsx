interface GalleryProps {
  title: string;
  images: string[];
}

const Gallery2 = ({ title, images }: GalleryProps) => (
  <section className="overflow-hidden bg-muted/30 py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-foreground">Our Work</div>
        <h2 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl" style={{ letterSpacing: "-0.04em" }}>{title}</h2>
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.slice(0, 6).map((img, i) => (
          <div key={i} className={`group overflow-hidden rounded-3xl bg-muted shadow-sm transition-all duration-500 hover:shadow-xl ${i === 0 ? "row-span-2" : ""}`} style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.05}s both` }}>
            <div className={`relative overflow-hidden ${i === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
              {img ? (
                <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <span className="text-4xl text-primary/15">&#9670;</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery2;
