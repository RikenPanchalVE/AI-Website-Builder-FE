import { useState } from "react";

interface NavbarProps {
  logo?: string | null;
  brandName: string;
  links: { label: string; href: string }[];
}

const Navbar2 = ({ logo, brandName, links }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-card/70 backdrop-blur-2xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
        <div className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt={brandName} className="h-10 w-auto rounded-xl" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-sm font-black text-white shadow-xl shadow-primary/25">{brandName?.charAt(0)}</div>
          )}
          <span className="text-xl font-extrabold tracking-tight text-foreground">{brandName}</span>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/8 hover:text-primary">
              {link.label}
            </a>
          ))}
          <a href={links[links.length - 1]?.href || "#contact"} className="ml-3 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-400 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
            Get Started
          </a>
        </div>
        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted md:hidden">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border/40 bg-card/95 px-6 pb-6 pt-4 backdrop-blur-2xl md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {link.label}
            </a>
          ))}
          <a href={links[links.length - 1]?.href || "#contact"} onClick={() => setMobileOpen(false)} className="mt-3 block rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/25">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
