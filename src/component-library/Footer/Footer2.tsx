interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
}

const Footer2 = ({ brandName, description, links, socialLinks }: FooterProps) => (
  <footer className="py-8 bg-background border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {brandName}</div>
      <div className="flex gap-4">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-foreground">
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex gap-3">
        {socialLinks.map((s) => (
          <a key={s.platform} href={s.href} className="text-xs text-muted-foreground hover:text-foreground capitalize">
            {s.platform}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer2;
