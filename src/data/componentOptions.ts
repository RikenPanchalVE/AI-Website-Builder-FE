export interface ComponentOption {
  id: string;
  name: string;
  description: string;
  preview: {
    layout: string;
    style: string;
    elements: string[];
  };
  bestFor: string[];
}

export interface ComponentCategory {
  category: string;
  label: string;
  description: string;
  required: boolean;
  options: ComponentOption[];
}

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    category: "navbar",
    label: "Navigation Bar",
    description: "The top of every page. Choose how visitors navigate your site.",
    required: true,
    options: [
      {
        id: "navbar1",
        name: "Classic",
        description: "Logo, links, and a mobile menu. Clean and familiar.",
        preview: { layout: "logo-left-links-right", style: "clean", elements: ["logo", "nav-links", "mobile-menu"] },
        bestFor: ["agency", "consulting", "local-business", "portfolio"],
      },
      {
        id: "navbar2",
        name: "With CTA Button",
        description: "Adds a prominent call-to-action button beside the links.",
        preview: { layout: "logo-left-links-cta", style: "vibrant", elements: ["logo", "nav-links", "cta-button", "mobile-menu"] },
        bestFor: ["technology", "restaurant", "fitness", "beauty", "real-estate"],
      },
      {
        id: "navbar3",
        name: "Minimal",
        description: "Understated links with subtle hover states. No CTA button.",
        preview: { layout: "logo-left-links-right", style: "minimal", elements: ["logo", "nav-links", "mobile-menu"] },
        bestFor: ["luxury", "portfolio", "creative", "editorial"],
      },
    ],
  },
  {
    category: "hero",
    label: "Hero Section",
    description: "The first thing visitors see. Choose how you want to make an impression.",
    required: true,
    options: [
      {
        id: "hero1",
        name: "Full-Screen Statement",
        description: "Dramatic full-screen hero with bold headline and background image.",
        preview: { layout: "fullscreen", style: "dark-overlay", elements: ["background-image", "large-headline", "cta-button", "scroll-indicator"] },
        bestFor: ["agency", "consulting", "portfolio", "technology"],
      },
      {
        id: "hero2",
        name: "Split Editorial",
        description: "Two-column layout with text on one side and image on the other.",
        preview: { layout: "split-50-50", style: "editorial", elements: ["headline", "subtext", "cta-button", "social-proof", "image"] },
        bestFor: ["agency", "consulting", "healthcare", "education"],
      },
      {
        id: "hero3",
        name: "Centered Statement",
        description: "Centered content with stats bar below. Great for building trust.",
        preview: { layout: "centered", style: "clean", elements: ["headline", "description", "dual-cta", "stats-bar"] },
        bestFor: ["consulting", "technology", "finance", "education"],
      },
      {
        id: "hero4",
        name: "Image-Focused",
        description: "Large hero image with overlaid text. Perfect for visual businesses.",
        preview: { layout: "image-heavy", style: "overlay-text", elements: ["full-bg-image", "headline-overlay", "cta-button"] },
        bestFor: ["restaurant", "travel", "real-estate", "fitness", "beauty"],
      },
      {
        id: "hero5",
        name: "Minimal Text",
        description: "Clean, minimal hero with just a headline and CTA.",
        preview: { layout: "centered-minimal", style: "minimal", elements: ["small-label", "headline", "cta-button"] },
        bestFor: ["luxury", "portfolio", "creative", "editorial"],
      },
    ],
  },
  {
    category: "services",
    label: "Services Section",
    description: "Showcase what you offer. Choose a layout that fits your services.",
    required: false,
    options: [
      {
        id: "services1",
        name: "Numbered Index",
        description: "Services listed with large numbers and hover-reveal details.",
        preview: { layout: "vertical-list", style: "editorial", elements: ["numbered-items", "hover-reveal", "arrows"] },
        bestFor: ["agency", "consulting", "technology", "finance"],
      },
      {
        id: "services2",
        name: "Icon Grid",
        description: "Grid layout with icons and descriptions. Clean and scannable.",
        preview: { layout: "3-column-grid", style: "clean", elements: ["icon-cards", "titles", "descriptions"] },
        bestFor: ["healthcare", "education", "technology", "local-business"],
      },
      {
        id: "services3",
        name: "Feature Cards",
        description: "Large cards with images and descriptions. Visual and engaging.",
        preview: { layout: "card-grid", style: "visual", elements: ["image-cards", "overlaid-text", "hover-effects"] },
        bestFor: ["restaurant", "travel", "fitness", "beauty", "real-estate"],
      },
      {
        id: "services4",
        name: "Side-by-Side",
        description: "Alternating left-right layout with images. Storytelling approach.",
        preview: { layout: "alternating", style: "storytelling", elements: ["image-left", "text-right", "alternating"] },
        bestFor: ["consulting", "healthcare", "education", "real-estate"],
      },
    ],
  },
  {
    category: "portfolio",
    label: "Portfolio / Work Section",
    description: "Show your best work or projects.",
    required: false,
    options: [
      {
        id: "portfolio1",
        name: "Grid Gallery",
        description: "Clean grid of portfolio items with hover effects.",
        preview: { layout: "masonry-grid", style: "hover-overlay", elements: ["image-grid", "hover-overlay", "project-titles"] },
        bestFor: ["agency", "creative", "portfolio", "real-estate"],
      },
      {
        id: "portfolio2",
        name: "Large Feature",
        description: "One large featured project at a time. Bold statement.",
        preview: { layout: "featured-single", style: "editorial", elements: ["large-image", "project-details", "navigation"] },
        bestFor: ["agency", "architecture", "consulting"],
      },
      {
        id: "portfolio3",
        name: "Category Filter",
        description: "Filterable grid by category. Great for diverse portfolios.",
        preview: { layout: "filterable-grid", style: "interactive", elements: ["filter-tabs", "image-grid", "category-tags"] },
        bestFor: ["agency", "creative", "technology", "real-estate"],
      },
    ],
  },
  {
    category: "testimonials",
    label: "Testimonials Section",
    description: "Build trust with client reviews and testimonials.",
    required: false,
    options: [
      {
        id: "testimonials1",
        name: "Quote Wall",
        description: "Large quotes in a varied grid. Emphasizes individual testimonials.",
        preview: { layout: "varied-grid", style: "editorial", elements: ["large-quotes", "author-info", "star-ratings"] },
        bestFor: ["agency", "consulting", "healthcare", "education"],
      },
      {
        id: "testimonials2",
        name: "Carousel",
        description: "One testimonial at a time with navigation. Clean and focused.",
        preview: { layout: "single-carousel", style: "minimal", elements: ["quote-carousel", "author-photo", "navigation-dots"] },
        bestFor: ["technology", "finance", "local-business", "restaurant"],
      },
      {
        id: "testimonials3",
        name: "Logo + Quote",
        description: "Client logos with quotes. Great for B2B credibility.",
        preview: { layout: "logo-grid", style: "corporate", elements: ["client-logos", "quote-cards", "company-names"] },
        bestFor: ["agency", "consulting", "technology", "finance"],
      },
    ],
  },
  {
    category: "pricing",
    label: "Pricing Section",
    description: "Display your pricing plans or packages clearly.",
    required: false,
    options: [
      {
        id: "pricing1",
        name: "Three-Tier Cards",
        description: "Three pricing cards side by side. The classic pricing layout.",
        preview: { layout: "3-column-cards", style: "clean", elements: ["price-cards", "feature-lists", "cta-buttons"] },
        bestFor: ["technology", "education", "consulting", "agency"],
      },
      {
        id: "pricing2",
        name: "Comparison Table",
        description: "Feature comparison table. Best for complex pricing.",
        preview: { layout: "comparison-table", style: "structured", elements: ["feature-matrix", "checkmarks", "pricing-row"] },
        bestFor: ["technology", "saas", "education"],
      },
    ],
  },
  {
    category: "faq",
    label: "FAQ Section",
    description: "Answer common questions and reduce support load.",
    required: false,
    options: [
      {
        id: "faq1",
        name: "Accordion",
        description: "Expandable accordion list. Clean and space-efficient.",
        preview: { layout: "accordion-list", style: "minimal", elements: ["expandable-items", "plus-icons", "smooth-animation"] },
        bestFor: ["all"],
      },
      {
        id: "faq2",
        name: "Grid Columns",
        description: "FAQ in two or three columns. Scannable layout.",
        preview: { layout: "multi-column", style: "structured", elements: ["column-layout", "question-answers", "categories"] },
        bestFor: ["technology", "education", "healthcare"],
      },
    ],
  },
  {
    category: "cta",
    label: "Call-to-Action Section",
    description: "Drive visitors to take the next step.",
    required: false,
    options: [
      {
        id: "cta1",
        name: "Dark Statement",
        description: "Full-width dark section with large text. High impact.",
        preview: { layout: "full-width-dark", style: "bold", elements: ["large-headline", "subtext", "cta-button"] },
        bestFor: ["agency", "consulting", "technology", "portfolio"],
      },
      {
        id: "cta2",
        name: "Gradient Banner",
        description: "Colorful gradient background with centered content.",
        preview: { layout: "full-width-gradient", style: "vibrant", elements: ["gradient-bg", "headline", "cta-button"] },
        bestFor: ["restaurant", "fitness", "travel", "education", "beauty"],
      },
    ],
  },
  {
    category: "contact",
    label: "Contact Section",
    description: "Make it easy for visitors to reach you.",
    required: false,
    options: [
      {
        id: "contact1",
        name: "Form + Info",
        description: "Contact form with business details side by side.",
        preview: { layout: "split-form-info", style: "clean", elements: ["contact-form", "business-info", "map"] },
        bestFor: ["all"],
      },
      {
        id: "contact2",
        name: "Full Map",
        description: "Large map with contact overlay. Great for local businesses.",
        preview: { layout: "map-background", style: "location-focused", elements: ["full-map", "contact-overlay", "address-info"] },
        bestFor: ["restaurant", "real-estate", "healthcare", "local-business"],
      },
    ],
  },
  {
    category: "footer",
    label: "Footer",
    description: "The bottom of your website. Choose a style.",
    required: true,
    options: [
      {
        id: "footer1",
        name: "Rich Footer",
        description: "Full footer with brand info, navigation, and contact details.",
        preview: { layout: "3-column", style: "rich", elements: ["brand-info", "navigation", "contact", "social-links"] },
        bestFor: ["agency", "consulting", "technology", "education"],
      },
      {
        id: "footer2",
        name: "Compact Horizontal",
        description: "Single-row compact footer. Clean and minimal.",
        preview: { layout: "single-row", style: "compact", elements: ["brand", "inline-links", "social-icons"] },
        bestFor: ["portfolio", "creative", "luxury"],
      },
      {
        id: "footer3",
        name: "Minimal",
        description: "Just the essentials. Brand name, links, copyright.",
        preview: { layout: "minimal-row", style: "minimal", elements: ["brand-name", "simple-links", "copyright"] },
        bestFor: ["portfolio", "editorial", "luxury"],
      },
    ],
  },
  {
    category: "about",
    label: "About Section",
    description: "Tell your story and build trust.",
    required: false,
    options: [
      {
        id: "about1",
        name: "Story + Values",
        description: "Company story with mission and values.",
        preview: { layout: "story-values", style: "editorial", elements: ["company-story", "mission-values", "team-preview"] },
        bestFor: ["agency", "consulting", "healthcare", "education"],
      },
      {
        id: "about2",
        name: "Stats + Image",
        description: "Large image with statistics overlay. Visual and impactful.",
        preview: { layout: "image-stats", style: "visual", elements: ["large-image", "statistics", "brief-description"] },
        bestFor: ["technology", "finance", "real-estate", "restaurant"],
      },
    ],
  },
  {
    category: "gallery",
    label: "Gallery Section",
    description: "Showcase images of your work, space, or products.",
    required: false,
    options: [
      {
        id: "gallery1",
        name: "Grid Gallery",
        description: "Clean image grid with lightbox.",
        preview: { layout: "image-grid", style: "clean", elements: ["image-grid", "lightbox", "hover-effects"] },
        bestFor: ["restaurant", "real-estate", "fitness", "beauty", "travel"],
      },
      {
        id: "gallery2",
        name: "Masonry",
        description: "Pinterest-style masonry layout. Dynamic and modern.",
        preview: { layout: "masonry", style: "dynamic", elements: ["varied-heights", "hover-overlay", "category-filters"] },
        bestFor: ["portfolio", "creative", "restaurant", "travel"],
      },
    ],
  },
  {
    category: "blog",
    label: "Blog Section",
    description: "Share articles and insights.",
    required: false,
    options: [
      {
        id: "blog1",
        name: "Card Grid",
        description: "Blog posts in a card grid layout. Modern and scannable.",
        preview: { layout: "card-grid", style: "modern", elements: ["post-cards", "thumbnails", "excerpts", "read-more"] },
        bestFor: ["technology", "education", "consulting", "agency"],
      },
      {
        id: "blog2",
        name: "List View",
        description: "Blog posts in a vertical list. Clean and readable.",
        preview: { layout: "vertical-list", style: "editorial", elements: ["post-list", "thumbnails", "excerpts", "dates"] },
        bestFor: ["consulting", "healthcare", "finance", "local-business"],
      },
    ],
  },
];

export const COMPONENT_MAP: Record<string, Record<string, string>> = {
  navbar: { navbar1: "Navbar1", navbar2: "Navbar2", navbar3: "Navbar3" },
  hero: { hero1: "Hero1", hero2: "Hero2", hero3: "Hero3", hero4: "Hero4", hero5: "Hero5" },
  services: { services1: "Services1", services2: "Services2", services3: "Services3", services4: "Services4" },
  portfolio: { portfolio1: "Portfolio1", portfolio2: "Portfolio2", portfolio3: "Portfolio3" },
  testimonials: { testimonials1: "Testimonials1", testimonials2: "Testimonials2", testimonials3: "Testimonials3" },
  pricing: { pricing1: "Pricing1", pricing2: "Pricing2" },
  faq: { faq1: "FAQ1", faq2: "FAQ2" },
  cta: { cta1: "CTA1", cta2: "CTA2" },
  contact: { contact1: "Contact1", contact2: "Contact2" },
  footer: { footer1: "Footer1", footer2: "Footer2", footer3: "Footer3" },
  about: { about1: "About1", about2: "About2" },
  gallery: { gallery1: "Gallery1", gallery2: "Gallery2" },
  blog: { blog1: "BlogPreview", blog2: "BlogGrid" },
};
