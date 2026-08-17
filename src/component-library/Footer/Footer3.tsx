import { SocialIcon } from "@/component-library/Common";

interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
  copyrightText?: string;
}

// The page-link list used to be repeated here even though the exact same
// links already sit in the navbar a few hundred pixels above — on a site
// with more than 4-5 pages it wrapped into a cramped multi-line list that
// looked cluttered rather than useful. Footer keeps brand/social and drops
// the duplicate navigation.
const Footer3 = ({ brandName, socialLinks, copyrightText }: FooterProps) => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row lg:px-8">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-[10px] font-black text-white shadow-sm">{brandName?.charAt(0)}</div>
        <span className="text-sm font-extrabold text-foreground">{brandName}</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Social links used to be declared in this footer's props but
            never rendered — a client who filled these in on the Business
            step would never see them anywhere on the site if this was
            their footer style (the default for Minimal/Luxury/Elegant/
            Editorial). Kept small to match this footer's compact, minimal
            look rather than Footer1's larger circular badges. */}
        {(socialLinks || []).length > 0 && (
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                // Not "hover:bg-primary" — the renderer's global button
                // override styles anything matching a[class*="bg-primary"]
                // as a full CTA button (huge padding, uppercase, letter
                // spacing), since it can't tell a real bg-primary from a
                // conditional hover:bg-primary in a plain substring match.
                // "hover:bg-foreground" sidesteps that trap entirely.
                className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
              >
                <SocialIcon platform={s.platform} className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
        <p className="text-[11px] text-muted-foreground/50">{copyrightText || `© ${new Date().getFullYear()} ${brandName}`}</p>
      </div>
    </div>
  </footer>
);

export default Footer3;
