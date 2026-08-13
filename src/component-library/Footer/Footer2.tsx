import { SocialIcon } from "@/component-library/Common";

interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
}

// The page-link list used to be repeated here even though the exact same
// links already sit in the navbar a few hundred pixels above — on a site
// with more than 4-5 pages it wrapped into a cramped multi-line list that
// looked cluttered rather than useful. Footer keeps brand/social and drops
// the duplicate navigation.
const Footer2 = ({ brandName, socialLinks }: FooterProps) => (
  <footer className="border-t border-border bg-muted/30">
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-lg shadow-primary/25">{brandName?.charAt(0)}</div>
          <span className="text-base font-extrabold tracking-tight text-foreground">{brandName}</span>
        </div>
        <div className="flex gap-2">
          {socialLinks.map((s) => (
            <a key={s.platform} href={s.href} className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:shadow-md">
              <SocialIcon platform={s.platform} className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-[11px] text-muted-foreground/50">&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer2;
