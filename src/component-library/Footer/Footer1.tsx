interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
}

const Footer1 = ({ brandName, description, links, socialLinks }: FooterProps) => (
  <footer className="py-12 bg-card border-t border-border">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">{brandName}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Links</h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.platform} href={s.href} className="text-sm text-muted-foreground hover:text-foreground capitalize">
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer1;
