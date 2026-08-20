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
  {
    category: "about_story",
    label: "Company Story Layout",
    description: "How your journey and mission are presented.",
    required: false,
    options: [
      {
        id: "about_story1",
        name: "Split with Image",
        description: "Photo on one side, story and stats on the other.",
        preview: { layout: "image-split", style: "editorial", elements: ["image", "headline", "content", "stat-grid"] },
        bestFor: ["agency", "consulting", "real-estate", "portfolio"],
      },
      {
        id: "about_story2",
        name: "Centered Statement",
        description: "No image - a centered pull-quote style story with inline stats.",
        preview: { layout: "centered", style: "minimal", elements: ["headline", "content", "inline-stats"] },
        bestFor: ["consulting", "technology", "finance", "luxury"],
      },
    ],
  },
  {
    category: "about_values",
    label: "Values Layout",
    description: "How your mission and values are displayed.",
    required: false,
    options: [
      {
        id: "about_values1",
        name: "Numbered Grid",
        description: "Bordered grid with large index numbers. Editorial and structured.",
        preview: { layout: "bordered-grid", style: "editorial", elements: ["numbered-cards"] },
        bestFor: ["agency", "consulting", "portfolio", "finance"],
      },
      {
        id: "about_values2",
        name: "Icon Cards",
        description: "Rounded cards with icon badges. Friendly and approachable.",
        preview: { layout: "card-grid", style: "visual", elements: ["icon-cards", "shadow"] },
        bestFor: ["healthcare", "education", "restaurant", "local-business"],
      },
    ],
  },
  {
    category: "team",
    label: "Team Layout",
    description: "How team member profiles are displayed.",
    required: false,
    options: [
      {
        id: "team1",
        name: "Photo Grid",
        description: "Full-bleed square photos in a bordered grid. Editorial.",
        preview: { layout: "bordered-grid", style: "editorial", elements: ["square-photos", "name", "role", "bio"] },
        bestFor: ["agency", "consulting", "portfolio", "creative"],
      },
      {
        id: "team2",
        name: "Circular Avatars",
        description: "Centered circular avatars in a clean row. Warm and approachable.",
        preview: { layout: "centered-grid", style: "friendly", elements: ["circle-avatars", "name", "role"] },
        bestFor: ["healthcare", "education", "restaurant", "local-business"],
      },
    ],
  },
  {
    category: "stats",
    label: "Statistics Layout",
    description: "How key numbers and achievements are shown.",
    required: false,
    options: [
      {
        id: "stats1",
        name: "Bordered Grid",
        description: "Light background with a bordered stat grid. Clean and structured.",
        preview: { layout: "bordered-grid", style: "editorial", elements: ["stat-grid"] },
        bestFor: ["agency", "consulting", "portfolio", "finance"],
      },
      {
        id: "stats2",
        name: "Bold Band",
        description: "Full-width inverted dark band with large numbers. High impact.",
        preview: { layout: "inverted-band", style: "bold", elements: ["large-numbers"] },
        bestFor: ["technology", "fitness", "startup", "automotive"],
      },
    ],
  },
  {
    category: "timeline",
    label: "Timeline Layout",
    description: "How company milestones are presented.",
    required: false,
    options: [
      {
        id: "timeline1",
        name: "Vertical List",
        description: "A simple left-bordered vertical list of milestones.",
        preview: { layout: "vertical-list", style: "minimal", elements: ["year", "title", "description"] },
        bestFor: ["consulting", "finance", "healthcare", "local-business"],
      },
      {
        id: "timeline2",
        name: "Alternating",
        description: "Milestones alternate left and right along a center line.",
        preview: { layout: "alternating", style: "editorial", elements: ["year", "title", "description", "center-line"] },
        bestFor: ["agency", "portfolio", "creative", "real-estate"],
      },
    ],
  },
  {
    category: "why_choose_us",
    label: "Why Choose Us Layout",
    description: "How your reasons/benefits are presented.",
    required: false,
    options: [
      {
        id: "why_choose_us1",
        name: "Inverted List",
        description: "Dark, full-bleed section with a numbered list. Bold and editorial.",
        preview: { layout: "split-list", style: "inverted", elements: ["numbered-list"] },
        bestFor: ["agency", "technology", "consulting", "finance"],
      },
      {
        id: "why_choose_us2",
        name: "Icon Cards",
        description: "Light background with rounded icon cards. Friendly and approachable.",
        preview: { layout: "card-grid", style: "visual", elements: ["icon-cards", "shadow"] },
        bestFor: ["healthcare", "education", "restaurant", "local-business"],
      },
    ],
  },
  {
    category: "business_hours",
    label: "Business Hours Layout",
    description: "How your operating hours are displayed.",
    required: false,
    options: [
      {
        id: "business_hours1",
        name: "Simple List",
        description: "A clean bordered list of days and hours.",
        preview: { layout: "vertical-list", style: "minimal", elements: ["day", "hours"] },
        bestFor: ["local-business", "healthcare", "restaurant", "consulting"],
      },
      {
        id: "business_hours2",
        name: "Inverted Grid",
        description: "Dark full-bleed section with hours in a card grid.",
        preview: { layout: "card-grid", style: "inverted", elements: ["day-cards"] },
        bestFor: ["restaurant", "fitness", "local-business", "beauty"],
      },
    ],
  },
  {
    category: "contact_info",
    label: "Contact Info Layout",
    description: "How your contact methods are displayed.",
    required: false,
    options: [
      {
        id: "contact_info1",
        name: "Bordered Grid",
        description: "Contact methods in a clean bordered grid.",
        preview: { layout: "bordered-grid", style: "editorial", elements: ["method-cards"] },
        bestFor: ["agency", "consulting", "portfolio", "finance"],
      },
      {
        id: "contact_info2",
        name: "Stacked Cards",
        description: "Contact methods as a vertical list of icon cards.",
        preview: { layout: "vertical-list", style: "visual", elements: ["icon-rows"] },
        bestFor: ["healthcare", "education", "restaurant", "local-business"],
      },
    ],
  },
  {
    category: "map",
    label: "Map Layout",
    description: "How your location map is displayed.",
    required: false,
    options: [
      {
        id: "map1",
        name: "Full Width",
        description: "A large, full-width map panel.",
        preview: { layout: "full-width", style: "minimal", elements: ["map"] },
        bestFor: ["local-business", "real-estate", "healthcare", "restaurant"],
      },
      {
        id: "map2",
        name: "Rounded Card",
        description: "A rounded, shadowed map card with more breathing room.",
        preview: { layout: "contained-card", style: "visual", elements: ["map", "shadow"] },
        bestFor: ["agency", "consulting", "portfolio", "beauty"],
      },
    ],
  },
  {
    category: "course_grid",
    label: "Grid Layout",
    description: "How your listings (courses, rooms, packages, or programs) are displayed.",
    required: false,
    options: [
      {
        id: "course_grid1",
        name: "Card Grid",
        description: "A responsive grid of cards with image, details, and price.",
        preview: { layout: "card-grid", style: "clean", elements: ["image", "title", "price"] },
        bestFor: ["education", "fitness", "travel", "real-estate"],
      },
      {
        id: "course_grid2",
        name: "Listing Rows",
        description: "A vertical list of wide rows - image, details, and price side by side.",
        preview: { layout: "row-list", style: "editorial", elements: ["image", "title", "price"] },
        bestFor: ["real-estate", "travel", "education", "fitness"],
      },
    ],
  },
  {
    category: "process",
    label: "Process Layout",
    description: "How your process/workflow steps are presented.",
    required: false,
    options: [
      {
        id: "process1",
        name: "Stacked Steps",
        description: "Steps stacked vertically as wide cards with a number badge.",
        preview: { layout: "vertical-list", style: "clean", elements: ["number", "title", "description"] },
        bestFor: ["agency", "consulting", "technology", "real-estate"],
      },
      {
        id: "process2",
        name: "Connected Flow",
        description: "Steps in a row connected by arrows - reads left to right like a flowchart.",
        preview: { layout: "horizontal-flow", style: "visual", elements: ["number", "title", "arrow"] },
        bestFor: ["technology", "agency", "education", "consulting"],
      },
    ],
  },
  {
    category: "daily_specials",
    label: "Daily Specials Layout",
    description: "How today's specials are displayed.",
    required: false,
    options: [
      {
        id: "daily_specials1",
        name: "Bold Banner",
        description: "A vivid full-width gradient banner with special cards.",
        preview: { layout: "card-grid", style: "vibrant", elements: ["gradient-bg", "cards"] },
        bestFor: ["restaurant"],
      },
      {
        id: "daily_specials2",
        name: "Simple List",
        description: "A clean, restrained list - better fit for upscale or minimal menus.",
        preview: { layout: "vertical-list", style: "minimal", elements: ["tag", "price"] },
        bestFor: ["restaurant"],
      },
    ],
  },
  {
    category: "agents",
    label: "Agents Layout",
    description: "How your agent profiles are displayed.",
    required: false,
    options: [
      {
        id: "agents1",
        name: "Photo Grid",
        description: "Centered circular photos in a clean grid.",
        preview: { layout: "centered-grid", style: "clean", elements: ["circle-avatars", "name", "specialty"] },
        bestFor: ["real-estate"],
      },
      {
        id: "agents2",
        name: "Contact Cards",
        description: "Bordered cards with photo and details side by side.",
        preview: { layout: "card-list", style: "visual", elements: ["avatar", "name", "specialty"] },
        bestFor: ["real-estate"],
      },
    ],
  },
  {
    category: "destination_grid",
    label: "Destinations Layout",
    description: "How your destinations are displayed.",
    required: false,
    options: [
      {
        id: "destination_grid1",
        name: "Overlay Cards",
        description: "Photo cards with the name overlaid at the bottom. Travel-magazine feel.",
        preview: { layout: "card-grid", style: "visual", elements: ["image", "overlay-text"] },
        bestFor: ["travel"],
      },
      {
        id: "destination_grid2",
        name: "Framed Cards",
        description: "Photo above, name and price below in a clean bordered card.",
        preview: { layout: "card-grid", style: "clean", elements: ["image", "title", "price-pill"] },
        bestFor: ["travel"],
      },
    ],
  },
  {
    category: "travel_deals",
    label: "Travel Deals Layout",
    description: "How your travel deals are displayed.",
    required: false,
    options: [
      {
        id: "travel_deals1",
        name: "Card Grid",
        description: "A grid of deal cards with a discount badge.",
        preview: { layout: "card-grid", style: "clean", elements: ["image", "discount-badge", "price"] },
        bestFor: ["travel"],
      },
      {
        id: "travel_deals2",
        name: "Listing Rows",
        description: "A vertical list of wide rows - easier to scan a long list of deals.",
        preview: { layout: "row-list", style: "editorial", elements: ["image", "discount-badge", "price"] },
        bestFor: ["travel"],
      },
    ],
  },
  {
    category: "doctors",
    label: "Doctors Layout",
    description: "How your doctor profiles are displayed.",
    required: false,
    options: [
      {
        id: "doctors1",
        name: "Profile Cards",
        description: "Bordered cards with a rectangular photo. Clinical and structured.",
        preview: { layout: "card-grid", style: "clean", elements: ["image", "name", "specialty"] },
        bestFor: ["healthcare"],
      },
      {
        id: "doctors2",
        name: "Circular Photos",
        description: "Centered circular photos in a clean grid. Warmer and more personal.",
        preview: { layout: "centered-grid", style: "friendly", elements: ["circle-photo", "name", "specialty"] },
        bestFor: ["healthcare"],
      },
    ],
  },
  {
    category: "instructors",
    label: "Instructors Layout",
    description: "How your instructor profiles are displayed.",
    required: false,
    options: [
      {
        id: "instructors1",
        name: "Photo Grid",
        description: "Centered circular photos in a clean grid.",
        preview: { layout: "centered-grid", style: "clean", elements: ["circle-avatars", "name", "specialty"] },
        bestFor: ["education"],
      },
      {
        id: "instructors2",
        name: "Contact Cards",
        description: "Bordered cards with photo and details side by side.",
        preview: { layout: "card-list", style: "visual", elements: ["avatar", "name", "specialty"] },
        bestFor: ["education"],
      },
    ],
  },
  {
    category: "menu_items",
    label: "Menu Layout",
    description: "How your menu items are displayed.",
    required: false,
    options: [
      {
        id: "menu_items1",
        name: "Photo Cards",
        description: "Bordered cards with a photo, name, description, and price.",
        preview: { layout: "card-grid", style: "visual", elements: ["image", "name", "price"] },
        bestFor: ["restaurant"],
      },
      {
        id: "menu_items2",
        name: "Classic List",
        description: "A classic printed-menu look - name, dotted leader line, price. No photos.",
        preview: { layout: "vertical-list", style: "editorial", elements: ["name", "dotted-line", "price"] },
        bestFor: ["restaurant"],
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
  // The About page's own sections (Company Story, Values, Team, Statistics,
  // Timeline) never had a layout choice at all, unlike every Home page
  // section - picking a design style changed colors/fonts but these five
  // always rendered the exact same fixed layout.
  about_story: { about_story1: "AboutStory", about_story2: "AboutStory2" },
  about_values: { about_values1: "AboutValues", about_values2: "AboutValues2" },
  team: { team1: "TeamSection", team2: "TeamSection2" },
  stats: { stats1: "Stats", stats2: "Stats2" },
  timeline: { timeline1: "Timeline", timeline2: "Timeline2" },
  // Same gap: Why Choose Us, Business Hours, Contact Info, and Map never
  // had a layout choice either.
  why_choose_us: { why_choose_us1: "WhyChooseUs", why_choose_us2: "WhyChooseUs2" },
  business_hours: { business_hours1: "BusinessHours", business_hours2: "BusinessHours2" },
  contact_info: { contact_info1: "ContactInfo", contact_info2: "ContactInfo2" },
  map: { map1: "MapEmbed", map2: "MapEmbed2" },
  // Course Grid / Rooms & Suites / Travel Packages / Programs all share this
  // same card-grid component family server-side (a title/description/
  // price/duration listing fits all four content types structurally), so
  // one shared category covers all of them.
  course_grid: { course_grid1: "CourseGrid", course_grid2: "CourseGrid2" },
  process: { process1: "LearningPaths", process2: "LearningPaths2" },
  daily_specials: { daily_specials1: "DailySpecials", daily_specials2: "DailySpecials2" },
  agents: { agents1: "AgentProfiles", agents2: "AgentProfiles2" },
  destination_grid: { destination_grid1: "DestinationGrid", destination_grid2: "DestinationGrid2" },
  travel_deals: { travel_deals1: "TravelDeals", travel_deals2: "TravelDeals2" },
  doctors: { doctors1: "DoctorProfiles", doctors2: "DoctorProfiles2" },
  instructors: { instructors1: "InstructorProfiles", instructors2: "InstructorProfiles2" },
  menu_items: { menu_items1: "MenuHighlights", menu_items2: "MenuHighlights2" },
};
