interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
}

const Footer2 = ({ brandName, links, socialLinks }: FooterProps) => (
  <footer className="border-t border-border bg-muted/30">
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-lg shadow-primary/25">{brandName?.charAt(0)}</div>
          <span className="text-base font-extrabold tracking-tight text-foreground">{brandName}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/8 hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          {socialLinks.map((s) => (
            <a key={s.platform} href={s.href} className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:shadow-md">
              <span className="text-[10px] font-bold uppercase">{s.platform?.substring(0, 2)}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-[11px] text-muted-foreground/50">&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer2;
