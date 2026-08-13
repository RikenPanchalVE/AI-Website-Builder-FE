import { useState } from "react";

interface NavbarProps {
  logo?: string | null;
  brandName: string;
  links: { label: string; href: string }[];
}

const Navbar3 = ({ logo, brandName, links }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-2xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt={brandName} className="h-9 w-auto rounded-md" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-lg shadow-primary/25">{brandName?.charAt(0)}</div>
          )}
          <span className="text-lg font-extrabold tracking-tight text-foreground">{brandName}</span>
        </div>
        <div className="hidden flex-wrap items-center justify-end gap-0.5 md:flex">
          {links.map((link, i) => (
            <a key={link.href} href={link.href} className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground">
              {i === 0 && <span className="absolute inset-0 rounded-lg bg-primary/8 opacity-0 transition-opacity duration-300 hover:opacity-100" />}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>
        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted md:hidden">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 px-6 pb-6 pt-4 backdrop-blur-2xl md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar3;
