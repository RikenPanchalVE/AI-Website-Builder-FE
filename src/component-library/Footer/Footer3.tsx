interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
}

const Footer3 = ({ brandName, links }: FooterProps) => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row lg:px-8">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-[10px] font-black text-white shadow-sm">{brandName?.charAt(0)}</div>
        <span className="text-sm font-extrabold text-foreground">{brandName}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground/50">&copy; {new Date().getFullYear()} {brandName}</p>
    </div>
  </footer>
);

export default Footer3;
