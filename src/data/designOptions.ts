export interface DesignStyleOption {
  id: string;
  name: string;
  description: string;
  preview: {
    colors: string[];
    fontFamily: string;
    borderRadius: string;
    mood: string;
  };
  bestFor: string[];
}

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  description: string;
}

export interface TypographyOption {
  id: string;
  name: string;
  fontFamily: string;
  description: string;
  preview: {
    heading: string;
    body: string;
  };
}

export const DESIGN_STYLES: DesignStyleOption[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, focused, with lots of whitespace. Lets content breathe.",
    preview: { colors: ["#111111", "#FFFFFF", "#F5F5F5"], fontFamily: "Inter", borderRadius: "4px", mood: "clean" },
    bestFor: ["portfolio", "luxury", "technology", "agency"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with bold elements and clean lines.",
    preview: { colors: ["#2563EB", "#FFFFFF", "#F8FAFC"], fontFamily: "Inter", borderRadius: "8px", mood: "professional" },
    bestFor: ["technology", "agency", "consulting", "education"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "High-end feel with sophisticated typography and spacing.",
    preview: { colors: ["#1A1A2E", "#E94560", "#F5F5F5"], fontFamily: "Playfair Display", borderRadius: "2px", mood: "luxurious" },
    bestFor: ["consulting", "finance", "real-estate", "luxury"],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and trustworthy. Classic business appearance.",
    preview: { colors: ["#1E3A5F", "#4A90D9", "#FFFFFF"], fontFamily: "Source Sans 3", borderRadius: "4px", mood: "trustworthy" },
    bestFor: ["finance", "healthcare", "legal", "consulting"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive and unique. Stands out from the crowd.",
    preview: { colors: ["#FF6B35", "#004E89", "#1A1A2E"], fontFamily: "Poppins", borderRadius: "12px", mood: "energetic" },
    bestFor: ["agency", "portfolio", "creative", "education"],
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Elegant and refined. Gold accents and serif typography.",
    preview: { colors: ["#0A0A0A", "#C9A96E", "#FFFFFF"], fontFamily: "Playfair Display", borderRadius: "0px", mood: "sophisticated" },
    bestFor: ["luxury", "beauty", "jewelry", "real-estate"],
  },
  {
    id: "friendly",
    name: "Friendly",
    description: "Warm and approachable. Makes visitors feel welcome.",
    preview: { colors: ["#FF8C42", "#00B4D8", "#FAFAFA"], fontFamily: "Nunito", borderRadius: "16px", mood: "welcoming" },
    bestFor: ["restaurant", "healthcare", "education", "local-business"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Clean and authoritative. Builds instant credibility.",
    preview: { colors: ["#2D3436", "#0984E3", "#FFFFFF"], fontFamily: "Lato", borderRadius: "6px", mood: "credible" },
    bestFor: ["consulting", "finance", "legal", "healthcare"],
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast with strong typography. Commands attention.",
    preview: { colors: ["#000000", "#FF0000", "#FFFFFF"], fontFamily: "Montserrat", borderRadius: "0px", mood: "powerful" },
    bestFor: ["technology", "fitness", "automotive", "agency"],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Graceful and refined. Subtle beauty in every detail.",
    preview: { colors: ["#2C3E50", "#E74C3C", "#ECF0F1"], fontFamily: "Cormorant Garamond", borderRadius: "8px", mood: "graceful" },
    bestFor: ["beauty", "travel", "restaurant", "real-estate"],
  },
  {
    id: "tech",
    name: "Tech / SaaS",
    description: "Modern tech feel. Gradient accents and dark mode ready.",
    preview: { colors: ["#0F172A", "#6366F1", "#10B981"], fontFamily: "Inter", borderRadius: "12px", mood: "innovative" },
    bestFor: ["technology", "startup", "saas", "agency"],
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-inspired. Strong typography hierarchy.",
    preview: { colors: ["#1A1A1A", "#D4AF37", "#FAFAFA"], fontFamily: "Playfair Display", borderRadius: "2px", mood: "sophisticated" },
    bestFor: ["portfolio", "creative", "luxury", "consulting"],
  },
];

export const COLOR_PALETTES: ColorPalette[] = [
  { name: "Ocean Blue", primary: "#2563EB", secondary: "#1E40AF", accent: "#3B82F6", description: "Professional and trustworthy" },
  { name: "Forest Green", primary: "#059669", secondary: "#047857", accent: "#10B981", description: "Natural and growth-focused" },
  { name: "Sunset Orange", primary: "#EA580C", secondary: "#C2410C", accent: "#F97316", description: "Energetic and warm" },
  { name: "Royal Purple", primary: "#7C3AED", secondary: "#6D28D9", accent: "#8B5CF6", description: "Creative and premium" },
  { name: "Cherry Red", primary: "#DC2626", secondary: "#B91C1C", accent: "#EF4444", description: "Bold and passionate" },
  { name: "Midnight", primary: "#1E293B", secondary: "#0F172A", accent: "#334155", description: "Sleek and sophisticated" },
  { name: "Rose Gold", primary: "#BE185D", secondary: "#9D174D", accent: "#EC4899", description: "Elegant and feminine" },
  { name: "Teal", primary: "#0D9488", secondary: "#0F766E", accent: "#14B8A6", description: "Fresh and modern" },
  { name: "Amber", primary: "#D97706", secondary: "#B45309", accent: "#F59E0B", description: "Warm and inviting" },
  { name: "Indigo", primary: "#4F46E5", secondary: "#4338CA", accent: "#6366F1", description: "Trustworthy and calm" },
  { name: "Slate", primary: "#475569", secondary: "#334155", accent: "#64748B", description: "Neutral and versatile" },
  { name: "Emerald", primary: "#059669", secondary: "#047857", accent: "#34D399", description: "Fresh and natural" },
];

export const TYPOGRAPHY_OPTIONS: TypographyOption[] = [
  { id: "inter", name: "Modern Sans", fontFamily: "Inter", description: "Clean and highly readable. The go-to for modern web design.", preview: { heading: "Inter", body: "Aa Bb Cc 123" } },
  { id: "poppins", name: "Geometric Sans", fontFamily: "Poppins", description: "Friendly and approachable with geometric shapes.", preview: { heading: "Poppins", body: "Aa Bb Cc 123" } },
  { id: "playfair", name: "Elegant Serif", fontFamily: "Playfair Display", description: "Classic elegance with high contrast. Perfect for luxury.", preview: { heading: "Playfair Display", body: "Aa Bb Cc 123" } },
  { id: "montserrat", name: "Bold Sans", fontFamily: "Montserrat", description: "Strong and geometric. Great for headings.", preview: { heading: "Montserrat", body: "Aa Bb Cc 123" } },
  { id: "lato", name: "Friendly Sans", fontFamily: "Lato", description: "Warm and professional. Versatile across industries.", preview: { heading: "Lato", body: "Aa Bb Cc 123" } },
  { id: "roboto", name: "Neutral Sans", fontFamily: "Roboto", description: "Google's signature font. Clean and neutral.", preview: { heading: "Roboto", body: "Aa Bb Cc 123" } },
  { id: "merriweather", name: "Reading Serif", fontFamily: "Merriweather", description: "Designed for screens. Excellent for long content.", preview: { heading: "Merriweather", body: "Aa Bb Cc 123" } },
  { id: "cormorant", name: "Refined Serif", fontFamily: "Cormorant Garamond", description: "Delicate and sophisticated. High fashion feel.", preview: { heading: "Cormorant Garamond", body: "Aa Bb Cc 123" } },
  { id: "nunito", name: "Rounded Sans", fontFamily: "Nunito", description: "Rounded and friendly. Great for casual brands.", preview: { heading: "Nunito", body: "Aa Bb Cc 123" } },
  { id: "opensans", name: "Open Sans", fontFamily: "Open Sans", description: "Highly legible across all sizes. Professional.", preview: { heading: "Open Sans", body: "Aa Bb Cc 123" } },
];

export const BUSINESS_CATEGORIES = [
  { id: "restaurant", label: "Restaurant / Cafe", icon: "🍽️", suggestedPages: ["home", "menu", "about", "gallery", "contact"], suggestedSections: ["hero", "menu-highlights", "gallery", "testimonials", "contact"] },
  { id: "agency", label: "Digital Agency", icon: "🚀", suggestedPages: ["home", "about", "services", "portfolio", "blog", "contact"], suggestedSections: ["hero", "services", "portfolio", "testimonials", "cta"] },
  { id: "consulting", label: "Consulting", icon: "💼", suggestedPages: ["home", "about", "services", "case-studies", "testimonials", "contact"], suggestedSections: ["hero", "services", "stats", "testimonials", "cta"] },
  { id: "real-estate", label: "Real Estate", icon: "🏠", suggestedPages: ["home", "properties", "about", "contact"], suggestedSections: ["hero", "featured-properties", "search", "agents", "testimonials"] },
  { id: "healthcare", label: "Healthcare", icon: "🏥", suggestedPages: ["home", "services", "about", "doctors", "contact"], suggestedSections: ["hero", "services", "doctors", "testimonials", "contact"] },
  { id: "education", label: "Education", icon: "🎓", suggestedPages: ["home", "courses", "about", "blog", "contact"], suggestedSections: ["hero", "courses", "testimonials", "cta", "contact"] },
  { id: "fitness", label: "Fitness / Gym", icon: "💪", suggestedPages: ["home", "classes", "about", "pricing", "contact"], suggestedSections: ["hero", "classes", "pricing", "testimonials", "cta"] },
  { id: "travel", label: "Travel", icon: "✈️", suggestedPages: ["home", "destinations", "about", "blog", "contact"], suggestedSections: ["hero", "destinations", "testimonials", "cta", "contact"] },
  { id: "technology", label: "Technology / SaaS", icon: "💻", suggestedPages: ["home", "features", "pricing", "about", "blog", "contact"], suggestedSections: ["hero", "features", "pricing", "testimonials", "cta"] },
  { id: "finance", label: "Finance", icon: "💰", suggestedPages: ["home", "services", "about", "team", "contact"], suggestedSections: ["hero", "services", "stats", "testimonials", "cta"] },
  { id: "legal", label: "Legal", icon: "⚖️", suggestedPages: ["home", "services", "about", "team", "contact"], suggestedSections: ["hero", "services", "testimonials", "cta", "contact"] },
  { id: "beauty", label: "Beauty / Salon", icon: "💄", suggestedPages: ["home", "services", "about", "gallery", "contact"], suggestedSections: ["hero", "services", "gallery", "testimonials", "contact"] },
  { id: "automotive", label: "Automotive", icon: "🚗", suggestedPages: ["home", "inventory", "services", "about", "contact"], suggestedSections: ["hero", "inventory", "services", "testimonials", "contact"] },
  { id: "portfolio", label: "Portfolio / Creative", icon: "🎨", suggestedPages: ["home", "work", "about", "contact"], suggestedSections: ["hero", "portfolio", "about", "testimonials", "contact"] },
  { id: "startup", label: "Startup", icon: "🚀", suggestedPages: ["home", "features", "pricing", "about", "blog", "contact"], suggestedSections: ["hero", "features", "pricing", "testimonials", "cta"] },
  { id: "local-business", label: "Local Business", icon: "🏪", suggestedPages: ["home", "about", "services", "gallery", "contact"], suggestedSections: ["hero", "services", "gallery", "testimonials", "contact"] },
];

export const PAGE_SECTIONS: Record<string, Array<{ id: string; label: string; description: string }>> = {
  home: [
    { id: "about_story", label: "About Preview", description: "Brief about section" },
    { id: "services", label: "Services", description: "What you offer" },
    { id: "portfolio", label: "Portfolio", description: "Your best work" },
    { id: "testimonials", label: "Testimonials", description: "Client reviews" },
    { id: "why_choose_us", label: "Why Choose Us", description: "What sets you apart" },
    { id: "pricing", label: "Pricing", description: "Plans and packages" },
    { id: "faq", label: "FAQ", description: "Common questions" },
    { id: "blog_preview", label: "Blog Preview", description: "Latest articles" },
    { id: "cta", label: "Call to Action", description: "Drive conversions" },
    { id: "gallery", label: "Gallery", description: "Image showcase" },
    { id: "team", label: "Team", description: "Meet the team" },
  ],
  about: [
    { id: "story", label: "Company Story", description: "Your journey and mission" },
    { id: "values", label: "Values", description: "What you stand for" },
    { id: "team", label: "Team", description: "Meet the team" },
    { id: "stats", label: "Statistics", description: "Key achievements" },
    { id: "timeline", label: "Timeline", description: "Company milestones" },
  ],
  services: [
    { id: "services-list", label: "Services List", description: "All your services" },
    { id: "process", label: "Process", description: "How you work" },
    { id: "benefits", label: "Benefits", description: "Why choose you" },
    { id: "faq", label: "FAQ", description: "Service questions" },
    { id: "cta", label: "Call to Action", description: "Get started" },
  ],
  portfolio: [
    { id: "portfolio-grid", label: "Portfolio Grid", description: "Showcase your work" },
    { id: "categories", label: "Categories", description: "Filter by type" },
    { id: "process", label: "Process", description: "Your approach" },
    { id: "cta", label: "Call to Action", description: "Start a project" },
  ],
  contact: [
    { id: "contact-form", label: "Contact Form", description: "Get in touch form" },
    { id: "map", label: "Map", description: "Location map" },
    { id: "info", label: "Contact Info", description: "Address and details" },
    { id: "hours", label: "Business Hours", description: "Operating hours" },
  ],
  blog: [
    { id: "blog-grid", label: "Blog Grid", description: "Article listings" },
    { id: "categories", label: "Categories", description: "Article categories" },
    { id: "newsletter", label: "Newsletter", description: "Subscribe form" },
  ],
  pricing: [
    { id: "pricing-table", label: "Pricing Table", description: "Plans comparison" },
    { id: "faq", label: "FAQ", description: "Pricing questions" },
    { id: "cta", label: "Call to Action", description: "Get started" },
  ],
  menu: [
    { id: "menu-grid", label: "Menu Grid", description: "Food and drink items" },
    { id: "specials", label: "Daily Specials", description: "Today's featured items" },
    { id: "gallery", label: "Food Gallery", description: "Food photography" },
  ],
  properties: [
    { id: "agents", label: "Agents", description: "Meet our agents" },
  ],
  courses: [
    { id: "course-grid", label: "Course Grid", description: "Available courses" },
    { id: "features", label: "Features", description: "What's included" },
    { id: "testimonials", label: "Testimonials", description: "Student reviews" },
  ],
  classes: [
    { id: "class-schedule", label: "Class Schedule", description: "Weekly timetable" },
    { id: "trainers", label: "Trainers", description: "Meet our trainers" },
    { id: "pricing", label: "Pricing", description: "Membership plans" },
  ],
  destinations: [
    { id: "destination-grid", label: "Destinations", description: "Popular destinations" },
    { id: "deals", label: "Travel Deals", description: "Special offers" },
    { id: "testimonials", label: "Reviews", description: "Traveler reviews" },
  ],
  features: [
    { id: "feature-grid", label: "Feature Grid", description: "All features" },
    { id: "benefits", label: "Benefits", description: "Why choose us" },
    { id: "testimonials", label: "Testimonials", description: "User reviews" },
  ],
  inventory: [
    { id: "inventory-grid", label: "Inventory Grid", description: "Available items" },
    { id: "testimonials", label: "Reviews", description: "Customer reviews" },
  ],
  faq: [
    { id: "faq", label: "FAQ", description: "Frequently asked questions" },
    { id: "cta", label: "Call to Action", description: "Get in touch" },
  ],
  testimonials: [
    { id: "testimonials", label: "Testimonials", description: "Client reviews and stories" },
    { id: "cta", label: "Call to Action", description: "Get started" },
  ],
  team: [
    { id: "team", label: "Team Members", description: "Meet the team" },
    { id: "cta", label: "Call to Action", description: "Work with us" },
  ],
  gallery: [
    { id: "gallery", label: "Gallery", description: "Image showcase" },
    { id: "cta", label: "Call to Action", description: "Get in touch" },
  ],
};

