export interface BusinessTypeConfig {
  label: string;
  icon: string;
  suggestedPages: string[];
  suggestedSections: string[];
  suggestedFeatures: string[];
  suggestedComponents: Record<string, string>;
  colorSchemes: Array<{ primary: string; secondary: string; label: string }>;
  designStyle: {
    themeStyle: string;
    fontStyle: string;
    typography: string;
  };
  metaDefaults: {
    titleTemplate: string;
    descriptionTemplate: string;
  };
}

export const BUSINESS_TYPES: Record<string, BusinessTypeConfig> = {
  restaurant: {
    label: "Restaurant & Food",
    icon: "\uD83C\uDF7D\uFE0F",
    suggestedPages: ["home", "menu", "about", "gallery", "contact"],
    suggestedSections: ["hero", "menu-highlights", "gallery", "testimonials", "contact"],
    suggestedFeatures: ["Online Ordering", "Reservation System", "Loyalty Program", "Gift Cards", "Catering Inquiry"],
    suggestedComponents: { hero: "hero4", services: "services3", gallery: "gallery1", testimonials: "testimonials2", footer: "footer1" },
    colorSchemes: [
      { primary: "#D84315", secondary: "#FFCCBC", label: "Warm Terracotta" },
      { primary: "#33691E", secondary: "#DCEDC8", label: "Fresh Garden" },
      { primary: "#BF360C", secondary: "#FF8A65", label: "Bold Spice" },
      { primary: "#4E342E", secondary: "#D7CCC8", label: "Rustic Wood" },
    ],
    designStyle: { themeStyle: "friendly", fontStyle: "Open Sans", typography: "opensans" },
    metaDefaults: {
      titleTemplate: "{brandName} - Restaurant | Order Online",
      descriptionTemplate: "Experience the finest cuisine at {brandName}. Dine-in, takeaway & delivery. Reserve your table today.",
    },
  },
  agency: {
    label: "Digital Agency",
    icon: "\uD83D\uDE80",
    suggestedPages: ["home", "about", "services", "portfolio", "blog", "contact"],
    suggestedSections: ["hero", "services", "portfolio", "testimonials", "cta"],
    suggestedFeatures: ["Case Studies", "Client Logos", "Process Section", "Team Section", "Blog"],
    suggestedComponents: { hero: "hero1", services: "services1", portfolio: "portfolio1", testimonials: "testimonials1", footer: "footer1" },
    colorSchemes: [
      { primary: "#2563EB", secondary: "#DBEAFE", label: "Professional Blue" },
      { primary: "#7C3AED", secondary: "#EDE9FE", label: "Creative Purple" },
      { primary: "#0EA5E9", secondary: "#E0F2FE", label: "Sky Blue" },
      { primary: "#1E293B", secondary: "#F1F5F9", label: "Slate Dark" },
    ],
    designStyle: { themeStyle: "modern", fontStyle: "Inter", typography: "inter" },
    metaDefaults: {
      titleTemplate: "{brandName} - Digital Agency | Web Design & Marketing",
      descriptionTemplate: "Transform your digital presence with {brandName}. Web design, SEO, and marketing services. Get a free consultation.",
    },
  },
  consulting: {
    label: "Consulting",
    icon: "\uD83D\uDCBC",
    suggestedPages: ["home", "about", "services", "case-studies", "testimonials", "contact"],
    suggestedSections: ["hero", "services", "stats", "testimonials", "cta"],
    suggestedFeatures: ["Case Studies", "Process Section", "Team Section", "Newsletter", "Resources"],
    suggestedComponents: { hero: "hero2", services: "services1", testimonials: "testimonials3", cta: "cta1", footer: "footer1" },
    colorSchemes: [
      { primary: "#1E3A5F", secondary: "#E8EEF4", label: "Navy Trust" },
      { primary: "#2D3748", secondary: "#EDF2F7", label: "Corporate Grey" },
      { primary: "#276749", secondary: "#E6F3ED", label: "Growth Green" },
      { primary: "#744210", secondary: "#FDF3E5", label: "Amber Wisdom" },
    ],
    designStyle: { themeStyle: "professional", fontStyle: "Lato", typography: "lato" },
    metaDefaults: {
      titleTemplate: "{brandName} - Consulting Services | Strategic Solutions",
      descriptionTemplate: "Expert consulting from {brandName}. Strategic solutions for your business. Schedule a consultation today.",
    },
  },
  "real-estate": {
    label: "Real Estate",
    icon: "\uD83C\uDFE0",
    suggestedPages: ["home", "properties", "about", "contact"],
    suggestedSections: ["hero", "featured-properties", "search", "agents", "testimonials"],
    suggestedFeatures: ["Property Search", "Virtual Tours", "Mortgage Calculator", "Saved Searches", "Agent Matching"],
    suggestedComponents: { hero: "hero4", services: "services2", testimonials: "testimonials2", contact: "contact2", footer: "footer1" },
    colorSchemes: [
      { primary: "#1B5E20", secondary: "#E8F5E9", label: "Trust Green" },
      { primary: "#0D47A1", secondary: "#E3F2FD", label: "Professional Blue" },
      { primary: "#455A64", secondary: "#ECEFF1", label: "Elegant Grey" },
      { primary: "#3E2723", secondary: "#EFEBE9", label: "Classic Brown" },
    ],
    designStyle: { themeStyle: "professional", fontStyle: "Roboto", typography: "roboto" },
    metaDefaults: {
      titleTemplate: "{brandName} - Real Estate | Buy, Sell, Rent Properties",
      descriptionTemplate: "Find your dream property with {brandName}. Browse listings with virtual tours. Schedule a viewing today.",
    },
  },
  healthcare: {
    label: "Healthcare & Medical",
    icon: "\uD83C\uDFE5",
    suggestedPages: ["home", "services", "about", "doctors", "contact"],
    suggestedSections: ["hero", "services", "doctors", "testimonials", "contact"],
    suggestedFeatures: ["Appointment Booking", "Patient Portal", "Telehealth", "Health Blog", "Insurance Checker"],
    suggestedComponents: { hero: "hero2", services: "services2", testimonials: "testimonials1", contact: "contact1", footer: "footer1" },
    colorSchemes: [
      { primary: "#0277BD", secondary: "#E1F5FE", label: "Medical Blue" },
      { primary: "#00897B", secondary: "#E0F2F1", label: "Healing Teal" },
      { primary: "#2E7D32", secondary: "#E8F5E9", label: "Health Green" },
      { primary: "#37474F", secondary: "#ECEFF1", label: "Clinical Grey" },
    ],
    designStyle: { themeStyle: "corporate", fontStyle: "Source Sans Pro", typography: "opensans" },
    metaDefaults: {
      titleTemplate: "{brandName} - Healthcare & Medical Services | Book Now",
      descriptionTemplate: "Quality healthcare at {brandName}. Book your appointment today. Telehealth options available.",
    },
  },
  education: {
    label: "Education & Learning",
    icon: "\uD83C\uDF93",
    suggestedPages: ["home", "courses", "about", "blog", "contact"],
    suggestedSections: ["hero", "courses", "testimonials", "cta", "contact"],
    suggestedFeatures: ["Course Finder", "Free Trial", "Student Dashboard", "Community Forum", "Career Services"],
    suggestedComponents: { hero: "hero3", services: "services2", testimonials: "testimonials1", cta: "cta2", footer: "footer1" },
    colorSchemes: [
      { primary: "#1565C0", secondary: "#E3F2FD", label: "Academic Blue" },
      { primary: "#6A1B9A", secondary: "#F3E5F5", label: "Scholar Purple" },
      { primary: "#00695C", secondary: "#E0F2F1", label: "Growth Teal" },
      { primary: "#E65100", secondary: "#FFF3E0", label: "Energetic Orange" },
    ],
    designStyle: { themeStyle: "modern", fontStyle: "Poppins", typography: "poppins" },
    metaDefaults: {
      titleTemplate: "{brandName} - Online Courses & Learning | Enroll Now",
      descriptionTemplate: "Advance your career with {brandName}. Courses with certificates. Start learning today.",
    },
  },
  fitness: {
    label: "Fitness / Gym",
    icon: "\uD83D\uDCAA",
    suggestedPages: ["home", "classes", "about", "pricing", "contact"],
    suggestedSections: ["hero", "classes", "pricing", "testimonials", "cta"],
    suggestedFeatures: ["Class Schedule", "Trainer Profiles", "Membership Plans", "Booking System", "Progress Tracking"],
    suggestedComponents: { hero: "hero4", services: "services3", pricing: "pricing1", testimonials: "testimonials2", footer: "footer1" },
    colorSchemes: [
      { primary: "#D32F2F", secondary: "#FFEBEE", label: "Power Red" },
      { primary: "#1565C0", secondary: "#E3F2FD", label: "Active Blue" },
      { primary: "#2E7D32", secondary: "#E8F5E9", label: "Health Green" },
      { primary: "#FF6F00", secondary: "#FFF3E0", label: "Energy Orange" },
    ],
    designStyle: { themeStyle: "bold", fontStyle: "Montserrat", typography: "montserrat" },
    metaDefaults: {
      titleTemplate: "{brandName} - Fitness & Gym | Join Today",
      descriptionTemplate: "Transform your fitness at {brandName}. Classes, trainers, and modern equipment. Start your journey today.",
    },
  },
  travel: {
    label: "Travel & Tourism",
    icon: "\u2708\uFE0F",
    suggestedPages: ["home", "destinations", "about", "blog", "contact"],
    suggestedSections: ["hero", "destinations", "testimonials", "cta", "contact"],
    suggestedFeatures: ["Destination Guides", "Travel Deals", "Itinerary Builder", "Newsletter", "Travel Blog"],
    suggestedComponents: { hero: "hero4", services: "services3", testimonials: "testimonials2", cta: "cta2", footer: "footer1" },
    colorSchemes: [
      { primary: "#0277BD", secondary: "#E1F5FE", label: "Ocean Blue" },
      { primary: "#FF6F00", secondary: "#FFF3E0", label: "Sunset Orange" },
      { primary: "#00838F", secondary: "#E0F7FA", label: "Tropical Teal" },
      { primary: "#558B2F", secondary: "#F1F8E9", label: "Adventure Green" },
    ],
    designStyle: { themeStyle: "friendly", fontStyle: "Nunito", typography: "nunito" },
    metaDefaults: {
      titleTemplate: "{brandName} - Travel Deals & Vacation Packages | Book Now",
      descriptionTemplate: "Explore the world with {brandName}. Exclusive travel deals. Book your dream vacation today.",
    },
  },
  technology: {
    label: "Technology / SaaS",
    icon: "\uD83D\uDCBB",
    suggestedPages: ["home", "features", "pricing", "about", "blog", "contact"],
    suggestedSections: ["hero", "features", "pricing", "testimonials", "cta"],
    suggestedFeatures: ["Feature Comparison", "Pricing Table", "Demo Request", "API Docs", "Status Page"],
    suggestedComponents: { hero: "hero3", services: "services1", pricing: "pricing2", testimonials: "testimonials3", cta: "cta1" },
    colorSchemes: [
      { primary: "#6366F1", secondary: "#EEF2FF", label: "Indigo Tech" },
      { primary: "#0EA5E9", secondary: "#E0F2FE", label: "Sky Blue" },
      { primary: "#8B5CF6", secondary: "#EDE9FE", label: "Violet" },
      { primary: "#10B981", secondary: "#D1FAE5", label: "Emerald" },
    ],
    designStyle: { themeStyle: "tech", fontStyle: "Inter", typography: "inter" },
    metaDefaults: {
      titleTemplate: "{brandName} - SaaS Platform | Boost Your Productivity",
      descriptionTemplate: "The modern solution from {brandName}. Features, pricing, and more. Start your free trial today.",
    },
  },
  finance: {
    label: "Finance & Banking",
    icon: "\uD83D\uDCB0",
    suggestedPages: ["home", "services", "about", "team", "contact"],
    suggestedSections: ["hero", "services", "stats", "testimonials", "cta"],
    suggestedFeatures: ["Service Comparison", "Calculator Tools", "Security Info", "Client Portal", "Resources"],
    suggestedComponents: { hero: "hero3", services: "services1", testimonials: "testimonials3", cta: "cta1", footer: "footer1" },
    colorSchemes: [
      { primary: "#1E3A5F", secondary: "#E8EEF4", label: "Finance Navy" },
      { primary: "#2E7D32", secondary: "#E8F5E9", label: "Growth Green" },
      { primary: "#37474F", secondary: "#ECEFF1", label: "Corporate Grey" },
      { primary: "#4A148C", secondary: "#F3E5F5", label: "Premium Purple" },
    ],
    designStyle: { themeStyle: "corporate", fontStyle: "Source Sans Pro", typography: "opensans" },
    metaDefaults: {
      titleTemplate: "{brandName} - Financial Services | Plan Your Future",
      descriptionTemplate: "Expert financial services from {brandName}. Investment, planning, and advisory. Schedule a consultation.",
    },
  },
  beauty: {
    label: "Beauty & Salon",
    icon: "\uD83D\uDC84",
    suggestedPages: ["home", "services", "about", "gallery", "contact"],
    suggestedSections: ["hero", "services", "gallery", "testimonials", "contact"],
    suggestedFeatures: ["Online Booking", "Service Menu", "Before & After Gallery", "Product Recommendations", "Loyalty Program"],
    suggestedComponents: { hero: "hero4", services: "services3", gallery: "gallery1", testimonials: "testimonials2", footer: "footer2" },
    colorSchemes: [
      { primary: "#E91E63", secondary: "#FCE4EC", label: "Pink Luxe" },
      { primary: "#9C27B0", secondary: "#F3E5F5", label: "Plum Radiance" },
      { primary: "#F8BBD0", secondary: "#FFFFFF", label: "Soft Blush" },
      { primary: "#AD1457", secondary: "#FCE4EC", label: "Deep Rose" },
    ],
    designStyle: { themeStyle: "elegant", fontStyle: "Cormorant Garamond", typography: "cormorant" },
    metaDefaults: {
      titleTemplate: "{brandName} - Beauty & Salon | Book Your Appointment",
      descriptionTemplate: "Premium beauty services at {brandName}. Book your appointment today. Experience the difference.",
    },
  },
  portfolio: {
    label: "Portfolio / Creative",
    icon: "\uD83C\uDFA8",
    suggestedPages: ["home", "work", "about", "contact"],
    suggestedSections: ["hero", "portfolio", "about", "testimonials", "contact"],
    suggestedFeatures: ["Project Galleries", "Case Studies", "Process Page", "Download Resume", "Blog"],
    suggestedComponents: { hero: "hero5", portfolio: "portfolio1", about: "about1", testimonials: "testimonials1", footer: "footer3" },
    colorSchemes: [
      { primary: "#111111", secondary: "#F5F5F5", label: "Minimal Black" },
      { primary: "#7C3AED", secondary: "#EDE9FE", label: "Creative Purple" },
      { primary: "#FF6B35", secondary: "#FFF3E0", label: "Bold Orange" },
      { primary: "#0D9488", secondary: "#D1FAE5", label: "Teal Fresh" },
    ],
    designStyle: { themeStyle: "minimal", fontStyle: "Inter", typography: "inter" },
    metaDefaults: {
      titleTemplate: "{brandName} - Creative Portfolio | Design & Development",
      descriptionTemplate: "Explore the creative work of {brandName}. Web design, branding, and development. Let's work together.",
    },
  },
  "local-business": {
    label: "Local Business",
    icon: "\uD83C\uDFEA",
    suggestedPages: ["home", "about", "services", "gallery", "contact"],
    suggestedSections: ["hero", "services", "gallery", "testimonials", "contact"],
    suggestedFeatures: ["Google Maps", "Business Hours", "Contact Form", "Photo Gallery", "Customer Reviews"],
    suggestedComponents: { hero: "hero2", services: "services2", gallery: "gallery1", testimonials: "testimonials2", footer: "footer1" },
    colorSchemes: [
      { primary: "#1565C0", secondary: "#E3F2FD", label: "Trust Blue" },
      { primary: "#2E7D32", secondary: "#E8F5E9", label: "Local Green" },
      { primary: "#F57F17", secondary: "#FFF9C4", label: "Warm Orange" },
      { primary: "#5D4037", secondary: "#EFEBE9", label: "Earth Brown" },
    ],
    designStyle: { themeStyle: "friendly", fontStyle: "Open Sans", typography: "opensans" },
    metaDefaults: {
      titleTemplate: "{brandName} - Local Business | Visit Us Today",
      descriptionTemplate: "Your trusted local business {brandName}. Quality services and friendly staff. Visit us today.",
    },
  },
  legal: {
    label: "Legal Services",
    icon: "\u2696\uFE0F",
    suggestedPages: ["home", "services", "about", "team", "contact"],
    suggestedSections: ["hero", "services", "stats", "testimonials", "cta"],
    suggestedFeatures: ["Practice Areas", "Case Studies", "Legal Resources", "Consultation Booking", "Client Portal"],
    suggestedComponents: { hero: "hero2", services: "services1", testimonials: "testimonials3", cta: "cta1", footer: "footer1" },
    colorSchemes: [
      { primary: "#1E3A5F", secondary: "#E8EEF4", label: "Navy Trust" },
      { primary: "#4A148C", secondary: "#F3E5F5", label: "Justice Purple" },
      { primary: "#37474F", secondary: "#ECEFF1", label: "Professional Grey" },
      { primary: "#795548", secondary: "#EFEBE9", label: "Classic Brown" },
    ],
    designStyle: { themeStyle: "corporate", fontStyle: "Lato", typography: "lato" },
    metaDefaults: {
      titleTemplate: "{brandName} - Legal Services | Expert Attorneys",
      descriptionTemplate: "Trusted legal services from {brandName}. Expert attorneys for your needs. Schedule a consultation today.",
    },
  },
  automotive: {
    label: "Automotive",
    icon: "\uD83D\uDE97",
    suggestedPages: ["home", "inventory", "services", "about", "contact"],
    suggestedSections: ["hero", "inventory", "services", "testimonials", "contact"],
    suggestedFeatures: ["Inventory Search", "Financing Calculator", "Trade-In Valuation", "Test Drive Booking", "Service Scheduler"],
    suggestedComponents: { hero: "hero4", services: "services2", testimonials: "testimonials2", contact: "contact1", footer: "footer1" },
    colorSchemes: [
      { primary: "#B71C1C", secondary: "#FFEBEE", label: "Racing Red" },
      { primary: "#212121", secondary: "#E0E0E0", label: "Sleek Black" },
      { primary: "#0D47A1", secondary: "#E3F2FD", label: "Metallic Blue" },
      { primary: "#37474F", secondary: "#CFD8DC", label: "Steel Grey" },
    ],
    designStyle: { themeStyle: "bold", fontStyle: "Barlow", typography: "montserrat" },
    metaDefaults: {
      titleTemplate: "{brandName} - Automotive Services | Quality Vehicles",
      descriptionTemplate: "Quality automotive services at {brandName}. Sales, service, and financing. Schedule a test drive today.",
    },
  },
  startup: {
    label: "Startup",
    icon: "\uD83D\uDE80",
    suggestedPages: ["home", "features", "pricing", "about", "blog", "contact"],
    suggestedSections: ["hero", "features", "pricing", "testimonials", "cta"],
    suggestedFeatures: ["Feature Comparison", "Pricing Table", "Demo Request", "Blog", "Newsletter"],
    suggestedComponents: { hero: "hero3", services: "services1", pricing: "pricing1", testimonials: "testimonials1", cta: "cta1" },
    colorSchemes: [
      { primary: "#6366F1", secondary: "#EEF2FF", label: "Indigo Tech" },
      { primary: "#0EA5E9", secondary: "#E0F2FE", label: "Sky Blue" },
      { primary: "#10B981", secondary: "#D1FAE5", label: "Emerald" },
      { primary: "#F59E0B", secondary: "#FEF3C7", label: "Amber" },
    ],
    designStyle: { themeStyle: "modern", fontStyle: "Inter", typography: "inter" },
    metaDefaults: {
      titleTemplate: "{brandName} - Innovative Startup | Join Us",
      descriptionTemplate: "The future of {brandName}. Innovative solutions for modern problems. Get started today.",
    },
  },
};

