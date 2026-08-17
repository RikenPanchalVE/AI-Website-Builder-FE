import { SocialIcon } from "@/component-library/Common";

interface FooterProps {
  brandName: string;
  description: string;
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
  // Optional overrides — everything here used to be hardcoded, so a client
  // who wanted different footer copy than the auto-generated business
  // description had no way to change it.
  copyrightText?: string;
  ctaHeading?: string;
  ctaSubtext?: string;
  ctaButtonText?: string;
  // This used to be a hardcoded "#contact" anchor — there's no element with
  // that id anywhere on the page, so the button just did nothing when
  // clicked. WebsiteRenderer's SPA navigation only intercepts links that
  // start with "/", so it needs a real page path, not a fragment.
  ctaLink?: string;
}

// The page-link list used to be repeated here even though the exact same
// links already sit in the navbar a few hundred pixels above — on a site
// with more than 4-5 pages it wrapped into a cramped multi-line list that
// looked cluttered rather than useful. Footer keeps brand/social/CTA and
// drops the duplicate navigation.
const Footer1 = ({ brandName, description, socialLinks, copyrightText, ctaHeading, ctaSubtext, ctaButtonText, ctaLink }: FooterProps) => (
  <footer className="relative overflow-hidden border-t border-border bg-card">
    <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-black text-white shadow-lg shadow-primary/25">{brandName?.charAt(0)}</div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">{brandName}</span>
          </div>
          <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.platform} href={s.href} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-all duration-400 hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:shadow-lg hover:shadow-primary/25">
                <SocialIcon platform={s.platform} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-5">
          <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-foreground">{ctaHeading || "Get in Touch"}</h4>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{ctaSubtext || "Ready to start your project? Let's talk about how we can help."}</p>
          <a href={ctaLink || "/contact"} className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/25 transition-all duration-400 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30">
            {ctaButtonText || "Start a Project"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">{copyrightText || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}</p>
        <p className="text-xs text-muted-foreground/50">Crafted with precision</p>
      </div>
    </div>
  </footer>
);

export default Footer1;
