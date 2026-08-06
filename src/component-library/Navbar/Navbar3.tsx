interface NavbarProps {
  logo?: string | null;
  brandName: string;
  links: { label: string; href: string }[];
}

const Navbar3 = ({ logo, brandName, links }: NavbarProps) => (
  <nav className="sticky top-0 z-50 bg-background border-b border-border">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {logo && <img src={logo} alt="" className="h-8 w-auto" />}
        <span className="text-lg font-semibold text-foreground">{brandName}</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar3;
