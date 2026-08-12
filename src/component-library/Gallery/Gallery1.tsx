interface GalleryProps {
  title: string;
  images: string[];
}

const Gallery1 = ({ title, images }: GalleryProps) => (
  <section className="overflow-hidden bg-background py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">Gallery</div>
        <h2 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl" style={{ letterSpacing: "-0.04em" }}>{title}</h2>
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
      </div>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {images.map((img, i) => (
          <div key={i} className="group mb-4 break-inside-avoid" style={{ animation: `pReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.04}s both` }}>
            <div className="relative overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-500 hover:shadow-xl">
              <div className={`${i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                {img ? (
                  <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <span className="text-3xl text-primary/20">&#9670;</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  <span className="text-xs font-bold">View</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery1;
