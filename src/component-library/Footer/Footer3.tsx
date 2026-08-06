interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
}

const Footer3 = ({ brandName, links }: FooterProps) => (
  <footer className="py-6 bg-background border-t border-border">
    <div className="container mx-auto px-6 flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{brandName}</span>
      <div className="flex gap-4">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-foreground">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer3;
