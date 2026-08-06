interface NavbarProps {
  logo?: string | null;
  brandName: string;
  links: { label: string; href: string }[];
}

const Navbar2 = ({ logo, brandName, links }: NavbarProps) => (
  <nav className="sticky top-0 z-50 bg-card border-b border-border">
    <div className="container mx-auto px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {logo && <img src={logo} alt="" className="h-10 w-auto" />}
        <span className="text-xl font-bold text-foreground">{brandName}</span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          Get Started
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar2;