export const BUSINESS_TYPE_OPTIONS = Object.entries(BUSINESS_TYPES).map(([value, config]) => ({
  value,
  label: config.label,
}));

export const normalizeBusinessType = (value?: string): string => {
  if (!value) return "local-business";

  const normalized = value.trim().toLowerCase();
  const directMatch = Object.keys(BUSINESS_TYPES).find((key) => key.toLowerCase() === normalized);
  if (directMatch) return directMatch;

  const synonyms: Record<string, string> = {
    "restaurant / cafe": "restaurant",
    "food & beverage": "restaurant",
    "digital agency": "agency",
    "marketing agency": "agency",
    "creative agency": "agency",
    consulting: "consulting",
    "management consulting": "consulting",
    "business consulting": "consulting",
    "real estate": "real-estate",
    property: "real-estate",
    healthcare: "healthcare",
    medical: "healthcare",
    clinic: "healthcare",
    education: "education",
    "e-learning": "education",
    "online courses": "education",
    fitness: "fitness",
    gym: "fitness",
    wellness: "fitness",
    travel: "travel",
    tourism: "travel",
    hospitality: "travel",
    technology: "technology",
    saas: "technology",
    software: "technology",
    finance: "finance",
    banking: "finance",
    "financial services": "finance",
    beauty: "beauty",
    salon: "beauty",
    spa: "beauty",
    portfolio: "portfolio",
    creative: "portfolio",
    freelance: "portfolio",
    "local business": "local-business",
    "small business": "local-business",
    retail: "local-business",
    ecommerce: "local-business",
    legal: "legal",
    "law firm": "legal",
    automotive: "automotive",
    construction: "local-business",
    "home services": "local-business",
    startup: "startup",
  };

  return synonyms[normalized] || "local-business";
};
